"use client";

import { motion } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import { DotLottieReact, DotLottie } from "@lottiefiles/dotlottie-react";

// Experience data based on resume
const experiences = [
  {
    id: 1,
    company: "Velotio Technologies",
    role: "Tech Lead",
    period: "2021 - Present",
    domains: ["AI/Voice", "Healthcare", "GovTech"],
    description:
      "Leading development of healthcare booking platform serving 500K+ monthly users. Built voice-first AI assistant with streaming LLMs.",
    iconPath:
      "M60 30 C60 25, 55 20, 50 20 C45 20, 40 25, 40 30 C40 35, 45 40, 50 45 C55 40, 60 35, 60 30 M50 45 L50 70 M40 55 L60 55 M45 70 L55 70",
  },
  {
    id: 2,
    company: "ZS Associates",
    role: "Frontend Developer",
    period: "2020 - 2021",
    domains: ["Data Analytics", "Pharma"],
    description:
      "Built interactive data visualization dashboards with D3.js, processing 100K+ data points with real-time filtering.",
    iconPath:
      "M30 70 L30 40 L45 50 L45 30 L60 45 L60 25 L75 35 M25 70 L80 70",
  },
  {
    id: 3,
    company: "Nykaa",
    role: "Frontend Developer",
    period: "2019",
    domains: ["E-commerce", "AR/VR"],
    description:
      "Redesigned mobile sign-in flow for 3M+ users. Implemented AR makeup try-on feature using Modi-face SDK.",
    iconPath:
      "M50 25 L70 45 L70 75 L30 75 L30 45 Z M40 55 L40 75 M60 55 L60 75 M45 45 L55 45",
  },
  {
    id: 4,
    company: "Tailored Tech",
    role: "Fullstack Developer",
    period: "2016 - 2019",
    domains: ["IoT", "Mobile", "Desktop"],
    description:
      "Built IoT health app with BLE integration. Developed Bijli collaboration platform showcased at TechCrunch 2018.",
    iconPath:
      "M50 20 L50 35 M40 27 L60 27 M35 40 L65 40 L60 55 L65 55 L50 80 L50 60 L40 60 L50 80 L35 55 L40 55 Z",
  },
];

// Hand-drawn style border path for cards
const createBorderPath = (width: number, height: number) => {
  const w = width - 20;
  const h = height - 20;
  return `M15 15
    Q${w * 0.25} 12, ${w * 0.5} 15
    Q${w * 0.75} 18, ${w} 15
    Q${w + 5} ${h * 0.25}, ${w} ${h * 0.5}
    Q${w - 3} ${h * 0.75}, ${w} ${h}
    Q${w * 0.75} ${h + 3}, ${w * 0.5} ${h}
    Q${w * 0.25} ${h - 2}, 15 ${h}
    Q12 ${h * 0.75}, 15 ${h * 0.5}
    Q18 ${h * 0.25}, 15 15 Z`;
};

// Single Experience Card with scroll-driven reveal
function ExperienceCard({
  experience,
  index,
  revealProgress,
}: {
  experience: (typeof experiences)[0];
  index: number;
  revealProgress: number;
}) {
  const borderPath = createBorderPath(320, 280);
  const isEven = index % 2 === 0;

  // Clamp progress between 0 and 1
  const progress = Math.max(0, Math.min(1, revealProgress));

  // Stagger different elements
  const borderProgress = Math.max(0, Math.min(1, progress * 2)); // Border draws faster
  const iconProgress = Math.max(0, Math.min(1, (progress - 0.3) * 2)); // Icon starts after border
  const contentProgress = Math.max(0, Math.min(1, (progress - 0.5) * 2)); // Content fades in last
  const nodeProgress = Math.max(0, Math.min(1, (progress - 0.2) * 2.5)); // Node appears mid-way

  return (
    <div
      className={`relative flex items-center gap-8 ${isEven ? "flex-row" : "flex-row-reverse"}`}
      style={{
        opacity: progress > 0 ? 1 : 0,
      }}
    >
      {/* The Card */}
      <div className="relative w-[320px] h-[280px] group cursor-pointer flex-shrink-0">
        {/* 1. The Drawing Layer (SVG) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
          viewBox="0 0 320 280"
        >
          {/* The Card Border */}
          <motion.path
            d={borderPath}
            fill="transparent"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              pathLength: borderProgress,
              opacity: borderProgress,
            }}
            className="drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
          />

          {/* The Domain Icon */}
          <motion.path
            d={experience.iconPath}
            fill="transparent"
            stroke={`url(#iconGradient-${experience.id})`}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              pathLength: iconProgress,
              opacity: iconProgress,
            }}
            transform="translate(205, 15)"
            className="drop-shadow-[0_0_6px_rgba(167,139,250,0.5)]"
          />

          {/* Gradient definition for icon - unique ID per card */}
          <defs>
            <linearGradient id={`iconGradient-${experience.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A78BFA" />
              <stop offset="100%" stopColor="#C4B5FD" />
            </linearGradient>
          </defs>
        </svg>

        {/* 2. The Content Layer (Fades in) */}
        <div
          className="absolute inset-0 p-6 flex flex-col justify-between"
          style={{
            opacity: contentProgress,
            transform: `translateY(${(1 - contentProgress) * 15}px)`,
          }}
        >
          {/* Glassmorphism Background */}
          <div className="absolute inset-[10px] bg-white/[0.03] rounded-2xl -z-10 backdrop-blur-sm" />

          {/* Top Content */}
          <div>
            {/* Period */}
            <span className="text-xs text-muted uppercase tracking-[0.2em] font-medium">
              {experience.period}
            </span>

            {/* Company & Role */}
            <h3 className="text-xl font-bold text-foreground mt-2 leading-tight">
              {experience.company}
            </h3>
            <p className="text-sm text-accent font-medium mt-1">{experience.role}</p>

            {/* Description */}
            <p className="text-sm text-muted mt-3 leading-relaxed line-clamp-3">
              {experience.description}
            </p>
          </div>

          {/* Bottom Content */}
          <div>
            {/* Domain Tags */}
            <div className="flex flex-wrap gap-2">
              {experience.domains.map((domain) => (
                <span
                  key={domain}
                  className="px-2.5 py-1 text-xs font-medium text-accent-secondary bg-accent/10 rounded-full border border-accent/20"
                >
                  {domain}
                </span>
              ))}
            </div>

            {/* Apple-style hover reveal */}
            <div className="mt-4 flex items-center text-xs font-semibold text-purple-300 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              View Details <span className="ml-2">→</span>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Node */}
      <div className="relative flex-shrink-0">
        <div
          className="w-4 h-4 rounded-full bg-accent border-2 border-background"
          style={{
            transform: `scale(${nodeProgress})`,
          }}
        />
        <div
          className="absolute inset-0 w-4 h-4 rounded-full bg-accent/50"
          style={{
            transform: `scale(${nodeProgress > 0.5 ? 1 + (nodeProgress - 0.5) * 1.6 : nodeProgress * 2})`,
            opacity: nodeProgress > 0.8 ? 1 - (nodeProgress - 0.8) * 5 : 1,
          }}
        />
      </div>

      {/* Year Label */}
      <div
        className={`text-sm text-muted font-medium ${isEven ? "text-left" : "text-right"}`}
        style={{
          opacity: contentProgress,
          transform: `translateX(${(1 - contentProgress) * (isEven ? -20 : 20)}px)`,
        }}
      >
        {experience.period.split(" - ")[0]}
      </div>
    </div>
  );
}

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [dotLottie, setDotLottie] = useState<DotLottie | null>(null);
  const [totalFrames, setTotalFrames] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);

  const dotLottieRefCallback = useCallback((instance: DotLottie | null) => {
    setDotLottie(instance);
  }, []);

  // Measure content height for dynamic animation sizing
  useEffect(() => {
    if (!contentRef.current) return;

    const updateHeight = () => {
      if (contentRef.current) {
        setContentHeight(contentRef.current.offsetHeight);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);

    return () => window.removeEventListener("resize", updateHeight);
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
      const scrollStart = viewportHeight * 0.3; // Start when section is 30% into viewport
      const scrollEnd = -sectionHeight + viewportHeight * 0.7; // End when 70% of section has scrolled

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

  // Calculate reveal progress for each experience card
  // Cards reveal progressively as scroll progresses
  const getCardRevealProgress = (index: number) => {
    const totalCards = experiences.length;
    // Stagger card reveals across 80% of the scroll (leave 20% for final reveal)
    const cardStartOffset = 0.1 + (index / totalCards) * 0.6;
    const cardEndOffset = cardStartOffset + 0.2;
    return Math.max(0, Math.min(1, (scrollProgress - cardStartOffset) / (cardEndOffset - cardStartOffset)));
  };

  // Header reveal progress (early in scroll)
  const headerProgress = Math.max(0, Math.min(1, scrollProgress / 0.15));

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-24 px-8 bg-background overflow-hidden"
    >
      {/* Background Lottie Animation - same width logic as CreativeSection */}
      <div
        className="absolute w-[90%] origin-top-left z-0 pointer-events-none"
        style={{
          transform: "translateX(-20%)",
          height: contentHeight > 0 ? `${contentHeight + 200}px` : "100%",
        }}
      >
        <DotLottieReact
          src="/images/Experience-section/experience-section-background-animation.lottie"
          autoplay={false}
          loop={false}
          dotLottieRefCallback={dotLottieRefCallback}
          renderConfig={{
            fit: "contain",
            align: ["0", "0"],
          } as unknown as typeof undefined}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </div>

      {/* Background subtle pattern */}
      <div className="absolute inset-0 opacity-[0.02] z-0">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Content container for measuring height */}
      <div ref={contentRef} className="relative z-10">
        {/* Section Header */}
        <div className="max-w-5xl mx-auto mb-20">
          <div
            className="text-center"
            style={{
              opacity: headerProgress,
              transform: `translateY(${(1 - headerProgress) * 30}px)`,
            }}
          >
            <h2 className="text-[clamp(2.5rem,8vw,5rem)] font-bold tracking-tight mb-4">
              <span className="bg-gradient-to-r from-foreground via-accent to-accent-secondary bg-clip-text text-transparent">
                Experience
              </span>
            </h2>
            <p className="text-[clamp(1rem,2vw,1.25rem)] text-muted max-w-xl mx-auto leading-relaxed">
              A journey through building products that scale
            </p>
          </div>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Experience Cards */}
          <div className="relative flex flex-col gap-16">
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
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-20" />
    </section>
  );
}
