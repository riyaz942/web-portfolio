"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type TransitionEvent,
} from "react";
import { useSpring, animated } from "@react-spring/web";
import BackgroundAnimator from "@/components/BackgroundAnimator";
import {
  LANDING_PRELOAD_IMAGES,
  LANDING_PRELOAD_LOTTIES,
  preloadImage,
  preloadLottie,
} from "@/constants/landingPreload";

const loaderPageStates = {
  IS_LOADING: "IS_LOADING",
  COMPLETED_LOADING: "COMPLETED_LOADING",
  SHOW_PAGE: "SHOW_PAGE",
} as const;

type LoaderPageState = (typeof loaderPageStates)[keyof typeof loaderPageStates];

type LandingLoaderContextValue = {
  isLoaderComplete: boolean;
};

const LandingLoaderContext = createContext<LandingLoaderContextValue>({
  isLoaderComplete: true,
});

export function useLandingLoader() {
  return useContext(LandingLoaderContext);
}

function animationFrameTimeout(fn: () => void, ms: number) {
  const start = performance.now();
  let id: number;
  function tick(now: number) {
    if (now - start >= ms) {
      fn();
    } else {
      id = requestAnimationFrame(tick);
    }
  }
  id = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(id);
}

const OVERLAY_FADE_MS = 480;

export default function HomePageLoader({ children }: { children: ReactNode }) {
  const [pageState, setPageState] = useState<LoaderPageState>(
    loaderPageStates.IS_LOADING,
  );
  const [showBackground, setShowBackground] = useState(true);
  const [displayPercent, setDisplayPercent] = useState(0);
  const [fadeOverlay, setFadeOverlay] = useState(false);
  const fadeOutRef = useRef(false);

  const itemsLoadedRef = useRef(0);
  const totalItemsRef = useRef(0);
  /** Smoothed progress toward real load progress (avoids 80→100 jumps when many assets finish together). */
  const displayShownRef = useRef(0);
  const valuateTimerCancelRef = useRef<(() => void) | null>(null);
  const completionTimeoutsRef = useRef<number[]>([]);

  const spring = useSpring({
    width: `calc(100vw - ${displayPercent}vw)`,
    config: { mass: 1, tension: 120, friction: 26 },
  });

  const clearCompletionTimeouts = useCallback(() => {
    completionTimeoutsRef.current.forEach(clearTimeout);
    completionTimeoutsRef.current = [];
  }, []);

  const beginOverlayFade = useCallback(() => {
    fadeOutRef.current = true;
    setFadeOverlay(true);
  }, []);

  const completeLoading = useCallback(
    (showImmediately: boolean) => {
      if (valuateTimerCancelRef.current) {
        valuateTimerCancelRef.current();
        valuateTimerCancelRef.current = null;
      }
      clearCompletionTimeouts();

      if (showImmediately) {
        displayShownRef.current = 100;
        setPageState(loaderPageStates.SHOW_PAGE);
        setDisplayPercent(100);
        beginOverlayFade();
        return;
      }

      displayShownRef.current = 100;
      setDisplayPercent(100);
      setPageState(loaderPageStates.COMPLETED_LOADING);

      const t1 = window.setTimeout(() => {
        setPageState(loaderPageStates.SHOW_PAGE);
        beginOverlayFade();
      }, 500);
      completionTimeoutsRef.current.push(t1);
    },
    [beginOverlayFade, clearCompletionTimeouts],
  );

  const handleOverlayTransitionEnd = useCallback((e: TransitionEvent) => {
    if (e.target !== e.currentTarget) return;
    if (e.propertyName !== "opacity") return;
    if (!fadeOutRef.current) return;
    fadeOutRef.current = false;
    setFadeOverlay(false);
    setShowBackground(false);
  }, []);

  useEffect(() => {
    const total =
      LANDING_PRELOAD_IMAGES.length + LANDING_PRELOAD_LOTTIES.length;
    totalItemsRef.current = total;
    itemsLoadedRef.current = 0;
    displayShownRef.current = 0;

    const increment = () => {
      itemsLoadedRef.current += 1;
    };

    LANDING_PRELOAD_IMAGES.forEach((src) => {
      void preloadImage(src).then(increment);
    });
    LANDING_PRELOAD_LOTTIES.forEach((src) => {
      void preloadLottie(src).then(increment);
    });

    let cancelled = false;

    const valuateProgress = () => {
      if (cancelled) return;

      const tot = totalItemsRef.current;
      const loaded = itemsLoadedRef.current;
      const loadsComplete = loaded >= tot;
      const shownNow = displayShownRef.current;
      const displayCatchingUp = loadsComplete && shownNow < 99.95;
      const lastAssetPending = tot - loaded <= 1 && !loadsComplete;
      const updateAfter = displayCatchingUp ? 90 : lastAssetPending ? 550 : 400;

      valuateTimerCancelRef.current = animationFrameTimeout(() => {
        if (cancelled) return;

        const tot2 = totalItemsRef.current;
        const loaded2 = itemsLoadedRef.current;
        const loadsDone = loaded2 >= tot2;
        const targetPct = loadsDone
          ? 100
          : Math.min(100, (loaded2 / tot2) * 100);

        let shown = displayShownRef.current;
        if (shown < targetPct) {
          const gap = targetPct - shown;
          let step: number;
          if (shown >= 80) {
            step = Math.max(0.35, Math.min(4, gap / 2.5));
          } else if (shown >= 60) {
            step = Math.max(0.5, Math.min(6, gap / 6));
          } else {
            step = Math.max(1, Math.min(12, Math.ceil(gap / 4)));
          }
          shown = Math.min(targetPct, shown + step);
        }
        displayShownRef.current = shown;
        setDisplayPercent(shown);

        if (loadsDone && shown >= 99.95) {
          displayShownRef.current = 100;
          setDisplayPercent(100);
          completeLoading(false);
          return;
        }
        valuateProgress();
      }, updateAfter);
    };

    const tryImmediate = () => {
      if (cancelled) return;
      if (itemsLoadedRef.current >= totalItemsRef.current) {
        completeLoading(true);
        return;
      }
      valuateProgress();
    };

    requestAnimationFrame(() => {
      requestAnimationFrame(tryImmediate);
    });

    return () => {
      cancelled = true;
      if (valuateTimerCancelRef.current) {
        valuateTimerCancelRef.current();
        valuateTimerCancelRef.current = null;
      }
      clearCompletionTimeouts();
    };
  }, [completeLoading, clearCompletionTimeouts]);

  const contextValue = useMemo<LandingLoaderContextValue>(
    () => ({
      isLoaderComplete:
        pageState === loaderPageStates.SHOW_PAGE && !showBackground,
    }),
    [pageState, showBackground],
  );

  const centerX = typeof window !== "undefined" ? window.innerWidth / 2 : 0;
  const centerY = typeof window !== "undefined" ? window.innerHeight / 2 : 0;

  return (
    <LandingLoaderContext.Provider value={contextValue}>
      <div className="relative h-full min-h-0 w-full overflow-hidden">
        {pageState === loaderPageStates.SHOW_PAGE ? children : null}
        {showBackground ? (
          <div
            className={`pointer-events-auto fixed inset-0 z-[200] overflow-hidden text-white transition-opacity ease-out ${
              fadeOverlay ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
            style={{
              transitionDuration: fadeOverlay
                ? `${OVERLAY_FADE_MS}ms`
                : "200ms",
            }}
            onTransitionEnd={handleOverlayTransitionEnd}
            aria-busy={pageState !== loaderPageStates.SHOW_PAGE}
            aria-hidden={
              pageState === loaderPageStates.SHOW_PAGE && !showBackground
            }
          >
            {/* Full-bleed background (same framing as hero); black strip sits above it */}
            <div className="absolute inset-0 overflow-hidden bg-[#0a0a0a] opacity-30">
              <BackgroundAnimator clientX={centerX} clientY={centerY} />
            </div>
            <div className="absolute inset-0 flex flex-row items-stretch">
              <div className="min-h-0 min-w-0 flex-1" aria-hidden />
              {pageState === loaderPageStates.IS_LOADING ? (
                <>
                  <div className="z-[201] mr-[30px] flex items-center self-center text-[50px] leading-none">
                    {Math.min(100, Math.round(displayPercent))}
                  </div>
                  <animated.div
                    className="z-[201] flex h-full shrink-0 items-center justify-end overflow-hidden bg-black"
                    style={{
                      width: spring.width,
                    }}
                  >
                    <div className="pr-[18px] text-[40px]">Loading...</div>
                  </animated.div>
                </>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </LandingLoaderContext.Provider>
  );
}
