/**
 * Canonical site URL used for metadata (Open Graph, sitemap, robots).
 * TODO: update this to the real deployed domain.
 * Can be overridden at build time via NEXT_PUBLIC_SITE_URL.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://riyaz942.github.io";

export const SITE_NAME = "Riyaz Ahmed | Portfolio";

export const SITE_DESCRIPTION =
  "Hi, I'm Riyaz Ahmed — a Lead/Senior Software Developer who loves turning complex problems into elegant, performant solutions. Take a look around.";
