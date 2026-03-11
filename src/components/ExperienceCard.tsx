"use client";

import { experiences, type Experience } from "@/data/experiences";
import { clamp01 } from "@/utils/clamp";

export { experiences };

export default function ExperienceCard({
  experience,
  index,
  revealProgress,
  isMobile = false,
}: {
  experience: Experience;
  index: number;
  revealProgress: number;
  isMobile?: boolean;
}) {
  const isEven = index % 2 === 0;
  const progress = clamp01(revealProgress);
  const contentProgress = clamp01((progress - 0.3) * 1.5);
  const nodeProgress = clamp01((progress - 0.2) * 2.5);

  // On mobile, only use vertical animation (no horizontal slide)
  const translateX = isMobile ? 0 : (1 - progress) * (isEven ? -40 : 40);

  return (
    <div
      className={`relative flex items-center gap-4 md:gap-8 ${isMobile ? "flex-col" : isEven ? "flex-row" : "flex-row-reverse"}`}
      style={{
        opacity: progress,
        transform: `translateY(${(1 - progress) * 60}px) translateX(${translateX}px)`,
      }}
    >
      {/* The Card */}
      <div
        className="relative w-full md:w-[380px] group cursor-pointer flex-shrink-0 rounded-2xl p-5 md:p-6 flex flex-col gap-4"
        style={{
          background: `color-mix(in srgb, var(--color-background) ${50 * contentProgress}%, transparent)`,
          border: `1px solid rgba(255, 255, 255, ${0.08 * contentProgress})`,
          backdropFilter: `blur(${12 * contentProgress}px)`,
          WebkitBackdropFilter: `blur(${12 * contentProgress}px)`,
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

      {/* Timeline Node - hidden on mobile */}
      <div className="hidden md:block relative flex-shrink-0">
        <div
          className="w-4 h-4 rounded-full bg-accent border-2 border-background"
          style={{ transform: `scale(${nodeProgress})` }}
        />
        <div
          className="absolute inset-0 w-4 h-4 rounded-full bg-accent/50"
          style={{
            transform: `scale(${nodeProgress > 0.5 ? 1 + (nodeProgress - 0.5) * 1.6 : nodeProgress * 2})`,
            opacity: nodeProgress > 0.8 ? 1 - (nodeProgress - 0.8) * 5 : 1,
          }}
        />
      </div>

      {/* Year Label - hidden on mobile since period is shown in card */}
      <div
        className={`hidden md:block text-sm text-muted font-medium ${isEven ? "text-left" : "text-right"}`}
        style={{
          opacity: contentProgress,
          transform: `translateX(${(1 - contentProgress) * (isEven ? -20 : 20)}px)`,
          filter: `blur(${(1 - contentProgress) * 4}px)`,
          transition: "filter 0.1s ease-out",
        }}
      >
        {experience.period.split(" - ")[0]}
      </div>
    </div>
  );
}
