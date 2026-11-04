# Card

Wadah konten: card standar, interaktif, brand (gradasi), dan inverse (navy), plus statistik dan ikon tile.

**Markup:** `<article class="mh-card">`. Modifier: `--interactive` (hover terangkat, untuk card yang bisa diklik), `--brand` (gradasi, teks putih), `--inverse` (`mh-surface-inverse`). Bagian: `.mh-card__media` (gambar full-bleed di atas), `.mh-card__footer`. Statistik: `.mh-stat__value` + `.mh-stat__label`. Ikon fitur: `.mh-icon-tile` berisi SVG 24px.

**Konsumen menyediakan:** judul (h3), isi singkat, dan satu tautan/aksi.

- Maksimal satu `--brand` per layar. Di dalamnya pakai button `--accent`.
- Card dalam satu baris harus sejajar: struktur dan tinggi konten serupa.
- Jangan menumpuk card di dalam card. Jangan memberi border-kiri berwarna sebagai aksen.
