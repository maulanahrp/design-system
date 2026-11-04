# Logo

Logo MaulanaHRP terdiri dari **mark** (gelombang dengan dua node yang terhubung) dan **wordmark** "MaulanaHRP / Tech Solution".
Makna visualnya: data yang mengalir dan sistem yang saling terhubung.

## Varian

| Varian | File | Kapan dipakai |
|---|---|---|
| Horizontal (utama) | `assets/logo/maulanahrp-horizontal-color.svg` | Header web, kop surat, footer deck, email signature. **Default untuk hampir semua kebutuhan.** |
| Horizontal putih | `…-horizontal-white.svg` | Di atas latar navy, foto gelap, atau gradasi brand. |
| Horizontal navy / hitam | `…-horizontal-navy.svg`, `…-horizontal-black.svg` | Cetak 1 warna, stempel, fax/fotokopi, merchandise. |
| Badge | `…-badge-color.svg`, `…-badge-white.svg` | Stiker, cover deck, sertifikat, foto profil media sosial, segel dokumen. |
| Badge asli (raster) | `…-badge.png` | Arsip. Bertekstur dan hanya 878px; **jangan** dipakai untuk cetak besar atau ukuran kecil. |
| Mark | `…-mark-color.svg` (+ navy/white/black) | Ruang sempit: avatar, loading, watermark, ikon fitur. |
| App icon | `…-app-icon.svg`, `assets/favicon/*` | Favicon, ikon aplikasi, PWA. |

> Mark gelombang adalah **interpretasi vektor** dari logo raster asli. Jika file vektor resmi tersedia, ganti di `scripts/build-logos.mjs` lalu jalankan `npm run build:logos`.

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
| Horizontal | lebar 120px | lebar 30mm |
| Badge | diameter 64px | diameter 18mm |
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
- ❌ Memakai badge raster bertekstur di bawah 200px.
- ❌ Menambah elemen lain di dalam area bebas.
