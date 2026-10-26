import { describe, expect, it } from "vitest";
import { formatDate, ogImageFor } from "../format";
import { buildRssXml } from "../rss";
import { buildPostJsonLd, buildPostMetadata } from "../seo";
import type { BlogPostMeta } from "../types";

const meta: BlogPostMeta = {
  slug: "keyboard",
  title: "Building my first keyboard",
  description: "What I learned soldering a board.",
  publishedAt: "2026-11-12",
  tags: ["hardware"],
  draft: false,
  readingTimeMinutes: 4,
};

describe("blog seo helpers", () => {
  it("formats dates without timezone drift", () => {
    expect(formatDate("2026-11-12")).toBe("Nov 12, 2026");
  });
  it("builds article metadata with canonical and OG fallback", () => {
    const m = buildPostMetadata(meta);
    expect(m.alternates?.canonical).toBe("https://riyaz-ahmed.com/blogs/keyboard");
    expect(m.openGraph).toMatchObject({
      type: "article",
      publishedTime: "2026-11-12",
      modifiedTime: "2026-11-12",
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    });
    expect(m.twitter).toMatchObject({ card: "summary_large_image" });
    expect(ogImageFor({ ...meta, coverImage: "/images/blogs/keyboard/cover.webp" })).toBe(
      "/images/blogs/keyboard/og.jpg",
    );
  });
  it("emits BlogPosting JSON-LD that cannot close its script tag", () => {
    const out = buildPostJsonLd({ ...meta, title: "Fix </script><b>" });
    expect(out).not.toContain("</script");
    expect(JSON.parse(out)).toMatchObject({
      "@type": "BlogPosting",
      headline: "Fix </script><b>",
      author: { "@type": "Person", name: "Riyaz Ahmed" },
      url: "https://riyaz-ahmed.com/blogs/keyboard",
      image: "https://riyaz-ahmed.com/og-image.png",
      datePublished: "2026-11-12",
      dateModified: "2026-11-12",
    });
  });
  it("escapes RSS text and formats pubDate", () => {
    const xml = buildRssXml([{ ...meta, title: 'Rust & <C++> "fun"', tags: ["rust"] }]);
    expect(xml).toContain("<title>Rust &amp; &lt;C++&gt; &quot;fun&quot;</title>");
    expect(xml).toContain("<pubDate>Thu, 12 Nov 2026 00:00:00 GMT</pubDate>");
    expect(xml).toContain('<guid isPermaLink="true">https://riyaz-ahmed.com/blogs/keyboard</guid>');
    expect(xml).toContain("<category>rust</category>");
    expect(xml).toContain(
      '<atom:link href="https://riyaz-ahmed.com/blogs/rss.xml" rel="self" type="application/rss+xml"/>',
    );
  });
  it("produces a valid empty channel", () => {
    const xml = buildRssXml([]);
    expect(xml).toContain("<channel>");
    expect(xml).not.toContain("<item>");
  });
});
