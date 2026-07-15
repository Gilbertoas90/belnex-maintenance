import path from 'node:path';
import sharp from 'sharp';

// One-off generator for the static Open Graph share image (ADR 0006).
// Not part of the build pipeline — run manually if the OG design changes:
//   node scripts/generate-og-image.mjs
const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="80%" cy="20%" r="80%">
      <stop offset="0%" stop-color="#8DFF00" stop-opacity="0.18" />
      <stop offset="55%" stop-color="#8DFF00" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="#050505" />
  <rect width="1200" height="630" fill="url(#glow)" />
  <g stroke="#8DFF00" stroke-width="3" opacity="0.5">
    <line x1="820" y1="630" x2="1080" y2="370" />
    <line x1="880" y1="630" x2="1140" y2="370" opacity="0.35" />
    <line x1="940" y1="630" x2="1200" y2="370" opacity="0.2" />
  </g>
  <path d="M120 210 L82 275 h34 l-10 55 62-70 h-34 l6-45z" fill="#8DFF00" />
  <text x="160" y="270" font-family="Arial, sans-serif" font-size="52" font-weight="700" fill="#FFFFFF">
    BEL<tspan fill="#8DFF00">NEX</tspan> ENERGY
  </text>
  <text x="120" y="340" font-family="Arial, sans-serif" font-size="30" font-weight="700" fill="#FFFFFF">
    Smart Energy for Modern Living
  </text>
  <text x="120" y="385" font-family="Arial, sans-serif" font-size="22" fill="#B3B3B3">
    Electrical · Solar · Smart Home · Batteries · EV Charging · Belgium
  </text>
</svg>
`;

const outFile = path.resolve('public/og-image.png');
await sharp(Buffer.from(svg)).png().toFile(outFile);
console.log(`[generate-og-image] wrote ${outFile}`);
