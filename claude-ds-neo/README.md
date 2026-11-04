Gaya **sekunder** MaulanaHRP Tech Solution: Neubrutalism. Brand-nya sama dengan *MaulanaHRP Design System* (logo, Montserrat/Inter, navy/cyan), tapi perlakuannya berani: border tinta tebal, bayangan offset keras tanpa blur, blok warna datar, dan heading Montserrat 800. Gaya ini untuk menarik perhatian, bukan untuk membangun kesan formal.

## Kapan dipakai

- **Pakai** untuk konten media sosial & iklan, landing page kampanye/promo, event/workshop/webinar, produk untuk startup & UMKM muda, dan deck pitching yang santai.
- **Jangan pakai** untuk penawaran harga, invoice, kontrak, surat resmi, website korporat, klien enterprise/pemerintah, dashboard data padat, kop, dan kartu nama. Itu wilayah *MaulanaHRP Design System* (gaya utama).
- Satu materi = satu gaya. Satu-satunya pengecualian: satu section kampanye bergaya ini di dalam halaman bergaya utama. Kalau ragu, pakai gaya utama.

## Konten

- Bahasa Indonesia yang hangat dan langsung. Di media sosial dan kampanye boleh menyapa **"kamu"**; di produk/aplikasi tetap **"Anda"**.
- Judul pendek dan tegas (≤ 8 kata), boleh berupa ajakan: "Go digital dalam 14 hari." Maksimal 3 poin per post.
- Satu **stiker** (`.mh-neo-sticker`) per desain, isi 1–3 kata kapital: "PROMO", "KONSULTASI GRATIS!". Stabilo (`.mh-neo-highlight`) untuk 1–3 kata kunci saja.
- Nama brand tetap **MaulanaHRP** / **MaulanaHRP Tech Solution**. Emoji boleh di caption media sosial, tidak di dalam desain.

## Warna

- Palet = warna brand yang dipakai sebagai **blok datar**: `mh-color-neo-cyan` (fill utama), `mh-color-neo-sky`, `mh-color-neo-sun` (pop kuning), `mh-color-neo-mint` (sukses), `mh-color-neo-coral` (bahaya), `mh-color-neo-blue`, di atas `mh-color-neo-paper`.
- Teks di atas blok terang **selalu** `mh-color-neo-ink` (#0C1A38). Teks putih hanya di atas `mh-color-neo-blue` dan `mh-color-neo-ink`. Teks putih di atas cyan/sun/mint/coral gagal kontras.
- Maksimal 3 warna blok + ink per komposisi. **Tanpa gradasi**; gradasi milik gaya utama.
- Fill tombol primary memakai `mh-neo-fill` (cyan) dengan teks `mh-on-neo-fill`. `mh-primary` (navy) dipakai untuk teks/aksi seperti link dan tombol secondary.
- Border semua komponen `mh-neo-ink` setebal `mh-border-width` (2px; dialog & post sosmed 3px).
- Tema Gelap: latar ink, border & bayangan tombol paper, bayangan card **cyan**. Semua pasangan teks tetap ≥ 4.5:1.

## Bentuk & elevasi

- Bayangan selalu **keras** (offset, tanpa blur): `mh-btn-shadow` 4px → hover `mh-btn-shadow-hover` 6px (tombol naik `mh-btn-lift`) → ditekan `mh-btn-shadow-active` 0 (tombol turun `mh-btn-press`). Card: `mh-card-shadow` 6px → hover 9px.
- Radius kecil: `mh-control-radius` 6px, `mh-card-radius` 10px, badge 4px. Tanpa pill kecuali avatar & switch.
- Fokus: `mh-focus-ring`, cincin ganda paper + ink (Gelap: ink + sun).
- Tanpa blur, glassmorphism, atau bayangan lembut.

## Tipografi

- Heading: Montserrat **800** (`--font-heading`), letter-spacing -0.03em, line-height 1.0–1.1 (`neo-display`, `neo-h1`–`neo-h3`).
- Body: Inter (`--font-body`), `neo-body` 16px.
- Label, badge, overline, header tabel, stiker: **JetBrains Mono** 700 kapital (`--font-label`, `neo-label`).

## Komponen

Komponen dan HTML-nya **sama** dengan gaya utama (`mh-btn`, `mh-card`, `mh-badge`, …). Gaya neo aktif di dalam elemen ber-atribut `data-style="neubrutalism"`. Pasang di `<html>` untuk seluruh halaman, atau di satu `<section>`. Muat `components/bundle.css` setelah `tokens.css` dan beri `class="mh-root"`.

Utilitas khusus:
- `.mh-neo-block` + `--cyan` `--sky` `--sun` `--mint` `--blue` `--ink` `--white`: blok warna ber-border & bayangan.
- `.mh-neo-sticker`: stiker kuning miring -4°.
- `.mh-neo-highlight`: stabilo kuning.
- `.mh-neo-grid-bg`: latar kertas bergaris kotak 32px.

## Logo & ikon

- Logo mengikuti aturan gaya utama: jangan diputar, dimiringkan, atau diberi bayangan keras. Di atas blok berwarna, taruh logo **navy** (`maulanahrp-horizontal-navy.svg`) atau letakkan logo color di atas blok putih.
- Ikon: Lucide, stroke **2px** (lebih tebal dari gaya utama), warna ink, boleh di dalam `.mh-icon-tile` kuning.

## Media sosial & slide

- Post 1080×1080 / 1080×1350: satu blok latar (sky/cyan/sun/paper), border ink 8–10px, bayangan offset 24px. Logo navy kiri atas (tinggi 64px), stiker kanan atas, judul Montserrat 800 96–110px (maks. 3 baris), maksimal 3 poin Inter SemiBold 40px.
- Slide 16:9: latar paper, KPI di blok cyan/sun ber-border 5px dengan bayangan 12px, satu stiker di atas judul, logo navy di kiri bawah.
