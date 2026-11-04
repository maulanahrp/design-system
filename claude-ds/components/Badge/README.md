# Badge

Label status atau kategori kecil berbentuk pill.

**Markup:** `<span class="mh-badge">Baru</span>`. Varian: `--accent`, `--success`, `--warning`, `--danger`, `--neutral`.

**Konsumen menyediakan:** teks 1–2 kata yang menyebut status ("Lunas", "Jatuh tempo"), bukan hanya warnanya.

- Status dokumen: Draf = `--neutral`, Menunggu/Negosiasi = `--warning`, Disetujui/Lunas = `--success`, Ditolak/Jatuh tempo = `--danger`.
- Jangan dijadikan tombol. Untuk filter yang bisa diklik, pakai button `--secondary --sm`.
