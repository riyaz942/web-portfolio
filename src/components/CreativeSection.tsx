"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { DotLottieReact, DotLottie } from "@lottiefiles/dotlottie-react";
import Image from "next/image";

// Micro-highlights data
const microHighlights = [
  {
    title: "Complexity Enthusiast",
    description: "The harder the problem, the more interesting it gets",
  },
  {
    title: "Craft Over Shortcuts",
    description: "Quality code that future-me would thank present-me for",
  },
  {
    title: "Always Learning",
    description: "First to explore new tech, last to leave the docs",
  },
  {
    title: "Ownership Mentality",
    description: "If it's in my codebase, it's my responsibility",
  },
];

export default function CreativeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [dotLottie, setDotLottie] = useState<DotLottie | null>(null);
  const [totalFrames, setTotalFrames] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const dotLottieRefCallback = useCallback((instance: DotLottie | null) => {
    setDotLottie(instance);
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

    // If already loaded
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
      const viewportHeight = window.innerHeight;

      // Delay start: animation begins when section top is at 20% from top of viewport
      // (i.e., after 80% of the previous section has scrolled)
      const delayThreshold = viewportHeight * 0.5;

      // Animation scroll range: use only 300vh of the 400vh section for the animation
      // This ensures the full animation plays within the scroll distance
      const animationScrollDistance = viewportHeight * 3; // 300vh for animation playback

      // Calculate scroll progress through the section
      // Animation starts when section top reaches 20% from top of viewport
      const scrollStart = delayThreshold; // When section top reaches 20% from top

      // Progress from 0 to 1 based on animation scroll distance
      const scrolled = scrollStart - sectionTop;
      const progress = Math.max(
        0,
        Math.min(1, scrolled / animationScrollDistance),
      );

      // Update scroll progress for content animations
      setScrollProgress(progress);

      // Map progress to frame number
      const frame = Math.floor(progress * (totalFrames - 1));
      dotLottie.setFrame(frame);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dotLottie, totalFrames]);

  // Calculate content animation states based on scroll progress
  // Container appears slightly before content (at 15% progress)
  const containerProgress = Math.max(
    0,
    Math.min(1, (scrollProgress - 0.15) / 0.15),
  );
  // Headline appears at 20% progress (earlier reveal)
  const headlineProgress = Math.max(
    0,
    Math.min(1, (scrollProgress - 0.2) / 0.15),
  );
  // Highlights stagger in from 35% to 65% (earlier reveal)
  const getHighlightProgress = (index: number) => {
    const startOffset = 0.35 + index * 0.075;
    return Math.max(0, Math.min(1, (scrollProgress - startOffset) / 0.1));
  };

  // Background doodle image reveals when Lottie animation is about to end (85% progress)
  const backgroundRevealProgress = Math.max(
    0,
    Math.min(1, (scrollProgress - 0.85) / 0.15),
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{ height: "400vh" }} // Extra height for scroll-through animation
    >
      {/* Sticky container for the animation and content */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        {/* Background Doodle Image - circular reveal from light bulb position */}
        <div
          className="absolute inset-0 w-full h-full z-0"
          style={{
            // Circular reveal expanding from light bulb position (approximately 15% from left, 60% from top)
            clipPath: `circle(${backgroundRevealProgress * 150}% at 15% 60%)`,
            opacity: backgroundRevealProgress > 0 ? 1 : 0,
          }}
        >
          <Image
            src="/images/Creative-section/Creative-section-background-doodle-image.svg"
            alt=""
            fill
            className="object-cover object-center"
            priority={false}
          />
        </div>

        {/* Lottie Background Animation */}
        <div
          data-id="creative-lottie"
          className="absolute w-[53%] origin-top-left z-[1]"
          style={{ aspectRatio: "851 / 721" }}
        >
          <DotLottieReact
            src="/images/Creative-section/Creative-section-background-animation.lottie"
            autoplay={false}
            loop={false}
            dotLottieRefCallback={dotLottieRefCallback}
            renderConfig={
              {
                autoResize: true,
                fit: "contain",
                align: ["0", "0"], // Align to top-left
              } as unknown as typeof undefined
            }
          />
        </div>

        {/* Bottom fade overlay - matches landing section */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none z-[5]" />

        {/* Content Layer - positioned to avoid animation overlap */}
        <div className="relative z-10 h-full flex items-center">
          {/* Content container - right side, vertically centered with flex */}
          <div
            className="absolute right-8 md:right-16 lg:right-24 max-w-[min(50%,600px)] flex flex-col justify-center gap-14 p-6 md:p-8 rounded-2xl"
            style={{
              background: `color-mix(in srgb, var(--color-background) ${50 * containerProgress}%, transparent)`,
              border: `1px solid rgba(255, 255, 255, ${0.08 * containerProgress})`,
              backdropFilter: `blur(${12 * containerProgress}px)`,
              WebkitBackdropFilter: `blur(${12 * containerProgress}px)`,
            }}
          >
            {/* Main Headline */}
            <div
              className="relative"
              style={{
                transform: `translateY(${(1 - headlineProgress) * 40}px)`,
                opacity: headlineProgress,
                filter: `blur(${(1 - headlineProgress) * 8}px)`,
                transition: "filter 0.1s ease-out",
              }}
            >
              <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-bold leading-[1.1] tracking-tight text-right">
                <span className="text-foreground">I turn complex problems</span>
                <br />
                <span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
                  into elegant solutions
                </span>
              </h2>
              <p
                className="mt-4 text-[clamp(0.9rem,1.5vw,1.15rem)] text-muted text-right leading-relaxed"
                style={{
                  opacity: Math.max(0, (headlineProgress - 0.3) / 0.7),
                  transform: `translateY(${Math.max(0, (1 - headlineProgress) * 20)}px)`,
                }}
              >
                Crafting interfaces that feel intuitive,
                <br />
                look stunning, and tell a story.
              </p>
            </div>

            {/* Micro-Highlights Grid */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4 md:gap-5">
                {microHighlights.map((highlight, index) => {
                  const progress = getHighlightProgress(index);
                  return (
                    <div
                      key={highlight.title}
                      className="group relative"
                      style={{
                        transform: `translateY(${(1 - progress) * 30}px)`,
                        opacity: progress,
                        filter: `blur(${(1 - progress) * 4}px)`,
                        transition: "filter 0.1s ease-out",
                      }}
                    >
                      {/* Subtle glow on hover */}
                      <div className="absolute -inset-2 bg-gradient-to-br from-accent/10 to-accent-secondary/10 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

                      <div className="relative p-4 md:p-5 rounded-xl bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] hover:border-white/[0.12] transition-colors duration-300">
                        {/* Animated line accent */}
                        <div
                          className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"
                          style={{
                            transform: `scaleX(${progress})`,
                            transformOrigin: "left",
                          }}
                        />

                        <h3 className="text-[clamp(0.8rem,1.2vw,0.95rem)] font-semibold text-foreground mb-1.5 tracking-wide">
                          {highlight.title}
                        </h3>
                        <p className="text-[clamp(0.7rem,1vw,0.85rem)] text-muted leading-relaxed">
                          {highlight.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
