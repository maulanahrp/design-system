"""
Vektorisasi badge MaulanaHRP dari PNG asli TANPA menggambar ulang.

Bentuk diambil langsung dari piksel (potrace pada upscale 3x), warna diambil
dari sampel piksel asli. Hasil: assets/logo/source/badge-trace.json berisi bagian-bagian logo (path SVG
pada koordinat PNG asli, gradien, warna, kotak batas). Semua varian logo
disusun dari file ini oleh scripts/build-logos.mjs (npm run build:logos).

Dependensi (jalankan di venv terpisah):
  pip install pillow numpy scikit-image scipy potracer
  python scripts/trace-badge.py
"""
import json
import os
import sys

import numpy as np
import potrace
from PIL import Image
from scipy import ndimage as ndi
from skimage import filters, measure, morphology, segmentation

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "assets/logo/maulanahrp-badge.png")
OUT = os.path.join(ROOT, "assets/logo/source/badge-trace.json")
S = 3  # faktor upscale untuk tracing

# Kotak area mark gelombang (koordinat 1x). Teks & cincin ada di luar kotak ini.
MX0, MY0, MX1, MY1 = 175, 210, 695, 455
# Pita vertikal teks "Tech Solution" (koordinat 1x)
SUB_X0, SUB_Y0, SUB_X1, SUB_Y1 = 190, 563, 690, 618


def load():
    im = np.asarray(Image.open(SRC).convert("RGBA")).astype(np.float64)
    a = im[..., 3:] / 255.0
    rgb = im[..., :3] * a + 255.0 * (1 - a)  # komposit di atas putih
    return rgb, im[..., 3] / 255.0


def upscale(arr):
    """Upscale float array (H,W) atau (H,W,C) dengan Lanczos."""
    if arr.ndim == 2:
        return np.asarray(
            Image.fromarray(arr.astype(np.float32), mode="F").resize(
                (arr.shape[1] * S, arr.shape[0] * S), Image.LANCZOS
            )
        ).astype(np.float64)
    return np.stack([upscale(arr[..., c]) for c in range(arr.shape[2])], -1)


def trace(mask, turdsize=4):
    """mask bool (True = terisi) -> path data SVG pada koordinat 1x."""
    plist = potrace.Bitmap(~mask).trace(
        turdsize=turdsize, turnpolicy=potrace.POTRACE_TURNPOLICY_MINORITY,
        alphamax=1.0, opticurve=True, opttolerance=0.2,
    )

    def f(p):
        return f"{p.x / S:.2f} {p.y / S:.2f}".replace(".00", "")

    out = []
    for curve in plist.curves:
        d = [f"M{f(curve.start_point)}"]
        for seg in curve.segments:
            if seg.is_corner:
                d.append(f"L{f(seg.c)}L{f(seg.end_point)}")
            else:
                d.append(f"C{f(seg.c1)} {f(seg.c2)} {f(seg.end_point)}")
        d.append("Z")
        out.append("".join(d))
    return "".join(out)


def hexc(c):
    return "#" + "".join(f"{int(round(min(255, max(0, v)))):02X}" for v in c)


def gradient(gid, ys, xs, cols, nstops=7):
    """Gradien linear multi-stop: arah = arah perubahan luminans terbesar,
    warna stop = median piksel asli per pita proyeksi."""
    lum = cols @ np.array([0.299, 0.587, 0.114])
    X = np.c_[np.ones(len(xs)), xs, ys]
    coef = np.linalg.lstsq(X, lum, rcond=None)[0]
    d = coef[1:] / np.hypot(*coef[1:])
    t = xs * d[0] + ys * d[1]
    lo, hi = np.percentile(t, [1, 99])
    stops = []
    edges = np.linspace(lo, hi, nstops + 1)
    for i in range(nstops):
        sel = (t >= edges[i]) & (t <= edges[i + 1])
        if sel.sum() < 10:
            continue
        off = (i + 0.5) / nstops
        stops.append((off, hexc(np.median(cols[sel], 0))))
    cx, cy = xs.mean(), ys.mean()
    tc = cx * d[0] + cy * d[1]
    return {
        "id": gid,
        "x1": round(cx + (lo - tc) * d[0], 1), "y1": round(cy + (lo - tc) * d[1], 1),
        "x2": round(cx + (hi - tc) * d[0], 1), "y2": round(cy + (hi - tc) * d[1], 1),
        "stops": [[round(o, 3), c] for o, c in stops],
    }


def bbox(mask):
    ys, xs = np.nonzero(mask)
    return [round(xs.min() / S, 1), round(ys.min() / S, 1),
            round((xs.max() + 1) / S, 1), round((ys.max() + 1) / S, 1)]


def pad(m, H, W):  # mask sub-kotak -> mask penuh
    full = np.zeros((H * S, W * S), bool)
    full[MY0 * S : MY1 * S, MX0 * S : MX1 * S] = m
    return full


def build_mark(rgb, rgb3, H, W):
    # ---- 3. Mark gelombang
    sub = rgb[MY0:MY1, MX0:MX1]
    sub3 = rgb3[MY0 * S : MY1 * S, MX0 * S : MX1 * S]
    mn = sub.min(-1)
    # ambang lokal: separuh jarak antara putih dan warna tinta terdekat
    ink_local = ndi.minimum_filter(mn, size=9)
    thr_local = upscale((255 + ink_local) / 2)
    sil = sub3.min(-1) < thr_local
    sil = morphology.remove_small_objects(sil, max_size=200 * S * S)
    lab = measure.label(sil, connectivity=2)
    regs = sorted(measure.regionprops(lab), key=lambda r: -r.area)[:3]
    wave_lab = regs[0].label
    conns = sorted(regs[1:], key=lambda r: r.centroid[1])  # kiri, kanan
    wave = lab == wave_lab
    conn_l = lab == conns[0].label
    conn_r = lab == conns[1].label

    # pisah 2 pita gelombang di garis tepi warna
    g3 = filters.gaussian(sub3, sigma=0.8 * S, channel_axis=-1, preserve_range=True)
    mag = sum(filters.sobel(g3[..., c]) for c in range(3))
    interior = morphology.erosion(wave, morphology.disk(3 * S))
    ridge = morphology.dilation((mag > 10 / S) & interior, morphology.disk(S))
    parts = measure.label(interior & ~ridge, connectivity=1)
    big = sorted(measure.regionprops(parts), key=lambda r: -r.area)[:2]
    if len(big) < 2 or big[1].area < 0.2 * big[0].area:
        sys.exit("Gagal memisah pita gelombang")
    markers = np.zeros_like(parts)
    for i, r in enumerate(big, 1):
        markers[parts == r.label] = i
    bands = segmentation.watershed(mag, markers, mask=wave)
    # perluas label ke seluruh kotak supaya batas pita bisa di-clip oleh siluet
    _, (iy, ix) = ndi.distance_transform_edt(bands == 0, return_indices=True)
    bands_ext = bands[iy, ix]
    # pita mana yang lebih terang?
    lum = sub3 @ np.array([0.299, 0.587, 0.114])
    light = 1 if lum[bands == 1].mean() > lum[bands == 2].mean() else 2
    band_light_ext = bands_ext == light

    # ---- warna gradien dari piksel inti asli (1x, tanpa tepi antialias)
    def core_pixels(mask3):
        m1 = np.asarray(Image.fromarray(mask3.astype(np.uint8) * 255).resize(
            (MX1 - MX0, MY1 - MY0), Image.BOX)) > 250
        m1 = morphology.erosion(m1, morphology.disk(1))
        ys, xs = np.nonzero(m1)
        return ys + MY0 + 0.5, xs + MX0 + 0.5, sub[m1 & True]

    band_dark = wave & ~band_light_ext
    band_light = wave & band_light_ext
    defs = []
    for gid, m in (("wave-dark", band_dark), ("wave-light", band_light),
                   ("conn-l", conn_l), ("conn-r", conn_r)):
        ys, xs, cols = core_pixels(m)
        defs.append(gradient(gid, ys, xs, cols))

    mark3 = pad(wave | conn_l | conn_r, H, W)
    parts = {
        "wave": trace(pad(wave, H, W)),
        "waveLight": trace(pad(band_light_ext, H, W)),
        "connL": trace(pad(conn_l, H, W)),
        "connR": trace(pad(conn_r, H, W)),
    }
    return mark3, defs, parts


def main():
    rgb, alpha = load()
    H, W = alpha.shape
    rgb3, alpha3 = upscale(rgb), upscale(alpha)
    yy3, xx3 = np.mgrid[0 : H * S, 0 : W * S]

    # ---- 1. Piringan putih (siluet seluruh badge)
    disc = ndi.binary_fill_holes(alpha3 > 0.5)

    # ---- 2. Navy: cincin + judul (satu warna) dan subjudul (navy lebih gelap)
    G = rgb[..., 1]
    yy1, xx1 = np.mgrid[0:H, 0:W]
    sub_zone1 = (yy1 >= SUB_Y0) & (yy1 < SUB_Y1) & (xx1 >= SUB_X0) & (xx1 < SUB_X1)
    navy_core = morphology.erosion((G < 120) & (alpha > 0.99), morphology.disk(1))
    navy_col = np.median(rgb[navy_core & ~sub_zone1], 0)
    sc = rgb[(G < 120) & sub_zone1]
    sub_col = np.median(sc[sc[:, 1] <= np.percentile(sc[:, 1], 30)], 0)  # pusat goresan tipis
    thr = (255 + navy_col[1]) / 2  # 50% cakupan antara putih dan navy
    dark = (rgb3[..., 1] < thr) & disc
    sub_zone3 = ((yy3 >= SUB_Y0 * S) & (yy3 < SUB_Y1 * S)
                 & (xx3 >= SUB_X0 * S) & (xx3 < SUB_X1 * S))

    # ---- (mark dihitung dulu supaya navy = gelap minus mark, bukan minus kotak)
    mark3, defs, mark_parts = build_mark(rgb, rgb3, H, W)
    navy_all = dark & ~morphology.dilation(mark3, morphology.disk(2 * S))
    navy = navy_all & ~sub_zone3
    subt = navy_all & sub_zone3

    # Versi bersih: hapus bintik putih hanya di zona cincin (r > jari-jari dalam cincin)
    cy, cx = np.array(np.nonzero(disc)).mean(1)
    rad = np.hypot(yy3 - cy, xx3 - cx)
    r_out = np.sqrt(disc.sum() / np.pi)
    ring_zone = rad > r_out * 0.80
    filled = morphology.remove_small_holes(navy, max_size=int((6 * S) ** 2))
    navy_clean = np.where(ring_zone, filled, navy)
    # bintik yang memotong tepi cincin -> tutup dengan closing kecil di zona cincin
    closed = morphology.closing(navy_clean, morphology.disk(2 * S))
    navy_clean = np.where(ring_zone, closed & disc, navy_clean)

    # pisah cincin (komponen besar melingkar) dari judul
    def split_rings(m):
        lab = measure.label(m, connectivity=2)
        rings = np.zeros_like(m)
        for r in measure.regionprops(lab):
            if r.bbox[2] - r.bbox[0] > 500 * S:
                rings |= lab == r.label
        return rings

    rings_tex = split_rings(navy)
    rings_clean = split_rings(navy_clean)
    title = navy & ~rings_tex

    # viewBox persegi rapat di sekitar badge
    ys, xs = np.nonzero(alpha > 0.02)
    x0, x1, y0, y1 = xs.min(), xs.max() + 1, ys.min(), ys.max() + 1
    side = int(max(x1 - x0, y1 - y0))
    data = {
        "source": "assets/logo/maulanahrp-badge.png",
        "note": "Dibangkitkan oleh scripts/trace-badge.py. Jangan diedit manual.",
        "badgeBox": [float((x0 + x1 - side) / 2), float((y0 + y1 - side) / 2), side, side],
        "colors": {"navy": hexc(navy_col), "subtitle": hexc(sub_col)},
        "gradients": defs,
        "paths": {
            "disc": trace(disc, turdsize=200),
            "rings": trace(rings_clean),
            "ringsTextured": trace(rings_tex),
            "title": trace(title),
            "subtitle": trace(subt),
            **mark_parts,
        },
        "boxes": {
            "mark": bbox(mark3),
            "title": bbox(title),
            "subtitle": bbox(subt),
            "rings": bbox(rings_clean),
        },
    }
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w") as fh:
        json.dump(data, fh, indent=1)
    print("OK", OUT, os.path.getsize(OUT), "bytes", data["colors"], data["boxes"])


if __name__ == "__main__":
    main()
