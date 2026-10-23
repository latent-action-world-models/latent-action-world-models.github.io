#!/usr/bin/env python3
"""Check the static project page without requiring third-party packages."""

from hashlib import sha256
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import re

ROOT = Path(__file__).resolve().parents[1]


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


def main():
    page = Page()
    page.feed((ROOT / "index.html").read_text())
    errors = []
    if len(page.ids) != len(set(page.ids)):
        errors.append("Duplicate HTML IDs")
    for key, value in page.links:
        if key.startswith("aria-"):
            for identifier in value.split():
                if identifier not in page.ids:
                    errors.append(f"Missing ARIA target: {identifier}")
        elif value.startswith("#"):
            if value[1:] and value[1:] not in page.ids:
                errors.append(f"Missing anchor: {value}")
        elif not urlsplit(value).scheme:
            path = ROOT / unquote(urlsplit(value).path)
            if not path.is_file():
                errors.append(f"Missing resource: {value}")
    for filename in re.findall(r'url\([\'"]?([^\)\'\"]+)', (ROOT / "assets/style.css").read_text()):
        if not (ROOT / "assets" / filename).is_file():
            errors.append(f"Missing CSS asset: {filename}")
    for dataset in ("ssv2", "ego4d"):
        for example in range(1, 6):
            for column in range(5):
                name = f"{dataset}-{example}-{column}.webp"
                if not (ROOT / "assets" / name).is_file():
                    errors.append(f"Missing example frame: {name}")
    paper = ROOT / "assets/paper.pdf"
    if not paper.read_bytes().startswith(b"%PDF-"):
        errors.append("Invalid paper PDF")
    original = ROOT / "13_A_Universal_World_Model_Lea (1).pdf"
    if original.is_file() and sha256(original.read_bytes()).digest() != sha256(paper.read_bytes()).digest():
        errors.append("Published PDF differs from the supplied manuscript")
    if errors:
        raise SystemExit("\n".join(errors))
    print(f"Passed: {len(page.ids)} unique IDs, links and ARIA targets, CSS assets, 50 example frames, and paper PDF.")


if __name__ == "__main__":
    main()
