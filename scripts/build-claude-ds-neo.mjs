#!/usr/bin/env node
// Bangun folder "project/" untuk Design System claude.ai "MaulanaHRP Neubrutalism".
//   tokens/tokens.json + tokens/neubrutalism.json -> project/tokens.json (nilai neo langsung, tanpa data-style)
//   css/components.css (tanpa blok token bentuk) + themes/neubrutalism/components.css -> project/components/bundle.css
//   claude-ds/components/*/ (README & preview, dipakai ulang + data-style) + claude-ds-neo/** -> project/**
// Pakai: node scripts/build-claude-ds-neo.mjs <folder-output>
import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync, rmSync, existsSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = process.argv[2];
if (!outDir) { console.error('Pakai: node scripts/build-claude-ds-neo.mjs <folder-output>'); process.exit(1); }
const out = join(outDir, 'project');
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

const base = JSON.parse(readFileSync(join(root, 'tokens/tokens.json'), 'utf8'));
const neo = JSON.parse(readFileSync(join(root, 'tokens/neubrutalism.json'), 'utf8'));
const assets = JSON.parse(readFileSync(join(root, 'scripts/claude-ds-neo-assets.json'), 'utf8'));
const TITLE = 'MaulanaHRP Neubrutalism';

const leaves = (node, path = []) => Object.entries(node).flatMap(([k, v]) =>
  k.startsWith('$') ? [] : v && typeof v === 'object' && '$value' in v ? [[[...path, k], v]] : v && typeof v === 'object' ? leaves(v, [...path, k]) : []);
const flat = (node) => Object.fromEntries(leaves(node).map(([p, v]) => [p.join('.'), v.$value]));
const neoColors = flat({ color: neo.color });
const toAlias = (v) => String(v).replace(/^\{color\.neo\.([^}]+)\}$/, '{mh-color-neo-$1}');
const toHex = (v) => String(v).replace(/\{([^}]+)\}/g, (_, r) => { if (!(r in neoColors)) throw new Error(`ref ${r}`); return neoColors[r]; });

// ---------- Warna ----------
const paletteUsage = {
  ink: 'Tinta: border, bayangan keras, teks di atas semua blok terang.', paper: 'Latar halaman (light); border & bayangan tombol di dark.',
  white: 'Permukaan card & input (light).', navy: 'Navy brand: mh-primary untuk teks/aksi (light).', cyan: 'Cyan brand: FILL UTAMA button primary, tab aktif, blok hero; bayangan di dark. Teks: ink (8.2:1).',
  sky: 'Blok sekunder, header tabel, badge default, hover fill. Teks: ink.', blue: 'Blok dekoratif. Teks putih (5.4:1).', sun: 'Pop kuning: CTA accent, stiker, stabilo, overline, nav aktif. Teks: ink.',
  'sun-soft': 'Latar peringatan & aksen lembut. Teks: ink.', mint: 'Fill sukses (badge). Teks: ink.', 'mint-soft': 'Latar alert sukses.',
  coral: 'Fill bahaya (button hapus, badge). Teks: ink.', 'coral-soft': 'Latar alert bahaya.', 'ink-2': 'Permukaan card di dark.', 'ink-3': 'Permukaan terangkat & latar lembut di dark.',
};
const semUsage = {
  bg: 'Latar halaman.', 'bg-subtle': 'Latar section selang-seling, hover input.', 'bg-muted': 'Hover button secondary/ghost/tab.', surface: 'Card, input, tabel.', 'surface-raised': 'Dialog.',
  'surface-inverse': 'Card inverse, toast. Teks: mh-text-inverse.', border: 'Border semua komponen (tinta).', 'border-strong': 'Border input.', text: 'Teks isi di atas mh-bg, mh-surface, mh-primary-subtle, mh-accent-subtle.',
  'text-muted': 'Teks sekunder di atas mh-bg/mh-bg-subtle.', 'text-subtle': 'Placeholder & caption di atas mh-bg.', 'text-inverse': 'Teks di atas mh-surface-inverse.', heading: 'Judul di atas mh-bg.',
  primary: 'Teks/aksi navy: link, tombol secondary, elemen aktif (BUKAN fill tombol; fill tombol = mh-neo-fill).', 'primary-hover': 'Hover elemen primary.', 'primary-active': 'Elemen primary ditekan.',
  'primary-subtle': 'Header tabel, latar ringan. Teks: mh-text.', 'on-primary': 'Teks di atas mh-primary.', accent: 'Kuning sun: button accent, stiker, overline. Teks: mh-on-accent.',
  'accent-strong': 'Teks aksen di atas mh-bg.', 'accent-subtle': 'Latar ikon tile, hover baris tabel, alert peringatan. Teks: mh-text.', 'on-accent': 'Teks di atas mh-accent.', link: 'Tautan di atas mh-bg.',
  success: 'Teks sukses di atas mh-bg/mh-success-subtle.', 'success-subtle': 'Latar alert sukses.', warning: 'Teks peringatan di atas mh-bg/mh-warning-subtle.', 'warning-subtle': 'Latar alert peringatan.',
  danger: 'Teks error, border input invalid.', 'danger-subtle': 'Latar alert bahaya.', info: 'Teks info di atas mh-info-subtle.', 'info-subtle': 'Latar alert info.',
  'neo-fill': 'Fill tombol primary, tab & halaman aktif, checkbox tercentang (cyan). Teks: mh-on-neo-fill.', 'neo-fill-hover': 'Hover fill tombol primary.', 'on-neo-fill': 'Teks di atas mh-neo-fill.',
  'neo-ink': 'Garis & bayangan: tinta di light, paper di dark. Dipakai untuk border semua komponen.',
};
const colorTokens = [];
for (const [p, v] of leaves(neo.color.neo)) colorTokens.push({ name: `mh-color-neo-${p.join('-')}`, value: v.$value, usage: paletteUsage[p.join('-')] || '' });
const L = flat(neo.semantic.light), D = flat(neo.semantic.dark);
for (const k of Object.keys(L)) colorTokens.push({ name: `mh-${k}`, value: { light: toAlias(L[k]), dark: toAlias(D[k] ?? L[k]) }, usage: semUsage[k] || '' });
const SL = flat(neo.shape.light), SD = flat(neo.shape.dark);
colorTokens.push({ name: 'mh-border-color', value: { light: toAlias(SL['border-color']), dark: toAlias(SD['border-color']) }, usage: 'Warna border komponen (= mh-neo-ink).' });
colorTokens.push({ name: 'mh-overlay', value: { light: SL.overlay, dark: SD.overlay }, usage: 'Backdrop dialog.' });

// ---------- Shadow (keras, per tema) ----------
const shadowKeys = ['shadow-sm', 'shadow-md', 'shadow-lg', 'card-shadow', 'card-shadow-hover', 'btn-shadow', 'btn-shadow-hover', 'btn-shadow-active', 'focus-ring'];
const shadowUse = { 'shadow-sm': 'Pagination aktif, stiker kecil.', 'shadow-md': 'Alert, toast, swatch.', 'shadow-lg': 'Dialog, post sosmed.', 'card-shadow': 'Card & blok neo.', 'card-shadow-hover': 'Card interaktif saat hover.',
  'btn-shadow': 'Tombol diam; input saat fokus.', 'btn-shadow-hover': 'Tombol hover (diangkat 2px).', 'btn-shadow-active': 'Tombol ditekan (geser 4px, bayangan hilang).', 'focus-ring': 'Cincin fokus ganda (≥3:1 di semua permukaan).' };
const shadow = { tokens: shadowKeys.map((k) => ({ name: `mh-${k}`, value: { light: toHex(SL[k]), dark: toHex(SD[k] ?? SL[k]) }, usage: shadowUse[k] })) };

// ---------- Tipografi ----------
const fam = base.font.family;
const type = {
  fonts: [],
  families: { heading: fam.heading.$value, body: fam.body.$value, label: neo.font.label.$value },
  groups: [
    { name: 'Heading', family: 'heading', styles: [
      { name: 'neo-display', fontSize: '72px', lineHeight: 1, fontWeight: 800, letterSpacing: '-0.03em', sample: 'Berani tampil beda', usage: 'Hero kampanye, judul post sosmed. Montserrat 800.' },
      { name: 'neo-h1', fontSize: '48px', lineHeight: 1.05, fontWeight: 800, letterSpacing: '-0.03em', sample: 'Go Digital UMKM', usage: 'H1 landing, judul slide.' },
      { name: 'neo-h2', fontSize: '32px', lineHeight: 1.1, fontWeight: 800, letterSpacing: '-0.03em', sample: 'Paket hemat', usage: 'H2 section.' },
      { name: 'neo-h3', fontSize: '22px', lineHeight: 1.2, fontWeight: 800, letterSpacing: '-0.02em', sample: 'Website kilat', usage: 'Judul card.' },
      { name: 'neo-stat', fontSize: '40px', lineHeight: 1, fontWeight: 800, sample: '120+', usage: 'Angka besar.' },
    ] },
    { name: 'Text', family: 'body', styles: [
      { name: 'neo-lead', fontSize: '20px', lineHeight: 1.5, fontWeight: 500, sample: 'Live dalam 14 hari, siap jualan.', usage: 'Paragraf pembuka.' },
      { name: 'neo-body', fontSize: '16px', lineHeight: 1.55, fontWeight: 400, sample: 'Link webinar dikirim ke email kamu.', usage: 'Body default.' },
      { name: 'neo-ui', fontSize: '14px', lineHeight: 1.4, fontWeight: 600, sample: 'Daftar sekarang', usage: 'Label form, tombol.' },
    ] },
    { name: 'Label', family: 'label', styles: [
      { name: 'neo-label', fontSize: '12px', lineHeight: 1.3, fontWeight: 700, letterSpacing: '0.04em', sample: 'PROMO', usage: 'Badge, overline, stiker, header tabel. Kapital.' },
      { name: 'neo-sticker', fontSize: '14px', lineHeight: 1.2, fontWeight: 700, sample: 'KONSULTASI GRATIS!', usage: 'Stiker miring (maks. 1 per desain).' },
    ] },
  ],
};

const list = (obj, prefix, use) => ({ tokens: leaves(obj).map(([p, v]) => ({ name: `mh-${prefix}-${p.join('-')}`, value: v.$value, usage: use(p, v) })) });
const radius = list(base.radius, 'radius', (p) => `Radius ${p[0]}.`);
radius.tokens.push({ name: 'mh-control-radius', value: SL['control-radius'], usage: 'Tombol, input, tab (6px).' }, { name: 'mh-card-radius', value: SL['card-radius'], usage: 'Card, blok, tabel, dialog (10px).' });
const fontWeight = list(base.font.weight, 'font-weight', (p) => `Bobot ${p[0]}.`);
fontWeight.tokens.push({ name: 'mh-btn-weight', value: SL['btn-weight'], usage: 'Teks tombol.' }, { name: 'mh-heading-weight', value: SL['heading-weight'], usage: 'Heading (Montserrat 800).' });

const tokens = {
  name: TITLE, version: 1,
  color: { themes: [{ id: 'light', name: 'Terang' }, { id: 'dark', name: 'Gelap' }], tokens: colorTokens },
  type,
  spacing: list(base.space, 'space', (p, v) => `Grid 4px (${v.$value}).`),
  radius,
  shadow,
  shape: { tokens: [
    { name: 'mh-border-width', value: SL['border-width'], usage: 'Tebal border semua komponen (dialog & post sosmed 3px).' },
    { name: 'mh-control-height', value: SL['control-height'], usage: 'Tinggi tombol & input.' },
    { name: 'mh-btn-lift', value: SL['btn-lift'], usage: 'Tombol naik saat hover.' },
    { name: 'mh-btn-press', value: SL['btn-press'], usage: 'Tombol turun saat ditekan.' },
  ] },
  fontSize: list(base.font.size, 'font-size', (p) => `Skala ${p[0]}.`),
  fontWeight,
  lineHeight: list(base.font['line-height'], 'font-line-height', (p) => `Line-height ${p[0]}.`),
  letterSpacing: list(base.font['letter-spacing'], 'font-letter-spacing', (p) => `Letter-spacing ${p[0]}.`),
  zIndex: list(base.z, 'z', (p) => `Lapisan ${p[0]}.`),
};

// ---------- bundle.css ----------
let comp = readFileSync(join(root, 'css/components.css'), 'utf8');
const startIdx = comp.indexOf('/* ---------- Token bentuk komponen');
const endIdx = comp.indexOf('/* ---------- Base ----------');
if (startIdx < 0 || endIdx < 0) throw new Error('Blok token bentuk tidak ditemukan di components.css');
comp = comp.slice(0, startIdx) + comp.slice(endIdx);
const m = base.motion;
const bundleCss = `/* MaulanaHRP Neubrutalism — bundle.css (dibangkitkan dari repo: css/components.css + themes/neubrutalism/components.css).
 * Nilai token ada di tokens.json. :root di bawah hanya alias font, gradasi & motion.
 * Komponen neo aktif di dalam elemen ber-atribut data-style="neubrutalism".
 */
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@700;800&family=JetBrains+Mono:wght@500;700&display=swap");

:root {
  --mh-font-family-heading: var(--font-heading);
  --mh-font-family-body: var(--font-body);
  --mh-font-family-mono: var(--font-label);
  --mh-font-family-label: var(--font-label);
  --mh-btn-font: var(--font-heading);
  --mh-color-gradient-brand: ${base.color.gradient.brand.$value};
  --mh-color-gradient-wave: ${base.color.gradient.wave.$value};
  --mh-motion-duration-fast: ${m.duration.fast.$value};
  --mh-motion-duration-base: ${m.duration.base.$value};
  --mh-motion-duration-slow: ${m.duration.slow.$value};
  --mh-motion-easing-standard: ${m.easing.standard.$value};
  --mh-motion-easing-out: ${m.easing.out.$value};
}
[data-theme="dark"] { color-scheme: dark; }

${comp}
${readFileSync(join(root, 'themes/neubrutalism/components.css'), 'utf8')}`;
if (/<\/style/i.test(bundleCss)) throw new Error('bundle.css mengandung </style');

// ---------- Tulis ----------
const write = (p, s) => { mkdirSync(dirname(join(out, p)), { recursive: true }); writeFileSync(join(out, p), s); };
write('tokens.json', JSON.stringify(tokens, null, 2) + '\n');
write('components/bundle.css', bundleCss);

const blobMap = assets.remap || {};
const remap = (s) => Object.entries(blobMap).reduce((acc, [a, b]) => acc.split(a).join(b), s);
const neoNotes = JSON.parse(readFileSync(join(root, 'claude-ds-neo/component-notes.json'), 'utf8'));
const compDir = join(root, 'claude-ds/components');
for (const c of readdirSync(compDir)) {
  if (c === 'Cover') continue;
  const prev = readFileSync(join(compDir, c, 'preview.html'), 'utf8');
  if (!/class="mh-root/.test(prev)) throw new Error(`preview ${c} tanpa mh-root`);
  write(`components/${c}/preview.html`, remap(prev.replace(/class="mh-root/, 'data-style="neubrutalism" class="mh-root')));
  const readme = readFileSync(join(compDir, c, 'README.md'), 'utf8');
  write(`components/${c}/README.md`, readme.trimEnd() + (neoNotes[c] ? `\n\n**Di Neubrutalism:** ${neoNotes[c]}\n` : '\n'));
}
const copyDir = (dir) => {
  for (const f of readdirSync(dir)) {
    const full = join(dir, f);
    if (f === 'component-notes.json') continue;
    if (statSync(full).isDirectory()) copyDir(full);
    else write(relative(join(root, 'claude-ds-neo'), full), readFileSync(full, 'utf8'));
  }
};
copyDir(join(root, 'claude-ds-neo'));

const now = new Date().toISOString().replace(/\.\d+Z$/, 'Z');
const assetGroups = {};
for (const [group, g] of Object.entries(assets.groups)) {
  assetGroups[group] = { name: group, tile: g.tile, order: g.files.map((f) => f.name), files: Object.fromEntries(g.files.map((f) => [f.name, { name: f.name, blob: f.blob, size: f.size, type: f.type }])) };
}
write('design-system.json', JSON.stringify({
  v: 3, layout: 'files', createdOnFiles: { v: 1, at: assets.createdAt || now }, title: TITLE, namespace: 'MaulanaHRPNeo', libraries: [],
  sections: {}, groups: Object.keys(assets.groups), assetGroups, blobs: {}, docs: { readme: 'project/README.md', sections: [] },
  lastChange: { by: 'Claude', at: now, via: 'Claude Code', note: process.env.NOTE || 'Dibangun dari repo design-system (tokens/neubrutalism.json, themes/neubrutalism/).' },
}, null, 2) + '\n');

const count = (d) => readdirSync(d).reduce((n, f) => n + (statSync(join(d, f)).isDirectory() ? count(join(d, f)) : 1), 0);
console.log(`OK: ${count(out)} file · ${colorTokens.length} warna · ${shadow.tokens.length} shadow.`);
