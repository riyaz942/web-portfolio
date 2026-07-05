"use client";

import { useSpring, animated, to } from "@react-spring/web";
import { memo, useEffect } from "react";

interface BackgroundAnimatorProps {
  /** When false, layers rest at center and mouse tracking is off. */
  enabled: boolean;
}

const layers = [
  { d: 20, img: "doodle-line-layer.png" },
  { d: 15, img: "doodle-second-layer.png" },
  { d: 10, img: "doodle-first-layer.png" },
] as const;

const BackgroundAnimator = ({ enabled }: BackgroundAnimatorProps) => {
  const [animationProps, api] = useSpring(() => ({
    xy: [0, 0] as [number, number],
    config: { mass: 10, tension: 550, friction: 240 },
  }));

  useEffect(() => {
    if (!enabled) {
      api.start({ xy: [0, 0] });
      return;
    }
    const onMouseMove = (e: MouseEvent) => {
      api.start({
        xy: [
          e.clientX - window.innerWidth / 2,
          e.clientY - window.innerHeight / 2,
        ],
      });
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [enabled, api]);

  return (
    <>
      {layers.map(({ d, img }) => (
        <animated.div
          key={d}
          className="absolute -top-[5%] -left-[5%] w-[110%] h-[110%] bg-cover bg-center bg-no-repeat pointer-events-none will-change-transform"
          style={{
            transform: to(animationProps.xy, (x, y) => `translate(${x / d}px,${y / d}px)`),
            backgroundImage: `url(/images/landing-section/${img})`,
          }}
        />
      ))}
    </>
  );
};

export default memo(BackgroundAnimator);
