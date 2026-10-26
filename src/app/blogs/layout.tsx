import type { Metadata } from "next";
import { BLOG_DESCRIPTION, BLOG_TITLE } from "@/lib/blog/rss";
import "./blog.css";

export const metadata: Metadata = {
  title: {
    default: "Blog",
    template: "%s | Riyaz Ahmed",
  },
  description: BLOG_DESCRIPTION,
  alternates: {
    types: {
      "application/rss+xml": [{ url: "/blogs/rss.xml", title: BLOG_TITLE }],
    },
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
