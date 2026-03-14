"use client";

import { useEffect } from "react";

const STORAGE_KEY = "home-scroll-y";

export function saveScrollPosition() {
  sessionStorage.setItem(STORAGE_KEY, String(window.scrollY));
}

export default function ScrollRestore() {
  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      const y = parseInt(saved, 10);
      sessionStorage.removeItem(STORAGE_KEY);
      requestAnimationFrame(() => {
        window.scrollTo({ top: y, behavior: "instant" });
      });
    }
  }, []);

  return null;
}
