"""Generates every logo size from the originals in assets/logo-original/.

    python scripts/brand-assets.py

- public/brand/baul-icono.png, public/brand/baul-logo.png: trimmed shapes used as CSS masks
  (the page picks the colour, so they work in light and dark themes).
- public/brand/favicon-32.png, icon-192.png, icon-512.png, apple-touch-icon.png:
  browser and home-screen icons (light chest on the app's green).
- assets/icon-*.png: sources for @capacitor/assets to build the Android icon.
"""
from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
ORIGINAL = ROOT / "assets" / "logo-original"
WEB = ROOT / "public" / "brand"
GREEN = (36, 91, 69, 255)       # --green in the light theme
CREAM = (245, 244, 237, 255)    # --bg in the light theme


def trimmed(name: str) -> Image.Image:
    image = Image.open(ORIGINAL / name).convert("RGBA")
    return image.crop(image.getchannel("A").getbbox())


def shape(image: Image.Image, color) -> Image.Image:
    """Same silhouette in a single colour, keeping the original transparency."""
    solid = Image.new("RGBA", image.size, color)
    solid.putalpha(image.getchannel("A"))
    return solid


def fit(image: Image.Image, box: int) -> Image.Image:
    copy = image.copy()
    copy.thumbnail((box, box), Image.LANCZOS)
    return copy


def icon(chest: Image.Image, size: int, padding: float, rounded: bool) -> Image.Image:
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    background = Image.new("RGBA", (size, size), GREEN)
    mask = Image.new("L", (size, size), 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, size - 1, size - 1), radius=size * 0.22 if rounded else 0, fill=255)
    canvas.paste(background, (0, 0), mask)
    glyph = shape(fit(chest, int(size * (1 - 2 * padding))), CREAM)
    canvas.alpha_composite(glyph, ((size - glyph.width) // 2, (size - glyph.height) // 2))
    return canvas


def save(image: Image.Image, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    image.save(path, optimize=True)
    print(f"{path.relative_to(ROOT)}  {image.size[0]}x{image.size[1]}  {path.stat().st_size // 1024} KB")


chest = trimmed("baul-icono.png")
logo = trimmed("baul-logo.png")

save(shape(fit(chest, 256), (0, 0, 0, 255)), WEB / "baul-icono.png")
logo_small = logo.copy()
logo_small.thumbnail((900, 900), Image.LANCZOS)
save(shape(logo_small, (0, 0, 0, 255)), WEB / "baul-logo.png")

save(icon(chest, 32, 0.08, True), WEB / "favicon-32.png")
save(icon(chest, 192, 0.13, True), WEB / "icon-192.png")
save(icon(chest, 512, 0.13, True), WEB / "icon-512.png")
save(icon(chest, 180, 0.14, False), WEB / "apple-touch-icon.png")

# Android adaptive icon: the launcher crops to a circle/squircle, so keep the chest inside the safe zone.
save(icon(chest, 1024, 0.2, False), ROOT / "assets" / "icon-only.png")
save(Image.new("RGBA", (1024, 1024), GREEN), ROOT / "assets" / "icon-background.png")
foreground = Image.new("RGBA", (1024, 1024), (0, 0, 0, 0))
glyph = shape(fit(chest, 520), CREAM)
foreground.alpha_composite(glyph, ((1024 - glyph.width) // 2, (1024 - glyph.height) // 2))
save(foreground, ROOT / "assets" / "icon-foreground.png")
