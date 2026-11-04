# Button

Tombol aksi: primary (default), secondary, accent, ghost, danger, dalam tiga ukuran.

**Markup:** `<button class="mh-btn">Label</button>`. Tambah modifier `mh-btn--secondary` | `--accent` | `--ghost` | `--danger`, ukuran `--sm` | `--lg`, lebar penuh `--block`, ikon saja `--icon` (wajib `aria-label`). Ikon SVG di dalam tombol otomatis 1.15em. Untuk tautan, class yang sama berlaku pada `<a>`.

**Konsumen menyediakan:** label kata kerja ("Kirim penawaran"), handler klik, atribut `disabled` atau `aria-disabled="true"`.

- Satu `mh-btn` primary per area/kartu/dialog. Aksi lain: secondary atau ghost.
- `--accent` (cyan, teks `mh-on-accent`) hanya untuk CTA di atas latar navy atau gradasi.
- `--danger` hanya untuk aksi destruktif, dan selalu didahului konfirmasi.
- `--sm` (32px) hanya untuk tabel/toolbar desktop; target sentuh minimal 40px (`mh-btn` default).
- Jangan "OK", "Submit", atau "Klik di sini".
