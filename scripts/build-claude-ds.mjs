#!/usr/bin/env node
// Bangun folder "project/" untuk Design System di claude.ai dari sumber repo.
//   tokens/tokens.json  -> project/tokens.json (format list yang dibaca claude.ai)
//   css/components.css  -> project/components/bundle.css (+ alias variabel non-token)
//   claude-ds/**        -> project/** (README, section, README & preview komponen, cover)
//   scripts/claude-ds-assets.json -> assetGroups di project/design-system.json
// Pakai: node scripts/build-claude-ds.mjs <folder-output>
import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync, rmSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = process.argv[2];
if (!outDir) { console.error('Pakai: node scripts/build-claude-ds.mjs <folder-output>'); process.exit(1); }
const out = join(outDir, 'project');
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

const src = JSON.parse(readFileSync(join(root, 'tokens/tokens.json'), 'utf8'));
const assets = JSON.parse(readFileSync(join(root, 'scripts/claude-ds-assets.json'), 'utf8'));
const TITLE = 'MaulanaHRP Design System';

const leaves = (node, path = []) => Object.entries(node).flatMap(([k, v]) =>
  k.startsWith('$') ? [] : v && typeof v === 'object' && '$value' in v ? [[[...path, k], v]] : v && typeof v === 'object' ? leaves(v, [...path, k]) : []);
const name = (path) => 'mh-' + path.join('-');

// ---------- Warna ----------
const scaleUsage = {
  navy: { _: 'Skala navy brand.', 50: 'Latar lembut elemen primary (primary-subtle, info-subtle).', 300: 'Primary di dark mode; batang grafik non-sorotan.', 500: 'Wave Blue: ilustrasi, grafik, gradasi. Teks putih di atasnya 5.4:1.', 600: 'Link di light mode.', 700: 'Blue: aksi utama (button primary) di light mode. Putih di atasnya 8.4:1.', 800: 'NAVY BRAND (logo, wordmark): heading, latar slide/section gelap. Putih di atasnya 11.7:1.', 950: 'Navy tergelap: teks di atas cyan-400 (8.2:1), latar blok kode.' },
  cyan: { _: 'Skala cyan aksen.', 50: 'Latar lembut aksen (accent-subtle), slide kutipan.', 400: 'CYAN BRAND: aksen, focus ring, bullet, garis gelombang. JANGAN jadi teks di atas putih (2.1:1).', 700: 'Teks/ikon cyan di atas putih (5.7:1), kicker/overline.' },
  neutral: { _: 'Abu-abu bernuansa biru untuk teks, border, latar.', 0: 'Putih.', 500: 'Teks paling lemah yang masih lolos AA di putih (4.95:1).', 900: 'Teks isi di light mode.', 950: 'Latar halaman di dark mode.' },
  success: { _: 'Status berhasil.', 50: 'Latar badge/alert sukses (light).', 400: 'Teks sukses di dark mode.', 500: 'Ikon & grafik sukses.', 700: 'Teks sukses di light mode.' },
  warning: { _: 'Status peringatan.', 50: 'Latar badge/alert peringatan (light).', 500: 'Ikon, grafik, teks peringatan di dark mode.', 700: 'Teks peringatan di light mode.' },
  danger: { _: 'Status bahaya/error.', 50: 'Latar badge/alert bahaya (light).', 500: 'Ikon & grafik bahaya.', 700: 'Teks bahaya & button danger di light mode.' },
};
const semUsage = {
  'bg': 'Latar halaman. Teks: mh-text, mh-text-muted, mh-heading.',
  'bg-subtle': 'Latar section selang-seling, header tabel.',
  'bg-muted': 'Latar input disabled, code inline, track progress.',
  'surface': 'Card, panel, input.',
  'surface-raised': 'Dialog, dropdown (lebih terang di dark mode).',
  'surface-inverse': 'Card inverse, toast, tooltip. Teks: mh-text-inverse.',
  'border': 'Garis pembatas, border card & tabel.',
  'border-strong': 'Border input, checkbox, button secondary.',
  'text': 'Teks isi di atas mh-bg, mh-surface, mh-bg-muted.',
  'text-muted': 'Teks sekunder, label tabel, deskripsi di atas mh-bg / mh-bg-subtle.',
  'text-subtle': 'Placeholder, metadata, caption di atas mh-bg (≥4.5:1).',
  'text-inverse': 'Teks di atas mh-surface-inverse.',
  'heading': 'Judul h1–h4 di atas mh-bg.',
  'primary': 'Button primary, tab & halaman aktif, checkbox tercentang. Juga teks/ikon primary di atas mh-bg.',
  'primary-hover': 'Hover button primary.',
  'primary-active': 'Button primary saat ditekan.',
  'primary-subtle': 'Latar badge default, hover button secondary/ghost, nav aktif.',
  'on-primary': 'Teks/ikon di atas mh-primary.',
  'accent': 'Aksen cyan: button accent, highlight. Teks di atasnya: mh-on-accent.',
  'accent-strong': 'Overline/kicker, teks badge accent di atas mh-bg / mh-accent-subtle.',
  'accent-subtle': 'Latar ikon tile & badge accent.',
  'on-accent': 'Teks di atas mh-accent.',
  'link': 'Tautan di atas mh-bg.',
  'success': 'Teks status sukses di atas mh-bg / mh-success-subtle.',
  'success-subtle': 'Latar alert/badge sukses.',
  'warning': 'Teks status peringatan di atas mh-bg / mh-warning-subtle.',
  'warning-subtle': 'Latar alert/badge peringatan.',
  'danger': 'Teks error, button danger, border input invalid; di atas mh-bg / mh-danger-subtle.',
  'danger-subtle': 'Latar alert/badge bahaya.',
  'info': 'Teks/aksen alert info di atas mh-info-subtle.',
  'info-subtle': 'Latar alert info.',
};

const colorTokens = [];
for (const [path, v] of leaves(src.color)) {
  if (path[0] === 'gradient') continue; // gradasi bukan token warna: lihat bundle.css
  const u = scaleUsage[path[0]] || {};
  colorTokens.push({ name: name(['color', ...path]), value: v.$value, usage: u[path[1]] || `${u._ || ''} Langkah ${path[1]}.`.trim() });
}
const alias = (v) => v.replace(/\{([^}]+)\}/g, (_, ref) => `{mh-${ref.replace(/\./g, '-')}}`);
const light = Object.fromEntries(leaves(src.semantic.light).map(([p, v]) => [p.join('-'), v.$value]));
const dark = Object.fromEntries(leaves(src.semantic.dark).map(([p, v]) => [p.join('-'), v.$value]));
for (const k of Object.keys(light)) {
  colorTokens.push({ name: `mh-${k}`, value: { light: alias(light[k]), dark: alias(dark[k]) }, usage: semUsage[k] || '' });
}

// ---------- Tipografi ----------
const fam = src.font.family;
const type = {
  fonts: [],
  families: { heading: fam.heading.$value, body: fam.body.$value, mono: fam.mono.$value },
  groups: [
    { name: 'Heading', family: 'heading', styles: [
      { name: 'type-display', fontSize: '60px', lineHeight: 1.15, fontWeight: 700, letterSpacing: '-0.02em', sample: 'Sistem yang bekerja', usage: 'Hero web, judul cover. Montserrat 700.' },
      { name: 'type-h1', fontSize: '38px', lineHeight: 1.15, fontWeight: 700, letterSpacing: '-0.02em', sample: 'Transformasi digital', usage: 'H1 halaman aplikasi.' },
      { name: 'type-h2', fontSize: '30px', lineHeight: 1.3, fontWeight: 700, letterSpacing: '-0.02em', sample: 'Layanan kami', usage: 'H2 section.' },
      { name: 'type-h3', fontSize: '24px', lineHeight: 1.3, fontWeight: 700, sample: 'Pengembangan web', usage: 'H3, judul card besar.' },
      { name: 'type-h4', fontSize: '20px', lineHeight: 1.3, fontWeight: 700, sample: 'Ringkasan proyek', usage: 'H4, judul card.' },
      { name: 'type-stat', fontSize: '38px', lineHeight: 1, fontWeight: 700, sample: '98%', usage: 'Angka statistik/KPI; tabular-nums.' },
    ] },
    { name: 'Text', family: 'body', styles: [
      { name: 'type-lead', fontSize: '20px', lineHeight: 1.55, fontWeight: 400, sample: 'Sistem yang bekerja, supaya tim Anda bisa fokus bertumbuh.', usage: 'Paragraf pembuka, warna mh-text-muted.' },
      { name: 'type-body', fontSize: '16px', lineHeight: 1.55, fontWeight: 400, sample: 'Laporan stok otomatis terkirim setiap pagi pukul 07.00.', usage: 'Body default. Lebar baris maks. 68ch.' },
      { name: 'type-ui', fontSize: '14px', lineHeight: 1.45, fontWeight: 500, sample: 'Simpan perubahan', usage: 'Label form, button, tabel, UI padat.' },
      { name: 'type-caption', fontSize: '12px', lineHeight: 1.45, fontWeight: 400, sample: 'Diperbarui 4 Nov 2026', usage: 'Caption, footnote, help text.' },
      { name: 'type-overline', fontSize: '12px', lineHeight: 1.3, fontWeight: 600, letterSpacing: '0.06em', sample: 'LAYANAN', usage: 'Overline/kicker, huruf kapital, warna mh-accent-strong.' },
    ] },
    { name: 'Code', family: 'mono', styles: [
      { name: 'type-code', fontSize: '14px', lineHeight: 1.6, fontWeight: 400, sample: 'PNW/2026/11/014', usage: 'Kode, nomor dokumen.' },
    ] },
  ],
};

const listFamily = (obj, prefix, usageFn) => ({ tokens: leaves(obj).map(([p, v]) => ({ name: name([prefix, ...p]), value: v.$value, usage: usageFn(p, v) })) });
const spaceUse = { 1: 'Jarak ikon–teks, chip.', 2: 'Padding vertikal input/button, gap kecil.', 3: 'Gap baris, padding sel tabel.', 4: 'Padding horizontal button/input, gap form.', 6: 'Padding card (desktop), gap grid.', 8: 'Jarak antar grup konten.', 12: 'Padding section (mobile).', 16: 'Jarak antar section.', 20: 'Padding section (desktop).' };
const radiusUse = { none: 'Tanpa sudut membulat.', sm: 'Badge, checkbox, tag, tooltip.', md: 'Button, input, alert (default kontrol).', lg: 'Card, modal, dropdown, tabel.', xl: 'Hero card, gambar ilustrasi.', full: 'Avatar, pill, switch, badge.' };
const shadowUse = { sm: 'Card diam, input.', md: 'Card hover, dropdown.', lg: 'Modal, popover, toast.', focus: 'Focus ring cyan 3px pada :focus-visible (wajib di semua elemen interaktif).' };

const tokens = {
  name: TITLE, version: 1,
  color: { themes: [{ id: 'light', name: 'Terang' }, { id: 'dark', name: 'Gelap' }], tokens: colorTokens },
  type,
  spacing: listFamily(src.space, 'space', (p, v) => spaceUse[p[0]] || `Grid 4px (${v.$value}).`),
  radius: listFamily(src.radius, 'radius', (p) => radiusUse[p[0]]),
  shadow: listFamily(src.shadow, 'shadow', (p) => shadowUse[p[0]]),
  fontSize: listFamily(src.font.size, 'font-size', (p) => `Skala 1.25, basis 16px (${p[0]}). Dipakai components bundle.css.`),
  fontWeight: listFamily(src.font.weight, 'font-weight', (p) => `Bobot ${p[0]}.`),
  lineHeight: listFamily(src.font['line-height'], 'font-line-height', (p) => ({ tight: 'Display & H1.', snug: 'Heading.', normal: 'Body.', relaxed: 'Teks panjang/dokumen.' })[p[0]]),
  letterSpacing: listFamily(src.font['letter-spacing'], 'font-letter-spacing', (p) => ({ tight: 'Heading ≥ 30px.', normal: 'Default.', wide: 'Overline & label kapital.' })[p[0]]),
  zIndex: listFamily(src.z, 'z', (p) => `Lapisan ${p[0]}.`),
};

// ---------- bundle.css ----------
const m = src.motion;
const bundleCss = `/* MaulanaHRP — bundle.css: komponen .mh-* (dibangkitkan dari css/components.css di repo).
 * Nilai token ada di tokens.json (tokens.css). Blok :root di bawah hanya berisi alias
 * untuk nilai yang bukan token di halaman ini (font stack, gradasi, motion).
 */
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@600;700&family=JetBrains+Mono:wght@400&display=swap");

:root {
  --mh-font-family-heading: var(--font-heading);
  --mh-font-family-body: var(--font-body);
  --mh-font-family-mono: var(--font-mono);
  --mh-color-gradient-brand: ${src.color.gradient.brand.$value};
  --mh-color-gradient-wave: ${src.color.gradient.wave.$value};
  --mh-motion-duration-fast: ${m.duration.fast.$value};
  --mh-motion-duration-base: ${m.duration.base.$value};
  --mh-motion-duration-slow: ${m.duration.slow.$value};
  --mh-motion-easing-standard: ${m.easing.standard.$value};
  --mh-motion-easing-out: ${m.easing.out.$value};
}
[data-theme="dark"] { color-scheme: dark; }

${readFileSync(join(root, 'css/components.css'), 'utf8')}`;
if (/<\/style/i.test(bundleCss)) throw new Error('bundle.css mengandung </style');

// ---------- Tulis ----------
const write = (p, s) => { mkdirSync(dirname(join(out, p)), { recursive: true }); writeFileSync(join(out, p), s); };
write('tokens.json', JSON.stringify(tokens, null, 2) + '\n');
write('components/bundle.css', bundleCss);

const copyDir = (dir) => {
  for (const f of readdirSync(dir)) {
    const full = join(dir, f);
    if (statSync(full).isDirectory()) copyDir(full);
    else write(relative(join(root, 'claude-ds'), full), readFileSync(full, 'utf8'));
  }
};
copyDir(join(root, 'claude-ds'));

const now = new Date().toISOString().replace(/\.\d+Z$/, 'Z');
const assetGroups = {};
for (const [group, g] of Object.entries(assets.groups)) {
  assetGroups[group] = { name: group, tile: g.tile, order: g.files.map((f) => f.name), files: Object.fromEntries(g.files.map((f) => [f.name, { name: f.name, blob: f.blob, size: f.size, type: f.type }])) };
}
const index = {
  v: 3, layout: 'files', createdOnFiles: { v: 1, at: assets.createdAt || now }, title: TITLE, namespace: 'MaulanaHRP', libraries: [],
  sections: {}, groups: Object.keys(assets.groups), assetGroups, blobs: {}, docs: { readme: 'project/README.md', sections: [] },
  lastChange: { by: 'Claude', at: now, via: 'Claude Code', note: process.env.NOTE || 'Dibangun dari repo design-system (tokens/tokens.json, css/components.css, claude-ds/).' },
};
write('design-system.json', JSON.stringify(index, null, 2) + '\n');

const count = (d) => readdirSync(d).reduce((n, f) => n + (statSync(join(d, f)).isDirectory() ? count(join(d, f)) : 1), 0);
console.log(`OK: ${count(out)} file di ${out} · ${colorTokens.length} warna, ${type.groups.reduce((n, g) => n + g.styles.length, 0)} gaya teks.`);
