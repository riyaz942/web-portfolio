import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import matter from "gray-matter";
import { writeOgImage } from "./lib/og-image.mjs";

const MAX_IMAGE_BYTES = 500 * 1024;

/**
 * Writes `public/images/blogs/<slug>/og.jpg` for each post with a cover image,
 * when it's missing or older than the cover. Returns the paths it wrote.
 * @param {{ contentDir: string, publicDir: string }} options
 * @returns {Promise<string[]>}
 */
export async function ensureOgImages({ contentDir, publicDir }) {
  if (!fs.existsSync(contentDir)) return [];

  /** @type {string[]} */
  const written = [];
  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".md") && !f.startsWith("_"));

  for (const file of files) {
    const { data } = matter(fs.readFileSync(path.join(contentDir, file), "utf8"));
    if (typeof data.coverImage !== "string" || data.coverImage === "") continue;

    const slug = file.replace(/\.md$/, "");
    const cover = path.join(publicDir, data.coverImage);
    const ogPath = path.join(publicDir, "images/blogs", slug, "og.jpg");

    if (!fs.existsSync(cover)) {
      console.warn(`⚠ ${file}: coverImage ${data.coverImage} not found in public/`);
      continue;
    }
    if (fs.existsSync(ogPath) && fs.statSync(ogPath).mtimeMs >= fs.statSync(cover).mtimeMs) continue;

    try {
      await writeOgImage(cover, ogPath);
    } catch (err) {
      throw new Error(`${file}: could not create og.jpg from ${data.coverImage}: ${/** @type {Error} */ (err).message}`);
    }
    written.push(ogPath);
  }

  return written;
}

/** @param {number} bytes */
const kb = (bytes) => `${(bytes / 1024).toFixed(1)} KB`;

/**
 * Lists problems with blog images: not `.webp`, or larger than `maxBytes`.
 * @param {string} dir
 * @param {number} [maxBytes]
 * @returns {string[]}
 */
export function findImageWarnings(dir, maxBytes = MAX_IMAGE_BYTES) {
  if (!fs.existsSync(dir)) return [];

  /** @type {string[]} */
  const warnings = [];
  const walk = (/** @type {string} */ current) => {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        walk(full);
        continue;
      }
      if (entry.name.startsWith(".") || entry.name === "og.jpg") continue;

      const rel = path.relative(dir, full);
      if (path.extname(entry.name).toLowerCase() !== ".webp") {
        warnings.push(`${rel} is not .webp; run \`npm run blog:images -- <slug>\` to convert it`);
        continue;
      }
      const size = fs.statSync(full).size;
      if (size > maxBytes) warnings.push(`${rel} is ${kb(size)} (over the ${kb(maxBytes)} guideline)`);
    }
  };
  walk(dir);
  return warnings;
}

async function main() {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
  const publicDir = path.join(root, "public");

  const written = await ensureOgImages({ contentDir: path.join(root, "content/blogs"), publicDir });
  for (const file of written) console.log(`✓ generated ${path.relative(root, file)}`);
  for (const warning of findImageWarnings(path.join(publicDir, "images/blogs"))) console.warn(`⚠ ${warning}`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((err) => {
    console.error(err.message);
    process.exit(1);
  });
}
