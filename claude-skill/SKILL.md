---
name: maulanahrp-design-system
description: Design system MaulanaHRP Tech Solution (logo, warna navy/cyan, Montserrat + Inter, komponen CSS mh-*, tone of voice, template deck/penawaran/invoice/surat/kartu nama, gaya sekunder Neubrutalism). Gunakan setiap kali membuat atau mengubah apa pun yang bermerek MaulanaHRP di proyek mana pun - website, landing page, UI aplikasi/dashboard, email, deck presentasi, dokumen penawaran/invoice/surat, kartu nama, konten media sosial - atau saat user menyebut "brand MaulanaHRP", "design system kita", logo MaulanaHRP, atau gaya Neubrutalism.
---

# MaulanaHRP Design System

Sumber utama: repo **`/home/project/design-system`** (remote `git@github.com:maulanahrp/design-system.git`).
Skill ini hanya ringkasan. Untuk detail, baca file `docs/` yang relevan di repo itu sebelum mendesain.

| Kebutuhan | Baca |
|---|---|
| Logo, varian, ukuran minimum, larangan | `docs/01-logo.md` |
| Palet, token semantik, warna grafik | `docs/02-warna.md` |
| Skala huruf web/cetak/deck | `docs/03-tipografi.md` |
| Spacing, grid, breakpoint, ikon, motion | `docs/04-layout-ikon-motion.md` |
| Gaya bahasa & penulisan nama brand | `docs/05-tone-of-voice.md` |
| Daftar class komponen `mh-*` + aksesibilitas | `docs/06-komponen.md` |
| Deck 16:9 & master slide PowerPoint/Slides | `docs/07-deck.md` |
| Penawaran, invoice, surat, kartu nama, penomoran | `docs/08-dokumen.md` |
| Gaya sekunder Neubrutalism & kapan boleh dipakai | `docs/09-neubrutalism.md` |

Kalau repo tidak ada di host ini, clone dulu: `git clone git@github.com:maulanahrp/design-system.git`.

## Aturan inti (selalu berlaku)

**Logo - jangan pernah digambar ulang.**
- Pakai file dari `assets/logo/` apa adanya. Jangan membuat ulang mark gelombang, mengetik wordmark dengan font, mengubah warna, merentangkan, memutar, atau memberi efek.
- Logo resmi: `maulanahrp-badge-color.svg`. Untuk ruang melebar (header, kop, footer) pakai `maulanahrp-horizontal-color.svg`. Di latar navy/gelap/gradasi pakai versi `-white`. Untuk ruang sempit pakai `maulanahrp-mark-*.svg`. Favicon ada di `assets/favicon/`.
- Ukuran minimum: horizontal lebar 180px / 45mm, badge 96px / 25mm, mark 24px / 8mm.
- `-badge-original.svg` (bertekstur) hanya arsip, jangan dipakai.

**Warna**
- Navy `#1D3668` (identitas, heading), Blue `#274B91` (aksi utama), Wave Blue `#3B6CA7`, Cyan `#68C0D2` (aksen).
- Proporsi 60% putih/neutral, 30% navy, 10% cyan.
- Cyan bukan warna teks di atas putih (kontras 2.1:1). Untuk teks cyan pakai `#276F82`.
- Di kode, pakai token semantik (`--mh-bg`, `--mh-text`, `--mh-heading`, `--mh-primary`, `--mh-accent`, `--mh-border`, ...), bukan HEX mentah, supaya dark mode dan tema jalan otomatis.

**Tipografi:** heading Montserrat 600/700, isi Inter 400/500/600 (fallback Segoe UI / Arial).

**Bentuk:** grid spacing 4px, radius 8px untuk kontrol dan 12px untuk card, focus ring cyan, target sentuh minimal 40px.

**Bahasa**
- Default Bahasa Indonesia yang baku tapi luwes. Hasil bisnis dulu, teknologi kemudian. Kalimat pendek, kata kerja aktif, angka konkret.
- Sapaan "Anda" untuk dokumen formal dan penawaran; "kamu" hanya untuk media sosial.
- Tulis **MaulanaHRP** (bukan "Maulana HRP", "MaulanaHrp", atau "MHRP"). Nama lengkapnya **MaulanaHRP Tech Solution**.

## Memakai di proyek lain (web/app)

1. **Salin** file yang dibutuhkan ke folder aset statis proyek. Jangan menautkan path absolut `/home/project/...`, karena proyek akan di-deploy di tempat lain.
   - `css/tokens.css`, `css/components.css`
   - `css/themes/neubrutalism.css`, hanya bila memakai Neubrutalism
   - logo dan favicon yang dipakai dari `assets/logo/` dan `assets/favicon/`
   - `dist/tokens.resolved.json`, bila butuh token di JavaScript (chart, canvas, React Native)
2. Muat font dan CSS sekali di entry point, lalu pakai class `mh-*`:
   ```html
   <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Montserrat:wght@600;700&display=swap" rel="stylesheet">
   <link rel="stylesheet" href="/css/tokens.css">
   <link rel="stylesheet" href="/css/components.css">
   <body class="mh-root">
   ```
   Dark mode otomatis mengikuti sistem. Paksa dengan `<html data-theme="light|dark">`.
3. Catat commit sumbernya (`git -C /home/project/design-system rev-parse --short HEAD`) di komentar atau README proyek, supaya ketahuan versi mana yang disalin.
4. **Jangan mengedit salinan.** Perubahan token/komponen dikerjakan di repo design system (`tokens/tokens.json`, lalu `npm test`), kemudian salin ulang ke proyek. Kalau sebuah proyek butuh komponen baru yang umum, usulkan untuk ditambahkan ke design system dulu.
5. Untuk framework (React/Vue/Laravel/Next), CSS di atas cukup diimpor global. Bungkus class `mh-*` dalam komponen framework bila perlu, tanpa mengubah tampilannya.

## Deck & dokumen

- **Deck:** mulai dari `templates/deck.html` (10 layout 16:9). Judul slide berupa kesimpulan, 3-5 bullet, satu pesan per slide. Gradasi hanya untuk cover. Untuk PowerPoint/Slides, pakai tabel master slide di `docs/07-deck.md`.
- **Dokumen A4:** `templates/penawaran.html`, `invoice.html`, `surat.html`, `kartu-nama.html` (CSS bersama `templates/doc.css`). Format: `Rp90.159.750`, tanggal "4 November 2026", total selalu dengan terbilang. Penomoran: `PNW/2026/11/014`, `INV/2026/11/031`, `021/MHRP/XI/2026`.
- Teks **[kurung siku]** di template (alamat, NPWP, rekening, kontak) adalah placeholder. Minta datanya ke user; jangan mengarang.
- Angka PPN di template hanya contoh perhitungan. Ingatkan user untuk mengonfirmasi ke konsultan pajak.

## Gaya sekunder: Neubrutalism

Komponen dan class-nya sama. Tambahkan `css/themes/neubrutalism.css` dan `data-style="neubrutalism"` di `<html>` atau di satu `<section>`.
- Hanya untuk kampanye, media sosial, event, promo, dan produk untuk startup/UMKM.
- **Tidak boleh** untuk penawaran, invoice, kontrak, surat, website korporat, atau klien enterprise/pemerintah.
- Satu materi memakai satu gaya. Kalau ragu, pakai gaya utama.

## Di claude.ai (deck/desain artifact)

Saat membuat artifact bermerek MaulanaHRP di claude.ai, pakai Design System artifact berikut:
- Gaya utama: https://claude.ai/artifact/6Cdm5QFvAaBMQ3BWYoKRnJ
- Gaya Neubrutalism: https://claude.ai/artifact/GQvrDjXNbAgA5PinPo1mo3

Kedua artifact adalah cermin dari repo. Setelah token atau logo berubah, sinkronkan lewat `npm run build:claude-ds -- <out>` / `build:claude-ds-neo` (lihat README repo).

## Sebelum menyatakan selesai

- Logo berasal dari `assets/logo/` dan tidak dimodifikasi, serta memenuhi ukuran minimum dan area bebas.
- Tidak ada HEX mentah di komponen; semua lewat token `--mh-*`.
- Pasangan teks/latar baru memenuhi kontras WCAG AA 4.5:1.
- Tampilan sudah dicek di lebar 390px (tanpa scroll horizontal), serta di light dan dark mode bila web/app.
- Penulisan nama brand dan sapaan sesuai konteks.
