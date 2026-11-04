#!/usr/bin/env node
// Bangun CSS variables & JSON ter-resolve dari tokens/tokens.json.
// Tanpa dependency. Pakai: node scripts/build-tokens.mjs
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const tokens = JSON.parse(readFileSync(join(root, 'tokens/tokens.json'), 'utf8'));
const PREFIX = 'mh';

const isLeaf = (n) => n && typeof n === 'object' && '$value' in n;

// Ratakan pohon token -> { 'color.navy.800': '#1D3668', ... }
function flatten(node, path = [], out = {}) {
  for (const [k, v] of Object.entries(node)) {
    if (k.startsWith('$')) continue;
    const p = [...path, k];
    if (isLeaf(v)) out[p.join('.')] = v.$value;
    else if (v && typeof v === 'object') flatten(v, p, out);
  }
  return out;
}

const { semantic, ...base } = tokens;
const flat = flatten(base);

export function resolve(value, seen = new Set()) {
  return String(value).replace(/\{([^}]+)\}/g, (_, ref) => {
    if (seen.has(ref)) throw new Error(`Referensi melingkar: ${ref}`);
    if (!(ref in flat)) throw new Error(`Referensi token tidak ditemukan: {${ref}}`);
    return resolve(flat[ref], new Set([...seen, ref]));
  });
}

const varName = (path) => `--${PREFIX}-${path.replace(/\./g, '-')}`;
// Semantic merujuk ke variabel CSS skala, sehingga override skala ikut mengalir.
const toCssValue = (value) =>
  String(value).replace(/\{([^}]+)\}/g, (_, ref) => {
    if (!(ref in flat)) throw new Error(`Referensi token tidak ditemukan: {${ref}}`);
    return `var(${varName(ref)})`;
  });

const semanticBlock = (mode, indent = '  ') =>
  Object.entries(flatten(semantic[mode]))
    .map(([k, v]) => `${indent}${varName(k)}: ${toCssValue(v)};`)
    .join('\n');

const baseVars = Object.entries(flat)
  .map(([k, v]) => `  ${varName(k)}: ${v};`)
  .join('\n');

const css = `/* MaulanaHRP Design System — tokens.css
 * DIBANGKITKAN OTOMATIS dari tokens/tokens.json. Jangan edit manual.
 * Jalankan: node scripts/build-tokens.mjs
 *
 * Tema: default ikut sistem (prefers-color-scheme).
 * Paksa tema dengan <html data-theme="light"> atau <html data-theme="dark">.
 */

:root {
${baseVars}

  /* Semantic — light */
${semanticBlock('light')}

  color-scheme: light;
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
${semanticBlock('dark', '    ')}

    color-scheme: dark;
  }
}

:root[data-theme="dark"] {
${semanticBlock('dark')}

  color-scheme: dark;
}
`;

const resolved = {
  base: flat,
  semantic: Object.fromEntries(
    Object.keys(semantic)
      .filter((m) => !m.startsWith('$'))
      .map((m) => [m, Object.fromEntries(Object.entries(flatten(semantic[m])).map(([k, v]) => [k, resolve(v)]))])
  ),
};

mkdirSync(join(root, 'css'), { recursive: true });
mkdirSync(join(root, 'dist'), { recursive: true });
writeFileSync(join(root, 'css/tokens.css'), css);
writeFileSync(join(root, 'dist/tokens.resolved.json'), JSON.stringify(resolved, null, 2) + '\n');
console.log(`OK: ${Object.keys(flat).length} token dasar, ${Object.keys(resolved.semantic.light).length} token semantik/tema.`);

// ---------------------------------------------------------------------------
// Design system sekunder: Neubrutalism (tokens/neubrutalism.json)
// Output: css/themes/neubrutalism.css = token override + themes/neubrutalism/components.css
// ---------------------------------------------------------------------------
const neo = JSON.parse(readFileSync(join(root, 'tokens/neubrutalism.json'), 'utf8'));
const neoFlat = flatten({ color: neo.color });
const neoRes = (v) => String(v).replace(/\{([^}]+)\}/g, (_, ref) => {
  if (!(ref in neoFlat)) throw new Error(`[neubrutalism] referensi tidak ditemukan: {${ref}}`);
  return neoFlat[ref];
});
const neoCssVal = (v) => String(v).replace(/\{([^}]+)\}/g, (_, ref) => {
  if (!(ref in neoFlat)) throw new Error(`[neubrutalism] referensi tidak ditemukan: {${ref}}`);
  return `var(${varName(ref)})`;
});
const block = (obj, indent) => Object.entries(flatten(obj)).map(([k, v]) => `${indent}--${PREFIX}-${k}: ${neoCssVal(v)};`).join('\n');
const lightSemanticKeys = Object.keys(flatten(semantic.light));
for (const k of Object.keys(flatten(neo.semantic.light))) {
  if (!/(^|-)neo-/.test(k) && !lightSemanticKeys.includes(k)) throw new Error(`[neubrutalism] token semantik tidak dikenal: ${k}`);
}

const S = '[data-style="neubrutalism"]';
const neoBase = Object.entries(neoFlat).map(([k, v]) => `  ${varName(k)}: ${v};`).join('\n');
const neoCss = `/* MaulanaHRP — tema Neubrutalism (design system sekunder)
 * DIBANGKITKAN OTOMATIS dari tokens/neubrutalism.json + themes/neubrutalism/components.css.
 * Pakai: muat SETELAH tokens.css & components.css, lalu pasang data-style="neubrutalism"
 * di <html> (seluruh halaman) atau di elemen mana pun (hanya bagian itu).
 */

${S} {
${neoBase}
  --${PREFIX}-font-family-label: ${neo.font.label.$value};

  /* Semantic & bentuk — light */
${block(neo.semantic.light, '  ')}
${block(neo.shape.light, '  ')}
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"])${S},
  :root:not([data-theme="light"]) ${S} {
${block(neo.semantic.dark, '    ')}
${block(neo.shape.dark, '    ')}
  }
}

:root[data-theme="dark"]${S},
:root[data-theme="dark"] ${S} {
${block(neo.semantic.dark, '  ')}
${block(neo.shape.dark, '  ')}
}

${readFileSync(join(root, 'themes/neubrutalism/components.css'), 'utf8')}`;

mkdirSync(join(root, 'css/themes'), { recursive: true });
writeFileSync(join(root, 'css/themes/neubrutalism.css'), neoCss);
const neoResolved = { semantic: {} };
for (const mode of ['light', 'dark']) {
  // dark mewarisi light untuk token yang tidak ditimpa
  const merged = { ...flatten(neo.semantic.light), ...(mode === 'dark' ? flatten(neo.semantic.dark) : {}) };
  neoResolved.semantic[mode] = Object.fromEntries(Object.entries(merged).map(([k, v]) => [k, neoRes(v)]));
}
writeFileSync(join(root, 'dist/neubrutalism.resolved.json'), JSON.stringify(neoResolved, null, 2) + '\n');
console.log(`OK: tema neubrutalism (${Object.keys(neoResolved.semantic.light).length} token semantik).`);
