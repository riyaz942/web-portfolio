"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { DotLottieReact, DotLottie } from "@lottiefiles/dotlottie-react";
import Image from "next/image";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useViewTransitionRouter } from "@/hooks/useViewTransition";
import { clamp01 } from "@/utils/clamp";
import { initLottie } from "@/utils/lottie";
import { creativeHighlights } from "@/data/creativeHighlights";

const AUTOPLAY_THRESHOLD = 0.5;
const AUTOPLAY_DURATION_MS = 1000;
const CATCHUP_DURATION_MS = 500;

export default function CreativeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [dotLottie, setDotLottie] = useState<DotLottie | null>(null);
  const [totalFrames, setTotalFrames] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [lottieComplete, setLottieComplete] = useState(false);
  const isMobile = useIsMobile();
  const { push } = useViewTransitionRouter();

  useEffect(
    () => (dotLottie ? initLottie(dotLottie, setTotalFrames) : undefined),
    [dotLottie],
  );

  const scrollRafRef = useRef<number | null>(null);
  const lastProgressRef = useRef(0);

  const autoplayRafRef = useRef<number | null>(null);
  const autoplayPhaseRef = useRef<"idle" | "forward" | "reverse" | "catchup">(
    "idle",
  );
  const autoplayFrameRef = useRef(0);

  const getScrollProgress = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return 0;
    const rect = section.getBoundingClientRect();
    const vh = window.innerHeight;
    const delayThreshold = vh * 0.5;
    const animationScrollDistance = vh * 2;
    return clamp01((delayThreshold - rect.top) / animationScrollDistance);
  }, []);

  const cancelAutoplay = useCallback(() => {
    if (autoplayRafRef.current !== null) {
      cancelAnimationFrame(autoplayRafRef.current);
      autoplayRafRef.current = null;
    }
    autoplayPhaseRef.current = "idle";
  }, []);

  const startAutoplay = useCallback(
    (direction: "forward" | "reverse") => {
      if (!dotLottie || totalFrames === 0) return;
      cancelAutoplay();
      autoplayPhaseRef.current = direction;

      const thresholdFrame = Math.floor(AUTOPLAY_THRESHOLD * (totalFrames - 1));
      const endFrame =
        direction === "forward" ? totalFrames - 1 : thresholdFrame;
      const startFrame =
        direction === "forward" ? thresholdFrame : totalFrames - 1;
      const frameDelta = endFrame - startFrame;
      const startTime = performance.now();

      const step = (now: number) => {
        if (autoplayPhaseRef.current !== direction) return;
        const elapsed = now - startTime;
        const t = clamp01(elapsed / AUTOPLAY_DURATION_MS);
        const frame = Math.round(startFrame + frameDelta * t);
        dotLottie.setFrame(frame);
        autoplayFrameRef.current = frame;

        if (t < 1) {
          autoplayRafRef.current = requestAnimationFrame(step);
        } else {
          autoplayRafRef.current = null;
          if (direction === "forward") {
            setLottieComplete(true);
          } else {
            const progress = getScrollProgress();
            if (progress < AUTOPLAY_THRESHOLD) {
              autoplayPhaseRef.current = "catchup";
              const thresholdFrame = Math.floor(
                AUTOPLAY_THRESHOLD * (totalFrames - 1),
              );
              const targetFrame = Math.floor(progress * (totalFrames - 1));
              const startFrame = thresholdFrame;
              const frameDelta = targetFrame - startFrame;
              const startTime = performance.now();

              const catchupStep = (now: number) => {
                if (autoplayPhaseRef.current !== "catchup") return;
                const elapsed = now - startTime;
                const t = clamp01(elapsed / CATCHUP_DURATION_MS);
                const frame = Math.round(startFrame + frameDelta * t);
                dotLottie.setFrame(frame);
                autoplayFrameRef.current = frame;

                if (t < 1) {
                  autoplayRafRef.current = requestAnimationFrame(catchupStep);
                } else {
                  autoplayRafRef.current = null;
                  autoplayPhaseRef.current = "idle";
                }
              };

              autoplayRafRef.current = requestAnimationFrame(catchupStep);
            } else {
              autoplayPhaseRef.current = "idle";
            }
          }
        }
      };

      autoplayRafRef.current = requestAnimationFrame(step);
    },
    [dotLottie, totalFrames, cancelAutoplay, getScrollProgress],
  );

  useEffect(() => {
    if (!sectionRef.current) return;
    if (!isMobile && (!dotLottie || totalFrames === 0)) return;

    const computeAndApply = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top;
      const vh = window.innerHeight;

      const delayThreshold = vh * 0.5; // 50% of the viewport height. before: (isMobile ? 0.5 : 0.5)
      const animationScrollDistance = vh * (isMobile ? 1.2 : 2);

      const progress = clamp01(
        (delayThreshold - sectionTop) / animationScrollDistance,
      );
      const prevProgress = lastProgressRef.current;
      const scrollingDown = progress > prevProgress;
      const scrollingUp = progress < prevProgress;

      if (!isMobile && dotLottie && totalFrames > 0) {
        const phase = autoplayPhaseRef.current;

        if (
          progress >= AUTOPLAY_THRESHOLD &&
          prevProgress < AUTOPLAY_THRESHOLD &&
          scrollingDown
        ) {
          startAutoplay("forward");
        } else if (
          progress < AUTOPLAY_THRESHOLD &&
          prevProgress >= AUTOPLAY_THRESHOLD &&
          scrollingUp
        ) {
          setLottieComplete(false);
          startAutoplay("reverse");
        } else if (phase === "idle" && progress < AUTOPLAY_THRESHOLD) {
          dotLottie.setFrame(Math.floor(progress * (totalFrames - 1)));
        }
      }

      if (Math.abs(progress - lastProgressRef.current) > 0.001) {
        lastProgressRef.current = progress;
        setScrollProgress(progress);
      }
    };

    const handleScroll = () => {
      if (scrollRafRef.current !== null) return;
      scrollRafRef.current = requestAnimationFrame(() => {
        scrollRafRef.current = null;
        computeAndApply();
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    computeAndApply();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollRafRef.current !== null)
        cancelAnimationFrame(scrollRafRef.current);
      cancelAutoplay();
    };
  }, [dotLottie, totalFrames, isMobile, startAutoplay, cancelAutoplay]);

  const containerProgress = clamp01((scrollProgress - 0.25) / 0.1);
  const headlineProgress = clamp01((scrollProgress - 0.27) / 0.1);
  const getHighlightProgress = (index: number) => {
    const startOffset = 0.35 + index * 0.04;
    return clamp01((scrollProgress - startOffset) / 0.04);
  };

  const buttonProgress = clamp01((scrollProgress - 0.5) / 0.08);
  const backgroundRevealTriggered = isMobile
    ? scrollProgress >= 0.5
    : lottieComplete;

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{ height: isMobile ? "140vh" : "180vh" }}
    >
      {/* Sticky container for the animation and content */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        {/* Background Doodle Image - circular reveal from light bulb position */}
        <div
          className="absolute inset-0 w-full h-full z-0"
          style={{
            clipPath: `circle(${backgroundRevealTriggered ? 150 : 0}% at ${isMobile ? "50% 50%" : "15% 60%"})`,
            opacity: backgroundRevealTriggered ? 1 : 0,
            transition:
              "clip-path 1.2s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease-out",
          }}
        >
          <Image
            src="/images/creative-section/background-doodle.webp"
            alt=""
            fill
            className="object-cover object-center opacity-20"
            sizes="100vw"
            priority={false}
          />
        </div>

        <div className="relative mx-auto h-full max-w-[2560px]">
          {/* Lottie Background Animation */}
          <div
            data-id="creative-lottie"
            className="hidden md:block absolute w-[53%] origin-top-left z-[1]"
            style={{ aspectRatio: "851 / 721" }}
          >
            <DotLottieReact
              src="/images/creative-section/background-animation.lottie"
              autoplay={false}
              loop={false}
              dotLottieRefCallback={setDotLottie}
              renderConfig={
                {
                  autoResize: true,
                  fit: "contain",
                  align: ["0", "0"],
                } as unknown as typeof undefined
              }
            />
          </div>

          {/* Bottom fade overlay - matches landing section */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none z-[5]" />

          {/* Content Layer - positioned to avoid animation overlap */}
          <div className="relative z-10 h-full flex items-center justify-center md:justify-end">
            {/* Content container - centered on mobile, right side on desktop */}
            <div
              className="relative w-full max-w-lg mx-6 md:mx-0 md:w-auto md:absolute md:right-16 lg:right-24 md:max-w-[min(50%,600px)] flex flex-col justify-center gap-10 md:gap-14 p-6 md:p-8 rounded-2xl"
              style={{
                background: `color-mix(in srgb, var(--color-background) ${50 * containerProgress}%, transparent)`,
                border: `1px solid rgba(255, 255, 255, ${0.08 * containerProgress})`,
                backdropFilter: `blur(${12 * containerProgress}px)`,
                WebkitBackdropFilter: `blur(${12 * containerProgress}px)`,
              }}
            >
              {/* Main Headline */}
              <div
                className="relative"
                style={{
                  transform: `translateY(${(1 - headlineProgress) * 40}px)`,
                  opacity: headlineProgress,
                  filter: `blur(${(1 - headlineProgress) * 8}px)`,
                  transition: "filter 0.1s ease-out",
                }}
              >
                <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-bold leading-[1.1] tracking-tight text-center md:text-right">
                  <span className="text-foreground">
                    I turn complex problems
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
                    into elegant solutions
                  </span>
                </h2>
                <p
                  className="mt-4 text-[clamp(0.9rem,1.5vw,1.15rem)] text-muted text-center md:text-right leading-relaxed"
                  style={{
                    opacity: Math.max(0, (headlineProgress - 0.3) / 0.7),
                    transform: `translateY(${Math.max(0, (1 - headlineProgress) * 20)}px)`,
                  }}
                >
                  Crafting interfaces that feel intuitive,
                  <br />
                  look stunning, and tell a story.
                </p>
              </div>

              {/* Micro-Highlights Grid */}
              <div className="relative">
                <div className="grid grid-cols-2 gap-4 md:gap-5">
                  {creativeHighlights.map((highlight, index) => {
                    const progress = getHighlightProgress(index);
                    return (
                      <div
                        key={highlight.title}
                        className="group relative"
                        style={{
                          transform: `translateY(${(1 - progress) * 30}px)`,
                          opacity: progress,
                          filter: `blur(${(1 - progress) * 4}px)`,
                          transition: "filter 0.1s ease-out",
                        }}
                      >
                        {/* Subtle glow on hover */}
                        <div className="absolute -inset-2 bg-gradient-to-br from-accent/10 to-accent-secondary/10 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

                        <div className="relative p-4 md:p-5 rounded-xl bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] hover:border-white/[0.12] transition-colors duration-300">
                          {/* Animated line accent */}
                          <div
                            className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"
                            style={{
                              transform: `scaleX(${progress})`,
                              transformOrigin: "left",
                            }}
                          />

                          <h3 className="text-[clamp(0.8rem,1.2vw,0.95rem)] font-semibold text-foreground mb-1.5 tracking-wide">
                            {highlight.title}
                          </h3>
                          <p className="text-[clamp(0.7rem,1vw,0.85rem)] text-muted leading-relaxed">
                            {highlight.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Check out my projects link */}
              <div
                className="flex justify-center md:justify-end -mt-2 md:-mt-4"
                style={{
                  transform: `translateY(${(1 - buttonProgress) * 20}px)`,
                  opacity: buttonProgress,
                  filter: `blur(${(1 - buttonProgress) * 4}px)`,
                  transition: "filter 0.1s ease-out",
                }}
              >
                <button
                  onClick={() => push("/projects")}
                  className="group flex items-center gap-1.5 cursor-pointer bg-transparent text-[clamp(0.8rem,1.1vw,0.95rem)] font-medium transition-opacity duration-300 hover:opacity-80 active:opacity-60"
                >
                  <span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
                    Check out my projects
                  </span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="text-accent transition-transform duration-200 group-hover:translate-x-0.5"
                  >
                    <path
                      d="M6 3.5L10.5 8L6 12.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
