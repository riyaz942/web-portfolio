import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostView from "@/components/blog/BlogPostView";
import { toMeta } from "@/lib/blog/format";
import { renderMarkdown } from "@/lib/blog/markdown";
import { getAdjacentPosts, getAllPosts, getPostBySlug } from "@/lib/blog/posts";
import { buildPostJsonLd, buildPostMetadata } from "@/lib/blog/seo";

/**
 * Static export rejects an empty generateStaticParams, so with no posts we
 * return this placeholder, which the page turns into a 404.
 */
const PLACEHOLDER_SLUG = "_no-posts";

export const dynamicParams = false;

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.length > 0
    ? posts.map((p) => ({ slug: p.slug }))
    : [{ slug: PLACEHOLDER_SLUG }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return buildPostMetadata(toMeta(post));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const meta = toMeta(post);
  const rendered = await renderMarkdown(post.body);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildPostJsonLd(meta) }}
      />
      <BlogPostView
        post={meta}
        rendered={rendered}
        adjacent={getAdjacentPosts(slug)}
      />
    </>
  );
}
