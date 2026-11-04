# Deck Presentasi

Template contoh: `templates/deck.html` (10 layout, 16:9). Buka di browser → **Ctrl/Cmd + P → Simpan sebagai PDF** (ukuran halaman 16:9 otomatis, warna latar ikut tercetak).

## Prinsip
1. **Satu pesan per slide.** Judul slide adalah *kesimpulan*, bukan topik: "Proses manual menyita 40% waktu tim", bukan "Latar Belakang".
2. Maksimal **3–5 bullet**, maksimal ±12 kata per bullet.
3. Angka besar > tabel. Sebutkan sumber data di footer.
4. Sorot satu hal saja: satu batang grafik berwarna `navy-700`, sisanya `navy-300`.
5. Ritme latar: putih (mayoritas) → navy untuk pembatas bagian → gradasi hanya untuk cover.

## Layout yang tersedia
| # | Layout | Latar |
|---|---|---|
| 01 | Cover | Gradasi brand + motif gelombang + logo putih |
| 02 | Agenda | Putih, daftar bernomor |
| 03 | Pembatas bagian | Navy-800 + motif cyan |
| 04 | Konten + gambar | Putih, bullet kiri, gambar 4:3 kanan |
| 05 | Perbandingan | Dua kotak: abu muda vs. navy |
| 06 | Angka kunci | 3 KPI besar + garis gelombang |
| 07 | Grafik | Teks kiri, grafik batang kanan |
| 08 | Proses / timeline | 3–5 langkah bernomor |
| 09 | Kutipan / testimoni | Cyan-50 |
| 10 | Penutup / kontak | Navy-800 + CTA |

## Spesifikasi master slide (PowerPoint / Google Slides / Keynote)
| Elemen | Nilai |
|---|---|
| Ukuran | 16:9 (33,867 × 19,05 cm / 1920 × 1080 px) |
| Margin | kiri/kanan 128px (≈ 2,26 cm), atas 112px, bawah 120px |
| Footer | logo horizontal tinggi 40px di kiri bawah (48px dari tepi bawah); nomor slide Inter 18px abu `#627189` di kanan |
| Aksen | strip gradasi cyan→blue 12×180px di pojok kiri atas (slide konten) |
| Kicker / overline | Inter SemiBold 22px, kapital, spasi huruf 12%, `#276F82` (di latar navy: `#7FD0DF`) |
| Judul slide | Montserrat Bold 56px, `#1C366B` |
| Judul cover | Montserrat Bold 96px, putih |
| Isi | Inter Regular 30px (minimal 24px), `#171D2A` |
| Bullet | lingkaran berongga cyan `#68C0D2` |
| Warna tema PowerPoint | Dark 1 `#171D2A` · Light 1 `#FFFFFF` · Dark 2 `#1C366B` · Light 2 `#EEF3FA` · Accent 1 `#274B91` · Accent 2 `#68C0D2` · Accent 3 `#5A7FBA` · Accent 4 `#276F82` · Accent 5 `#95A3B8` · Accent 6 `#E59A1A` · Hyperlink `#2E5C9C` |
| Font tema | Heading: Montserrat · Body: Inter (fallback: Segoe UI / Arial) |

Aset untuk master: `assets/logo/maulanahrp-horizontal-color.png` / `-white.png` (1200px) dan motif gelombang di `templates/deck.html` (symbol `#wave`).

## Jangan
- ❌ Paragraf panjang di slide. Pindahkan ke speaker notes atau lampiran.
- ❌ Lebih dari 2 font atau warna di luar palet.
- ❌ Gradasi brand di setiap slide (hilang kesan istimewanya).
- ❌ Logo di pojok kanan atas *dan* footer sekaligus (pilih footer).
- ❌ Clip-art, efek WordArt, transisi berputar. Transisi cukup *fade* ≤ 300ms.
