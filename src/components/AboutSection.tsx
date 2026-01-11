"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { useParallax } from "@/hooks/useScrollAnimation";

function getYearsFromCareerStartDate() {
  const careerStartDate = "2016-05-01T00:00:00";
  const startDate = new Date(careerStartDate);
  const currentDate = new Date();
  const diffInMs = currentDate.getTime() - startDate.getTime();
  const msPerYear = 1000 * 60 * 60 * 24 * 365.25;
  const diffInYears = diffInMs / msPerYear;
  return parseFloat(diffInYears.toFixed(2));
}

const stats = [
  {
    value: `${Math.floor(getYearsFromCareerStartDate())}+`,
    label: "Years Experience",
    staggerIndex: 0,
  },
  { value: "50+", label: "Projects Completed", staggerIndex: 1 },
  { value: "10+", label: "Happy Clients", staggerIndex: 2 },
];

// Easing functions
const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);
const easeOutBack = (t: number): number => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};
const easeOutExpo = (t: number): number =>
  t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

interface StatCardProps {
  value: string;
  label: string;
  staggerIndex: number;
  progress: number;
}

function StatCard({ value, label, staggerIndex, progress }: StatCardProps) {
  // Stats appear during 10-50% of scroll with staggered delays
  const staggerDelay = staggerIndex * 0.08;
  const cardProgress = Math.max(
    0,
    Math.min((progress - 0.1 - staggerDelay) / 0.35, 1)
  );

  const scale = 0.8 + easeOutBack(cardProgress) * 0.2;
  const translateY = (1 - easeOutCubic(cardProgress)) * 80;
  const opacity = easeOutCubic(cardProgress);
  const rotateX = (1 - cardProgress) * 15;

  return (
    <div
      className="group relative"
      style={{
        transform: `translateY(${translateY}px) scale(${scale}) perspective(1000px) rotateX(${rotateX}deg)`,
        opacity,
        willChange: "transform, opacity",
      }}
    >
      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-br from-accent/30 to-accent-secondary/30 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 text-center overflow-hidden">
        {/* Animated border shine */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              "linear-gradient(135deg, transparent 40%, rgba(100, 255, 218, 0.1) 50%, transparent 60%)",
            animation: cardProgress > 0.5 ? "shine 3s ease-in-out infinite" : "none",
          }}
        />

        {/* Counter animation effect */}
        <span
          className="block text-[clamp(2.5rem,5vw,4rem)] font-bold bg-gradient-to-br from-accent via-accent-secondary to-accent bg-clip-text text-transparent"
          style={{
            transform: `scale(${0.9 + easeOutBack(cardProgress) * 0.1})`,
          }}
        >
          {value}
        </span>
        <span
          className="block text-sm md:text-base text-muted uppercase tracking-[0.15em] mt-2"
          style={{
            opacity: Math.min(cardProgress * 1.5, 1),
            transform: `translateY(${(1 - cardProgress) * 10}px)`,
          }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}

interface BioCardProps {
  progress: number;
}

function BioCard({ progress }: BioCardProps) {
  // Bio appears during 40-80% of scroll
  const bioProgress = Math.max(0, Math.min((progress - 0.4) / 0.4, 1));
  const para1Progress = Math.max(0, Math.min((progress - 0.45) / 0.35, 1));
  const para2Progress = Math.max(0, Math.min((progress - 0.55) / 0.35, 1));

  const cardScale = 0.95 + easeOutCubic(bioProgress) * 0.05;
  const cardTranslateY = (1 - easeOutExpo(bioProgress)) * 60;
  const cardOpacity = easeOutCubic(bioProgress);

  return (
    <div
      className="relative group"
      style={{
        transform: `translateY(${cardTranslateY}px) scale(${cardScale})`,
        opacity: cardOpacity,
        willChange: "transform, opacity",
      }}
    >
      {/* Card glow - intensifies with scroll */}
      <div
        className="absolute -inset-1 bg-gradient-to-r from-accent/20 via-accent-secondary/20 to-accent/20 rounded-3xl blur-xl transition-opacity duration-500"
        style={{
          opacity: 0.3 + bioProgress * 0.45,
        }}
      />

      <div className="relative bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-3xl p-10 md:p-14 overflow-hidden">
        {/* Decorative corner accents - animate in */}
        <div
          className="absolute top-0 left-0 border-l-2 border-t-2 border-accent/30 rounded-tl-3xl transition-all duration-700"
          style={{
            width: `${20 + bioProgress * 60}px`,
            height: `${20 + bioProgress * 60}px`,
            opacity: bioProgress,
          }}
        />
        <div
          className="absolute bottom-0 right-0 border-r-2 border-b-2 border-accent-secondary/30 rounded-br-3xl transition-all duration-700"
          style={{
            width: `${20 + bioProgress * 60}px`,
            height: `${20 + bioProgress * 60}px`,
            opacity: bioProgress,
          }}
        />

        {/* Quote mark - fade and slide */}
        <div
          className="absolute top-6 left-8 text-6xl text-accent/20 font-serif"
          style={{
            opacity: bioProgress * 0.2,
            transform: `translateX(${(1 - bioProgress) * -20}px)`,
          }}
        >
          "
        </div>

        <div className="relative z-10">
          <p
            className="text-[clamp(1.15rem,2.5vw,1.5rem)] leading-[1.8] text-[#d1d1d1] text-center max-w-3xl mx-auto"
            style={{
              transform: `translateY(${(1 - easeOutCubic(para1Progress)) * 30}px)`,
              opacity: easeOutCubic(para1Progress),
            }}
          >
            I'm a{" "}
            <span className="text-accent font-semibold">Software Developer</span>{" "}
            with a passion for building polished, innovative, and well-detailed
            applications. With experience across{" "}
            <span className="text-accent-secondary font-semibold">
              web, mobile, and cross-platform
            </span>{" "}
            development, I focus on creating fluid animations and seamless user
            experiences that complement thoughtful design.
          </p>

          <p
            className="text-[clamp(1rem,2vw,1.25rem)] leading-relaxed text-muted text-center max-w-2xl mx-auto mt-8"
            style={{
              transform: `translateY(${(1 - easeOutCubic(para2Progress)) * 30}px)`,
              opacity: easeOutCubic(para2Progress),
            }}
          >
            Every pixel matters. Every interaction counts. I craft digital
            experiences that leave lasting impressions.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { ref: parallaxRef, offset } = useParallax(0.15);

  // Handle scroll - track progress through the section
  const handleScroll = useCallback(() => {
    if (!sectionRef.current) return;

    const rect = sectionRef.current.getBoundingClientRect();
    const sectionHeight = rect.height;
    const viewportHeight = window.innerHeight;

    // Calculate scroll progress through the section
    const scrollTop = -rect.top;
    const totalScrollable = sectionHeight - viewportHeight;

    // Clamp between 0 and 1
    const progress = Math.max(0, Math.min(scrollTop / totalScrollable, 1));
    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  // Title animation - appears during 0-30% of scroll
  const titleProgress = Math.min(scrollProgress / 0.3, 1);
  const titleOpacity = easeOutCubic(titleProgress);
  const titleTranslateY = (1 - easeOutCubic(titleProgress)) * 50;
  const underlineWidth = easeOutExpo(Math.max(0, (titleProgress - 0.3) / 0.7)) * 120;

  // Scroll indicator fades out as user scrolls
  const scrollIndicatorOpacity = Math.max(0, 1 - scrollProgress * 4);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{
        // Taller section for scroll-driven animations
        height: "250vh",
        background:
          "linear-gradient(180deg, var(--color-background) 0%, #0a0a0a 30%, #0f0f0f 70%, #111111 100%)",
      }}
    >
      {/* Sticky container - stays in view while scrolling through section */}
      <div className="sticky top-0 min-h-screen w-full overflow-hidden py-16 px-8 flex items-center">
        {/* Decorative elements with parallax */}
        <div
          ref={parallaxRef}
          className="absolute inset-0 pointer-events-none"
          style={{ transform: `translateY(${offset}px)` }}
        >
          {/* Floating orbs - pulse based on scroll */}
          <div
            className="absolute top-1/4 left-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl"
            style={{
              transform: `scale(${1 + scrollProgress * 0.3})`,
              opacity: 0.5 + scrollProgress * 0.3,
            }}
          />
          <div
            className="absolute bottom-1/4 right-10 w-80 h-80 bg-accent-secondary/5 rounded-full blur-3xl"
            style={{
              transform: `scale(${1 + scrollProgress * 0.2})`,
              opacity: 0.5 + scrollProgress * 0.25,
            }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-accent/3 to-accent-secondary/3 rounded-full blur-3xl"
            style={{
              transform: `translate(-50%, -50%) scale(${1 + scrollProgress * 0.4})`,
              opacity: 0.4 + scrollProgress * 0.3,
            }}
          />
        </div>

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        <div ref={contentRef} className="max-w-6xl mx-auto relative z-10 w-full">
          {/* Section Title */}
          <div
            className="text-center mb-16"
            style={{
              transform: `translateY(${titleTranslateY}px)`,
              opacity: titleOpacity,
              willChange: "transform, opacity",
            }}
          >
            <span
              className="inline-block text-accent text-sm uppercase tracking-[0.3em] mb-4 font-medium"
              style={{
                opacity: Math.min(titleProgress * 2, 1),
                transform: `translateY(${(1 - titleProgress) * 20}px)`,
              }}
            >
              Get to know me
            </span>
            <h2 className="text-[clamp(3rem,10vw,6rem)] font-bold tracking-tighter">
              <span
                className="inline-block bg-gradient-to-r from-foreground via-foreground to-muted bg-clip-text text-transparent"
                style={{
                  transform: `scale(${0.9 + titleProgress * 0.1})`,
                }}
              >
                About
              </span>
            </h2>
            {/* Animated underline */}
            <div
              className="mx-auto mt-6 h-1 bg-gradient-to-r from-accent via-accent-secondary to-accent rounded-full"
              style={{
                width: `${underlineWidth}px`,
                opacity: titleProgress > 0.3 ? 1 : 0,
              }}
            />
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} progress={scrollProgress} />
            ))}
          </div>

          {/* Bio Card */}
          <BioCard progress={scrollProgress} />
        </div>

        {/* Scroll indicator */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{
            opacity: scrollIndicatorOpacity,
            zIndex: 20,
          }}
        >
          <span className="text-xs text-muted uppercase tracking-[0.15em]">
            Scroll to explore
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-accent to-transparent animate-scroll-pulse" />
        </div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[var(--color-background)] to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#111111] to-transparent" />
        </div>
      </div>
    </section>
  );
}
