#!/usr/bin/env node
// Cek kontras WCAG 2.1 untuk pasangan warna semantik (light & dark).
// Gagal (exit 1) bila ada pasangan di bawah ambang. Pakai: node scripts/check-contrast.mjs
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const { base, semantic } = JSON.parse(readFileSync(join(root, 'dist/tokens.resolved.json'), 'utf8'));

const lum = (hex) => {
  const n = hex.replace('#', '');
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
export const ratio = (a, b) => {
  const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
};

// [foreground, background, minimum]. 4.5 = teks normal, 3 = teks besar/komponen UI.
const pairs = [
  ['text', 'bg', 4.5], ['text', 'surface-raised', 4.5], ['text', 'bg-muted', 4.5],
  ['text-muted', 'bg', 4.5], ['text-muted', 'bg-subtle', 4.5],
  ['text-subtle', 'bg', 4.5],
  ['heading', 'bg', 4.5],
  ['text-inverse', 'surface-inverse', 4.5],
  ['on-primary', 'primary', 4.5], ['on-primary', 'primary-hover', 4.5],
  ['primary', 'bg', 4.5], ['primary', 'primary-subtle', 4.5],
  ['on-accent', 'accent', 4.5],
  ['accent-strong', 'bg', 4.5],
  ['link', 'bg', 4.5],
  ['success', 'success-subtle', 4.5], ['success', 'bg', 4.5],
  ['warning', 'warning-subtle', 4.5], ['warning', 'bg', 4.5],
  ['danger', 'danger-subtle', 4.5], ['danger', 'bg', 4.5],
  ['info', 'info-subtle', 4.5],
  ['border-strong', 'bg', 1.5],
];

// Pasangan brand tetap (deck, dokumen, logo).
const brandPairs = [
  ['#FFFFFF', base['color.navy.800'], 4.5, 'putih di atas navy-800'],
  [base['color.navy.800'], '#FFFFFF', 4.5, 'navy-800 di atas putih'],
  [base['color.navy.950'], base['color.cyan.400'], 4.5, 'navy-950 di atas cyan-400'],
  ['#FFFFFF', base['color.navy.500'], 4.5, 'putih di atas navy-500'],
  ['#FFFFFF', base['color.cyan.700'], 4.5, 'putih di atas cyan-700'],
];

let fails = 0;
const row = (label, r, min) => {
  const ok = r >= min;
  if (!ok) fails++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${r.toFixed(2).padStart(5)} (min ${min})  ${label}`);
};

for (const mode of Object.keys(semantic)) {
  console.log(`\n== ${mode} ==`);
  for (const [fg, bg, min] of pairs) row(`${fg} / ${bg}`, ratio(semantic[mode][fg], semantic[mode][bg]), min);
}
console.log('\n== brand ==');
for (const [fg, bg, min, label] of brandPairs) row(label, ratio(fg, bg), min);

console.log(fails ? `\n${fails} pasangan GAGAL.` : '\nSemua pasangan lolos.');
process.exit(fails ? 1 : 0);
