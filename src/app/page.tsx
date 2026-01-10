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
        <div className="relative z-10 flex flex-col items-center text-center px-8 max-w-2xl">
          {/* Profile Picture - positioned above the card */}
          <div className="relative z-20 group mb-[-72px] md:mb-[-88px]">
            <div className="absolute -inset-1 bg-gradient-to-br from-accent via-accent-secondary to-accent rounded-full opacity-75 blur-md group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden ring-4 ring-background/50 shadow-2xl">
              <Image
                src="/images/profile-pic.jpeg"
                alt="Riyaz Ahmed"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* White transparent card behind bio */}
          <div className="relative bg-white/5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] backdrop-blur-[2px] rounded-3xl pt-24 md:pt-28 pb-8 px-8 shadow-xl">
            {/* Bio Content */}
            <p className="text-[clamp(1rem,2.5vw,1.35rem)] leading-relaxed text-white">
              Hi, <br />I am{" "}
              <span className="font-bold bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
                Riyaz Ahmed
              </span>
              , A Software Developer with{" "}
              <span className="font-semibold text-accent">
                {Math.floor(getYearsFromCareerStartDate())}+
              </span>{" "}
              years of Software Development experience on various Platforms,
              Passionate to build Polished, Innovative and well-detailed Apps
              with Fluid Animations to complement the Design.
            </p>
          </div>
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
        <div className="max-w-5xl w-full text-center">
          <h2 className="text-[clamp(2.5rem,8vw,6rem)] font-bold mb-8 tracking-tight">
            About
          </h2>
          <p className="text-[clamp(1.125rem,2vw,1.5rem)] text-muted max-w-xl mx-auto leading-relaxed">
            Welcome to my portfolio. I create beautiful, performant web
            experiences with attention to every detail.
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
