"use client";

import { useState, useCallback } from "react";
import BackgroundAnimator from "@/components/BackgroundAnimator";

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
        <div className="relative z-10 text-center px-8">
          <h1 className="text-[clamp(3rem,12vw,10rem)] font-extrabold leading-[0.95] tracking-tight mb-6">
            <span className="block">Creative</span>
            <span className="block bg-gradient-to-br from-accent to-accent-secondary bg-clip-text text-transparent">
              Developer
            </span>
          </h1>
          <p className="text-[clamp(1rem,2.5vw,1.5rem)] text-muted font-normal tracking-wider uppercase">
            Crafting digital experiences that inspire
          </p>
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10">
          <span className="text-xs text-muted uppercase tracking-[0.15em]">
            Scroll to explore
          </span>
          <div className="w-px h-10 bg-gradient-to-b from-accent to-transparent animate-scroll-pulse" />
        </div>
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
