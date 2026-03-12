"use client";

import { useRef, useEffect, useState } from "react";
import { DotLottieReact, DotLottie } from "@lottiefiles/dotlottie-react";
import Image from "next/image";
import ExperienceCard, { experiences } from "./ExperienceCard";
import { useIsMobile } from "@/hooks/useIsMobile";
import { clamp01 } from "@/utils/clamp";
import { initLottie } from "@/utils/lottie";

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [dotLottie, setDotLottie] = useState<DotLottie | null>(null);
  const [totalFrames, setTotalFrames] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [bgRevealProgress, setBgRevealProgress] = useState(0);
  const [lottieGap, setLottieGap] = useState(0);
  const isMobile = useIsMobile();

  // Watch the gap between the Creative section Lottie bottom and ExperienceSection top on resize
  // and when the section is about to enter the viewport (desktop only)
  useEffect(() => {
    if (isMobile) return;

    const measureGap = () => {
      const creativeLottie = document.querySelector<HTMLElement>(
        '[data-id="creative-lottie"]',
      );
      const experienceContainer = sectionRef.current;
      if (!creativeLottie || !experienceContainer) return;

      const sectionPaddingTop = parseFloat(
        getComputedStyle(experienceContainer).paddingTop,
      );

      // window.scrollY cancels on both sides of the subtraction
      setLottieGap(
        experienceContainer.getBoundingClientRect().top +
        sectionPaddingTop -
        creativeLottie.getBoundingClientRect().bottom,
      );
    };

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) measureGap(); },
      { threshold: 0 },
    );

    if (titleRef.current) observer.observe(titleRef.current);

    window.addEventListener("resize", measureGap);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measureGap);
    };
  }, [isMobile]);

  useEffect(() => (dotLottie ? initLottie(dotLottie, setTotalFrames) : undefined), [dotLottie]);

  // Merged scroll handler: lottie + content progress AND background reveal
  useEffect(() => {
    if (!sectionRef.current) return;

    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const vh = window.innerHeight;

      // Background reveal: starts when section top hits viewport top, completes over 400px
      setBgRevealProgress(clamp01(-sectionTop / 400));

      // Lottie + content animations require loaded animation
      if (dotLottie && totalFrames > 0) {
        const lottieScrollStart = vh * 0.7;
        const lottieScrollEnd = -sectionHeight + vh;
        const lottieProgress = clamp01(
          (lottieScrollStart - sectionTop) / (lottieScrollStart - lottieScrollEnd),
        );
        dotLottie.setFrame(Math.floor(lottieProgress * (totalFrames - 1)));

        const contentScrollStart = vh * 0.4;
        const contentScrollEnd = -sectionHeight + vh;
        setScrollProgress(
          clamp01((contentScrollStart - sectionTop) / (contentScrollStart - contentScrollEnd)),
        );
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [dotLottie, totalFrames]);

  const getCardRevealProgress = (index: number) => {
    const totalCards = experiences.length;
    const cardStartOffset = 0.15 + (index / totalCards) * 0.5;
    const cardEndOffset = cardStartOffset + 0.15;
    return clamp01((scrollProgress - cardStartOffset) / (cardEndOffset - cardStartOffset));
  };

  const headerProgress = clamp01((scrollProgress - 0.05) / 0.15);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-12 md:py-24 bg-background"
      style={{ clipPath: "inset(-9999px -9999px 0 -9999px)" }}
    >
      {/* Background Lottie Animation - aligned with Creative section for seamless line connection.
             Width and horizontal transform match CreativeSection exactly (w-[90%], translateX(-20%)).
             This Lottie's intrinsic size is 851×2163; height is derived automatically from width (90vw).
             Top offset positions this canvas so it starts where the Creative animation canvas ends:
             Creative canvas height = 90vw * (721/851), minus 100vh for the section boundary. */}
      <div
        className="hidden md:block absolute w-[53%] origin-top-left"
        style={{
          transform: `translateY(-${lottieGap}px)`,
          aspectRatio: "851 / 2163",
        }}
      >
        <DotLottieReact
          src="/images/experience-section/background-animation.lottie"
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

      {/* Content */}
      <div className="relative z-10">
        {/* Section Header */}
        <div className="max-w-5xl mx-auto mb-20">
          <div
            className="text-center"
            style={{
              opacity: headerProgress,
              transform: `translateY(${(1 - headerProgress) * 30}px)`,
              filter: `blur(${(1 - headerProgress) * 8}px)`,
              transition: "filter 0.1s ease-out",
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
          top: isMobile ? "10rem" : "20rem",
          opacity: bgRevealProgress,
          transform: `scale(${1 + 0.05 * (1 - bgRevealProgress)})`,
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
        }}
      >
        <Image
          src="/images/experience-section/background.webp"
          alt=""
          fill
          className="object-cover opacity-20"
          sizes="100vw"
          priority={false}
        />
      </div>

      {/* Timeline Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-0">
        {/* Experience Cards */}
        <div className="relative flex flex-col gap-6 md:gap-0 md:-space-y-15">
          {experiences.map((exp, index) => (
            <ExperienceCard
              key={exp.id}
              experience={exp}
              index={index}
              revealProgress={getCardRevealProgress(index)}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
