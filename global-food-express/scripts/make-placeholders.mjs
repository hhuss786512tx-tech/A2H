/**
 * Generates labeled placeholder photography into /public/images.
 * Each file is a dark, warm, textured frame with the shot name printed on it so
 * nobody mistakes it for a real photo. Replace with real shots, same filename.
 *
 *   node scripts/make-placeholders.mjs
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const out = path.resolve("public/images");
await mkdir(out, { recursive: true });

const PALETTES = {
  "hero-spice-wall": ["#E9A83A", "#C83A2E", "#5A3A12"],
  "hero-poster": ["#E9A83A", "#9FBF8E", "#1B2A20"],
  "aisle-produce": ["#9FBF8E", "#3E6B3A", "#C83A2E"],
  "aisle-spices": ["#E9A83A", "#C83A2E", "#8A5A1A"],
  "aisle-halal-meat": ["#C83A2E", "#7A2A22", "#E9A83A"],
  "aisle-frozen": ["#CFE3DC", "#5C8A8A", "#1B2A20"],
  "aisle-sweets": ["#E9A83A", "#F4EBDD", "#C83A2E"],
  "aisle-rice-pantry": ["#F4EBDD", "#C9841E", "#5A3A12"],
  "aisle-snacks": ["#E9A83A", "#9FBF8E", "#C83A2E"],
  "store-rosenberg": ["#9FBF8E", "#E9A83A", "#14241B"],
  "store-sugar-land": ["#E9A83A", "#9FBF8E", "#14241B"],
  "halal-counter": ["#C83A2E", "#E9A83A", "#14241B"],
  team: ["#E9A83A", "#9FBF8E", "#5A3A12"],
  "whatsapp-qr-rosenberg": ["#9FBF8E", "#14241B", "#14241B"],
  "whatsapp-qr-sugar-land": ["#9FBF8E", "#14241B", "#14241B"],
  "blog-zabiha": ["#9FBF8E", "#C83A2E", "#14241B"],
  "blog-masala": ["#E9A83A", "#C83A2E", "#5A3A12"],
  "blog-basmati": ["#F4EBDD", "#C9841E", "#5A3A12"],
  "blog-mediterranean": ["#9FBF8E", "#E9A83A", "#3E6B3A"],
  "blog-eid": ["#E9A83A", "#C83A2E", "#9FBF8E"],
  "blog-cuts": ["#C83A2E", "#E9A83A", "#7A2A22"],
};

const SIZES = {
  "hero-spice-wall": [2400, 1500],
  "hero-poster": [1600, 1000],
  "aisle-produce": [1600, 2000],
  "aisle-spices": [1600, 2000],
  "aisle-halal-meat": [1600, 2000],
  "aisle-frozen": [1600, 2000],
  "aisle-sweets": [1600, 2000],
  "aisle-rice-pantry": [1600, 2000],
  "aisle-snacks": [1600, 2000],
  "store-rosenberg": [1600, 1067],
  "store-sugar-land": [1600, 1067],
  "halal-counter": [2000, 1250],
  team: [1600, 1067],
  "whatsapp-qr-rosenberg": [800, 800],
  "whatsapp-qr-sugar-land": [800, 800],
  "blog-zabiha": [1600, 1000],
  "blog-masala": [1600, 1000],
  "blog-basmati": [1600, 1000],
  "blog-mediterranean": [1600, 1000],
  "blog-eid": [1600, 1000],
  "blog-cuts": [1600, 1000],
};

const label = (k) => k.replace(/-/g, " ").toUpperCase();

function svg(key, w, h) {
  const [a, b, c] = PALETTES[key];
  const fs = Math.round(Math.min(w, h) * 0.045);
  const small = Math.round(fs * 0.55);
  const isQr = key.startsWith("whatsapp-qr");
  // pseudo-random blobs for depth
  const blobs = Array.from({ length: 7 }, (_, i) => {
    const cx = ((i * 37 + key.length * 13) % 100) / 100;
    const cy = ((i * 61 + key.length * 7) % 100) / 100;
    const r = 0.25 + ((i * 17) % 30) / 100;
    const col = [a, b, c][i % 3];
    const op = 0.18 + ((i * 11) % 20) / 100;
    return `<circle cx="${cx * w}" cy="${cy * h}" r="${r * Math.max(w, h)}" fill="${col}" fill-opacity="${op}" filter="url(#blur)"/>`;
  }).join("");
  const grid = isQr
    ? Array.from({ length: 21 * 21 }, (_, i) => {
        const x = i % 21, y = Math.floor(i / 21);
        const on = ((x * 7 + y * 13 + x * y) % 5) < 2 || (x < 7 && y < 7) || (x > 13 && y < 7) || (x < 7 && y > 13);
        const cell = w / 27;
        return on ? `<rect x="${(x + 3) * cell}" y="${(y + 3) * cell}" width="${cell}" height="${cell}" fill="#F4EBDD" fill-opacity="0.9"/>` : "";
      }).join("")
    : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <filter id="blur"><feGaussianBlur stdDeviation="${Math.max(w, h) * 0.08}"/></filter>
    <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="table" tableValues="0 0.18"/></feComponentTransfer></filter>
    <linearGradient id="vig" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#07100C" stop-opacity="0.2"/><stop offset="1" stop-color="#07100C" stop-opacity="0.85"/></linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#0D1A13"/>
  ${blobs}
  <rect width="${w}" height="${h}" fill="url(#vig)"/>
  <rect width="${w}" height="${h}" filter="url(#grain)" opacity="0.6"/>
  ${grid}
  <g font-family="Georgia, 'Times New Roman', serif" fill="#F4EBDD">
    <text x="${w * 0.06}" y="${h * 0.9}" font-size="${fs}" letter-spacing="${-fs * 0.03}">${label(key)}</text>
    <text x="${w * 0.06}" y="${h * 0.9 + small * 1.6}" font-size="${small}" fill="#CFC4B2" font-family="Helvetica, Arial, sans-serif" letter-spacing="${small * 0.12}">PLACEHOLDER · REPLACE WITH REAL PHOTO · ${w}×${h}</text>
  </g>
</svg>`;
}

for (const [key, [w, h]] of Object.entries(SIZES)) {
  const buf = Buffer.from(svg(key, w, h));
  await sharp(buf, { density: 72 }).jpeg({ quality: 78, mozjpeg: true }).toFile(path.join(out, `${key}.jpg`));
  console.log("wrote", key, `${w}x${h}`);
}
