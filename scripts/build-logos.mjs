#!/usr/bin/env node
// Susun semua varian logo dari hasil vektorisasi logo asli.
// Sumber: assets/logo/source/badge-trace.json (dibuat oleh scripts/trace-badge.py
// dari assets/logo/maulanahrp-badge.png). Bentuk & warna TIDAK digambar ulang:
// skrip ini hanya menata ulang bagian-bagian asli (badge, mark, lockup horizontal, ikon).
// Pakai: npm run build:logos
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'assets/logo');
mkdirSync(join(root, 'assets/favicon'), { recursive: true });

const T = JSON.parse(readFileSync(join(out, 'source/badge-trace.json'), 'utf8'));
const P = T.paths;
const INK = { navy: T.colors.navy, white: '#FFFFFF', black: '#0C1A38' };
const r2 = (n) => Math.round(n * 100) / 100;

// ---- defs gradien + clip pita terang gelombang (id diberi prefix agar aman di-inline)
function markDefs(px) {
  const grads = T.gradients.map((g) =>
    `<linearGradient id="${px}-${g.id}" gradientUnits="userSpaceOnUse" x1="${g.x1}" y1="${g.y1}" x2="${g.x2}" y2="${g.y2}">` +
    g.stops.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join('') +
    '</linearGradient>').join('\n    ');
  return `${grads}\n    <clipPath id="${px}-clip-wave"><path d="${P.wave}"/></clipPath>`;
}

// mode: 'color' | 'navy' | 'white' | 'black'
function markBody(mode, px) {
  if (mode === 'color') {
    return `<path fill="url(#${px}-wave-dark)" fill-rule="evenodd" d="${P.wave}"/>
    <path fill="url(#${px}-wave-light)" fill-rule="evenodd" clip-path="url(#${px}-clip-wave)" d="${P.waveLight}"/>
    <path fill="url(#${px}-conn-l)" fill-rule="evenodd" d="${P.connL}"/>
    <path fill="url(#${px}-conn-r)" fill-rule="evenodd" d="${P.connR}"/>`;
  }
  return `<g fill="${INK[mode]}" fill-rule="evenodd"><path d="${P.wave}"/><path d="${P.connL}"/><path d="${P.connR}"/></g>`;
}

function textBody(mode) {
  const t = mode === 'color' ? T.colors.navy : INK[mode];
  const s = mode === 'color' ? T.colors.subtitle : INK[mode];
  return `<path fill="${t}" fill-rule="evenodd" d="${P.title}"/>
    <path fill="${s}" fill-rule="evenodd" d="${P.subtitle}"/>`;
}

const svg = ([vx, vy, vw, vh], [w, h], content, title, defs = '') =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${r2(vx)} ${r2(vy)} ${r2(vw)} ${r2(vh)}" width="${r2(w)}" height="${r2(h)}" role="img" aria-label="${title}">
  <title>${title}</title>${defs ? `\n  <defs>\n    ${defs}\n  </defs>` : ''}
  ${content}
</svg>
`;

const files = {};
const FULL = 'MaulanaHRP Tech Solution';

// 1. Badge (logo utama). color = tanpa bintik (master), original = arsip bertekstur.
function badge(mode, { textured = false } = {}) {
  const px = `mh-badge-${mode}${textured ? '-tex' : ''}`;
  const box = T.badgeBox;
  const ink = mode === 'color' ? T.colors.navy : INK[mode];
  const disc = mode === 'color' ? `<path fill="#FFFFFF" d="${P.disc}"/>\n  ` : '';
  return svg(box, [box[2], box[3]], `${disc}<path fill="${ink}" fill-rule="evenodd" d="${textured ? P.ringsTextured : P.rings}"/>
  ${textBody(mode)}
  ${markBody(mode, px)}`, FULL, mode === 'color' ? markDefs(px) : '');
}
files['maulanahrp-badge-color.svg'] = badge('color');
files['maulanahrp-badge-white.svg'] = badge('white');
files['maulanahrp-badge-original.svg'] = badge('color', { textured: true });

// 2. Mark saja (gelombang + konektor), kotak rapat + padding tipis
const [mx0, my0, mx1, my1] = T.boxes.mark;
const pad = 4;
const markBox = [mx0 - pad, my0 - pad, mx1 - mx0 + 2 * pad, my1 - my0 + 2 * pad];
for (const mode of ['color', 'navy', 'white', 'black']) {
  const px = `mh-mark-${mode}`;
  const h = 72;
  files[`maulanahrp-mark-${mode}.svg`] = svg(markBox, [(markBox[2] / markBox[3]) * h, h],
    markBody(mode, px), 'MaulanaHRP', mode === 'color' ? markDefs(px) : '');
}

// 3. Lockup horizontal: mark di kiri, blok teks asli (judul + subjudul, posisi relatif
//    keduanya tidak diubah) di kanan, sejajar tengah vertikal.
function horizontal(mode) {
  const px = `mh-hz-${mode}`;
  const tx0 = Math.min(T.boxes.title[0], T.boxes.subtitle[0]);
  const tx1 = Math.max(T.boxes.title[2], T.boxes.subtitle[2]);
  const ty0 = T.boxes.title[1];
  const ty1 = T.boxes.subtitle[3];
  const th = ty1 - ty0;
  const k = (th * 1.1) / (my1 - my0); // tinggi mark = 1.1 x tinggi blok teks
  const mw = (mx1 - mx0) * k;
  const gap = th * 0.32;
  const H = th * 1.1;
  // mark: pindahkan pojok kiri-atas kotak mark ke (0,0) lalu skala k
  const markG = `<g transform="translate(0 0) scale(${r2(k * 1000) / 1000}) translate(${r2(-mx0)} ${r2(-my0)})">
    ${markBody(mode, px)}
  </g>`;
  const textX = mw + gap;
  const textY = (H - th) / 2;
  const textG = `<g transform="translate(${r2(textX - tx0)} ${r2(textY - ty0)})">
    ${textBody(mode)}
  </g>`;
  const W = textX + (tx1 - tx0);
  const h = 80;
  return svg([0, 0, W, H], [(W / H) * h, h], `${markG}\n  ${textG}`, FULL, mode === 'color' ? markDefs(px) : '');
}
for (const mode of ['color', 'navy', 'white', 'black']) files[`maulanahrp-horizontal-${mode}.svg`] = horizontal(mode);

// 4. App icon / favicon: mark putih di kotak navy
function appIcon(size = 512, radius = 112) {
  const s = (size * 0.78) / (mx1 - mx0);
  const tx = (size - (mx1 - mx0) * s) / 2 - mx0 * s;
  const ty = (size - (my1 - my0) * s) / 2 - my0 * s;
  return svg([0, 0, size, size], [size, size], `<rect width="${size}" height="${size}" rx="${radius}" fill="${T.colors.navy}"/>
  <g transform="translate(${r2(tx)} ${r2(ty)}) scale(${r2(s * 10000) / 10000})">${markBody('white', 'mh-icon')}</g>`, 'MaulanaHRP');
}
files['maulanahrp-app-icon.svg'] = appIcon();

for (const [name, content] of Object.entries(files)) writeFileSync(join(out, name), content);
// versi "clean" lama kini identik dengan badge-color -> hapus agar tidak ada duplikat
rmSync(join(out, 'maulanahrp-badge-original-clean.svg'), { force: true });

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

// Motif dekoratif (supergrafis) = mark asli satu warna (currentColor).
// Disuntikkan ke elemen <svg>/<symbol> bertanda data-mh-motif, dan rasio
// aspeknya ke aturan CSS bertanda /* mh-motif */.
const vb = markBox.map(r2).join(' ');
const motif = `<g fill="currentColor" fill-rule="evenodd"><path d="${P.wave}"/><path d="${P.connL}"/><path d="${P.connR}"/></g>`;
const motifFiles = [
  'index.html', 'templates/deck.html', 'templates/deck.css', 'templates/kartu-nama.html',
  'claude-ds/components/Cover/preview.html', 'claude-ds-neo/components/Cover/preview.html',
];
for (const rel of motifFiles) {
  const f = join(root, rel);
  const before = readFileSync(f, 'utf8');
  const after = before
    .replace(/<(svg|symbol)([^>]*?)\sdata-mh-motif([^>]*?)>[\s\S]*?<\/\1>/g, (_, tag, a, b) =>
      `<${tag}${a} data-mh-motif${b.replace(/viewBox="[^"]*"/, `viewBox="${vb}"`)}>${motif}</${tag}>`)
    .replace(/aspect-ratio: [\d.]+ \/ [\d.]+; \/\* mh-motif \*\//g, `aspect-ratio: ${r2(markBox[2])} / ${r2(markBox[3])}; /* mh-motif */`);
  if (after !== before) writeFileSync(f, after);
}

console.log(`OK: ${Object.keys(files).length} SVG + 7 PNG, motif di ${motifFiles.length} file.`);
