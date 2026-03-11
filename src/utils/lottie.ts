import type { DotLottie } from "@lottiefiles/dotlottie-react";

export function initLottie(lottie: DotLottie, setFrames: (n: number) => void) {
  const onLoad = () => {
    setFrames(lottie.totalFrames);
    lottie.pause();
    lottie.setFrame(0);
  };
  lottie.addEventListener("load", onLoad);
  if (lottie.isLoaded) onLoad();
  return () => lottie.removeEventListener("load", onLoad);
}
