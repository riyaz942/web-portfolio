"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { DotLottieReact, DotLottie } from "@lottiefiles/dotlottie-react";
import Image from "next/image";
import ExperienceCard, { experiences } from "./ExperienceCard";

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [dotLottie, setDotLottie] = useState<DotLottie | null>(null);
  const [totalFrames, setTotalFrames] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [bgRevealProgress, setBgRevealProgress] = useState(0);
  const [lottieGap, setLottieGap] = useState(0);
  console.log("something", lottieGap);
  const dotLottieRefCallback = useCallback((instance: DotLottie | null) => {
    setDotLottie(instance);
  }, []);

  // Watch the gap between the Creative section Lottie bottom and ExperienceSection top on resize
  // and when the section is about to enter the viewport
  useEffect(() => {
    const measureGap = () => {
      console.log("something: measureGap");
      const creativeLottie = document.querySelector<HTMLElement>(
        '[data-id="creative-lottie"]',
      );
      const experienceContainer = sectionRef.current;
      if (!creativeLottie || !experienceContainer) return;

      const creativeLottieRect = creativeLottie.getBoundingClientRect();
      const experienceRect = experienceContainer.getBoundingClientRect();

      // py-24 = 6rem = 96px padding-top on the experience section
      const sectionPaddingTop = parseFloat(
        getComputedStyle(experienceContainer).paddingTop,
      );

      // Gap = distance from creative lottie bottom to experience section content area top (in page coordinates)
      const gap =
        experienceRect.top +
        sectionPaddingTop +
        window.scrollY -
        (creativeLottieRect.bottom + window.scrollY);
      setLottieGap(gap);
    };

    // Use IntersectionObserver to trigger measureGap when the title becomes visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            measureGap();
          }
        });
      },
      {
        threshold: 0,
      },
    );

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    window.addEventListener("resize", measureGap);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measureGap);
    };
  }, []);

  // Get total frames when animation loads
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

  // Handle scroll-based animation control
  useEffect(() => {
    if (!dotLottie || totalFrames === 0 || !sectionRef.current) return;

    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const viewportHeight = window.innerHeight;

      // Animation starts when section comes into view
      // Progress from 0 to 1 as user scrolls through the section
      const scrollStart = viewportHeight * 1; // Start earlier when section first enters viewport
      const scrollEnd = -sectionHeight + viewportHeight; // End later, well after section has scrolled past

      const scrolled = scrollStart - sectionTop;
      const scrollRange = scrollStart - scrollEnd;
      const progress = Math.max(0, Math.min(1, scrolled / scrollRange));

      setScrollProgress(progress);

      // Map progress to frame number
      const frame = Math.floor(progress * (totalFrames - 1));
      dotLottie.setFrame(frame);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [dotLottie, totalFrames]);

  // Background image reveal: starts when section top hits viewport top,
  // completes over 400px of additional scroll
  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const revealDistance = 400;
      const progress = Math.max(0, Math.min(1, -rect.top / revealDistance));
      setBgRevealProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate reveal progress for each experience card
  // Cards reveal progressively as scroll progresses
  const getCardRevealProgress = (index: number) => {
    const totalCards = experiences.length;
    // Stagger card reveals across 80% of the scroll (leave 20% for final reveal)
    const cardStartOffset = 0.1 + (index / totalCards) * 0.6;
    const cardEndOffset = cardStartOffset + 0.2;
    return Math.max(
      0,
      Math.min(
        1,
        (scrollProgress - cardStartOffset) / (cardEndOffset - cardStartOffset),
      ),
    );
  };

  // Header reveal progress (early in scroll)
  const headerProgress = Math.max(0, Math.min(1, scrollProgress / 0.15));

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-24 bg-background"
      style={{ clipPath: "inset(-9999px 0 0 0)" }}
    >
      {/* Background Lottie Animation - aligned with Creative section for seamless line connection.
           Width and horizontal transform match CreativeSection exactly (w-[90%], translateX(-20%)).
           This Lottie's intrinsic size is 851×2163; height is derived automatically from width (90vw).
           Top offset positions this canvas so it starts where the Creative animation canvas ends:
           Creative canvas height = 90vw * (721/851), minus 100vh for the section boundary. */}
      <div
        className="absolute w-[53%] origin-top-left z-[1]"
        style={{
          transform: `translateY(-${lottieGap}px)`,
          aspectRatio: "851 / 2163",
        }}
      >
        <DotLottieReact
          src="/images/Experience-section/experience-section-background-animation.lottie"
          autoplay={false}
          loop={false}
          dotLottieRefCallback={dotLottieRefCallback}
          renderConfig={
            {
              autoResize: true,
              fit: "contain",
              align: ["0", "0"],
            } as unknown as typeof undefined
          }
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Section Header */}
        <div className="max-w-5xl mx-auto mb-20">
          <div
            className="text-center"
            style={{
              opacity: headerProgress,
              transform: `translateY(${(1 - headerProgress) * 30}px)`,
            }}
          >
            <h2
              ref={titleRef}
              className="text-[clamp(2.5rem,8vw,5rem)] font-bold tracking-tight mb-4"
            >
              <span className="bg-gradient-to-r from-foreground via-accent to-accent-secondary bg-clip-text text-transparent">
                Experience
              </span>
            </h2>
            <p className="text-[clamp(1rem,2vw,1.25rem)] text-muted max-w-xl mx-auto leading-relaxed">
              A journey through building products that scale
            </p>
          </div>
        </div>
      </div>

      {/* Background image below title with top/bottom fade, covering the rest of the section */}
      <div
        className="absolute left-0 right-0 bottom-0 z-0 overflow-hidden"
        style={{
          top: "20rem",
          opacity: bgRevealProgress,
          transform: `scale(${1 + 0.05 * (1 - bgRevealProgress)})`,
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
        }}
      >
        <Image
          src="/images/Experience-section/experience-section-background-image.png"
          alt=""
          fill
          className="object-cover opacity-20"
          sizes="100vw"
          priority={false}
        />
      </div>

      {/* Timeline Container */}
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Experience Cards */}
        <div className="relative flex flex-col -space-y-15">
          {experiences.map((exp, index) => (
            <ExperienceCard
              key={exp.id}
              experience={exp}
              index={index}
              revealProgress={getCardRevealProgress(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
