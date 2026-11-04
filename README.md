# MaulanaHRP Design System

Panduan visual & komponen **MaulanaHRP Tech Solution** untuk web, aplikasi, deck presentasi, dan dokumen bisnis.

Buka **`index.html`** di browser untuk menjelajah: logo, warna, tipografi, lalu tautan ke komponen dan template.

## Struktur
```
assets/logo/        Logo SVG & PNG (horizontal, badge, mark, app icon) + file asli
assets/favicon/     favicon.svg, favicon-32.png, apple-touch-icon.png, icon-512.png
tokens/tokens.json  SUMBER TUNGGAL design tokens (warna, font, spacing, radius, shadow, tema)
css/tokens.css      CSS variables --mh-* (dibangkitkan, jangan edit manual)
css/components.css  Komponen UI (.mh-*)
dist/               tokens.resolved.json untuk JavaScript/aplikasi
docs/               Panduan (Markdown, Bahasa Indonesia)
preview/            Halaman preview komponen
templates/          Deck 16:9, penawaran, invoice, kop surat, kartu nama
scripts/            Build tokens, cek kontras WCAG, build logo
```

## Dokumentasi
1. [Logo](docs/01-logo.md)
2. [Warna](docs/02-warna.md)
3. [Tipografi](docs/03-tipografi.md)
4. [Layout, ikon & motion](docs/04-layout-ikon-motion.md)
5. [Tone of voice](docs/05-tone-of-voice.md)
6. [Komponen UI](docs/06-komponen.md)
7. [Deck presentasi](docs/07-deck.md)
8. [Dokumen bisnis](docs/08-dokumen.md)

## Ringkasan brand
| | |
|---|---|
| Warna utama | Navy `#1C366B` · Blue `#274B91` · Cyan `#68C0D2` |
| Font | Montserrat (heading) + Inter (body) |
| Radius | 8px kontrol, 12px card |
| Kepribadian | Ahli yang membumi: jelas, percaya diri, solutif |

## Pemakaian di web/app
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Montserrat:wght@600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/components.css">
<body class="mh-root">
  <button class="mh-btn">Konsultasi gratis</button>
</body>
```

## Mengubah token
```bash
npm install          # hanya perlu untuk build logo
# edit tokens/tokens.json, lalu:
npm test             # build CSS + cek kontras WCAG AA (gagal bila ada pasangan warna < 4.5:1)
npm run build:logos  # bangkitkan ulang logo SVG/PNG & favicon
```
Jangan mengedit `css/tokens.css` atau `dist/` secara manual; keduanya dibangkitkan dari `tokens/tokens.json`.

## Catatan
- Warna brand diambil dari sampel logo raster. Ganti dengan kode resmi bila tersedia.
- Mark gelombang SVG adalah interpretasi vektor dari logo asli (`assets/logo/maulanahrp-badge-original.webp`).
- Data perusahaan di template (alamat, NPWP, rekening, kontak) masih berupa placeholder `[kurung siku]`.

## Design System di claude.ai
Versi claude.ai: https://claude.ai/artifact/6Cdm5QFvAaBMQ3BWYoKRnJ (privat; bagikan lewat menu Share di halamannya).
Dipakai Claude saat membuat deck, desain, dan halaman bermerek MaulanaHRP.

Repo ini tetap **sumber utama**. Untuk sinkron setelah mengubah token/komponen:
```bash
npm run build:claude-ds -- <folder-output>   # menghasilkan <folder-output>/project/
```
lalu publish folder `project/` itu ke artifact di atas. Konten khusus claude.ai (brand book, README & preview komponen, cover) ada di `claude-ds/`. ID aset logo yang sudah diunggah ada di `scripts/claude-ds-assets.json`.
