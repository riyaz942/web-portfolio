import { SITE_URL } from "@/constants/site";
import { postUrl } from "./format";
import type { BlogPostMeta } from "./types";

export const BLOG_TITLE = "Riyaz Ahmed | Blog";
export const BLOG_DESCRIPTION =
  "Writing by Riyaz Ahmed on building software, hardware projects, and lessons from work.";

const escapeXml = (text: string) =>
  text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

function item(post: BlogPostMeta): string {
  const url = postUrl(post.slug);
  return [
    "    <item>",
    `      <title>${escapeXml(post.title)}</title>`,
    `      <link>${url}</link>`,
    `      <guid isPermaLink="true">${url}</guid>`,
    `      <pubDate>${new Date(`${post.publishedAt}T00:00:00Z`).toUTCString()}</pubDate>`,
    `      <description>${escapeXml(post.description)}</description>`,
    ...post.tags.map((tag) => `      <category>${escapeXml(tag)}</category>`),
    "    </item>",
  ].join("\n");
}

export function buildRssXml(posts: BlogPostMeta[]): string {
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    `    <title>${escapeXml(BLOG_TITLE)}</title>`,
    `    <link>${SITE_URL}/blogs</link>`,
    `    <description>${escapeXml(BLOG_DESCRIPTION)}</description>`,
    "    <language>en</language>",
    `    <atom:link href="${SITE_URL}/blogs/rss.xml" rel="self" type="application/rss+xml"/>`,
    ...posts.map(item),
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");
}
