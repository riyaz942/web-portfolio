/** URLs preloaded before the landing page is shown (keep in sync with section components). */

export const LANDING_PRELOAD_IMAGES = [
  "/images/landing-section/doodle-line-layer.png",
  "/images/landing-section/doodle-second-layer.png",
  "/images/landing-section/doodle-first-layer.png",
  "/images/landing-section/profile-pic.jpeg",
  "/images/creative-section/background-doodle.webp",
  "/images/experience-section/background.webp",
  "/images/skills-section/background.webp",
] as const;

export const LANDING_PRELOAD_LOTTIES = [
  "/images/creative-section/background-animation.lottie",
  "/images/experience-section/background-animation.lottie",
  "/images/skills-section/center-line-animation.lottie",
  "/images/skills-section/tree-animation.lottie",
] as const;

export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });
}

export function preloadLottie(url: string): Promise<void> {
  return fetch(url)
    .then(() => undefined)
    .catch(() => undefined);
}
