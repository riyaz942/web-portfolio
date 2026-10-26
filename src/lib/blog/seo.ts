import type { Metadata } from "next";
import { SITE_URL } from "@/constants/site";
import { ogImageFor, postUrl } from "./format";
import type { BlogPostMeta } from "./types";

export const AUTHOR_NAME = "Riyaz Ahmed";

export function buildPostMetadata(post: BlogPostMeta): Metadata {
  const image = ogImageFor(post);
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: postUrl(post.slug) },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: postUrl(post.slug),
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [AUTHOR_NAME],
      tags: post.tags,
      images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [image],
    },
  };
}

/** JSON-LD for a `<script type="application/ld+json">`; `<` is escaped so content can't close the tag. */
export function buildPostJsonLd(post: BlogPostMeta): string {
  const json = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: `${SITE_URL}${ogImageFor(post)}`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: { "@type": "Person", name: AUTHOR_NAME },
    url: postUrl(post.slug),
    mainEntityOfPage: postUrl(post.slug),
  });
  return json.replace(/</g, "\\u003c");
}
