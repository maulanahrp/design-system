# Tabs

Tab untuk berpindah antar tampilan dalam satu halaman, plus pagination.

**Markup:** `div.mh-tabs[role=tablist] > button.mh-tab[role=tab][aria-selected]`. Pagination: `ul.mh-pagination > li > a` (halaman aktif `aria-current="page"`).

**Konsumen menyediakan:** panel `role="tabpanel"` dengan `aria-labelledby`, perpindahan via panah kiri/kanan, dan state `aria-selected` yang berganti.

- 2–6 tab, label 1–2 kata. Lebih dari itu, pertimbangkan navigasi samping.
- Tab tidak memicu aksi; isinya hanya tampilan.
