import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  BlogValidationError,
  computeReadingTime,
  getAdjacentPosts,
  getAllPosts,
  getPostBySlug,
} from "../posts";

const fx = (p: string) => path.join(__dirname, "fixtures", p);
const valid = (includeDrafts = false) => getAllPosts({ dir: fx("valid"), includeDrafts });

describe("post loader", () => {
  it("lists published posts newest first, ignoring _ files and non-md", () => {
    expect(valid().map((p) => p.slug)).toEqual(["beta-post", "alpha-post"]);
  });
  it("includes drafts only when asked", () => {
    expect(valid(true).map((p) => p.slug)).toEqual(["gamma-draft", "beta-post", "alpha-post"]);
  });
  it("normalizes unquoted YAML dates", () => {
    expect(valid().find((p) => p.slug === "beta-post")!.publishedAt).toBe("2026-12-04");
  });
  it("treats empty-string optional fields as absent and lowercases tags", () => {
    const a = valid().find((p) => p.slug === "alpha-post")!;
    expect(a.updatedAt).toBeUndefined();
    expect(a.coverImage).toBeUndefined();
    expect(a.tags).toEqual(["react", "perf"]);
  });
  it.each([
    ["missing-title", /missing-title\.md.*title/],
    ["bad-date", /bad-date\.md.*publishedAt/],
    ["slug-mismatch", /wrong\.md.*slug/],
    ["cover-no-alt", /cover-no-alt\.md.*coverAlt/],
    ["no-tags", /no-tags\.md.*tags/],
  ])("rejects %s with an error naming the file and field", (dir, msg) => {
    expect(() => getAllPosts({ dir: fx(`invalid/${dir}`) })).toThrow(BlogValidationError);
    expect(() => getAllPosts({ dir: fx(`invalid/${dir}`) })).toThrow(msg);
  });
  it("returns [] for a missing directory", () => {
    expect(getAllPosts({ dir: fx("nope") })).toEqual([]);
  });
  it("computes reading time at 200 wpm, ignoring fenced code, minimum 1", () => {
    const code = "```ts\n" + "x ".repeat(1000) + "\n```";
    expect(computeReadingTime("word ".repeat(450) + "\n" + code)).toBe(3);
    expect(computeReadingTime("")).toBe(1);
  });
  it("finds adjacent posts by date", () => {
    const opts = { dir: fx("valid"), includeDrafts: false };
    const adj = getAdjacentPosts("beta-post", opts);
    expect(adj.older?.slug).toBe("alpha-post");
    expect(adj.newer).toBeUndefined();
    expect(getPostBySlug("nope", opts)).toBeUndefined();
  });
});
