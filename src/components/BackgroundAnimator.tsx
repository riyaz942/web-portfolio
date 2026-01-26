"use client";

import { useSpring, animated, to } from "@react-spring/web";
import { memo, useState, useEffect } from "react";

interface WindowSize {
  width: number;
  height: number;
}

interface BackgroundAnimatorProps {
  clientX: number;
  clientY: number;
}

const trans1 = (x: number, y: number) => `translate(${x / 20}px,${y / 20}px)`;
const trans2 = (x: number, y: number) => `translate(${x / 15}px,${y / 15}px)`;
const trans3 = (x: number, y: number) => `translate(${x / 10}px,${y / 10}px)`;

const BackgroundAnimator = ({ clientX, clientY }: BackgroundAnimatorProps) => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const updateSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

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
      <animated.div
        className="absolute -top-[5%] -left-[5%] w-[110%] h-[110%] bg-cover bg-center bg-no-repeat pointer-events-none will-change-transform"
        style={{
          transform: to(animationProps.xy, trans1),
          backgroundImage: `url(/images/Landing-section/background-dark-doodle-line-layer.png)`,
        }}
      />
      <animated.div
        className="absolute -top-[5%] -left-[5%] w-[110%] h-[110%] bg-cover bg-center bg-no-repeat pointer-events-none will-change-transform"
        style={{
          transform: to(animationProps.xy, trans2),
          backgroundImage: `url(/images/Landing-section/background-dark-doodle-second-layer.png)`,
        }}
      />
      <animated.div
        className="absolute -top-[5%] -left-[5%] w-[110%] h-[110%] bg-cover bg-center bg-no-repeat pointer-events-none will-change-transform"
        style={{
          transform: to(animationProps.xy, trans3),
          backgroundImage: `url(/images/Landing-section/background-dark-doodle-first-layer.png)`,
        }}
      />
    </>
  );
};

export default memo(BackgroundAnimator);
