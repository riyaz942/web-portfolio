import Image from "next/image";
import type { BlogPostMeta } from "@/lib/blog/types";

interface BlogCoverProps {
  post: BlogPostMeta;
  variant: "card" | "hero";
}

/** Cover image, or a gradient with the title when the post has none. 1200:630 either way. */
export default function BlogCover({ post, variant }: BlogCoverProps) {
  // The card variant rounds its top corners to match the card's clip (16px radius
  // minus the 1px border), so its view-transition snapshot has the same shape.
  const rounded = variant === "hero" ? "rounded-2xl" : "rounded-t-[15px]";
  const box = `relative w-full aspect-[1200/630] overflow-hidden ${rounded}`;
  // Hooks for the card <-> hero shared-element transition (see coverTransition.ts).
  const vtAttr =
    variant === "hero"
      ? { "data-blog-hero-cover": post.slug }
      : { "data-blog-card-cover": post.slug };

  if (post.coverImage) {
    return (
      <div className={box} {...vtAttr}>
        <Image
          src={post.coverImage}
          alt={post.coverAlt ?? ""}
          fill
          priority={variant === "hero"}
          sizes={variant === "hero" ? "(min-width: 1024px) 60rem, 100vw" : "(min-width: 1024px) 24rem, (min-width: 640px) 50vw, 100vw"}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`${box} bg-gradient-to-br from-accent/40 to-accent-secondary/40 flex items-center justify-center p-6`}
      aria-hidden="true"
      {...vtAttr}
    >
      <span
        className={`text-center font-bold text-foreground/90 leading-tight ${
          variant === "hero"
            ? "text-[clamp(1.5rem,3.5vw,2.75rem)] max-w-3xl"
            : "text-lg line-clamp-3"
        }`}
      >
        {post.title}
      </span>
    </div>
  );
}
