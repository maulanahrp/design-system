# Komponen UI

Preview interaktif: `preview/components.html` (buka langsung di browser).

## Pemasangan
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Montserrat:wght@600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/components.css">
<body class="mh-root"> … </body>
```
Dark mode otomatis mengikuti sistem. Paksa dengan `<html data-theme="dark">` atau `data-theme="light"`.

Framework (React/Vue/Laravel Blade): cukup impor kedua CSS sekali di entry point, lalu pakai class `mh-*`. Di JavaScript, token tersedia di `dist/tokens.resolved.json`.

## Daftar komponen
| Komponen | Class | Catatan |
|---|---|---|
| Button | `mh-btn` + `--secondary` `--accent` `--ghost` `--danger`, `--sm` `--lg` `--block` `--icon` | Satu primary per area. Tombol ikon wajib punya `aria-label`. |
| Field | `mh-field`, `mh-label`, `mh-help`, `mh-error-text` | Tandai error dengan `aria-invalid="true"` + `aria-describedby`. |
| Input | `mh-input`, `mh-select`, `mh-textarea` | |
| Checkbox / radio | `<label class="mh-check"><input type="checkbox">…` | |
| Switch | `<label class="mh-switch"><input type="checkbox" role="switch">…` | |
| Card | `mh-card` + `--interactive` `--brand` `--inverse`, `mh-card__media`, `mh-card__footer` | `--brand` = gradasi; pakai maksimal 1 per layar. |
| Statistik | `mh-stat__value`, `mh-stat__label` | |
| Ikon tile | `mh-icon-tile` | Ikon fitur 24px di kotak cyan muda. |
| Badge | `mh-badge` + `--accent` `--success` `--warning` `--danger` `--neutral` | |
| Alert | `mh-alert` + `--success` `--warning` `--danger`, `mh-alert__title` | `role="alert"` hanya untuk error mendesak; selain itu `role="status"`. |
| Toast | `mh-toast` | Hilang otomatis setelah 4–6 detik; sediakan aksi "Urungkan" bila relevan. |
| Progress | `mh-progress` > `mh-progress__bar` (`style="--value: 64%"`) | Sertakan `role="progressbar"` + `aria-valuenow`. |
| Table | `mh-table-wrap` > `mh-table`; `mh-right` untuk kolom angka, `mh-num` untuk angka tabular | |
| Navbar | `mh-navbar` > `mh-container mh-navbar__inner`, `mh-navbar__brand`, `mh-navbar__links` | Halaman aktif: `aria-current="page"`. Di < 768px, link disembunyikan; sediakan menu mobile sendiri. |
| Tabs | `mh-tabs` > `mh-tab[role=tab][aria-selected]` | Perilaku keyboard (panah kiri/kanan) diimplementasikan di JS aplikasi. |
| Breadcrumb | `ol.mh-breadcrumb` | |
| Pagination | `ul.mh-pagination` | |
| Dialog | `<dialog class="mh-dialog">` + `__header` `__body` `__footer` | Buka dengan `dialog.showModal()`; fokus & tombol Esc ditangani browser. |
| Avatar | `mh-avatar` | Inisial 2 huruf atau `<img>`. |
| Tooltip | atribut `data-mh-tooltip="…"` | Hanya untuk label pendek; jangan berisi info penting. |
| Layout | `mh-container`, `mh-section`, `mh-stack`, `mh-row`, `mh-grid` (`--mh-min`), `mh-divider` | Atur jarak dengan `style="--mh-gap: var(--mh-space-2)"`. |
| Tipografi | `mh-display`, `mh-lead`, `mh-overline`, `mh-muted`, `mh-small` | |
| Motif | `mh-wave-line` | Garis gradasi pendek di bawah judul/statistik. |

## Token bentuk (untuk tema)
Komponen membaca token ini; tema lain (lihat `themes/`) cukup menimpanya:
`--mh-border-width`, `--mh-border-color`, `--mh-control-radius`, `--mh-card-radius`, `--mh-card-shadow(-hover)`, `--mh-btn-shadow(-hover/-active)`, `--mh-btn-lift`, `--mh-btn-press`, `--mh-btn-weight`, `--mh-btn-font`, `--mh-heading-weight`, `--mh-focus-ring`.

## Aksesibilitas (wajib)
- Semua elemen interaktif bisa dijangkau keyboard dan menampilkan focus ring cyan.
- Target sentuh minimal 40×40px (button default 40px tinggi; `--sm` hanya untuk desktop/tabel padat).
- Jangan menyampaikan status hanya lewat warna; selalu sertakan teks atau ikon.
- Konten yang ditampilkan dari input pengguna wajib di-escape oleh aplikasi (komponen ini hanya CSS).
