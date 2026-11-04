# Alert

Pesan sebaris untuk info, sukses, peringatan, dan error, plus toast dan progress.

**Markup:** `<div class="mh-alert" role="status">` + ikon SVG + `<div><strong class="mh-alert__title">Judul</strong>Isi</div>`. Varian `--success`, `--warning`, `--danger`. Toast: `.mh-toast`. Progress: `.mh-progress > .mh-progress__bar` dengan `style="--value: 64%"`.

**Konsumen menyediakan:** judul singkat + kalimat yang menyebut apa yang terjadi dan langkah berikutnya; `role="alert"` hanya untuk error mendesak.

- Toast hilang sendiri setelah 4–6 detik; sediakan "Urungkan" bila aksinya bisa dibatalkan.
- Progress wajib `role="progressbar"` + `aria-valuenow` + label.
- Jangan menumpuk lebih dari satu alert untuk masalah yang sama.
