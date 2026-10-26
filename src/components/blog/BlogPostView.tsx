"use client";

import Link from "next/link";
import { useCallback } from "react";
import { useViewTransitionRouter } from "@/hooks/useViewTransition";
import { formatDate } from "@/lib/blog/format";
import type { BlogPostMeta, RenderedPost } from "@/lib/blog/types";
import BlogCover from "./BlogCover";
import PostBody from "./PostBody";
import TableOfContents from "./TableOfContents";

interface BlogPostViewProps {
  post: BlogPostMeta;
  rendered: RenderedPost;
  adjacent: { older?: BlogPostMeta; newer?: BlogPostMeta };
}

export default function BlogPostView({ post, rendered, adjacent }: BlogPostViewProps) {
  const { push } = useViewTransitionRouter();
  const navigateBack = useCallback(() => push("/blogs"), [push]);
  const hasToc = rendered.headings.length > 0;

  // Plain left clicks get the view transition; modified clicks keep native link behavior.
  const openPost = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return;
    }
    e.preventDefault();
    push(href);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-white/[0.06]">
        <div className="mx-auto max-w-5xl px-6 py-4 flex items-center gap-4">
          <button
            onClick={navigateBack}
            className="group flex items-center gap-2 text-muted hover:text-foreground transition-colors duration-200 cursor-pointer"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className="transition-transform duration-200 group-hover:-translate-x-0.5"
            >
              <path
                d="M12.5 15L7.5 10L12.5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-sm font-medium">Blog</span>
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12 md:py-16">
        {/* Title block */}
        <div className="mb-10 md:mb-12">
          <div className="flex flex-wrap items-center gap-1.5 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block px-2.5 py-1 text-[0.7rem] font-medium rounded-md bg-white/[0.05] text-accent/90 border border-white/[0.06]"
              >
                {tag}
              </span>
            ))}
            {post.draft && (
              <span className="px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide rounded-md bg-accent-secondary/15 text-accent-secondary border border-accent-secondary/30">
                Draft
              </span>
            )}
          </div>
          <h1 className="text-[clamp(1.9rem,4vw,3rem)] font-bold leading-tight tracking-tight">
            {post.title}
          </h1>
          <p className="mt-4 text-sm text-muted">
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            {post.updatedAt && (
              <>
                {" · Updated "}
                <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time>
              </>
            )}
            {" · "}
            {post.readingTimeMinutes} min read
          </p>
          <div className="mt-8">
            <BlogCover post={post} variant="hero" />
          </div>
        </div>

        {/* Body + TOC */}
        <div
          className={
            hasToc ? "grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_14rem] gap-12" : ""
          }
        >
          <article className="min-w-0">
            {hasToc && <TableOfContents headings={rendered.headings} variant="collapsible" />}
            <PostBody html={rendered.html} />
          </article>
          {hasToc && (
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <TableOfContents headings={rendered.headings} variant="sidebar" />
              </div>
            </aside>
          )}
        </div>

        {/* Older / newer */}
        {(adjacent.older || adjacent.newer) && (
          <nav
            aria-label="More posts"
            className="mt-16 pt-8 border-t border-white/[0.06] grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm"
          >
            {adjacent.older ? (
              <Link
                href={`/blogs/${adjacent.older.slug}`}
                onClick={(e) => openPost(e, `/blogs/${adjacent.older!.slug}`)}
                className="text-muted hover:text-foreground transition-colors"
              >
                ← Older: {adjacent.older.title}
              </Link>
            ) : (
              <span />
            )}
            {adjacent.newer && (
              <Link
                href={`/blogs/${adjacent.newer.slug}`}
                onClick={(e) => openPost(e, `/blogs/${adjacent.newer!.slug}`)}
                className="text-muted hover:text-foreground transition-colors sm:text-right"
              >
                Newer: {adjacent.newer.title} →
              </Link>
            )}
          </nav>
        )}
      </main>
    </div>
  );
}
