import path from "node:path";
import type { Element, Root } from "hast";
import sharp from "sharp";
import { visit } from "unist-util-visit";

const PUBLIC_DIR = path.join(process.cwd(), "public");

/**
 * Stamps local images with their intrinsic `width`/`height`. Images are lazy-loaded, so without
 * these they collapse to 0px until loaded, and anchor/TOC jumps land short as the page grows.
 * Remote or unreadable images are left alone.
 */
export default function rehypeImageDimensions() {
  return async (tree: Root) => {
    const images: Element[] = [];
    visit(tree, "element", (node: Element) => {
      if (node.tagName === "img") images.push(node);
    });

    await Promise.all(
      images.map(async (img) => {
        const src = img.properties?.src;
        if (typeof src !== "string" || !src.startsWith("/") || src.startsWith("//")) return;

        const file = path.join(PUBLIC_DIR, decodeURIComponent(src.split(/[?#]/)[0]));
        if (!file.startsWith(PUBLIC_DIR + path.sep)) return;

        try {
          const { width, height } = await sharp(file).metadata();
          if (width && height) img.properties = { ...img.properties, width, height };
        } catch {
          // Missing or unreadable file: render without dimensions.
        }
      }),
    );
  };
}
