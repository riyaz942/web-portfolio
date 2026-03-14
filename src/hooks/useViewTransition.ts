"use client";

import { useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";
import { saveScrollPosition } from "@/components/ScrollRestore";

function waitForDomMutation(timeout = 2000): Promise<void> {
  return new Promise((resolve) => {
    const observer = new MutationObserver(() => {
      observer.disconnect();
      resolve();
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
    setTimeout(() => {
      observer.disconnect();
      resolve();
    }, timeout);
  });
}

export function useViewTransitionRouter() {
  const router = useRouter();
  const pathname = usePathname();

  const push = useCallback(
    (url: string) => {
      if (pathname === "/") {
        saveScrollPosition();
      }

      if (!document.startViewTransition) {
        router.push(url);
        return;
      }

      document.startViewTransition(async () => {
        router.push(url);
        await waitForDomMutation();
      });
    },
    [router, pathname],
  );

  return { push };
}
