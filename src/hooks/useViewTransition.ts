"use client";

import { useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";
import { saveScrollPosition } from "@/components/ScrollRestore";

function waitForDomSettle(timeout = 2000, quietMs = 80): Promise<void> {
  return new Promise((resolve) => {
    let timer: ReturnType<typeof setTimeout>;
    const done = () => {
      observer.disconnect();
      resolve();
    };

    const observer = new MutationObserver(() => {
      clearTimeout(timer);
      timer = setTimeout(done, quietMs);
    });

    observer.observe(document.body, { childList: true, subtree: true });
    timer = setTimeout(done, quietMs);
    setTimeout(done, timeout);
  });
}

export interface ViewTransitionCallbacks {
  beforeSnapshot?: () => void;
  afterDomUpdate?: () => void;
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
        callbacks?.afterDomUpdate?.();
      });
    },
    [router, pathname],
  );

  return { push };
}
