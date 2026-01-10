"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import BackgroundAnimator from "@/components/BackgroundAnimator";

function getYearsFromCareerStartDate() {
  const careerStartDate = "2016-05-01T00:00:00";
  const startDate = new Date(careerStartDate);
  const currentDate = new Date();
  const diffInMs = currentDate.getTime() - startDate.getTime();
  const msPerYear = 1000 * 60 * 60 * 24 * 365.25;
  const diffInYears = diffInMs / msPerYear;
  return parseFloat(diffInYears.toFixed(2));
}

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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
          <div className="relative group mb-8">
            <div className="absolute -inset-2 bg-gradient-to-br from-accent via-accent-secondary to-accent rounded-full opacity-60 blur-xl group-hover:opacity-90 transition-opacity duration-500" />
            <div className="relative w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden ring-4 ring-white/10 shadow-2xl">
              <Image
                src="/images/profile-pic.jpeg"
                alt="Riyaz Ahmed"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Name & Title */}
          <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold tracking-tight mb-3">
            <span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
              Riyaz Ahmed
            </span>
          </h1>
          <p className="text-[clamp(1rem,2vw,1.25rem)] text-muted uppercase tracking-[0.2em] font-medium">
            Lead / Senior Software Developer
          </p>
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10">
          <span className="text-xs text-muted uppercase tracking-[0.15em]">
            Scroll to explore
          </span>
          <div className="w-px h-10 bg-gradient-to-b from-accent to-transparent animate-scroll-pulse" />
        </div>
        {/* Bottom fade overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none z-[5]" />
      </section>

      {/* About Section */}
      <section className="min-h-screen flex items-center justify-center py-24 px-8 relative bg-gradient-to-b from-background to-[#111111]">
        <div className="max-w-4xl w-full flex flex-col items-center">
          <h2 className="text-[clamp(2.5rem,8vw,5rem)] font-bold mb-12 tracking-tight text-center">
            About
          </h2>

          {/* Bio Card */}
          <div className="relative bg-white/5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] backdrop-blur-sm rounded-3xl py-10 px-8 md:px-12 shadow-xl max-w-2xl">
            <p className="text-[clamp(1.1rem,2.5vw,1.4rem)] leading-relaxed text-[#d1d1d1] text-center">
              A Software Developer with{" "}
              <span className="font-semibold text-accent">
                {Math.floor(getYearsFromCareerStartDate())}+
              </span>{" "}
              years of experience on various platforms. Passionate about
              building polished, innovative, and well-detailed apps with fluid
              animations to complement the design.
            </p>
          </div>

          {/* Additional About Content */}
          <p className="text-[clamp(1rem,2vw,1.25rem)] text-muted max-w-xl mx-auto leading-relaxed mt-10 text-center">
            I create beautiful, performant web experiences with attention to
            every detail.
          </p>
        </div>
      </section>

      {/* Work Section */}
      <section className="min-h-screen flex items-center justify-center py-24 px-8 relative bg-[#111111]">
        <div className="max-w-5xl w-full text-center">
          <h2 className="text-[clamp(2.5rem,8vw,6rem)] font-bold mb-8 tracking-tight">
            Work
          </h2>
          <p className="text-[clamp(1.125rem,2vw,1.5rem)] text-muted max-w-xl mx-auto leading-relaxed">
            A collection of projects that showcase my skills and passion for
            development.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="min-h-screen flex items-center justify-center py-24 px-8 relative bg-gradient-to-b from-[#111111] to-background">
        <div className="max-w-5xl w-full text-center">
          <h2 className="text-[clamp(2.5rem,8vw,6rem)] font-bold mb-8 tracking-tight">
            Contact
          </h2>
          <p className="text-[clamp(1.125rem,2vw,1.5rem)] text-muted max-w-xl mx-auto leading-relaxed">
            Let&apos;s create something amazing together.
          </p>
        </div>
      </section>
    </div>
  );
}
