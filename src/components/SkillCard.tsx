"use client";

import { motion } from "framer-motion";

export const skillCategories = [
  {
    id: 1,
    category: "Languages",
    description: "Core programming languages",
    skills: ["JavaScript", "TypeScript", "Python", "Dart", "SQL"],
    iconPath:
      "M28 35 L18 50 L28 65 M72 35 L82 50 L72 65 M55 25 L45 75",
    color: "#64ffda",
  },
  {
    id: 2,
    category: "Frontend",
    description: "UI frameworks & libraries",
    skills: ["React", "Next.js", "Vue.js", "Tailwind CSS", "D3.js"],
    iconPath:
      "M20 25 L80 25 L80 75 L20 75 Z M20 35 L80 35 M30 45 L55 45 M30 55 L45 55",
    color: "#7b61ff",
  },
  {
    id: 3,
    category: "Backend & APIs",
    description: "Server-side & databases",
    skills: ["Node.js", "Express", "FastAPI", "GraphQL", "PostgreSQL"],
    iconPath:
      "M30 22 C30 17 70 17 70 22 L70 40 C70 45 30 45 30 40 Z M30 48 C30 43 70 43 70 48 L70 66 C70 71 30 71 30 66 Z",
    color: "#64ffda",
  },
  {
    id: 4,
    category: "Mobile",
    description: "Cross-platform development",
    skills: ["React Native", "Flutter", "iOS", "Android", "BLE/IoT"],
    iconPath:
      "M37 15 L63 15 L67 85 L33 85 Z M37 22 L63 22 M37 75 L63 75 M47 79 L53 79",
    color: "#7b61ff",
  },
  {
    id: 5,
    category: "Cloud & DevOps",
    description: "Infrastructure & deployment",
    skills: ["AWS", "Docker", "CI/CD", "Kubernetes", "Git"],
    iconPath:
      "M28 55 C18 55 18 42 28 38 C30 28 42 22 52 28 C58 22 72 28 75 38 C82 40 82 52 75 55 Z M35 62 L35 72 M50 62 L50 77 M65 62 L65 70",
    color: "#64ffda",
  },
  {
    id: 6,
    category: "AI & Specialties",
    description: "Emerging technologies",
    skills: ["LLMs", "Streaming AI", "AR/VR", "Real-time Systems", "Voice AI"],
    iconPath:
      "M50 15 L38 45 L55 42 L43 85 M60 30 A18 18 0 0 1 55 68 M40 30 A18 18 0 0 0 45 68",
    color: "#7b61ff",
  },
];

export type SkillCategory = (typeof skillCategories)[0];

export default function SkillCard({
  category,
  revealProgress,
}: {
  category: SkillCategory;
  revealProgress: number;
}) {
  const progress = Math.max(0, Math.min(1, revealProgress));

  const iconProgress = Math.max(0, Math.min(1, progress * 2));
  const contentProgress = Math.max(0, Math.min(1, (progress - 0.3) * 1.8));
  const tagProgress = Math.max(0, Math.min(1, (progress - 0.5) * 2));

  return (
    <div
      className="group relative"
      style={{
        transform: `translateY(${(1 - progress) * 30}px)`,
        opacity: progress,
        filter: `blur(${(1 - progress) * 4}px)`,
        transition: "filter 0.1s ease-out",
      }}
    >
      {/* Hover glow */}
      <div className="absolute -inset-2 bg-gradient-to-br from-accent/10 to-accent-secondary/10 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

      <div className="relative p-5 md:p-6 rounded-2xl bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300 overflow-hidden">
        {/* Animated accent line */}
        <div
          className="absolute top-0 left-6 right-6 h-px"
          style={{
            background: `linear-gradient(to right, transparent, ${category.color}80, transparent)`,
            transform: `scaleX(${progress})`,
            transformOrigin: "left",
          }}
        />

        {/* Icon + Title */}
        <div
          className="flex items-start gap-4 mb-4"
          style={{
            opacity: contentProgress,
            transform: `translateY(${(1 - contentProgress) * 10}px)`,
          }}
        >
          <div className="flex-shrink-0 w-11 h-11">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <motion.path
                d={category.iconPath}
                fill="transparent"
                stroke={category.color}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  pathLength: iconProgress,
                  opacity: iconProgress,
                }}
              />
            </svg>
          </div>

          <div>
            <h3 className="text-[clamp(0.85rem,1.2vw,1rem)] font-semibold text-foreground tracking-wide">
              {category.category}
            </h3>
            <p className="text-[clamp(0.7rem,0.9vw,0.8rem)] text-muted mt-0.5">
              {category.description}
            </p>
          </div>
        </div>

        {/* Skill Tags */}
        <div
          className="flex flex-wrap gap-2"
          style={{
            opacity: tagProgress,
            transform: `translateY(${(1 - tagProgress) * 10}px)`,
          }}
        >
          {category.skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1.5 text-xs font-medium rounded-full border transition-colors duration-300"
              style={{
                color: category.color,
                backgroundColor: `${category.color}10`,
                borderColor: `${category.color}20`,
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
