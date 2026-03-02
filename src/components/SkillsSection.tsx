"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { DotLottieReact, DotLottie } from "@lottiefiles/dotlottie-react";
import SkillCard, { skillCategories } from "./SkillCard";

export default function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [dotLottie, setDotLottie] = useState<DotLottie | null>(null);
  const [totalFrames, setTotalFrames] = useState(0);
  const [treeDotLottie, setTreeDotLottie] = useState<DotLottie | null>(null);
  const [treeTotalFrames, setTreeTotalFrames] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [treeProgress, setTreeProgress] = useState(0);

  const dotLottieRefCallback = useCallback((instance: DotLottie | null) => {
    setDotLottie(instance);
  }, []);

  const treeDotLottieRefCallback = useCallback(
    (instance: DotLottie | null) => {
      setTreeDotLottie(instance);
    },
    [],
  );

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

  useEffect(() => {
    if (!sectionRef.current) return;

    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top;
      const viewportHeight = window.innerHeight;

      const delayThreshold = viewportHeight * 0.5;
      const lineAnimScrollDist = viewportHeight * 3;
      const treeAnimScrollDist = viewportHeight * 1.5;

      const scrolled = delayThreshold - sectionTop;

      const lineProg = Math.max(
        0,
        Math.min(1, scrolled / lineAnimScrollDist),
      );
      setScrollProgress(lineProg);

      if (dotLottie && totalFrames > 0) {
        dotLottie.setFrame(Math.floor(lineProg * (totalFrames - 1)));
      }

      const treeScrolled = scrolled - lineAnimScrollDist;
      const treeProg = Math.max(
        0,
        Math.min(1, treeScrolled / treeAnimScrollDist),
      );
      setTreeProgress(treeProg);

      if (treeDotLottie && treeTotalFrames > 0) {
        treeDotLottie.setFrame(
          Math.floor(treeProg * (treeTotalFrames - 1)),
        );
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dotLottie, totalFrames, treeDotLottie, treeTotalFrames]);

  // Container glass appears slightly before content (at 15% progress)
  const containerProgress = Math.max(
    0,
    Math.min(1, (scrollProgress - 0.15) / 0.15),
  );
  // Header appears at 20% progress
  const headerProgress = Math.max(
    0,
    Math.min(1, (scrollProgress - 0.2) / 0.15),
  );
  // Cards stagger in from 35% to 65%
  const getCardRevealProgress = (index: number) => {
    const startOffset = 0.35 + index * 0.075;
    return Math.max(0, Math.min(1, (scrollProgress - startOffset) / 0.1));
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{ height: "600vh" }}
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        {/* Center-line-to-right Lottie — positioned on the right, mirroring CreativeSection */}
        <div
          data-id="skills-lottie"
          className="absolute right-0 top-0 w-[52.7%] origin-top-right z-[1]"
          style={{ aspectRatio: "851 / 721" }}
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
            className="absolute left-8 md:left-16 lg:left-24 max-w-[min(50%,600px)] flex flex-col justify-center gap-14 p-6 md:p-8 rounded-2xl"
            style={{
              background: `color-mix(in srgb, var(--color-background) ${50 * containerProgress}%, transparent)`,
              border: `1px solid rgba(255, 255, 255, ${0.08 * containerProgress})`,
              backdropFilter: `blur(${12 * containerProgress}px)`,
              WebkitBackdropFilter: `blur(${12 * containerProgress}px)`,
            }}
          >
            {/* Section Header */}
            <div
              style={{
                transform: `translateY(${(1 - headerProgress) * 40}px)`,
                opacity: headerProgress,
                filter: `blur(${(1 - headerProgress) * 8}px)`,
                transition: "filter 0.1s ease-out",
              }}
            >
              <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-bold leading-[1.1] tracking-tight">
                <span className="text-foreground">Skills &</span>
                <br />
                <span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
                  Expertise
                </span>
              </h2>
              <p
                className="mt-4 text-[clamp(0.9rem,1.5vw,1.15rem)] text-muted leading-relaxed"
                style={{
                  opacity: Math.max(0, (headerProgress - 0.3) / 0.7),
                  transform: `translateY(${Math.max(0, (1 - headerProgress) * 20)}px)`,
                }}
              >
                Technologies and tools I use
                <br />
                to bring ideas to life
              </p>
            </div>

            {/* Skills Grid — 2 columns within the left-aligned container */}
            <div className="grid grid-cols-2 gap-4 md:gap-5">
              {skillCategories.map((category, index) => (
                <SkillCard
                  key={category.id}
                  category={category}
                  revealProgress={getCardRevealProgress(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
