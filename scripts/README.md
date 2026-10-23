# Validation and Export

Both scripts use only the Python 3 standard library and can run from any working directory. By default, they use the repository containing the scripts as the source directory.

```bash
python3 scripts/check_site.py
python3 scripts/export_site.py
python3 scripts/check_site.py build/site
```

`check_site.py` checks for duplicate HTML IDs, local links and anchors, ARIA references, CSS assets, all 50 example frames, the paper PDF, and deployment files. When the original manuscript is available in `local/inputs/paper/`, it also verifies the published copy using SHA-256.

`export_site.py` reuses these checks and copies `index.html`, `favicon.ico`, `.nojekyll`, and all files in `assets/` except Markdown documentation to a temporary directory. After validation succeeds, it replaces:

- `build/site/`: the website ready for deployment.
- `build/uwm-website.zip`: a portable archive with `index.html` at its root.

The scripts exclude original local materials, preview screenshots, documentation, development scripts, and the Sites deployment repository from the export. If validation of the source or staged export fails, the previous export is preserved.

After changing paths or interactions, also verify desktop and mobile layouts, abstract expansion, example selection for both datasets, figure dialogs, and BibTeX copying in a browser. Resource validation does not execute JavaScript or check external website availability.
