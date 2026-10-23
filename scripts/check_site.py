#!/usr/bin/env python3
"""Validate a source or exported site using only the Python standard library."""

import argparse
from hashlib import sha256
from html.parser import HTMLParser
from pathlib import Path
import re
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
FRAME_COLUMNS = (
    "observation",
    "reconstruction",
    "next-observation",
    "next-reconstruction",
    "prediction",
)


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = []
        self.links = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if "id" in attrs:
            self.ids.append(attrs["id"])
        for key in ("href", "src", "aria-controls", "aria-labelledby"):
            if key in attrs:
                self.links.append((key, attrs[key]))


def validate_site(root):
    """Return a validation summary, or raise ValueError with actionable errors."""
    root = Path(root)
    entry = root / "index.html"
    if not entry.is_file():
        raise ValueError(f"Missing entry point: {entry}")

    page = Page()
    page.feed(entry.read_text(encoding="utf-8"))
    errors = []
    if len(page.ids) != len(set(page.ids)):
        errors.append("Duplicate HTML IDs")

    for key, value in page.links:
        if key.startswith("aria-"):
            for identifier in value.split():
                if identifier not in page.ids:
                    errors.append(f"Missing ARIA target: {identifier}")
            continue

        url = urlsplit(value)
        if url.scheme or url.netloc:
            continue
        if not url.path:
            if url.fragment and url.fragment not in page.ids:
                errors.append(f"Missing anchor: {value}")
        elif not (root / unquote(url.path).lstrip("/")).is_file():
            errors.append(f"Missing resource: {value}")

    for stylesheet in (root / "assets").rglob("*.css"):
        urls = re.findall(
            r"url\(\s*['\"]?([^)'\"\s]+)", stylesheet.read_text(encoding="utf-8")
        )
        for value in urls:
            url = urlsplit(value)
            if not url.scheme and not url.netloc:
                base = root if url.path.startswith("/") else stylesheet.parent
                asset = base / unquote(url.path).lstrip("/")
                if not asset.is_file():
                    errors.append(f"Missing CSS asset in {stylesheet.name}: {value}")

    for dataset in ("ssv2", "ego4d"):
        for example in range(1, 6):
            for column in FRAME_COLUMNS:
                frame = Path("assets/examples") / dataset / f"{example}-{column}.webp"
                if not (root / frame).is_file():
                    errors.append(f"Missing example frame: {frame}")

    paper = root / "assets/documents/paper.pdf"
    if not paper.is_file():
        errors.append("Missing paper PDF")
    else:
        paper_bytes = paper.read_bytes()
        if not paper_bytes.startswith(b"%PDF-"):
            errors.append("Invalid paper PDF")
        original = root / "local/inputs/paper/13_A_Universal_World_Model_Lea (1).pdf"
        if original.is_file() and sha256(original.read_bytes()).digest() != sha256(paper_bytes).digest():
            errors.append("Published PDF differs from the supplied manuscript")

    for filename in (".nojekyll", "favicon.ico"):
        if not (root / filename).is_file():
            errors.append(f"Missing deployment file: {filename}")

    if errors:
        raise ValueError("\n".join(errors))
    return (
        f"Passed: {len(page.ids)} unique IDs, links and ARIA targets, "
        "CSS assets, 50 example frames, and paper PDF."
    )


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("directory", nargs="?", type=Path, default=ROOT)
    args = parser.parse_args()
    try:
        print(validate_site(args.directory))
    except ValueError as error:
        parser.exit(1, f"{error}\n")


if __name__ == "__main__":
    main()
