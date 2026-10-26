import { toMeta } from "@/lib/blog/format";
import { getAllPosts } from "@/lib/blog/posts";
import { buildRssXml } from "@/lib/blog/rss";

export const dynamic = "force-static";

export function GET() {
  const posts = getAllPosts({ includeDrafts: false }).map(toMeta);
  return new Response(buildRssXml(posts), {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
