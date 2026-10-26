import BlogListing from "@/components/blog/BlogListing";
import { toMeta } from "@/lib/blog/format";
import { getAllPosts } from "@/lib/blog/posts";

export default function BlogPage() {
  const posts = getAllPosts().map(toMeta);
  return <BlogListing posts={posts} />;
}
