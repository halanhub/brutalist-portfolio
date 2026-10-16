// Generates responsive derivatives of the original project screenshots and portrait.
// The originals in public/assets are never modified — this only resizes and re-encodes copies.
import sharp from "sharp";
import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..", "public", "assets");
const out = path.join(root, "optimized");

const jobs = [
  { dir: "projects", widths: [800, 1400, 2200] },
  { dir: ".", files: ["profilewebp.webp"], widths: [480, 747] },
];

await mkdir(out, { recursive: true });

for (const job of jobs) {
  const dir = path.join(root, job.dir);
  const files = job.files ?? (await readdir(dir)).filter((f) => f.endsWith(".webp"));
  for (const file of files) {
    const base = path.basename(file, ".webp").toLowerCase();
    for (const width of job.widths) {
      const target = path.join(out, `${base}-${width}.webp`);
      const info = await sharp(path.join(dir, file))
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 82, alphaQuality: 90, effort: 5 })
        .toFile(target);
      console.log(`${path.relative(root, target)}  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`);
    }
  }
}
