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
      style={{ height: "400vh" }} // Extra height for scroll-through animation
    >
      {/* Sticky container for the animation */}
      <div className="sticky top-0 w-full overflow-hidden">
        {/* Lottie Background Animation */}
        <div
          className="w-[90%] origin-top-left"
          style={{ transform: "scale(1) translateX(-20%)" }}
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
      </div>
    </section>
  );
}
