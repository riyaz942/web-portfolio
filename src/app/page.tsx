"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import BackgroundAnimator from "@/components/BackgroundAnimator";
import CreativeSection from "@/components/CreativeSection";
import ExperienceSection from "@/components/ExperienceSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Trigger entry animation after a brief delay for smoother experience
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  }, []);

  return (
    <div className="w-full" onMouseMove={handleMouseMove}>
      {/* Hero Section */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        <BackgroundAnimator
          clientX={mousePosition.x}
          clientY={mousePosition.y}
        />
        <div className="relative z-10 flex flex-col items-center text-center px-8">
          {/* Profile Picture */}
          <div
            className="relative group mb-8"
            style={{
              transform: mounted
                ? "translateY(0) scale(1)"
                : "translateY(40px) scale(0.8)",
              opacity: mounted ? 1 : 0,
              filter: mounted ? "blur(0px)" : "blur(8px)",
              transition: "all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0ms",
            }}
          >
            <div className="absolute -inset-2 bg-gradient-to-br from-accent via-accent-secondary to-accent rounded-full opacity-60 blur-xl group-hover:opacity-90 transition-opacity duration-500" />
            <div className="relative w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden ring-4 ring-white/10 shadow-2xl">
              <Image
                src="/images/Landing-section/profile-pic.jpeg"
                alt="Riyaz Ahmed"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Name & Title */}
          <h1
            className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold tracking-tight mb-3"
            style={{
              transform: mounted ? "translateY(0)" : "translateY(30px)",
              opacity: mounted ? 1 : 0,
              filter: mounted ? "blur(0px)" : "blur(6px)",
              transition: "all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 200ms",
            }}
          >
            <span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
              Riyaz Ahmed
            </span>
          </h1>
          <p
            className="text-[clamp(1rem,2vw,1.25rem)] text-muted uppercase tracking-[0.2em] font-medium"
            style={{
              transform: mounted ? "translateY(0)" : "translateY(25px)",
              opacity: mounted ? 1 : 0,
              filter: mounted ? "blur(0px)" : "blur(4px)",
              transition: "all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 400ms",
            }}
          >
            Lead / Senior Software Developer
          </p>
        </div>
        <div
          className="absolute bottom-8 md:bottom-12 left-1/2 flex flex-col items-center gap-3 z-10"
          style={{
            transform: mounted
              ? "translateX(-50%) translateY(0)"
              : "translateX(-50%) translateY(20px)",
            opacity: mounted ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 700ms",
          }}
        >
          <span className="text-xs text-muted uppercase tracking-[0.15em]">
            Scroll to explore
          </span>
          <div className="w-px h-10 bg-gradient-to-b from-accent to-transparent animate-scroll-pulse" />
        </div>
        {/* Bottom fade overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none z-[5]" />
      </section>

      {/* Creative Section */}
      <CreativeSection />

      {/* Experience Section */}
      <ExperienceSection />

      {/* Skills Section */}
      <SkillsSection />

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}
