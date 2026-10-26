import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { describe, expect, it } from "vitest";
import { renderMarkdown } from "../markdown";
import { getAllPosts } from "../posts";

const dir = path.join(process.cwd(), "content/blogs");

describe("shipped blog content", () => {
  it("ships a template covering every field and convention", () => {
    const t = fs.readFileSync(path.join(dir, "_TEMPLATE.md"), "utf8");
    for (const key of ["title:", "slug:", "description:", "publishedAt:", "updatedAt:", "tags:", "coverImage:", "coverAlt:", "draft: true"])
      expect(t).toContain(key);
    for (const s of ["npm run blog:images", "## Key takeaways", "> [!TIP]", "> [!WARNING]", "https://riyaz-ahmed.com", "canonical"])
      expect(t).toContain(s);
  });
  it("sample post is a draft that exercises every feature", async () => {
    const post = getAllPosts({ dir, includeDrafts: true }).find((p) => p.slug === "hello-world")!;
    expect(post.draft).toBe(true);
    expect(getAllPosts({ dir, includeDrafts: false }).some((p) => p.slug === "hello-world")).toBe(false);
    const { html, headings } = await renderMarkdown(post.body);
    for (const s of ["callout-tip", "callout-warning", "<figcaption>", 'class="takeaways"', "<table>", "data-language="])
      expect(html).toContain(s);
    expect(headings.some((h) => h.depth === 3)).toBe(true);
  });
  it("the template's AI guide never reaches rendered output", async () => {
    const { content } = matter(fs.readFileSync(path.join(dir, "_TEMPLATE.md"), "utf8"));
    const { html } = await renderMarkdown(content);
    expect(html).not.toContain("AI AUTHORING GUIDE");
    expect(html).not.toContain("<!--");
    expect(html).toContain('class="takeaways"');
  });
});
