import { SITE_URL } from "@/constants/site";
import type { BlogPost, BlogPostMeta } from "./types";

const dateFormat = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

/** "2026-11-12" → "Nov 12, 2026", independent of the viewer's timezone. */
export function formatDate(iso: string): string {
  return dateFormat.format(new Date(`${iso}T00:00:00Z`));
}

export function postUrl(slug: string): string {
  return `${SITE_URL}/blogs/${slug}`;
}

/** Social-card image: the generated JPG for posts with a cover, else the site default. */
export function ogImageFor(post: BlogPostMeta): string {
  return post.coverImage ? `/images/blogs/${post.slug}/og.jpg` : "/og-image.png";
}

export function toMeta(post: BlogPost): BlogPostMeta {
  const meta: Partial<BlogPost> = { ...post };
  delete meta.body;
  return meta as BlogPostMeta;
}
