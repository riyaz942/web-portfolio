"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { DotLottieReact, DotLottie } from "@lottiefiles/dotlottie-react";

// Micro-highlights data
const microHighlights = [
  {
    title: "Scroll-Driven Storytelling",
    description: "Apple-like minimalism with purposeful motion",
  },
  {
    title: "Micro-Interactions",
    description: "Thoughtful easing & responsive feedback systems",
  },
  {
    title: "Depth & Motion",
    description: "Parallax layering that breathes life into interfaces",
  },
  {
    title: "3D Exploration",
    description: "Three.js experiments pushing creative boundaries",
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

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{ height: "400vh" }} // Extra height for scroll-through animation
    >
      {/* Sticky container for the animation and content */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        {/* Lottie Background Animation */}
        <div
          className="absolute w-[90%] origin-top-left z-0"
          style={{ transform: "translateX(-20%)" }}
        >
          <div className="relative">
            <DotLottieReact
              src="/images/Creative-section/Creative-section-background-animation.lottie"
              autoplay={false}
              loop={false}
              dotLottieRefCallback={dotLottieRefCallback}
              renderConfig={{
                fit: "contain",
                align: ["0", "0"], // Align to top-left
              }}
              style={{
                width: "100%",
                height: "auto",
              }}
            />
            {/* Watermark cover - hides Lottie watermark in bottom-right */}
            <div
              className="absolute bottom-0 right-0 z-10 bg-background"
              style={{ width: "200px", height: "60px" }}
            />
          </div>
        </div>

        {/* Content Layer - positioned to avoid animation overlap */}
        <div className="relative z-10 h-full flex items-center">
          {/* Content container - right side, vertically centered with flex */}
          <div
            className="absolute right-8 md:right-16 lg:right-24 flex flex-col justify-center gap-12"
            style={{ maxWidth: "min(45%, 500px)" }}
          >
            {/* Main Headline */}
            <div
              style={{
                transform: `translateY(${(1 - headlineProgress) * 40}px)`,
                opacity: headlineProgress,
                filter: `blur(${(1 - headlineProgress) * 8}px)`,
                transition: "filter 0.1s ease-out",
              }}
            >
              <h2 className="text-[clamp(1.5rem,3.5vw,2.5rem)] font-bold leading-[1.1] tracking-tight text-right">
                <span className="text-foreground">I turn complex problems</span>
                <br />
                <span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
                  into elegant solutions
                </span>
              </h2>
              <p
                className="mt-3 text-[clamp(0.8rem,1.3vw,1rem)] text-muted text-right leading-relaxed"
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
            <div>
              <div className="grid grid-cols-2 gap-3 md:gap-4">
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

                      <div className="relative p-3 md:p-4 rounded-xl bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] hover:border-white/[0.12] transition-colors duration-300">
                        {/* Animated line accent */}
                        <div
                          className="absolute top-0 left-3 right-3 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"
                          style={{
                            transform: `scaleX(${progress})`,
                            transformOrigin: "left",
                          }}
                        />

                        <h3 className="text-[clamp(0.7rem,1.1vw,0.85rem)] font-semibold text-foreground mb-1 tracking-wide">
                          {highlight.title}
                        </h3>
                        <p className="text-[clamp(0.6rem,0.9vw,0.75rem)] text-muted leading-relaxed">
                          {highlight.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Decorative element - subtle animated dots */}
              <div
                className="flex justify-end gap-1.5 mt-4"
                style={{
                  opacity: Math.max(0, scrollProgress - 0.8) / 0.2,
                }}
              >
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-accent/60"
                    style={{
                      animation: `pulse 2s ease-in-out ${i * 0.3}s infinite`,
                      transform: `scale(${0.8 + Math.sin(scrollProgress * 10 + i) * 0.2})`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Scroll indicator - fades out as content appears */}
          <div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            style={{
              opacity: Math.max(0, 1 - scrollProgress * 3),
              pointerEvents: scrollProgress > 0.3 ? "none" : "auto",
            }}
          >
            <span className="text-[0.65rem] text-muted uppercase tracking-[0.2em]">
              Keep scrolling
            </span>
            <div className="w-px h-8 bg-gradient-to-b from-accent/60 to-transparent animate-scroll-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
