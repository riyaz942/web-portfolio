export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  publishedAt: string; // "YYYY-MM-DD"
  updatedAt?: string; // "YYYY-MM-DD"
  tags: string[]; // lowercased
  coverImage?: string; // site path, e.g. "/images/blogs/<slug>/cover.webp"
  coverAlt?: string;
  draft: boolean;
  readingTimeMinutes: number;
}

/** A post with its raw Markdown body. */
export interface BlogPost extends BlogPostMeta {
  body: string;
}

export interface TocHeading {
  id: string;
  text: string;
  depth: 2 | 3;
}

export interface RenderedPost {
  html: string;
  headings: TocHeading[];
}
