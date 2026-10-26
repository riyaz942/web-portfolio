import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import sharp from "sharp";
import { writeOgImage } from "./lib/og-image.mjs";

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".heic", ".heif"]);
const UNREADABLE_ADVICE =
  "could not read this image; export it as JPEG (iPhone: Settings → Camera → Formats → Most Compatible) and rerun";

/**
 * Converts every image in `rawDir` to a compressed `.webp` in `outDir`.
 * A file named `cover.*` also produces `og.jpg`.
 * @param {{ rawDir: string, outDir: string, maxWidth?: number, quality?: number }} options
 * @returns {Promise<{ written: string[], skipped: { file: string, reason: string }[] }>}
 */
export async function processBlogImages({ rawDir, outDir, maxWidth = 1600, quality = 80 }) {
  /** @type {string[]} */
  const written = [];
  /** @type {{ file: string, reason: string }[]} */
  const skipped = [];

  const files = fs
    .readdirSync(rawDir, { withFileTypes: true })
    .filter((e) => e.isFile() && !e.name.startsWith(".") && IMAGE_EXTENSIONS.has(path.extname(e.name).toLowerCase()))
    .map((e) => e.name)
    .sort();

  fs.mkdirSync(outDir, { recursive: true });

  for (const name of files) {
    const input = path.join(rawDir, name);
    const base = path.parse(name).name;
    const output = path.join(outDir, `${base}.webp`);

    if (written.includes(output)) {
      skipped.push({ file: input, reason: `another image is already named "${base}"; rename one and rerun` });
      continue;
    }

    try {
      await sharp(input)
        .rotate()
        .resize({ width: maxWidth, withoutEnlargement: true })
        .webp({ quality })
        .toFile(output);
      if (base.toLowerCase() === "cover") await writeOgImage(input, path.join(outDir, "og.jpg"));
      written.push(output);
    } catch {
      fs.rmSync(output, { force: true });
      skipped.push({ file: input, reason: UNREADABLE_ADVICE });
    }
  }

  return { written, skipped };
}

async function main() {
  const slug = process.argv[2];
  if (!slug) {
    console.error("Usage: npm run blog:images -- <slug>");
    process.exit(1);
  }

  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
  const rawDir = path.join(root, "content/blogs/raw", slug);
  const outDir = path.join(root, "public/images/blogs", slug);

  if (!fs.existsSync(rawDir)) {
    console.error(`No raw photos found. Put them in content/blogs/raw/${slug}/ and rerun.`);
    process.exit(1);
  }

  const { written, skipped } = await processBlogImages({ rawDir, outDir });
  for (const file of written) console.log(`✓ ${path.relative(root, file)}`);
  for (const { file, reason } of skipped) console.error(`✗ ${path.relative(root, file)}: ${reason}`);
  if (skipped.length > 0) process.exit(1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
