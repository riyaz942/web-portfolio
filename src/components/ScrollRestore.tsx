"use client";

import { useEffect } from "react";

const STORAGE_PREFIX = "scroll-y:";

export function saveScrollPosition(path = "/") {
  sessionStorage.setItem(STORAGE_PREFIX + path, String(window.scrollY));
}

export default function ScrollRestore({ path = "/" }: { path?: string }) {
  useEffect(() => {
    const key = STORAGE_PREFIX + path;
    const saved = sessionStorage.getItem(key);
    if (saved) {
      const y = parseInt(saved, 10);
      sessionStorage.removeItem(key);
      requestAnimationFrame(() => {
        window.scrollTo({ top: y, behavior: "instant" });
      });
    }
  }, [path]);

  return null;
}
