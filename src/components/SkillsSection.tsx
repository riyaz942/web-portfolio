"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { DotLottieReact, DotLottie } from "@lottiefiles/dotlottie-react";
import Image from "next/image";

const skillHighlights = [
  {
    title: "The Frontend Canvas",
    description:
      "Crafting pixel-perfect, highly animated UI with modern JavaScript",
  },
  {
    title: "Intelligent Systems",
    description:
      "Weaving conversational AI into apps to make them think and speak",
  },
  {
    title: "Full-Stack Foundation",
    description:
      "Node.js and cloud infrastructure that doesn't buckle under pressure",
  },
  {
    title: "Tech Leadership",
    description:
      "Guiding teams, architecting solutions, and shipping what matters",
  },
];

type AnimPhase =
  | "scroll_driven"
  | "auto_forward_tree"
  | "auto_complete"
  | "auto_reverse_tree";

const AUTO_PLAY_SPEED = 1 / 1400;

export default function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const innerContainerRef = useRef<HTMLDivElement>(null);
  const [dotLottie, setDotLottie] = useState<DotLottie | null>(null);
  const [totalFrames, setTotalFrames] = useState(0);
  const [treeDotLottie, setTreeDotLottie] = useState<DotLottie | null>(null);
  const [treeTotalFrames, setTreeTotalFrames] = useState(0);

  const phaseRef = useRef<AnimPhase>("scroll_driven");
  const lineProgressRef = useRef(0);
  const treeProgressRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [treeProgress, setTreeProgress] = useState(0);
  const [bgRevealed, setBgRevealed] = useState(false);

  const dotLottieRefCallback = useCallback((instance: DotLottie | null) => {
    setDotLottie(instance);
  }, []);

  const treeDotLottieRefCallback = useCallback((instance: DotLottie | null) => {
    setTreeDotLottie(instance);
  }, []);

  useEffect(() => {
    if (!dotLottie) return;

    const handleLoad = () => {
      setTotalFrames(dotLottie.totalFrames);
      dotLottie.pause();
      dotLottie.setFrame(0);
    };

    dotLottie.addEventListener("load", handleLoad);

    if (dotLottie.isLoaded) {
      handleLoad();
    }

    return () => {
      dotLottie.removeEventListener("load", handleLoad);
    };
  }, [dotLottie]);

  useEffect(() => {
    if (!treeDotLottie) return;

    const handleLoad = () => {
      setTreeTotalFrames(treeDotLottie.totalFrames);
      treeDotLottie.pause();
      treeDotLottie.setFrame(0);
    };

    treeDotLottie.addEventListener("load", handleLoad);

    if (treeDotLottie.isLoaded) {
      handleLoad();
    }

    return () => {
      treeDotLottie.removeEventListener("load", handleLoad);
    };
  }, [treeDotLottie]);

  const syncFrames = useCallback(
    (lineProg: number, treeProg: number) => {
      if (dotLottie && totalFrames > 0) {
        dotLottie.setFrame(Math.floor(lineProg * (totalFrames - 1)));
      }
      if (treeDotLottie && treeTotalFrames > 0) {
        treeDotLottie.setFrame(Math.floor(treeProg * (treeTotalFrames - 1)));
      }
      setScrollProgress(lineProg);
      setTreeProgress(treeProg);
    },
    [dotLottie, totalFrames, treeDotLottie, treeTotalFrames],
  );

  const stopAutoPlay = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    lastTimeRef.current = null;
  }, []);

  const startAutoPlay = useCallback(() => {
    stopAutoPlay();

    const tick = (now: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = now;
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const dt = Math.min(now - lastTimeRef.current, 50);
      lastTimeRef.current = now;
      const delta = dt * AUTO_PLAY_SPEED;
      const phase = phaseRef.current;

      if (phase === "auto_forward_tree") {
        treeProgressRef.current = Math.min(1, treeProgressRef.current + delta);
        syncFrames(lineProgressRef.current, treeProgressRef.current);
        if (treeProgressRef.current >= 1) {
          phaseRef.current = "auto_complete";
          stopAutoPlay();
          return;
        }
      } else if (phase === "auto_reverse_tree") {
        treeProgressRef.current = Math.max(0, treeProgressRef.current - delta);
        syncFrames(lineProgressRef.current, treeProgressRef.current);
        if (treeProgressRef.current <= 0) {
          phaseRef.current = "scroll_driven";
          stopAutoPlay();
          return;
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
  }, [syncFrames, stopAutoPlay]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top;
      const viewportHeight = window.innerHeight;

      const delayThreshold = viewportHeight * 0.5;
      const lineAnimScrollDist = viewportHeight * 1.0;

      const scrolled = delayThreshold - sectionTop;
      const rawLineProg = Math.max(
        0,
        Math.min(1, scrolled / lineAnimScrollDist),
      );

      // --- Stacked / Layered Scroll Sections Effect ---
      // The Contact section has a negative top margin of 100vh.
      // It starts overlapping this section when sectionTop reaches -1.2 * viewportHeight,
      // and completely covers it when sectionTop reaches -2.2 * viewportHeight.
      const overlapStart = -1.2 * viewportHeight;
      let rawOverlap = 0;
      if (sectionTop <= overlapStart) {
        rawOverlap = (overlapStart - sectionTop) / viewportHeight;
      }
      const clampedOverlap = Math.max(0, Math.min(1, rawOverlap));

      if (innerContainerRef.current) {
        // Push the section back slightly, dim it, and blur it to create a depth effect
        innerContainerRef.current.style.transform = `scale(${1 - clampedOverlap * 0.05}) translateY(${clampedOverlap * 3}vh)`;
        innerContainerRef.current.style.opacity = `${1 - clampedOverlap * 0.6}`;
        innerContainerRef.current.style.filter = `blur(${clampedOverlap * 10}px)`;
      }
      // ------------------------------------------------

      const phase = phaseRef.current;

      if (phase === "scroll_driven") {
        lineProgressRef.current = rawLineProg;
        treeProgressRef.current = 0;
        syncFrames(rawLineProg, 0);

        if (rawLineProg >= 1) {
          phaseRef.current = "auto_forward_tree";
          setBgRevealed(true);
          startAutoPlay();
        }
      } else if (phase === "auto_complete" || phase === "auto_forward_tree") {
        lineProgressRef.current = rawLineProg;
        syncFrames(rawLineProg, treeProgressRef.current);

        if (rawLineProg < 1) {
          phaseRef.current = "auto_reverse_tree";
          setBgRevealed(false);
          lastTimeRef.current = null;
          startAutoPlay();
        }
      } else if (phase === "auto_reverse_tree") {
        lineProgressRef.current = rawLineProg;
        syncFrames(rawLineProg, treeProgressRef.current);

        if (rawLineProg >= 1) {
          phaseRef.current = "auto_forward_tree";
          setBgRevealed(true);
          lastTimeRef.current = null;
          startAutoPlay();
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      stopAutoPlay();
    };
  }, [syncFrames, startAutoPlay, stopAutoPlay]);

  const containerProgress = Math.max(
    0,
    Math.min(1, (scrollProgress - 0.15) / 0.15),
  );
  const headerProgress = Math.max(
    0,
    Math.min(1, (scrollProgress - 0.2) / 0.15),
  );
  const getHighlightProgress = (index: number) => {
    const startOffset = 0.35 + index * 0.075;
    return Math.max(0, Math.min(1, (scrollProgress - startOffset) / 0.1));
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{ height: "300vh" }}
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        <div
          ref={innerContainerRef}
          className="w-full h-full will-change-transform"
          style={{ transformOrigin: "top center" }}
        >
          {/* Background doodle image — wipes in from right to left when center line animation completes */}
          <div
            className="absolute inset-0 w-full h-full z-0"
            style={{
              opacity: 0.2,
              maskImage: `linear-gradient(to left, black 0%, black 50%, transparent 50%, transparent 100%)`,
              WebkitMaskImage: `linear-gradient(to left, black 0%, black 50%, transparent 50%, transparent 100%)`,
              maskSize: "200% 100%",
              WebkitMaskSize: "200% 100%",
              maskPosition: bgRevealed ? "100% 0%" : "0% 0%",
              WebkitMaskPosition: bgRevealed ? "100% 0%" : "0% 0%",
              transition:
                "mask-position 0.8s linear, -webkit-mask-position 0.8s linear",
            }}
          >
            <Image
              src="/images/Skill-section/Skill-section-background%20image-1.png"
              alt=""
              fill
              className="object-cover object-center"
              priority={false}
            />
          </div>

          {/* Center-line-to-right Lottie — positioned on the right, mirroring CreativeSection */}
          <div
            data-id="skills-lottie"
            className="absolute right-0 top-0 w-[52.7%] origin-top-right z-[1]"
            style={{
              aspectRatio: "851 / 721",
              opacity: scrollProgress >= 1 ? 0 : 1,
            }}
          >
            <DotLottieReact
              src="/images/Skill-section/center-line-to-right-animation.lottie"
              autoplay={false}
              loop={false}
              dotLottieRefCallback={dotLottieRefCallback}
              renderConfig={
                {
                  autoResize: true,
                  fit: "contain",
                  align: ["1", "0"], // Align to top-right
                } as unknown as typeof undefined
              }
            />
          </div>

          {/* Tree Lottie — same position, plays after center-line-to-right finishes */}
          <div
            className="absolute right-0 top-0 w-[52.7%] origin-top-right z-[2]"
            style={{
              aspectRatio: "851 / 721",
              opacity: treeProgress > 0 ? 1 : 0,
            }}
          >
            <DotLottieReact
              src="/images/Skill-section/tree-animation.lottie"
              autoplay={false}
              loop={false}
              dotLottieRefCallback={treeDotLottieRefCallback}
              renderConfig={
                {
                  autoResize: true,
                  fit: "contain",
                  align: ["1", "0"],
                } as unknown as typeof undefined
              }
            />
          </div>

          {/* Bottom fade overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none z-[5]" />

          {/* Content Layer — left side, opposite of CreativeSection */}
          <div className="relative z-10 h-full flex items-center">
            <div
              className="absolute left-8 md:left-16 lg:left-24 max-w-[min(55%,700px)] flex flex-col justify-center gap-14 p-6 md:p-8 rounded-2xl"
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
                  transform: `translateY(${(1 - headerProgress) * 40}px)`,
                  opacity: headerProgress,
                  filter: `blur(${(1 - headerProgress) * 8}px)`,
                  transition: "filter 0.1s ease-out",
                }}
              >
                <h2 className="text-[clamp(1.25rem,3vw,2.25rem)] font-bold leading-[1.2] tracking-tight">
                  <span className="text-foreground whitespace-nowrap">
                    Turning complex requirements
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent whitespace-nowrap">
                    into high-performance software.
                  </span>
                </h2>
                <p
                  className="mt-4 text-[clamp(0.9rem,1.5vw,1.15rem)] text-muted leading-relaxed"
                  style={{
                    opacity: Math.max(0, (headerProgress - 0.3) / 0.7),
                    transform: `translateY(${Math.max(0, (1 - headerProgress) * 20)}px)`,
                  }}
                >
                  Building seamless web experiences
                  <br />
                  from the database to the DOM.
                </p>
              </div>

              {/* Skill Highlights — vertical stack with left accent */}
              <div className="flex flex-col gap-5">
                {skillHighlights.map((highlight, index) => {
                  const progress = getHighlightProgress(index);
                  return (
                    <div
                      key={highlight.title}
                      className="group relative pl-5"
                      style={{
                        transform: `translateX(${(1 - progress) * -20}px)`,
                        opacity: progress,
                        filter: `blur(${(1 - progress) * 4}px)`,
                        transition: "filter 0.1s ease-out",
                      }}
                    >
                      {/* Left accent bar */}
                      <div
                        className="absolute left-0 top-0 w-[2px] bg-gradient-to-b from-accent to-accent-secondary rounded-full"
                        style={{
                          height: `${progress * 100}%`,
                          opacity: 0.5 + progress * 0.5,
                        }}
                      />

                      <h3 className="text-[clamp(0.8rem,1.2vw,0.95rem)] font-semibold text-foreground tracking-wide">
                        {highlight.title}
                      </h3>
                      <p className="text-[clamp(0.7rem,1vw,0.85rem)] text-muted leading-relaxed mt-1">
                        {highlight.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
