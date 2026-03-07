"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// Experience data based on resume
export const experiences = [
  {
    id: 1,
    company: "Velotio Technologies",
    role: "Tech Lead",
    period: "2021 - Present",
    domains: ["AI/Voice", "Healthcare", "GovTech"],
    description:
      "Core contributor and pod lead on Thriveworks, a healthcare booking platform built with Next.js, serving 500K+ monthly users across 50+ US states.",
    highlights: [
      "Drove 40% increase in booking conversions through platform optimizations",
      "Built voice-first AI assistant with streaming LLMs & OpenAI Realtime APIs",
      "Led AI tool integration into SDLC, cutting development time by 30%",
    ],
  },
  {
    id: 2,
    company: "ZS Associates",
    role: "Frontend Developer",
    period: "2020 - 2021",
    domains: ["Data Viz", "Pharma"],
    description:
      "Built interactive data visualization dashboards for pharmaceutical drug complaint analysis, processing 100K+ data points with real-time filtering.",
    highlights: [
      "Engineered custom D3.js chart components with image export & CSV download",
      "Achieved 95+ Lighthouse scores through responsive design & perf optimizations",
    ],
  },
  {
    id: 3,
    company: "Nykaa",
    role: "Frontend Developer",
    period: "2019",
    domains: ["E-commerce", "AR/VR"],
    description:
      "Contributed to India's leading beauty e-commerce platform serving 3M+ monthly active users with performance-optimized experiences.",
    highlights: [
      "Redesigned mobile sign-in/sign-up flow using React Context API & state machines",
      "Implemented AR makeup try-on via Modi-face SDK with Firebase-based staged rollout",
    ],
  },
  {
    id: 4,
    company: "Tailored Tech",
    role: "Fullstack Developer",
    period: "2016 - 2019",
    domains: ["IoT", "Mobile", "Desktop"],
    description:
      "Built cross-platform products spanning desktop, mobile, and IoT — from concept to production and live showcases.",
    highlights: [
      "Developed Bijli collaboration platform (React, Electron) — showcased at TechCrunch 2018",
      "Created IoT health app with BLE smart-scale integration, serving 5K+ users",
      "Shipped 2 React Native apps to production — food delivery & NGO management",
    ],
  },
];

export type Experience = (typeof experiences)[0];

export default function ExperienceCard({
  experience,
  index,
  revealProgress,
}: {
  experience: Experience;
  index: number;
  revealProgress: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-80px" });

  const isEven = index % 2 === 0;

  const progress = Math.max(0, Math.min(1, revealProgress));

  const contentProgress = Math.max(0, Math.min(1, (progress - 0.3) * 1.5));
  const nodeProgress = Math.max(0, Math.min(1, (progress - 0.2) * 2.5));

  const entranceDelay = index * 0.15;

  return (
    <motion.div
      ref={cardRef}
      className={`relative flex items-center gap-8 ${isEven ? "flex-row" : "flex-row-reverse"}`}
      initial={{ opacity: 0, y: 60, x: isEven ? -40 : 40 }}
      animate={
        isInView
          ? { opacity: progress > 0 ? 1 : 0, y: 0, x: 0 }
          : { opacity: 0, y: 60, x: isEven ? -40 : 40 }
      }
      transition={{
        duration: 0.7,
        delay: entranceDelay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {/* The Card */}
      <div
        className="relative w-[380px] group cursor-pointer flex-shrink-0 rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-6 flex flex-col gap-4"
        style={{
          opacity: contentProgress,
          transform: `translateY(${(1 - contentProgress) * 15}px)`,
        }}
      >
        <div>
          <span className="text-xs text-muted uppercase tracking-[0.2em] font-medium">
            {experience.period}
          </span>

          <h3 className="text-xl font-bold text-foreground mt-2 leading-tight">
            {experience.company}
          </h3>
          <p className="text-sm text-accent font-medium mt-1">
            {experience.role}
          </p>

          <p className="text-sm text-muted mt-3 leading-relaxed line-clamp-2">
            {experience.description}
          </p>

          {experience.highlights && (
            <ul className="mt-3 space-y-1.5">
              {experience.highlights.map((highlight, i) => (
                <li
                  key={i}
                  className="text-xs text-muted/80 leading-relaxed flex items-start gap-2"
                >
                  <span className="text-accent mt-0.5 text-[6px] shrink-0">
                    ●
                  </span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

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
    </motion.div>
  );
}
