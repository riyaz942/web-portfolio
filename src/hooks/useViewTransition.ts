"use client";

import { useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";
import { saveScrollPosition } from "@/components/ScrollRestore";

function waitForDomSettle(timeout = 2000, quietMs = 60): Promise<void> {
  return new Promise((resolve) => {
    let timer: ReturnType<typeof setTimeout>;
    let settled = false;

    const done = () => {
      if (settled) return;
      settled = true;
      observer.disconnect();
      clearTimeout(timer);
      resolve();
    };

    const observer = new MutationObserver(() => {
      clearTimeout(timer);
      timer = setTimeout(done, quietMs);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
    });

    setTimeout(done, timeout);
  });
}

export function waitForElement(
  selector: string,
  timeout = 2000,
): Promise<Element | null> {
  const existing = document.querySelector(selector);
  if (existing) return Promise.resolve(existing);

  return new Promise((resolve) => {
    let settled = false;

    const done = (el: Element | null) => {
      if (settled) return;
      settled = true;
      observer.disconnect();
      resolve(el);
    };

    const observer = new MutationObserver(() => {
      const el = document.querySelector(selector);
      if (el) done(el);
    });

    observer.observe(document.body, { childList: true, subtree: true });
    setTimeout(() => done(null), timeout);
  });
}

export interface ViewTransitionCallbacks {
  beforeSnapshot?: () => void;
  afterDomUpdate?: () => void | Promise<void>;
}

export function useViewTransitionRouter() {
  const router = useRouter();
  const pathname = usePathname();

  const push = useCallback(
    (url: string, callbacks?: ViewTransitionCallbacks) => {
      if (pathname === "/" || pathname === "/projects") {
        saveScrollPosition(pathname);
      }

      if (!document.startViewTransition) {
        router.push(url);
        return;
      }

      callbacks?.beforeSnapshot?.();

      document.startViewTransition(async () => {
        router.push(url);
        await waitForDomSettle();
        await callbacks?.afterDomUpdate?.();
      });
    },
    [router, pathname],
  );

  return { push };
}
