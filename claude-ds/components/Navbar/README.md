# Navbar

Bilah navigasi atas yang lengket (sticky), berisi logo, tautan, dan aksi, plus breadcrumb.

**Markup:** `header.mh-navbar > .mh-container.mh-navbar__inner` berisi `a.mh-navbar__brand > img` (logo horizontal, tinggi 36px), `ul.mh-navbar__links` (tautan aktif: `aria-current="page"`), dan satu button. Breadcrumb: `ol.mh-breadcrumb`.

**Konsumen menyediakan:** logo (color di tema Terang, white di tema Gelap), tautan, dan menu mobile sendiri. Di bawah 768px tautan disembunyikan.

- Maksimal 5 tautan + 1 CTA primary.
- Jangan memasang logo dua kali (navbar dan hero) di layar pertama.
