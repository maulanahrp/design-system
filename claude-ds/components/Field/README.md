# Field

Input teks, select, dan textarea lengkap dengan label, teks bantuan, dan pesan error.

**Markup:** `.mh-field` membungkus `label.mh-label` + kontrol (`input.mh-input`, `select.mh-select`, `textarea.mh-textarea`) + `.mh-help` atau `.mh-error-text`. Tanda wajib: `<span class="mh-req" aria-hidden="true">*</span>`.

**Konsumen menyediakan:** `id`/`for` yang cocok, validasi, `aria-invalid="true"` + `aria-describedby` yang menunjuk ke pesan error.

- Label selalu terlihat. Placeholder hanya contoh format, bukan pengganti label.
- Pesan error menjelaskan cara memperbaiki: "Format email belum lengkap, contoh: nama@perusahaan.co.id".
- Susun form satu kolom di mobile; di desktop gunakan `.mh-grid` dengan `--mh-min: 240px`.
