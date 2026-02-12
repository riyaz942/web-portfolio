"use client";

import { useEffect, useState, useCallback } from "react";
import { DotLottieReact, DotLottie } from "@lottiefiles/dotlottie-react";

function CompletedLottie({
  src,
  label,
  aspectRatio,
}: {
  src: string;
  label: string;
  aspectRatio: string;
}) {
  const [dotLottie, setDotLottie] = useState<DotLottie | null>(null);

  const dotLottieRefCallback = useCallback((instance: DotLottie | null) => {
    setDotLottie(instance);
  }, []);

  // Set animation to its last frame once loaded
  useEffect(() => {
    if (!dotLottie) return;

    const handleLoad = () => {
      const lastFrame = dotLottie.totalFrames - 1;
      dotLottie.pause();
      dotLottie.setFrame(lastFrame);
    };

    dotLottie.addEventListener("load", handleLoad);

    if (dotLottie.isLoaded) {
      handleLoad();
    }

    return () => {
      dotLottie.removeEventListener("load", handleLoad);
    };
  }, [dotLottie]);

  return (
    <div className="w-full" style={{ aspectRatio }}>
      <DotLottieReact
        src={src}
        autoplay={false}
        loop={false}
        dotLottieRefCallback={dotLottieRefCallback}
        renderConfig={
          {
            autoResize: true,
            fit: "contain",
            align: ["0", "0"],
          } as unknown as typeof undefined
        }
      />
    </div>
  );
}

export default function AnimationsPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-white/10 px-6 py-4">
        <h1 className="text-xl font-bold text-foreground">
          Lottie Animations Preview
        </h1>
      </div>

      {/* Both animations stacked flush, no gap */}
      <div className="max-w-[851px] mx-auto flex flex-col">
        <CompletedLottie
          src="/images/Creative-section/Creative-section-background-animation.lottie"
          label="Creative Section"
          aspectRatio="851 / 721"
        />
        <CompletedLottie
          src="/images/Experience-section/experience-section-background-animation.lottie"
          label="Experience Section"
          aspectRatio="851 / 2163"
        />
      </div>
    </main>
  );
}
