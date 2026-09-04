"""Generate the site's logo assets from the master Zero2Hero artwork.

The master (`logo_zero.png`) is dark ink on a white background, which cannot be
used directly on a dark page. This script un-mattes the white, remaps the navy
ink to the page's light text colour and the orange to the ember accent, then
writes the crops the site actually uses.

    python scripts/build-logo-assets.py path/to/logo_zero.png

Outputs, all with transparent backgrounds:
    public/images/zero2hero-mark.png     icon only
    public/images/zero2hero-lockup.png   icon + wordmark, horizontal (navigation)
    public/images/zero2hero-logo.png     icon + wordmark + tagline, stacked (footer)
    public/favicon.png                   64px, on a dark rounded plate
    public/apple-touch-icon.png          180px, same

Requires: pillow, numpy.
"""

import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
IMAGES = ROOT / 'public' / 'images'
PUBLIC = ROOT / 'public'

LIGHT = np.array([238, 244, 255], dtype=np.float32)  # --text-1
EMBER = np.array([255, 138, 61], dtype=np.float32)   # --ember
PLATE = (7, 11, 19, 255)                             # --ink-900

# Row windows in the master that contain the mark, the wordmark and the tagline.
# Generous on purpose: the exact ink bounds are measured inside each window.
BANDS = {'mark': (180, 590), 'word': (596, 745), 'tag': (750, 815)}


def recolour(path: Path):
    """Un-matte ink from white and remap it to the site's two brand colours."""
    src = np.asarray(Image.open(path).convert('RGB')).astype(np.float32)

    # observed = A*ink + (1-A)*white  =>  A = 1 - min(channel)/255
    alpha = 1.0 - src.min(axis=2) / 255.0
    alpha[alpha < 0.04] = 0.0
    safe = np.maximum(alpha, 1e-4)[..., None]
    ink = np.clip((src - (1.0 - safe) * 255.0) / safe, 0, 255)

    is_warm = (ink[..., 0] - ink[..., 2] > 55) & (ink[..., 0] > 120)
    out = np.where(is_warm[..., None], EMBER, LIGHT)
    img = Image.fromarray(np.dstack([out, alpha * 255.0]).astype(np.uint8), 'RGBA')
    return img, alpha > 0.08


def tight(solid, y0, y1):
    """Exact ink bounding box within a horizontal band."""
    band = solid[y0:y1]
    rows = np.nonzero(band.any(axis=1))[0]
    cols = np.nonzero(band.any(axis=0))[0]
    return int(cols.min()), y0 + int(rows.min()), int(cols.max()) + 1, y0 + int(rows.max()) + 1


def icon(mark: Image.Image, size: int) -> Image.Image:
    pad = round(size * 0.14)
    scale = min((size - pad * 2) / mark.width, (size - pad * 2) / mark.height)
    small = mark.resize((round(mark.width * scale), round(mark.height * scale)), Image.LANCZOS)

    out = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    plate = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    ImageDraw.Draw(plate).rounded_rectangle(
        (0, 0, size - 1, size - 1), radius=round(size * 0.22), fill=PLATE
    )
    out.alpha_composite(plate)
    out.alpha_composite(small, ((size - small.width) // 2, (size - small.height) // 2))
    return out


def main(master: Path):
    img, solid = recolour(master)

    mark_box = tight(solid, *BANDS['mark'])
    word_box = tight(solid, *BANDS['word'])
    tag_box = tight(solid, *BANDS['tag'])

    mark = img.crop(mark_box)
    word = img.crop(word_box)

    IMAGES.mkdir(parents=True, exist_ok=True)
    mark.save(IMAGES / 'zero2hero-mark.png', optimize=True)
    img.crop((
        min(mark_box[0], word_box[0], tag_box[0]), mark_box[1],
        max(mark_box[2], word_box[2], tag_box[2]), tag_box[3],
    )).save(IMAGES / 'zero2hero-logo.png', optimize=True)

    # Horizontal lockup: the mark reads about 1.5x the wordmark's height.
    mark_h = round(word.height * 1.5)
    mark_r = mark.resize((round(mark.width * mark_h / mark.height), mark_h), Image.LANCZOS)
    gap = round(mark_h * 0.22)
    lockup = Image.new('RGBA', (mark_r.width + gap + word.width, mark_h), (0, 0, 0, 0))
    lockup.paste(mark_r, (0, 0), mark_r)
    lockup.paste(word, (mark_r.width + gap, (mark_h - word.height) // 2), word)
    lockup.save(IMAGES / 'zero2hero-lockup.png', optimize=True)

    icon(mark, 64).save(PUBLIC / 'favicon.png', optimize=True)
    icon(mark, 180).save(PUBLIC / 'apple-touch-icon.png', optimize=True)
    print('wrote mark, lockup, stacked logo, favicon and apple touch icon')


if __name__ == '__main__':
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    main(Path(sys.argv[1]))
