"use client";

import { useEffect, useState } from "react";
import type { TocHeading } from "@/lib/blog/types";

interface TableOfContentsProps {
  headings: TocHeading[];
  variant: "sidebar" | "collapsible";
}

/** Highlights the heading nearest the top of the viewport. */
function useActiveHeading(headings: TocHeading[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        const first = elements.find((el) => visible.has(el.id));
        if (first) setActive(first.id);
      },
      { rootMargin: "-80px 0px -70% 0px" },
    );
    elements.forEach((el) => observer.observe(el));

    // A short last section can never scroll up into the observer's band.
    const onScroll = () => {
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) setActive(elements[elements.length - 1].id);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [headings]);

  return active;
}

export default function TableOfContents({ headings, variant }: TableOfContentsProps) {
  const active = useActiveHeading(headings);

  const list = (
    <ul className="flex flex-col gap-1 text-sm">
      {headings.map((h) => (
        <li key={h.id}>
          <a
            href={`#${h.id}`}
            aria-current={active === h.id ? "true" : undefined}
            className={`block border-l-2 py-1 transition-colors duration-200 ${
              h.depth === 3 ? "pl-7" : "pl-4"
            } ${
              active === h.id
                ? "border-accent text-accent"
                : "border-white/10 text-muted hover:text-foreground"
            }`}
          >
            {h.text}
          </a>
        </li>
      ))}
    </ul>
  );

  if (variant === "collapsible") {
    return (
      <details className="lg:hidden mb-8 rounded-xl bg-white/[0.03] border border-white/[0.06] px-4 py-3">
        <summary className="cursor-pointer text-sm font-semibold text-foreground">
          On this page
        </summary>
        <nav aria-label="On this page" className="mt-3">
          {list}
        </nav>
      </details>
    );
  }

  return (
    <nav aria-label="On this page">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
        On this page
      </p>
      {list}
    </nav>
  );
}
