export const qs = (selector, root = document) => root.querySelector(selector);
export const qsa = (selector, root = document) => Array.from(root.querySelectorAll(selector));

export function iconSvg(pathMarkup) {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${pathMarkup}</svg>`;
}

export function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Builds a responsive <picture> for an image already processed by
// scripts/optimize-images.mjs (AVIF/WebP/JPEG at 480/768/1024/1440/1920w).
const IMAGE_WIDTHS = [480, 768, 1024, 1440, 1920];

export function responsivePicture(
  { src, alt, width = 1024, height = 1024 },
  { sizes = '100vw', loading = 'lazy' } = {}
) {
  const srcset = (ext) => IMAGE_WIDTHS.map((w) => `/images/${src}-${w}.${ext} ${w}w`).join(', ');
  return `
    <picture>
      <source type="image/avif" srcset="${srcset('avif')}" sizes="${sizes}" />
      <source type="image/webp" srcset="${srcset('webp')}" sizes="${sizes}" />
      <img
        src="/images/${src}-1024.jpg"
        srcset="${srcset('jpg')}"
        sizes="${sizes}"
        width="${width}"
        height="${height}"
        alt="${alt}"
        loading="${loading}"
        decoding="async"
      />
    </picture>
  `;
}
