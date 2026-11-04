# Warna

Sumber: `tokens/tokens.json` → dibangun ke `css/tokens.css` (variabel `--mh-*`).
Warna brand diambil dari logo; kode HEX adalah **sampel dari file raster**, bukan kode resmi. Jika ada panduan resmi, perbarui token lalu jalankan `npm test`.

## Warna brand

| Nama | HEX | Token | Peran |
|---|---|---|---|
| **Navy** | `#1D3668` | `--mh-color-navy-800` | Warna identitas. Heading, latar gelap brand, wordmark. |
| **Blue** | `#274B91` | `--mh-color-navy-700` | Warna aksi utama (button primary) di mode terang. |
| **Wave Blue** | `#3B6CA7` | `--mh-color-navy-500` | Ilustrasi, grafik, gradasi. |
| **Cyan** | `#68C0D2` | `--mh-color-cyan-400` | Aksen: highlight, focus ring, badge, garis dekoratif. |

**Proporsi yang disarankan (aturan 60-30-10):** 60% putih/neutral, 30% navy, 10% cyan.
Cyan adalah aksen, **bukan** warna latar halaman dan **bukan** warna teks di atas putih (kontrasnya hanya 2.1:1).
Untuk teks cyan, pakai `cyan-700` (`#276F82`).

## Gradasi
- `--mh-color-gradient-brand`: cyan → blue → navy (135°). Untuk hero, cover deck, dan kartu highlight.
- `--mh-color-gradient-wave`: cyan → blue (90°). Untuk garis aksen tipis atau progress bar.

Teks di atas gradasi: putih, minimal 18px bold. Jangan taruh paragraf panjang di atas gradasi.

## Skala
- **navy** 50–950, **cyan** 50–900, **neutral** 0–950 (abu-abu bernuansa biru).
- **Status:** success (hijau), warning (oranye), danger (merah). Masing-masing punya `50` (latar), `500` (ikon/grafik), `700` (teks).

## Token semantik (pakai ini di komponen)
Komponen dan halaman **hanya** memakai token peran. Dengan begitu, dark mode dan tema lain (mis. Neubrutalism) berjalan otomatis.

| Token | Light | Dark | Untuk |
|---|---|---|---|
| `--mh-bg` | neutral-0 | neutral-950 | Latar halaman |
| `--mh-bg-subtle` | neutral-50 | neutral-900 | Section selang-seling |
| `--mh-surface` | neutral-0 | neutral-900 | Card, panel |
| `--mh-border` | neutral-200 | neutral-700 | Garis pembatas |
| `--mh-text` | neutral-900 | neutral-50 | Teks isi |
| `--mh-text-muted` | neutral-600 | neutral-300 | Teks sekunder |
| `--mh-heading` | navy-800 | putih | Judul |
| `--mh-primary` | navy-700 | navy-300 | Button utama, elemen aktif |
| `--mh-accent` | cyan-400 | cyan-400 | Aksen, focus |
| `--mh-link` | navy-600 | cyan-300 | Tautan |
| `--mh-success/warning/danger` | *-700 | *-400/500 | Teks status |
| `--mh-*-subtle` | *-50 | gelap | Latar alert/badge |

## Aksesibilitas
`npm test` memeriksa semua pasangan teks/latar terhadap **WCAG 2.1 AA** (4.5:1). Semua pasangan lolos di light & dark.
Jangan membuat pasangan baru tanpa menambahkannya ke `scripts/check-contrast.mjs`.

## Grafik / data viz
Urutan seri kategorikal: `navy-700` → `cyan-400` → `navy-400` → `cyan-700` → `neutral-400` → `warning-500`.
Maksimal 6 seri; lebih dari itu, gabungkan ke "Lainnya".
