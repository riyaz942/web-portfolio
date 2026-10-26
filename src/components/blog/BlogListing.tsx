"use client";

import Link from "next/link";
import { useCallback } from "react";
import { motion } from "framer-motion";
import ScrollRestore from "@/components/ScrollRestore";
import { useViewTransitionRouter } from "@/hooks/useViewTransition";
import { formatDate } from "@/lib/blog/format";
import type { BlogPostMeta } from "@/lib/blog/types";
import BlogCover from "./BlogCover";

export default function BlogListing({ posts }: { posts: BlogPostMeta[] }) {
  const { push } = useViewTransitionRouter();

  const navigateHome = useCallback(() => push("/"), [push]);

  // Plain left clicks get the view transition; modified clicks keep native link behavior.
  const openPost = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }
      e.preventDefault();
      push(href);
    },
    [push],
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollRestore path="/blogs" />
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-white/[0.06]">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center gap-4">
          <button
            onClick={navigateHome}
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
            <span className="text-sm font-medium">Home</span>
          </button>
          <div className="h-4 w-px bg-white/10" />
          <h1 className="text-sm font-semibold tracking-wide">
            <span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
              Blog
            </span>
          </h1>
        </div>
      </header>

      {/* Page content */}
      <main className="mx-auto max-w-6xl px-6 py-12 md:py-20">
        <div className="mb-12 md:mb-16">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold leading-tight tracking-tight">
            <span className="text-foreground">My </span>
            <span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
              Blog
            </span>
          </h2>
          <p className="mt-3 text-muted text-[clamp(0.95rem,1.5vw,1.15rem)] leading-relaxed max-w-xl">
            Notes on building software, tinkering with hardware, and what I learn along the way.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="mx-auto max-w-md rounded-2xl bg-white/[0.03] border border-white/[0.06] p-8 text-center">
            <p className="text-lg font-semibold text-foreground">First post coming soon.</p>
            <p className="mt-2 text-sm text-muted">
              Check back shortly — or follow along on{" "}
              <a
                href="https://github.com/riyaz942"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                GitHub
              </a>
              .
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {posts.map((post, index) => {
              const href = `/blogs/${post.slug}`;
              return (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.6,
                    delay: (index % 3) * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group relative rounded-2xl bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] hover:border-white/[0.14] transition-colors duration-300 overflow-hidden"
                >
                  {/* Hover glow */}
                  <div className="absolute -inset-2 bg-gradient-to-br from-accent/8 to-accent-secondary/8 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 pointer-events-none" />

                  <Link
                    href={href}
                    onClick={(e) => openPost(e, href)}
                    className="relative flex h-full flex-col"
                  >
                    <BlogCover post={post} variant="card" />

                    <div className="p-5 md:p-6 flex flex-1 flex-col gap-3">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-[clamp(1rem,1.4vw,1.15rem)] font-semibold text-foreground leading-snug">
                          {post.title}
                        </h3>
                        {post.draft && (
                          <span className="flex-shrink-0 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide rounded-md bg-accent-secondary/15 text-accent-secondary border border-accent-secondary/30">
                            Draft
                          </span>
                        )}
                      </div>

                      <p className="text-[clamp(0.8rem,1vw,0.875rem)] text-muted leading-relaxed line-clamp-3">
                        {post.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-block px-2.5 py-1 text-[0.7rem] font-medium rounded-md bg-white/[0.05] text-accent/90 border border-white/[0.06]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <p className="mt-auto pt-2 text-xs text-muted/70 font-medium">
                        <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                        {" · "}
                        {post.readingTimeMinutes} min read
                      </p>
                    </div>

                    {/* Top accent line */}
                    <div className="absolute top-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </Link>
                </motion.article>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
