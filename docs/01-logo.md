# Logo

Logo MaulanaHRP terdiri dari **mark** (gelombang dengan dua node yang terhubung) dan **wordmark** "MaulanaHRP / Tech Solution".
Makna visualnya: data yang mengalir dan sistem yang saling terhubung.

## Varian

| Varian | File | Kapan dipakai |
|---|---|---|
| **Badge (master)** | `assets/logo/maulanahrp-badge-color.svg` | **Logo resmi**, persis logo asli (tanpa bintik tekstur). Stiker, cover deck, sertifikat, foto profil media sosial, segel dokumen. |
| Badge putih | `…-badge-white.svg` | Badge satu warna putih (tanpa piringan) di atas navy, foto gelap, atau gradasi. |
| Horizontal | `…-horizontal-color.svg` | Header web, kop surat, footer deck, email signature. **Default untuk ruang melebar.** |
| Horizontal putih | `…-horizontal-white.svg` | Di atas latar navy, foto gelap, atau gradasi brand. |
| Horizontal navy / hitam | `…-horizontal-navy.svg`, `…-horizontal-black.svg` | Cetak 1 warna, stempel, fax/fotokopi, merchandise. |
| Mark | `…-mark-color.svg` (+ navy/white/black) | Ruang sempit: avatar, loading, watermark, ikon fitur. |
| App icon | `…-app-icon.svg`, `assets/favicon/*` | Favicon, ikon aplikasi, PWA. |
| Arsip bertekstur | `…-badge-original.svg` | Logo asli lengkap dengan bintik putih di cincin. Hanya arsip. |
| Arsip raster | `…-badge.png` | Sumber vektorisasi (878px). |

### Asal-usul file
Semua varian **tidak digambar ulang**. Bentuk dan warna diambil langsung dari logo asli:

1. `scripts/trace-badge.py` memvektorisasi `maulanahrp-badge.png` (potrace pada upscale 3x, warna disampel dari piksel asli) menjadi `assets/logo/source/badge-trace.json`: cincin, judul, subjudul, 2 pita gelombang, dan 2 konektor.
2. `npm run build:logos` menyusun badge, mark, lockup horizontal, app icon, favicon, PNG, dan motif dekoratif dari bagian-bagian itu.

Lockup horizontal hanya **menata ulang** bagian asli: mark di kiri, blok teks asli (posisi judul terhadap subjudul tetap seperti di badge) di kanan.

Warna logo hasil sampel: navy `#1D3668` (cincin, "MaulanaHRP"), navy gelap `#1C2A45` ("Tech Solution"), gelombang & konektor bergradasi cyan → biru.
Jika file vektor resmi dari desainer tersedia, file itu lebih diutamakan daripada hasil vektorisasi.

## Area bebas (clear space)
Sisakan ruang kosong di semua sisi minimal **setinggi node bulat besar** pada mark (≈ ¼ tinggi mark).
Untuk badge: minimal 8% dari diameternya.

```
   ┌───────────────────────────────┐
   │   x                           │
   │ x  [~]  MaulanaHRP          x │
   │         Tech Solution         │
   │                           x   │
   └───────────────────────────────┘
          x = tinggi node mark
```

## Ukuran minimum
| Varian | Digital | Cetak |
|---|---|---|
| Horizontal | lebar 180px | lebar 45mm |
| Badge | diameter 96px | diameter 25mm |
| Mark | lebar 24px | lebar 8mm |

Di bawah ukuran tersebut, tagline "Tech Solution" tidak terbaca. Gunakan mark saja.

## Latar yang diizinkan
- Putih / `neutral-50` → versi **color**.
- Navy (`navy-800`/`900`), gradasi brand, foto gelap → versi **white**.
- Cyan muda (`cyan-50/100`) → versi **color** atau **navy**.
- Foto ramai → letakkan di atas panel putih/navy, jangan langsung di atas foto.

## Jangan
- ❌ Mengubah warna mark di luar varian resmi (mis. gelombang merah).
- ❌ Merentangkan, memiringkan, memutar, atau memberi efek (shadow, glow, outline, 3D).
- ❌ Mengganti font wordmark atau menyusun ulang posisi mark dan teks.
- ❌ Menaruh versi color di atas latar navy/gelap (kontras hilang).
- ❌ Memakai versi arsip bertekstur (`-badge-original`) untuk kebutuhan sehari-hari.
- ❌ Menggambar ulang mark atau mengetik ulang wordmark dengan font. Pakai file dari `assets/logo/`.
- ❌ Menambah elemen lain di dalam area bebas.
