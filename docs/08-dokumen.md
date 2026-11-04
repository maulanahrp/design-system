# Dokumen Bisnis

Template HTML ukuran A4 di `templates/`. Buka di browser → **Ctrl/Cmd + P** → Ukuran **A4**, Margin **Tidak ada/None**, centang **Grafik latar/Background graphics** → Simpan sebagai PDF.

| Template | File | Isi |
|---|---|---|
| Penawaran harga | `templates/penawaran.html` | 2 halaman: rincian biaya + total & terbilang; lingkup, termin, S&K, tanda tangan |
| Invoice | `templates/invoice.html` | 1 halaman: status, tagihan, PPN, info transfer |
| Kop surat | `templates/surat.html` | Surat resmi (nomor, lampiran, perihal) |
| Kartu nama | `templates/kartu-nama.html` | 90 × 55 mm, depan (navy) & belakang (putih) |

> Teks dalam **[kurung siku]** adalah data perusahaan yang belum diketahui (alamat, NPWP, rekening, kontak). Wajib diganti sebelum dipakai. Data klien (PT Contoh Jaya, dll.) hanyalah contoh.

## Struktur halaman A4
| Elemen | Spesifikasi |
|---|---|
| Margin | atas 16mm, kiri/kanan 18mm, bawah 24mm |
| Kop | logo horizontal tinggi 13mm (kiri), alamat Inter 8pt rata kanan; garis navy 0,6mm + aksen gradasi 38mm |
| Judul dokumen | kicker Inter 8pt kapital cyan-700 + Montserrat Bold 22pt navy |
| Isi | Inter 9,5pt, spasi 1,45 |
| Tabel item | header navy-800 teks putih; baris belang neutral-50; angka rata kanan, tabular |
| Total | kotak navy-800, Montserrat Bold 11pt |
| Footer | nomor dokumen + halaman, Inter 7,5pt, 7mm dari bawah; strip gradasi 3mm di tepi bawah |
| Watermark | mark navy, opacity 5%, kanan bawah (opsional) |

## Penomoran dokumen
| Jenis | Format | Contoh |
|---|---|---|
| Penawaran | `PNW/{tahun}/{bulan}/{urut 3 digit}` | PNW/2026/11/014 |
| Invoice | `INV/{tahun}/{bulan}/{urut}` | INV/2026/11/031 |
| Surat keluar | `{urut}/MHRP/{bulan romawi}/{tahun}` | 021/MHRP/XI/2026 |

## Aturan isi
- Format uang: `Rp90.159.750` (tanpa spasi, titik pemisah ribuan, tanpa ",00"). Di dalam kolom tabel tulis angka saja dan cantumkan "(Rp)" di header.
- Tanggal: `4 November 2026` (tanpa singkatan) di dokumen formal.
- Selalu cantumkan **terbilang** untuk total penawaran dan invoice.
- PPN: tulis tarif dan dasar pengenaan secara eksplisit. Tarif & DPP mengikuti regulasi yang berlaku; **konfirmasikan ke konsultan pajak**, karena template hanya contoh perhitungan.
- Penawaran menonjolkan **hasil bisnis** di paragraf pembuka (lihat `05-tone-of-voice.md`).

## Untuk Word / Google Docs
Bila dokumen harus dibuat di Word/Docs: gunakan logo PNG `assets/logo/maulanahrp-horizontal-color.png`, font Montserrat (judul) + Inter (isi) dengan fallback Arial, dan warna di atas. Template `.docx` resmi bisa dibuat sebagai task terpisah.

## Kartu nama
Ukuran 90 × 55 mm, **bleed 3 mm** di semua sisi untuk percetakan, area aman 4 mm dari tepi. Kertas disarankan art carton 260–310 gsm, laminasi doff. Kirim ke percetakan sebagai PDF (cetak dari browser) atau minta desainer menyusunnya ulang dari SVG di `assets/logo/`.
