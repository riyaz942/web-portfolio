import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { BlogPost, BlogPostMeta } from "./types";

export class BlogValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BlogValidationError";
  }
}

export interface LoadOptions {
  dir?: string;
  includeDrafts?: boolean;
}

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;
const WORDS_PER_MINUTE = 200;

function resolveOptions(opts: LoadOptions = {}) {
  return {
    dir: opts.dir ?? path.join(process.cwd(), "content/blogs"),
    includeDrafts: opts.includeDrafts ?? process.env.NODE_ENV !== "production",
  };
}

export function computeReadingTime(markdown: string): number {
  const prose = markdown.replace(/^(```|~~~)[\s\S]*?^\1/gm, " ");
  const words = prose.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

/** Treats absent values and "" as missing. */
function isBlank(value: unknown): boolean {
  return value === undefined || value === null || value === "";
}

function requireString(file: string, field: string, value: unknown): string {
  if (typeof value !== "string" || value.trim() === "") {
    throw new BlogValidationError(`${file}: ${field} is required and must be a non-empty string`);
  }
  return value.trim();
}

/** Accepts a YAML-parsed Date (unquoted dates) or a "YYYY-MM-DD" string. */
function parseDate(file: string, field: string, value: unknown): string {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  if (typeof value === "string") {
    const m = DATE_PATTERN.exec(value);
    if (m) {
      const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])];
      const date = new Date(Date.UTC(y, mo - 1, d));
      if (date.getUTCFullYear() === y && date.getUTCMonth() === mo - 1 && date.getUTCDate() === d) {
        return value;
      }
    }
  }
  throw new BlogValidationError(`${file}: ${field} must be a real date in YYYY-MM-DD format`);
}

function parsePost(dir: string, file: string): BlogPost {
  const { data, content } = matter(fs.readFileSync(path.join(dir, file), "utf8"));
  const fileSlug = file.replace(/\.md$/, "");

  const title = requireString(file, "title", data.title);
  const description = requireString(file, "description", data.description);

  const slug = requireString(file, "slug", data.slug);
  if (!SLUG_PATTERN.test(slug)) {
    throw new BlogValidationError(`${file}: slug "${slug}" must be lowercase letters, digits and hyphens`);
  }
  if (slug !== fileSlug) {
    throw new BlogValidationError(`${file}: slug "${slug}" must match the filename ("${fileSlug}")`);
  }

  const publishedAt = parseDate(file, "publishedAt", data.publishedAt);
  const updatedAt = isBlank(data.updatedAt) ? undefined : parseDate(file, "updatedAt", data.updatedAt);

  if (
    !Array.isArray(data.tags) ||
    data.tags.length === 0 ||
    !data.tags.every((t: unknown) => typeof t === "string" && t.trim() !== "")
  ) {
    throw new BlogValidationError(`${file}: tags must be a non-empty list of strings`);
  }
  const tags = (data.tags as string[]).map((t) => t.trim().toLowerCase());

  const coverImage = isBlank(data.coverImage) ? undefined : requireString(file, "coverImage", data.coverImage);
  const coverAlt = isBlank(data.coverAlt) ? undefined : requireString(file, "coverAlt", data.coverAlt);
  if (coverImage && !coverAlt) {
    throw new BlogValidationError(`${file}: coverAlt is required when coverImage is set`);
  }

  if (data.draft !== undefined && typeof data.draft !== "boolean") {
    throw new BlogValidationError(`${file}: draft must be true or false`);
  }

  return {
    slug,
    title,
    description,
    publishedAt,
    updatedAt,
    tags,
    coverImage,
    coverAlt,
    draft: data.draft ?? false,
    readingTimeMinutes: computeReadingTime(content),
    body: content,
  };
}

/** All posts, newest first. A missing directory yields no posts. */
export function getAllPosts(opts?: LoadOptions): BlogPost[] {
  const { dir, includeDrafts } = resolveOptions(opts);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isFile() && e.name.endsWith(".md") && !e.name.startsWith("_"))
    .map((e) => parsePost(dir, e.name))
    .filter((p) => includeDrafts || !p.draft)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt) || a.slug.localeCompare(b.slug));
}

export function getPostBySlug(slug: string, opts?: LoadOptions): BlogPost | undefined {
  return getAllPosts(opts).find((p) => p.slug === slug);
}

function withoutBody({ body: _body, ...meta }: BlogPost): BlogPostMeta {
  return meta;
}

export function getAdjacentPosts(
  slug: string,
  opts?: LoadOptions,
): { older?: BlogPostMeta; newer?: BlogPostMeta } {
  const posts = getAllPosts(opts);
  const i = posts.findIndex((p) => p.slug === slug);
  if (i === -1) return {};
  return {
    older: posts[i + 1] && withoutBody(posts[i + 1]),
    newer: posts[i - 1] && withoutBody(posts[i - 1]),
  };
}
