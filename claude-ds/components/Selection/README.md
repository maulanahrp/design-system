# Selection

Checkbox, radio, dan switch untuk pilihan ya/tidak atau pilihan tunggal.

**Markup:** `<label class="mh-check"><input type="checkbox"> Teks</label>` (radio: `type="radio"` dengan `name` yang sama). Switch: `<label class="mh-switch"><input type="checkbox" role="switch"> Teks</label>`.

**Konsumen menyediakan:** `name`/`value`, state `checked`, dan untuk grup radio `<fieldset>` + `<legend class="mh-label">`.

- Switch hanya untuk pengaturan yang langsung berlaku (tanpa tombol Simpan). Selain itu pakai checkbox.
- Radio untuk 2–5 pilihan yang saling eksklusif; lebih dari itu pakai `mh-select`.
- Seluruh label bisa diklik. Jangan menaruh tautan di dalam label.
