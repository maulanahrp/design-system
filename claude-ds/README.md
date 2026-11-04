Bahasa visual **MaulanaHRP Tech Solution**, perusahaan solusi teknologi (web, aplikasi, integrasi sistem). Pakai untuk web, aplikasi, deck presentasi, penawaran, dan materi brand lain. Kepribadian: **ahli yang membumi**. Paham teknologi secara mendalam, menjelaskannya dengan bahasa klien.

## Konten

- Tulis dalam **Bahasa Indonesia** baku yang luwes. Istilah teknis umum boleh dalam bahasa Inggris (*dashboard*, *cloud*).
- Sapa klien dengan **"Anda"** di web, aplikasi, penawaran, dan deck. "Kamu" hanya untuk media sosial.
- **Hasil dulu, teknologi kemudian.** "Laporan stok otomatis setiap pagi", bukan "Cron job integrasi API ERP".
- Kalimat pendek (≤ 20 kata), kata kerja aktif, angka konkret: "Hemat 6 jam kerja per minggu", bukan "sangat efisien".
- Nama brand: **MaulanaHRP** (satu kata, "HRP" kapital). Nama lengkap: **MaulanaHRP Tech Solution**. Jangan "Maulana HRP", "MaulanaHrp", atau "MHRP".
- Label tombol berupa kata kerja yang menyebut hasilnya: "Kirim penawaran", "Simpan perubahan", bukan "OK" atau "Submit".
- Pesan error = apa yang terjadi + cara memperbaikinya: "Email belum terdaftar. Periksa lagi atau daftar akun baru."
- Judul slide adalah kesimpulan, bukan topik: "Proses manual menyita 40% waktu tim", bukan "Latar Belakang".
- Tanpa emoji di web, aplikasi, dan dokumen formal. Media sosial boleh, maksimal satu per kalimat.
- Uang: `Rp90.159.750` (titik ribuan, tanpa ",00"). Tanggal formal: `4 November 2026`.

## Warna

- Proporsi **60-30-10**: 60% netral (`mh-bg`, `mh-surface`), 30% navy (`mh-color-navy-800`, `mh-primary`), 10% cyan (`mh-accent`).
- Komponen dan halaman hanya memakai **token semantik** (`mh-bg`, `mh-text`, `mh-primary`…), bukan skala mentah `mh-color-*`. Dengan begitu, tema Gelap berjalan otomatis.
- `mh-color-navy-800` (#1D3668) adalah warna identitas: wordmark, heading (`mh-heading`), latar section/slide gelap, kop dokumen.
- Aksi utama memakai `mh-primary` dengan teks `mh-on-primary`. Satu button primary per area.
- **Cyan adalah aksen, bukan warna teks.** `mh-color-cyan-400` di atas putih hanya 2.1:1. Untuk teks cyan pakai `mh-accent-strong`; untuk teks di atas cyan pakai `mh-on-accent`.
- Gradasi brand (`--mh-color-gradient-brand`, cyan → wave blue → navy, 135°) hanya untuk hero, cover deck, dan satu card unggulan per layar. Teks di atasnya putih, minimal 18px bold. Garis aksen tipis memakai `--mh-color-gradient-wave`.
- Status selalu disertai teks atau ikon: `mh-success`, `mh-warning`, `mh-danger` (teks) di atas `*-subtle` (latar). Jangan bedakan status hanya dengan warna.
- Grafik: urutan seri `mh-color-navy-700` → `mh-color-cyan-400` → `mh-color-navy-400` → `mh-color-cyan-700` → `mh-color-neutral-400` → `mh-color-warning-500`. Sorot satu seri saja; seri lain `mh-color-navy-300`.
- Semua pasangan teks/latar yang tertulis di catatan token lolos WCAG AA (≥ 4.5:1) di tema Terang dan Gelap.

## Tipografi

- **Montserrat** (`--font-heading`) untuk heading, angka besar, dan judul slide, karena paling dekat dengan wordmark. **Inter** (`--font-body`) untuk isi, UI, tabel, dan dokumen. Keduanya dari Google Fonts.
- Heading: `type-display` / `type-h1`–`type-h4`, warna `mh-heading`, letter-spacing -0.02em mulai 30px.
- Isi: `type-body` (16px, line-height 1.55), lebar baris maksimal 68ch. Paragraf pembuka: `type-lead` dengan `mh-text-muted`.
- Overline/kicker: `type-overline`, huruf kapital, `mh-accent-strong`.
- Angka di tabel dan statistik: `font-variant-numeric: tabular-nums`, rata kanan.
- Maksimal dua bobot per elemen. Tanpa italic di heading. Tanpa teks rata kanan-kiri di web.

## Spacing, bentuk, elevasi

- Grid 4px: `mh-space-1` (4px) … `mh-space-24` (96px). Padding card `mh-space-6`, gap form `mh-space-4`, jarak section `mh-space-16`–`mh-space-20`.
- Radius membulat tapi tidak bulat penuh, mengikuti lengkung gelombang logo: `mh-radius-md` (8px) untuk button/input, `mh-radius-lg` (12px) untuk card/dialog/tabel, `mh-radius-full` untuk avatar/pill/switch.
- Shadow bernuansa navy: `mh-shadow-sm` (card diam), `mh-shadow-md` (hover, dropdown), `mh-shadow-lg` (dialog, toast). Di tema Gelap, bedakan kedalaman dengan `mh-surface-raised`.
- Focus: setiap elemen interaktif menampilkan `mh-shadow-focus` (cincin cyan 3px) saat `:focus-visible`.
- Motion: 120ms (hover), 200ms (dropdown), 320ms (dialog), easing `cubic-bezier(.2,0,0,1)`. Hormati `prefers-reduced-motion`.
- Breakpoint: 640 / 768 / 1024 / 1280px. Konten maks. 1200px, gutter 16px di mobile.

## Logo & motif

- Pakai **horizontal** (`maulanahrp-horizontal-color.svg`) sebagai default: header web, kop surat, footer deck. Di atas navy, gradasi, atau foto gelap pakai `maulanahrp-horizontal-white.svg`.
- **Badge** (`maulanahrp-badge-color.svg`) adalah **logo resmi**, persis logo asli tanpa bintik tekstur. Untuk stiker, cover, sertifikat, dan avatar media sosial. Semua file logo adalah vektorisasi langsung logo asli; jangan menggambar ulang mark atau mengetik ulang wordmark.
- **Mark** (`maulanahrp-mark-*.svg`) untuk ruang sempit: avatar, loading, watermark. **App icon** untuk favicon & PWA.
- Area bebas di semua sisi ≥ tinggi node bulat pada mark. Ukuran minimum: horizontal 180px / 45mm, badge 96px / 25mm, mark 24px / 8mm.
- Jangan: mengubah warna mark, merentang, memutar, memberi shadow/glow, menyusun ulang mark & teks, atau menaruh versi color di atas latar gelap.
- Motif khas: **mark asli satu warna** (gelombang + node).  Pakai sebagai dekorasi tipis (opacity 10–20%) di hero, cover, dan slide pembatas, atau sebagai garis pendek `.mh-wave-line` di bawah judul/statistik.

## Ikonografi

- Set ikon: **Lucide** (garis membulat, open source). Stroke 1.75px untuk UI, 2px mulai 32px; ujung dan sudut `round`.
- Ukuran 16 / 20 (default UI) / 24 (navigasi) / 32–48 (ikon fitur). Warna `currentColor`.
- Ikon fitur ditaruh di `.mh-icon-tile` (latar `mh-accent-subtle`, ikon `mh-primary`).
- Jangan mencampur set ikon dan jangan memakai emoji sebagai ikon.

## Foto & ilustrasi

- Foto terang dan natural: orang sungguhan bekerja dengan teknologi. Hindari foto stok klise (jabat tangan, gembok digital, kode hijau ala Matrix).
- Overlay foto: gradasi `mh-color-navy-900` → transparan, opacity 70–85%, teks putih.

## Memakai komponen

Muat `components/bundle.css` setelah `tokens.css`, lalu beri `class="mh-root"` pada `<body>`. Komponen berupa HTML + class `.mh-*`, tanpa JavaScript framework. Tema Gelap aktif lewat `data-theme="dark"` pada `<html>`. Konten dari input pengguna wajib di-escape oleh aplikasi.
