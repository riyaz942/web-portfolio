import Image from "next/image";
import type { BlogPostMeta } from "@/lib/blog/types";

interface BlogCoverProps {
  post: BlogPostMeta;
  variant: "card" | "hero";
}

/** Cover image, or a gradient with the title when the post has none. 1200:630 either way. */
export default function BlogCover({ post, variant }: BlogCoverProps) {
  const rounded = variant === "hero" ? "rounded-2xl" : "";
  const box = `relative w-full aspect-[1200/630] overflow-hidden ${rounded}`;

  if (post.coverImage) {
    return (
      <div className={box}>
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
