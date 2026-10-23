#!/usr/bin/env python3
"""Validate and export the public website without local inputs or tooling."""

from pathlib import Path
from shutil import copyfile, rmtree
from tempfile import TemporaryDirectory
from zipfile import ZipFile, ZIP_DEFLATED

from check_site import validate_site

ROOT = Path(__file__).resolve().parents[1]


def main():
    try:
        print(validate_site(ROOT))
    except ValueError as error:
        raise SystemExit(str(error)) from error

    build = ROOT / "build"
    build.mkdir(exist_ok=True)
    output = build / "site"
    archive = build / "uwm-website.zip"
    files = [ROOT / "index.html", ROOT / ".nojekyll", ROOT / "favicon.ico"] + sorted(
        path for path in (ROOT / "assets").rglob("*")
        if path.is_file() and path.suffix != ".md"
    )

    # Verify a staged export before replacing the previous usable release.
    with TemporaryDirectory(prefix=".export-", dir=build) as temporary:
        staging = Path(temporary)
        staged_site = staging / "site"
        staged_archive = staging / archive.name
        with ZipFile(staged_archive, "w", ZIP_DEFLATED) as bundle:
            for source in files:
                relative = source.relative_to(ROOT)
                target = staged_site / relative
                target.parent.mkdir(parents=True, exist_ok=True)
                copyfile(source, target)
                bundle.write(target, relative)
        validate_site(staged_site)
        if output.exists():
            rmtree(output)
        staged_site.replace(output)
        staged_archive.replace(archive)

    print(f"Exported {len(files)} files to {output}")
    print(f"Created {archive} ({archive.stat().st_size / 1024 / 1024:.1f} MB)")


if __name__ == "__main__":
    main()
