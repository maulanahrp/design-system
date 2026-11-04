# Table

Tabel data dengan header ringan, baris hover, dan kolom angka rata kanan.

**Markup:** `.mh-table-wrap > table.mh-table`. Kolom angka: `class="mh-right mh-num"` (rata kanan + tabular). Kode/nomor dokumen: `class="mh-num"`.

**Konsumen menyediakan:** `<thead>` dengan satuan di header ("Nilai (Rp)"), data yang sudah di-escape, dan pagination (`ul.mh-pagination`) bila lebih dari 20 baris.

- `.mh-table-wrap` menggulir horizontal di layar sempit; jangan sembunyikan kolom penting.
- Status di dalam sel memakai `mh-badge`.
- Angka tanpa "Rp" di sel; satuan cukup di header.
