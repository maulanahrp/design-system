# Design System Sekunder: Neubrutalism

Gaya kedua MaulanaHRP yang lebih berani dan playful. Brand-nya **tetap sama** (logo, Montserrat/Inter, navy/cyan); yang berubah adalah *perlakuannya*: border tinta tebal, bayangan offset keras tanpa blur, blok warna datar, dan heading Montserrat 800.

Preview: `preview/neubrutalism.html`.

## Kapan dipakai

| Pakai Neubrutalism | Tetap pakai gaya utama |
|---|---|
| Konten media sosial & iklan | Penawaran, invoice, kontrak, surat |
| Landing page kampanye/promo | Website korporat & profil perusahaan |
| Event, workshop, webinar | Klien enterprise/pemerintah |
| Produk/aplikasi untuk startup & UMKM muda | Dashboard data yang padat |
| Deck pitching yang santai | Kop surat, kartu nama, stempel |

**Aturan:** satu materi = satu gaya. Pengecualian: satu section kampanye bergaya Neubrutalism di dalam halaman bergaya utama, tidak sebaliknya. Kalau ragu, pakai gaya utama.

> Kenapa dibatasi: dua gaya yang dipakai acak membuat brand terlihat tidak konsisten. Gaya utama membangun kepercayaan (formal), Neubrutalism menarik perhatian (kampanye).

## Pemasangan
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@700;800&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/components.css">
<link rel="stylesheet" href="css/themes/neubrutalism.css">

<html data-style="neubrutalism">              <!-- seluruh halaman -->
<section data-style="neubrutalism"> … </section> <!-- atau satu bagian saja -->
```
Komponen dan class-nya sama persis dengan gaya utama (`mh-btn`, `mh-card`, …). Dark mode tetap lewat `data-theme="dark"` atau ikut sistem.

## Palet
| Nama | HEX | Peran |
|---|---|---|
| Ink | `#0C1A38` | Border, bayangan, teks. Pengganti hitam. |
| Paper | `#F3F8FB` | Latar halaman |
| Cyan | `#68C0D2` | **Fill utama**: button primary, tab aktif, blok hero |
| Sky | `#A8E1EB` | Blok sekunder, header tabel, badge default |
| Sun | `#FFC93C` | Pop/aksen: CTA accent, stiker, stabilo, overline |
| Mint | `#7FE0AE` | Sukses |
| Coral | `#FF8A7A` | Bahaya/hapus |
| Blue | `#3B6CA7` | Blok dekoratif (teks putih) |

- Teks di atas blok warna **selalu Ink** (kecuali Blue & Ink: teks putih/paper). Semua pasangan lolos WCAG AA (`npm test`).
- **Tanpa gradasi.** Gradasi brand milik gaya utama.
- Maksimal 3 warna blok + Ink dalam satu komposisi.
- Dark mode: latar Ink, border Paper, bayangan **Cyan**.

## Bentuk & elevasi
| Token | Nilai |
|---|---|
| `--mh-border-width` | 2px (dialog & post sosmed 3px) |
| `--mh-control-radius` / `--mh-card-radius` | 6px / 10px |
| `--mh-btn-shadow` | `4px 4px 0 0 ink` → hover `6px 6px`, ditekan `0` + geser 4px |
| `--mh-card-shadow` | `6px 6px 0 0 ink` → hover `9px 9px` |
| `--mh-shadow-sm/md/lg` | offset 2 / 4 / 8px, tanpa blur |
| Focus | cincin ganda: paper 3px + ink 3px (dark: ink + sun) |

## Tipografi
- Heading: Montserrat **800**, letter-spacing -0.03em, line-height 1.0–1.1.
- Body: Inter 400/500.
- Label, badge, overline, tombol kecil: **JetBrains Mono** 500/700, kapital.

## Utilitas khusus
| Class | Fungsi |
|---|---|
| `mh-neo-block` + `--cyan` `--sky` `--sun` `--mint` `--blue` `--ink` `--white` | Blok warna datar ber-border & bayangan |
| `mh-neo-sticker` | Stiker miring kuning (maks. 1 per desain) |
| `mh-neo-highlight` | Stabilo kuning pada 1–3 kata kunci |
| `mh-neo-grid-bg` | Latar kertas bergaris kotak |

## Media sosial (1080 × 1080 / 1080 × 1350)
- Latar satu blok warna (Sky/Cyan/Sun/Paper), border Ink 8–10px di kanvas, bayangan offset 24px.
- Logo horizontal navy di kiri atas (tinggi 64px). Satu stiker di kanan atas.
- Judul Montserrat 800, 96–110px, maksimal 3 baris. Isi maksimal 3 poin, Inter SemiBold 40px.
- Sapaan "kamu" boleh dipakai di sini (lihat tone of voice).

## Jangan
- ❌ Memakai gaya ini untuk penawaran, invoice, atau dokumen hukum.
- ❌ Bayangan blur/lembut, gradasi, atau glassmorphism.
- ❌ Lebih dari satu stiker atau stabilo berlebihan (maks. 3 kata).
- ❌ Teks putih di atas Cyan/Sun/Mint/Coral (kontras gagal).
- ❌ Memutar/memiringkan logo atau memberi logo bayangan keras. Logo tetap mengikuti `01-logo.md`; taruh di atas blok putih/paper bila perlu.
