# Layout, Spacing, Bentuk, Ikon & Gerak

## Spacing (grid 4px)
`--mh-space-1` (4px) … `--mh-space-24` (96px). Gunakan kelipatan ini saja.

| Konteks | Nilai |
|---|---|
| Jarak ikon–teks, chip | 4–8px (`space-1`/`2`) |
| Padding input/button | 8–12px vertikal, 16px horizontal |
| Padding card | 24px (`space-6`), mobile 16px |
| Jarak antar elemen form | 16–20px |
| Jarak antar section (web) | 64–96px (`space-16`/`24`), mobile 48px |

## Grid & breakpoint
| Breakpoint | Lebar | Kolom | Gutter | Margin |
|---|---|---|---|---|
| mobile | < 640 | 4 | 16px | 16px |
| `sm` | ≥ 640 | 8 | 20px | 24px |
| `lg` | ≥ 1024 | 12 | 24px | 32px |
| `xl` | ≥ 1280 | 12 | 24px | auto (konten max 1200px) |

## Radius
| Token | Nilai | Pakai |
|---|---|---|
| `--mh-radius-sm` | 4px | Badge, checkbox, tag |
| `--mh-radius-md` | 8px | **Button, input** (default) |
| `--mh-radius-lg` | 12px | Card, modal, dropdown |
| `--mh-radius-xl` | 20px | Hero card, gambar ilustrasi |
| `--mh-radius-full` | — | Avatar, pill, toggle |

Karakter brand: **membulat tapi tidak bulat penuh**, mengikuti lengkung gelombang logo.

## Elevasi (shadow)
Shadow bernuansa navy (bukan hitam murni) agar tetap hangat.
- `sm`: card diam, input.
- `md`: card hover, dropdown.
- `lg`: modal, popover penting.
- `focus`: cincin cyan 3px. **Wajib** di semua elemen interaktif saat `:focus-visible`.

Di dark mode, kurangi shadow; bedakan kedalaman dengan warna `surface-raised`.

## Ikon
- Set: **[Lucide](https://lucide.dev)** (open source, ISC). Gayanya garis membulat, cocok dengan mark logo.
- Stroke 1.75px (UI) / 2px (ukuran ≥ 32px), sudut dan ujung garis `round`.
- Ukuran: 16 (inline teks kecil), 20 (default UI), 24 (navigasi), 32–48 (ilustrasi fitur).
- Warna ikut teks (`currentColor`). Ikon fitur boleh di dalam lingkaran `accent-subtle` dengan ikon `primary`.
- Jangan mencampur set ikon (mis. Lucide + Font Awesome) dalam satu produk.

## Ilustrasi & motif
- Motif khas: **garis gelombang + node** dari logo. Boleh dipakai sebagai garis dekoratif tipis (opacity 10–20%) di hero, cover deck, atau footer.
- Foto: terang, natural, orang sungguhan bekerja dengan teknologi. Hindari stok foto klise (jabat tangan, gembok digital, kode hijau ala Matrix).
- Overlay foto: gradasi navy-900 → transparan, opacity 70–85%.

## Gerak (motion)
| Token | Nilai | Pakai |
|---|---|---|
| `--mh-motion-duration-fast` | 120ms | Hover, warna, toggle |
| `--mh-motion-duration-base` | 200ms | Dropdown, tooltip |
| `--mh-motion-duration-slow` | 320ms | Modal, drawer |
| `--mh-motion-easing-standard` | cubic-bezier(.2,0,0,1) | Default |

Selalu hormati `prefers-reduced-motion: reduce` (matikan animasi non-esensial).
