import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import sharp from "sharp";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { processBlogImages } from "../blog-images.mjs";
import { ensureOgImages, findImageWarnings } from "../blog-prebuild.mjs";

let tmp: string;
let rawDir: string;
let outDir: string;

const makeImage = (file: string, width: number, height: number) =>
  sharp({ create: { width, height, channels: 3, background: "#888" } }).toFile(file);

beforeEach(() => {
  tmp = fs.mkdtempSync(path.join(os.tmpdir(), "blog-images-"));
  rawDir = path.join(tmp, "raw");
  outDir = path.join(tmp, "out");
  fs.mkdirSync(rawDir);
});
afterEach(() => fs.rmSync(tmp, { recursive: true, force: true }));

describe("processBlogImages", () => {
  it("converts to webp, capping width at 1600 without upscaling", async () => {
    await makeImage(path.join(rawDir, "big.jpg"), 3000, 2000);
    await makeImage(path.join(rawDir, "small.png"), 800, 600);
    const { written, skipped } = await processBlogImages({ rawDir, outDir });
    expect(skipped).toEqual([]);
    expect(await sharp(path.join(outDir, "big.webp")).metadata()).toMatchObject({ format: "webp", width: 1600 });
    expect((await sharp(path.join(outDir, "small.webp")).metadata()).width).toBe(800);
    expect(written).toHaveLength(2);
  });
  it("makes og.jpg from cover.*", async () => {
    await makeImage(path.join(rawDir, "cover.jpg"), 2400, 1600);
    await processBlogImages({ rawDir, outDir });
    expect(await sharp(path.join(outDir, "og.jpg")).metadata()).toMatchObject({
      format: "jpeg",
      width: 1200,
      height: 630,
    });
  });
  it("skips unreadable/HEIC files with advice and keeps going", async () => {
    fs.writeFileSync(path.join(rawDir, "broken.heic"), Buffer.from("not really an image at all"));
    await makeImage(path.join(rawDir, "ok.jpg"), 400, 300);
    const { written, skipped } = await processBlogImages({ rawDir, outDir });
    expect(written.map((f: string) => path.basename(f))).toEqual(["ok.webp"]);
    expect(skipped[0]).toMatchObject({
      file: expect.stringContaining("broken.heic"),
      reason: expect.stringMatching(/JPEG/i),
    });
  });
});

describe("blog-prebuild", () => {
  it("ensureOgImages creates missing og.jpg once", async () => {
    const contentDir = path.join(tmp, "content");
    const publicDir = path.join(tmp, "public");
    fs.mkdirSync(contentDir);
    fs.mkdirSync(path.join(publicDir, "images/blogs/post"), { recursive: true });
    await makeImage(path.join(publicDir, "images/blogs/post/cover.webp"), 1600, 900);
    fs.writeFileSync(
      path.join(contentDir, "post.md"),
      '---\ntitle: Post\nslug: post\ndescription: d\npublishedAt: "2026-11-12"\ntags: [a]\n' +
        "coverImage: /images/blogs/post/cover.webp\ncoverAlt: alt\n---\n\nBody\n",
    );
    expect(await ensureOgImages({ contentDir, publicDir })).toHaveLength(1);
    expect(await ensureOgImages({ contentDir, publicDir })).toEqual([]);
  });
  it("warns on non-webp and oversized images", async () => {
    const dir = path.join(tmp, "images");
    fs.mkdirSync(dir);
    await makeImage(path.join(dir, "a.png"), 4, 4);
    await sharp({ create: { width: 200, height: 200, channels: 3, background: "#123456" } })
      .webp()
      .toFile(path.join(dir, "b.webp"));
    const w = findImageWarnings(dir, 10);
    expect(w.some((m: string) => m.includes("a.png") && m.includes("webp"))).toBe(true);
    expect(w.some((m: string) => m.includes("b.webp") && m.includes("KB"))).toBe(true);
  });
});
