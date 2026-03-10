"use client";

import { useEffect, useState } from "react";
import { DotLottieReact, DotLottie } from "@lottiefiles/dotlottie-react";

function CompletedLottie({
  src,
  aspectRatio,
}: {
  src: string;
  aspectRatio: string;
}) {
  const [dotLottie, setDotLottie] = useState<DotLottie | null>(null);

  // Set animation to its last frame once loaded
  useEffect(() => {
    if (!dotLottie) return;

    const onLoad = () => {
      dotLottie.pause();
      dotLottie.setFrame(dotLottie.totalFrames - 1);
    };

    dotLottie.addEventListener("load", onLoad);
    if (dotLottie.isLoaded) onLoad();

    return () => dotLottie.removeEventListener("load", onLoad);
  }, [dotLottie]);

  return (
    <div className="w-full" style={{ aspectRatio }}>
      <DotLottieReact
        src={src}
        autoplay={false}
        loop={false}
        dotLottieRefCallback={setDotLottie}
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
          aspectRatio="851 / 721"
        />
        <CompletedLottie
          src="/images/Experience-section/experience-section-background-animation.lottie"
          aspectRatio="851 / 2163"
        />
      </div>
    </main>
  );
}
