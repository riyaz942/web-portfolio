"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

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

// The draw transition config for "sketch" feel
const drawTransition = {
  duration: 1.2,
  ease: [0.43, 0.13, 0.23, 0.96] as const, // Custom bezier for pencil feel
};

// Single Experience Card with self-drawing effect
function ExperienceCard({
  experience,
  index,
}: {
  experience: (typeof experiences)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  const borderPath = createBorderPath(320, 280);
  const isEven = index % 2 === 0;

  return (
    <div
      ref={cardRef}
      className={`relative flex items-center gap-8 ${isEven ? "flex-row" : "flex-row-reverse"}`}
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
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
            transition={drawTransition}
            className="drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
          />

          {/* The Domain Icon */}
          <motion.path
            d={experience.iconPath}
            fill="transparent"
            stroke="url(#iconGradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ ...drawTransition, delay: 0.5 }}
            transform="translate(205, 15)"
            className="drop-shadow-[0_0_6px_rgba(167,139,250,0.5)]"
          />

          {/* Gradient definition for icon */}
          <defs>
            <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A78BFA" />
              <stop offset="100%" stopColor="#C4B5FD" />
            </linearGradient>
          </defs>
        </svg>

        {/* 2. The Content Layer (Fades in) */}
        <motion.div
          className="absolute inset-0 p-6 flex flex-col justify-between"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.6, ease: "easeOut" }}
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
        </motion.div>
      </div>

      {/* Timeline Node */}
      <div className="relative flex-shrink-0">
        <motion.div
          className="w-4 h-4 rounded-full bg-accent border-2 border-background"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.4, type: "spring" }}
        />
        <motion.div
          className="absolute inset-0 w-4 h-4 rounded-full bg-accent/50"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: [1, 1.8, 1] } : {}}
          transition={{ delay: 0.3, duration: 0.8, repeat: 0 }}
        />
      </div>

      {/* Year Label */}
      <motion.div
        className={`text-sm text-muted font-medium ${isEven ? "text-left" : "text-right"}`}
        initial={{ opacity: 0, x: isEven ? -20 : 20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        {experience.period.split(" - ")[0]}
      </motion.div>
    </div>
  );
}

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-24 px-8 bg-background overflow-hidden"
    >
      {/* Background subtle pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Section Header */}
      <div className="max-w-5xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <h2 className="text-[clamp(2.5rem,8vw,5rem)] font-bold tracking-tight mb-4">
            <span className="bg-gradient-to-r from-foreground via-accent to-accent-secondary bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
          <p className="text-[clamp(1rem,2vw,1.25rem)] text-muted max-w-xl mx-auto leading-relaxed">
            A journey through building products that scale
          </p>
        </motion.div>
      </div>

      {/* Timeline Container */}
      <div className="relative max-w-4xl mx-auto">
        {/* The Continuous Thread Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
          <motion.div
            className="w-full h-full bg-gradient-to-b from-transparent via-white/20 to-transparent"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ transformOrigin: "top" }}
          />
        </div>

        {/* Experience Cards */}
        <div className="relative flex flex-col gap-16">
          {experiences.map((exp, index) => (
            <ExperienceCard key={exp.id} experience={exp} index={index} />
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
