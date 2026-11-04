#!/usr/bin/env node
// Bangkitkan varian logo SVG + PNG/favicon dari satu definisi.
// Teks di-outline dari Montserrat (path), jadi tidak butuh font terpasang.
// Pakai: npm run build:logos   (butuh devDependencies)
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import opentype from 'opentype.js';
import sharp from 'sharp';

const require = createRequire(import.meta.url);
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'assets/logo');
mkdirSync(out, { recursive: true });
mkdirSync(join(root, 'assets/favicon'), { recursive: true });

const font = (w) => opentype.loadSync(require.resolve(`@fontsource/montserrat/files/montserrat-latin-${w}-normal.woff`));
const bold = font(700);
const medium = font(500);

const C = {
  navy: '#1C366B', blue: '#3B6CA7', deep: '#274B91', cyan: '#68C0D2', light: '#5BAACB', white: '#FFFFFF', black: '#0C1A38',
};

// Teks -> path, dengan opsi tracking (letter-spacing dalam satuan em).
function textPath(f, str, x, y, size, { tracking = 0, anchor = 'start' } = {}) {
  const scale = size / f.unitsPerEm;
  const glyphs = f.stringToGlyphs(str);
  let width = 0;
  glyphs.forEach((g, i) => {
    width += g.advanceWidth * scale;
    if (i < glyphs.length - 1) width += f.getKerningValue(g, glyphs[i + 1]) * scale + tracking * size;
  });
  let cx = anchor === 'middle' ? x - width / 2 : anchor === 'end' ? x - width : x;
  let d = '';
  glyphs.forEach((g, i) => {
    d += g.getPath(cx, y, size).toPathData(2);
    cx += g.advanceWidth * scale;
    if (i < glyphs.length - 1) cx += f.getKerningValue(g, glyphs[i + 1]) * scale + tracking * size;
  });
  return { d, width };
}

// ---- Mark (ikon gelombang + node) dalam kotak 120x72 ----
// mode: 'color' | 'navy' | 'white' | 'black'
function mark(mode = 'color', id = 'mh') {
  const solid = { navy: C.navy, white: C.white, black: C.black }[mode];
  const wave = solid ?? `url(#${id}-wave)`;
  const node = solid ?? C.blue;
  const line = solid ?? `url(#${id}-line)`;
  const ring = solid ?? C.blue;
  const ringR = solid ?? C.light;
  const hole = mode === 'white' ? 'none' : mode === 'color' ? C.white : 'none';
  const defs = solid ? '' : `
    <linearGradient id="${id}-wave" x1="30" y1="6" x2="86" y2="56" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="${C.cyan}"/><stop offset=".55" stop-color="${C.blue}"/><stop offset="1" stop-color="${C.deep}"/>
    </linearGradient>
    <linearGradient id="${id}-line" x1="84" y1="40" x2="112" y2="20" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="${C.blue}"/><stop offset="1" stop-color="${C.light}"/>
    </linearGradient>`;
  return {
    defs,
    body: `
    <path d="M13.5 42.2 L31 35" stroke="${solid ?? C.blue}" stroke-width="4" stroke-linecap="round" fill="none"/>
    <path d="M89 37 L106.5 27.8" stroke="${line}" stroke-width="4" stroke-linecap="round" fill="none"/>
    <path d="M30 36 C 38 10, 52 2, 59 18 C 65 32, 70 54, 80 50 C 84 48, 86 42, 88 38" stroke="${wave}" stroke-width="11" stroke-linecap="round" fill="none"/>
    <circle cx="33" cy="34" r="7.5" fill="${node}"/>
    <circle cx="86" cy="38.5" r="7.5" fill="${node}"/>
    <circle cx="9" cy="44" r="5.5" fill="${hole}" stroke="${ring}" stroke-width="3.2"/>
    <circle cx="111" cy="25.5" r="5.5" fill="${hole}" stroke="${ringR}" stroke-width="3.2"/>`,
  };
}

const svg = (w, h, content, title, defs = '') =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${title}">
  <title>${title}</title>${defs ? `\n  <defs>${defs}\n  </defs>` : ''}
  ${content}
</svg>
`;

const files = {};

// 1. Mark saja
for (const mode of ['color', 'navy', 'white', 'black']) {
  const m = mark(mode);
  files[`maulanahrp-mark-${mode}.svg`] = svg(120, 72, `<g>${m.body}\n  </g>`, 'MaulanaHRP', m.defs);
}

// 2. Horizontal lockup: mark + wordmark 2 baris
function horizontal(mode) {
  const m = mark(mode);
  const textColor = { color: C.navy, navy: C.navy, white: C.white, black: C.black }[mode];
  const name = textPath(bold, 'MaulanaHRP', 140, 44, 40, { tracking: -0.01 });
  const tag = textPath(medium, 'Tech Solution', 141, 70, 19.5, { tracking: 0.12 });
  const w = Math.ceil(140 + Math.max(name.width, tag.width) + 6);
  return svg(w, 80, `<g transform="translate(0 4)">${m.body}\n  </g>
  <path d="${name.d}" fill="${textColor}"/>
  <path d="${tag.d}" fill="${textColor}"/>`, 'MaulanaHRP Tech Solution', m.defs);
}
for (const mode of ['color', 'navy', 'white', 'black']) files[`maulanahrp-horizontal-${mode}.svg`] = horizontal(mode);

// 3. Badge bulat bersih (versi vektor dari logo asli, tanpa tekstur)
function badge(mode) {
  const m = mark(mode);
  const ink = { color: C.navy, white: C.white }[mode];
  const name = textPath(bold, 'MaulanaHRP', 300, 372, 62, { anchor: 'middle', tracking: -0.005 });
  const tag = textPath(medium, 'Tech Solution', 300, 430, 40, { anchor: 'middle', tracking: 0.06 });
  return svg(600, 600, `<circle cx="300" cy="300" r="292" fill="none" stroke="${ink}" stroke-width="16"/>
  <circle cx="300" cy="300" r="268" fill="none" stroke="${ink}" stroke-width="5"/>
  <circle cx="300" cy="300" r="252" fill="none" stroke="${ink}" stroke-width="5"/>
  <g transform="translate(120 130) scale(3)">${m.body}\n  </g>
  <path d="${name.d}" fill="${ink}"/>
  <path d="${tag.d}" fill="${ink}"/>`, 'MaulanaHRP Tech Solution', m.defs);
}
files['maulanahrp-badge-color.svg'] = badge('color');
files['maulanahrp-badge-white.svg'] = badge('white');

// 4. App icon / favicon: mark putih di kotak navy
function appIcon(size = 512, radius = 112) {
  const m = mark('white', 'ic');
  const s = (size * 0.78) / 120;
  const tx = (size - 120 * s) / 2, ty = (size - 72 * s) / 2;
  return svg(size, size, `<rect width="${size}" height="${size}" rx="${radius}" fill="${C.navy}"/>
  <g transform="translate(${tx.toFixed(2)} ${ty.toFixed(2)}) scale(${s.toFixed(4)})">${m.body}\n  </g>`, 'MaulanaHRP', m.defs);
}
files['maulanahrp-app-icon.svg'] = appIcon();

for (const [name, content] of Object.entries(files)) writeFileSync(join(out, name), content);

// PNG turunan
const png = async (src, dest, width, bg) => {
  let img = sharp(Buffer.from(files[src]), { density: 400 }).resize({ width });
  if (bg) img = img.flatten({ background: bg });
  await img.png({ compressionLevel: 9 }).toFile(dest);
};
await png('maulanahrp-horizontal-color.svg', join(out, 'maulanahrp-horizontal-color.png'), 1200);
await png('maulanahrp-horizontal-white.svg', join(out, 'maulanahrp-horizontal-white.png'), 1200);
await png('maulanahrp-mark-color.svg', join(out, 'maulanahrp-mark-color.png'), 512);
await png('maulanahrp-badge-color.svg', join(out, 'maulanahrp-badge-color.png'), 1200);
await png('maulanahrp-app-icon.svg', join(root, 'assets/favicon/icon-512.png'), 512);
await png('maulanahrp-app-icon.svg', join(root, 'assets/favicon/apple-touch-icon.png'), 180);
await png('maulanahrp-app-icon.svg', join(root, 'assets/favicon/favicon-32.png'), 32);
writeFileSync(join(root, 'assets/favicon/favicon.svg'), files['maulanahrp-app-icon.svg']);

console.log(`OK: ${Object.keys(files).length} SVG + 7 PNG.`);
