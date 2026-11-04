# Tipografi

| Peran | Font | Bobot | Sumber |
|---|---|---|---|
| Heading, angka besar, tombol deck | **Montserrat** | 600 / 700 | Google Fonts (gratis, OFL) |
| Body, UI, tabel, dokumen | **Inter** | 400 / 500 / 600 | Google Fonts (gratis, OFL) |
| Kode, nomor dokumen | JetBrains Mono | 400 | Google Fonts (opsional) |

Montserrat dipilih karena paling dekat dengan wordmark logo; Inter dipilih karena sangat terbaca di layar kecil dan teks panjang.

## Memuat font (web)
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Montserrat:wght@600;700&display=swap" rel="stylesheet">
```
Untuk aplikasi offline/produksi, self-host via `@fontsource/montserrat` dan `@fontsource/inter`.
Di PowerPoint/Word/Google Slides: instal kedua font, atau pakai fallback **Segoe UI / Arial**.

## Skala (basis 16px, rasio 1.25)

| Token | rem / px | Pakai untuk |
|---|---|---|
| `--mh-font-size-6xl` | 3.75 / 60 | Hero web, judul cover deck |
| `--mh-font-size-5xl` | 3 / 48 | H1 halaman landing, judul slide |
| `--mh-font-size-4xl` | 2.375 / 38 | H1 aplikasi |
| `--mh-font-size-3xl` | 1.875 / 30 | H2 |
| `--mh-font-size-2xl` | 1.5 / 24 | H3, judul card besar |
| `--mh-font-size-xl` | 1.25 / 20 | H4, lead paragraph |
| `--mh-font-size-lg` | 1.125 / 18 | Body besar (marketing) |
| `--mh-font-size-md` | 1 / 16 | **Body default** |
| `--mh-font-size-sm` | 0.875 / 14 | UI padat, tabel, label |
| `--mh-font-size-xs` | 0.75 / 12 | Caption, overline, footnote |

## Aturan
- Heading: Montserrat 700, `line-height` 1.15–1.3, `letter-spacing` -0.02em untuk ukuran ≥ 30px.
- Body: Inter 400, `line-height` 1.55, panjang baris 60–75 karakter (`max-width: 68ch`).
- Overline/label kecil: Inter 600, huruf kapital, `letter-spacing` 0.06em, ukuran xs.
- Angka di tabel: `font-variant-numeric: tabular-nums`.
- Maksimal **2 bobot per elemen**; jangan memakai italic Montserrat untuk heading.
- Jangan pakai teks rata kanan-kiri (justify) di web. Untuk dokumen cetak boleh, asal hyphenation aktif.

## Dokumen cetak (penawaran, surat)
| Elemen | Ukuran |
|---|---|
| Judul dokumen | Montserrat 700, 20–24pt |
| Heading section | Montserrat 600, 13–14pt |
| Isi | Inter 400, 10–11pt, spasi 1.4 |
| Tabel & catatan kaki | Inter 400, 9pt |

## Deck presentasi (16:9, 1920×1080)
| Elemen | Ukuran |
|---|---|
| Judul cover | Montserrat 700, 72–96px |
| Judul slide | Montserrat 700, 48–56px |
| Isi / bullet | Inter 400, 28–32px (minimal 24px) |
| Angka KPI | Montserrat 700, 96–140px |
| Footer / sumber | Inter 400, 16–18px |
