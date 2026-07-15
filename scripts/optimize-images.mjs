import { readdir, mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

// Generates AVIF + WebP + JPEG fallback at multiple widths for every source
// image in src/assets/images/, per ADR 0005. Runs before `vite build` (see
// package.json). Output goes to public/images so Vite copies it as-is.
const SRC_DIR = path.resolve('src/assets/images');
const OUT_DIR = path.resolve('public/images');
const WIDTHS = [480, 768, 1024, 1440, 1920];
const FORMATS = [
  { ext: 'avif', options: { quality: 60 } },
  { ext: 'webp', options: { quality: 68 } },
  { ext: 'jpg', options: { quality: 78, mozjpeg: true } },
];

async function run() {
  let files;
  try {
    files = await readdir(SRC_DIR);
  } catch {
    console.log('[optimize-images] src/assets/images does not exist — nothing to do.');
    return;
  }

  const images = files.filter((file) => /\.(png|jpe?g)$/i.test(file));
  if (!images.length) {
    console.log('[optimize-images] No source images found — nothing to optimize.');
    return;
  }

  await mkdir(OUT_DIR, { recursive: true });

  for (const file of images) {
    const name = path.parse(file).name;
    const input = path.join(SRC_DIR, file);
    const metadata = await sharp(input).metadata();
    let variantCount = 0;

    for (const width of WIDTHS) {
      if (width > (metadata.width ?? Infinity)) continue; // never upscale
      for (const format of FORMATS) {
        const outFile = path.join(OUT_DIR, `${name}-${width}.${format.ext}`);
        await sharp(input)
          .resize({ width, withoutEnlargement: true })
          .toFormat(format.ext === 'jpg' ? 'jpeg' : format.ext, format.options)
          .toFile(outFile);
        variantCount += 1;
      }
    }
    console.log(`[optimize-images] ${file} → ${variantCount} variants`);
  }
}

run();
