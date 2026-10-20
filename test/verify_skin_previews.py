"""Verify screenshot dimensions and decoded pixels, ignoring encoder metadata."""
import sys
from pathlib import Path

from PIL import Image


def pixels(filename):
    with Image.open(filename) as image:
        if image.size != (960, 540):
            raise AssertionError(f"{filename}: expected 960 x 540, got {image.size}")
        return image.convert("RGBA").tobytes()


target, candidate = sys.argv[1:]
for extension in ("png", "webp"):
    committed = Path(f"{target}.{extension}")
    generated = Path(f"{candidate}.{extension}")
    expected = pixels(committed)
    if generated != committed and pixels(generated) != expected:
        raise AssertionError(
            f"{committed.name}: preview is stale; regenerate with "
            "node test/generate_skin_previews.js using the same Chromium, "
            "system fonts and Pillow versions as the committed previews"
        )
