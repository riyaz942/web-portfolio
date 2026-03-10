"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  options: ScrollAnimationOptions = {}
) {
  const { threshold = 0.1, rootMargin = "0px", triggerOnce = true } = options;
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const calculateProgress = useCallback(() => {
    if (!ref.current) return;
    const { top, height } = ref.current.getBoundingClientRect();
    const wh = window.innerHeight;
    setScrollProgress(Math.min(Math.max((wh - top) / (wh + height), 0), 1));
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) observer.unobserve(element);
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    const handleScroll = () => requestAnimationFrame(calculateProgress);
    window.addEventListener("scroll", handleScroll, { passive: true });
    calculateProgress();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold, rootMargin, triggerOnce, calculateProgress]);

  return { ref, isVisible, scrollProgress };
}

export function useParallax(speed: number = 0.5) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const { top, height } = ref.current.getBoundingClientRect();
      setOffset((top + height / 2 - window.innerHeight / 2) * speed * -1);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return { ref, offset };
}
