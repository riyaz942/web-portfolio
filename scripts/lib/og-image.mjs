import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

/**
 * Writes a 1200x630 JPEG social-card image from `input`.
 * @param {string} input
 * @param {string} ogPath
 */
export async function writeOgImage(input, ogPath) {
  fs.mkdirSync(path.dirname(ogPath), { recursive: true });
  await sharp(input)
    .rotate()
    .resize(1200, 630, { fit: "cover" })
    .jpeg({ quality: 85 })
    .toFile(ogPath);
}
