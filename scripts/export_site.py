#!/usr/bin/env python3
"""Export only the website, following the local PILOT project convention."""

from pathlib import Path
from shutil import copyfile, rmtree
from zipfile import ZipFile, ZIP_DEFLATED

ROOT = Path(__file__).resolve().parents[1]


def main():
    output = ROOT / "build/site"
    files = [ROOT / "index.html", ROOT / ".nojekyll", ROOT / "favicon.ico"] + sorted(
        p for p in (ROOT / "assets").rglob("*") if p.is_file() and p.suffix != ".md"
    )
    if output.exists():
        rmtree(output)
    output.mkdir(parents=True)
    archive = ROOT / "build/uwm-website.zip"
    with ZipFile(archive, "w", ZIP_DEFLATED) as bundle:
        for source in files:
            relative = source.relative_to(ROOT)
            target = output / relative
            target.parent.mkdir(parents=True, exist_ok=True)
            copyfile(source, target)
            bundle.write(source, relative)
    print(f"Exported {len(files)} files to {output}")
    print(f"Created {archive} ({archive.stat().st_size / 1024 / 1024:.1f} MB)")


if __name__ == "__main__":
    main()
