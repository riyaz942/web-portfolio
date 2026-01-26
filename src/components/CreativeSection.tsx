"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { DotLottieReact, DotLottie } from "@lottiefiles/dotlottie-react";

export default function CreativeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [dotLottie, setDotLottie] = useState<DotLottie | null>(null);
  const [totalFrames, setTotalFrames] = useState(0);

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
      const sectionHeight = rect.height;
      const viewportHeight = window.innerHeight;

      // Delay start: animation begins when section top is at 20% from top of viewport
      // (i.e., after 80% of the previous section has scrolled)
      const delayThreshold = viewportHeight * 0.2;

      // Calculate scroll progress through the section
      // Animation starts when section top reaches 20% from top of viewport
      const scrollStart = delayThreshold; // When section top reaches 20% from top
      const scrollEnd = -sectionHeight; // When section bottom leaves top of viewport

      // Progress from 0 to 1 as we scroll through the section
      const progress = Math.max(
        0,
        Math.min(1, (scrollStart - sectionTop) / (scrollStart - scrollEnd)),
      );

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

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{ height: "200vh" }} // Extra height for scroll-through animation
    >
      {/* Sticky container for the animation */}
      <div className="sticky top-0 w-full overflow-hidden">
        {/* Lottie Background Animation */}
        <div
          className="w-[70%] origin-top-left"
          style={{ transform: "scale(1.5) translateX(-22%)" }}
        >
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
        </div>

        {/* Content overlay */}
        <div className="relative z-10 flex items-center justify-center w-full h-full">
          <div className="max-w-5xl w-full text-center px-8">
            <h2 className="text-[clamp(2.5rem,8vw,6rem)] font-bold mb-8 tracking-tight">
              Creative
            </h2>
            <p className="text-[clamp(1.125rem,2vw,1.5rem)] text-muted max-w-xl mx-auto leading-relaxed">
              Coming soon...
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
