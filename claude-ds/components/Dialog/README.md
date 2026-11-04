# Dialog

Dialog modal untuk konfirmasi atau form singkat, memakai elemen `<dialog>` bawaan browser.

**Markup:** `dialog.mh-dialog[aria-labelledby]` berisi `.mh-dialog__header` (h3), `.mh-dialog__body`, `form[method=dialog].mh-dialog__footer` (button ghost "Batal" + satu primary). Buka dengan `dialog.showModal()`.

**Konsumen menyediakan:** judul berupa pertanyaan ("Kirim penawaran?"), isi yang menyebut akibatnya, dan label tombol yang menyebut aksinya ("Kirim sekarang", bukan "Ya").

- Fokus, tombol Esc, dan backdrop (`mh-overlay`) ditangani browser.
- Aksi destruktif memakai `mh-btn--danger` sebagai tombol utama.
- Jangan membuka dialog di atas dialog.
