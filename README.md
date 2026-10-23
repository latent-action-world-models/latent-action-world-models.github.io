# Universal World Model project website

Academic project page for **A Universal World Model Learned from Large Scale and Diverse Videos**, by Hanchen Cui and Yang Gao. Its typography, hero, section layout, and export workflow follow the local `~/projects/PILOT_website` reference.

The website uses plain HTML, CSS, and JavaScript, with local fonts and assets. No package installation or build step is required.

## Structure

```text
index.html                 Website entry point
favicon.ico                Browser icon fallback, with 16px and 32px frames
assets/                    Paper, figures, fonts, styles, and JavaScript
scripts/check_site.py      Resource and link validation
scripts/export_site.py     Website-only export
.nojekyll                  GitHub Pages static serving
build/site/                Generated deployment directory
build/uwm-website.zip       Generated portable website
project-site/              Companion private Sites deployment checkout
reference/                 Extracted source material, retained locally
qa/                        Browser screenshots, retained locally
```

The original PDF and ZIP remain in the workspace. They are excluded from the website export; the published paper is an exact copy at `assets/paper.pdf`.

## Preview

Run from this directory:

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

Open `http://localhost:8000`. The page also supports direct opening of `index.html`; a local server provides better clipboard support.

## Validate and export

```bash
python3 scripts/check_site.py
python3 scripts/export_site.py
```

Upload the contents of `build/site/` to GitHub Pages or any static host, or upload `index.html`, `.nojekyll`, `favicon.ico`, and `assets/` directly. Relative paths work under a repository subpath. `build/uwm-website.zip` contains only the website, with `index.html` at the archive root.

## Content and editing

- `index.html`: title, authors, affiliations, manuscript abstract, full paper figures, quantitative table, and BibTeX.
- `assets/style.css`: Noto Sans typography, continuous paper title, soft gradient hero, dark resource buttons, metric and contribution cards, centered section headings, and responsive layouts. Desktop copy follows PILOT at 22px or larger; mobile body text is 20px.
- `assets/main.js`: abstract expansion, dataset and example selection, image dialogs, navigation state, and citation copying.
- `assets/fonts/`: Noto Sans font files and their SIL Open Font License, copied from the supplied local reference.
- `assets/uwm-icon-transparent.png`: Transparent-background cutout of the supplied globe, used for the header and touch icon. The original remains in `image.png` and `assets/uwm-icon.png`; the built-in imagegen prompt is recorded in `local/inputs/icon-background-removal.md`.
- `assets/uwm-favicon-16.png`, `assets/uwm-favicon-32.png`, and `favicon.ico`: Dedicated browser-tab icons using the same globe. The PNG frames are the exact 16px/32px bitmaps rendered by Chromium from the supplied transparent icon; the ICO packages those frames without changing them. Distinct URLs refresh previously cached default icons.
- `assets/uwm-poster.png`: Exact copy of the supplied `A Universal World Model .png` poster, opened at full resolution from the homepage's Poster button.

The full method and video-result figures appear in the main narrative. The optional individual-example explorer shows all ten paper examples with Table 1 LPIPS values. Both the full abstract and the complete paper figures remain readable without JavaScript. Wide video-result figures and example frames scroll horizontally on mobile; figure dialogs link to original images.

The homepage duration highlights show **>200 h of in-the-wild video data**, using the project owner's requested lower-bound presentation, and **approximately 1.7 min of robotic data for adaptation**. The latter uses the project owner's stated 20 Hz collection rate: 2,000 consecutive frame-pair transitions ÷ 20 per second = 100 seconds = 1.67 minutes. These are video-data durations. For reference, the [official Ego4D project](https://ego4d-data.org/) reports 3,670 hours for its source dataset; the headline does not assert a combined dataset duration or a measured training runtime.

Authors and affiliations follow the PDF rather than the LaTeX template placeholders. The 2,000-frame-pair result is the paper's qualitative domain-adaptation result. The Code button links to the author-provided repository at `https://github.com/morning-star-7/Latent-action-world-models`. No arXiv link or live model demo is asserted. The displayed and copied citation reproduce the author-provided `@inproceedings{cui2023universal}` entry for the NeurIPS 2023 Foundation Models for Decision Making Workshop.

PILOT is a visual and structural reference. All research claims, figures, and numerical results on this site belong to the supplied UWM manuscript.
