"use client";

import { useSpring, animated, to } from "@react-spring/web";
import { memo, useState, useEffect } from "react";

interface BackgroundAnimatorProps {
  clientX: number;
  clientY: number;
}

const layers = [
  { d: 20, img: "background-dark-doodle-line-layer.png" },
  { d: 15, img: "background-dark-doodle-second-layer.png" },
  { d: 10, img: "background-dark-doodle-first-layer.png" },
] as const;

const BackgroundAnimator = ({ clientX, clientY }: BackgroundAnimatorProps) => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const xy: [number, number] = [
    clientX - windowSize.width / 2,
    clientY - windowSize.height / 2,
  ];

  const animationProps = useSpring({
    xy,
    config: { mass: 10, tension: 550, friction: 240 },
  });

  return (
    <>
      {layers.map(({ d, img }) => (
        <animated.div
          key={d}
          className="absolute -top-[5%] -left-[5%] w-[110%] h-[110%] bg-cover bg-center bg-no-repeat pointer-events-none will-change-transform"
          style={{
            transform: to(animationProps.xy, (x, y) => `translate(${x / d}px,${y / d}px)`),
            backgroundImage: `url(/images/Landing-section/${img})`,
          }}
        />
      ))}
    </>
  );
};

export default memo(BackgroundAnimator);
