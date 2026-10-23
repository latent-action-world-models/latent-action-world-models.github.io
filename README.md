# UWM Project Website

**A Universal World Model Learned from Large Scale and Diverse Videos** — Hanchen Cui and Yang Gao.

The website uses plain HTML, CSS, and JavaScript. Fonts and assets are stored locally; no dependency installation or build step is required.

## Preview

Run from the project root:

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

Open <http://localhost:8000>. You can also open `index.html` directly; previewing through a local server provides better clipboard support.

## Directory Structure

```text
index.html                 Page content and entry point
favicon.ico                Browser icon fallback at the site root
assets/
  style.css                Styles grouped by page section, including responsive rules
  main.js                  Interaction initializers grouped by feature
  figures/                 Paper figures: WebP previews and PNG originals
  examples/ssv2/            Five Something-Something-v2 example frame sets
  examples/ego4d/           Five Ego4D example frame sets
  documents/               Paper PDF and poster PNG
  icons/                   Transparent project icon and 16px/32px favicons
  fonts/                   Local font in use and its license
  README.md                Asset sources and naming conventions
scripts/
  check_site.py            Local link, asset, and manuscript validation
  export_site.py           Validation and standalone website export
  README.md                Script usage instructions

docs/content-notes.md      Content sources and numerical conventions
.nojekyll                  GitHub Pages configuration

# Local directories excluded from Git and website exports
local/inputs/              Original PDF, ZIP, poster, and icon supplied by the owner
local/reference/           Extracted paper materials and reference pages
local/unused-assets/       Archived icons and unused fonts
build/site/                Generated website ready for deployment
build/uwm-website.zip       Generated standalone website archive
build/previews/            Browser verification screenshots
build/archives/            Website export from before the cleanup
build/deploy/              Sites deployment archive
project-site/              Existing private Sites deployment repository
```

The project root contains the website source. `build/site/` and `project-site/dist/` are generated or synchronized copies. Make routine edits in the project root.

## Editing

- Text, author links, paper and poster links, tables, and BibTeX: `index.html`.
- Fonts, colors, layout, and mobile styles: `assets/style.css`.
- Abstract expansion, example selection, figure dialogs, citation copying, and navigation state: the corresponding `init...` functions in `assets/main.js`.
- When replacing an asset, update its path in HTML or JavaScript. Example frames use the naming convention `example-number-frame-type`; see the [asset documentation](assets/README.md).

The full abstract and paper figures remain readable without JavaScript. The website supports deployment at a domain root or under a subpath.

## Validation and Export

```bash
python3 scripts/check_site.py
python3 scripts/export_site.py
python3 scripts/check_site.py build/site
```

The export script validates the source and a staged website before replacing `build/site/` and `build/uwm-website.zip`. The archive contains `index.html` at its root and includes only the files needed to run the website.

To deploy to GitHub Pages or a static hosting service, upload the contents of `build/site/`. See [scripts/README.md](scripts/README.md) for the validation scope and manual checks after editing.

The layout draws on [DreamSteer](https://dream-steer.github.io/) and the local `~/projects/PILOT_website` project. The footer credits DreamSteer for the layout.
