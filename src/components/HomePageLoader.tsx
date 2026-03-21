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
  const [viewportCenter, setViewportCenter] = useState({ x: 0, y: 0 });

  const itemsLoadedRef = useRef(0);
  const totalItemsRef = useRef(0);
  const valuateTimerCancelRef = useRef<(() => void) | null>(null);
  const completionTimeoutsRef = useRef<number[]>([]);

  const isLoading = pageState === loaderPageStates.IS_LOADING;
  const showLoaderText =
    isLoading || pageState === loaderPageStates.COMPLETED_LOADING;

  const spring = useSpring({
    width: `calc(100vw - ${displayPercent}vw)`,
    progress: displayPercent,
    textOpacity: isLoading ? 1 : 0,
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
        setPageState(loaderPageStates.SHOW_PAGE);
        setDisplayPercent(100);
        beginOverlayFade();
        return;
      }

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
    const updateViewportCenter = () => {
      setViewportCenter({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      });
    };
    updateViewportCenter();
    window.addEventListener("resize", updateViewportCenter);
    return () => window.removeEventListener("resize", updateViewportCenter);
  }, []);

  useEffect(() => {
    const total =
      LANDING_PRELOAD_IMAGES.length + LANDING_PRELOAD_LOTTIES.length;
    totalItemsRef.current = total;
    itemsLoadedRef.current = 0;

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

      const isLastItem =
        totalItemsRef.current - itemsLoadedRef.current <= 1;
      const updateAfter = isLastItem ? 600 : 400;

      valuateTimerCancelRef.current = animationFrameTimeout(() => {
        if (cancelled) return;

        if (isLastItem) {
          itemsLoadedRef.current += 1;
        }

        setDisplayPercent(
          Math.trunc(
            (itemsLoadedRef.current / totalItemsRef.current) * 100,
          ),
        );

        if (itemsLoadedRef.current >= totalItemsRef.current) {
          completeLoading(false);
        } else {
          valuateProgress();
        }
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

  return (
    <LandingLoaderContext.Provider value={contextValue}>
      <div className="relative h-full min-h-0 w-full">
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
              <BackgroundAnimator
                clientX={viewportCenter.x}
                clientY={viewportCenter.y}
              />
            </div>
            {/* Black curtain: right-aligned, shrinks left-to-right as progress grows */}
            <animated.div
              className="absolute right-0 top-0 z-[201] flex h-full items-center justify-end overflow-hidden bg-black"
              style={{ width: spring.width }}
            >
              {showLoaderText ? (
                <animated.div
                  className="pr-[18px] text-[40px]"
                  style={{ opacity: spring.textOpacity }}
                >
                  Loading...
                </animated.div>
              ) : null}
            </animated.div>
            {/* Percent — positioned just left of the curtain's leading edge */}
            {showLoaderText ? (
              <animated.div
                className="pointer-events-none absolute top-0 z-[202] flex h-full items-center text-[50px] leading-none"
                style={{
                  right: spring.width,
                  paddingRight: 30,
                  opacity: spring.textOpacity,
                }}
              >
                {spring.progress.to((v: number) =>
                  Math.min(100, Math.floor(v)),
                )}
              </animated.div>
            ) : null}
          </div>
        ) : null}
      </div>
    </LandingLoaderContext.Provider>
  );
}
