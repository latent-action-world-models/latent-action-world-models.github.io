# Website Assets

All runtime assets are stored locally. This documentation file is excluded from the website export.

| Directory | Contents and Sources |
| --- | --- |
| `figures/` | Figures from the supplied paper materials. Matching WebP files are displayed on the page; PNG originals are used for enlarged viewing and downloads. |
| `examples/ssv2/`, `examples/ego4d/` | Cropped frames from Figure 3, with five examples per dataset and five frames per example. |
| `documents/paper.pdf` | A byte-for-byte copy of the original manuscript PDF. |
| `documents/poster.png` | A byte-for-byte copy of the supplied `A Universal World Model .png`. |
| `icons/uwm-icon-transparent.png` | A transparent-background version of the supplied globe icon, used in the navigation and as the touch icon. |
| `icons/uwm-favicon-16.png`, `icons/uwm-favicon-32.png` | 16px/32px bitmaps rendered by Chromium from the transparent icon. The root `favicon.ico` contains both frames. |
| `fonts/` | Noto Sans Latin and its SIL Open Font License, copied from the local PILOT reference project. |

Example frames are named `{1..5}-{frame-type}.webp` and displayed in this order:

1. `observation`: current observation.
2. `reconstruction`: reconstruction of the current observation.
3. `next-observation`: next observation.
4. `next-reconstruction`: reconstruction of the next observation.
5. `prediction`: world model prediction.

Ego4D files retain example numbers 1–5; the page displays their corresponding paper example numbers 6–10. LPIPS values are stored in `DATASETS` in `main.js` and match Table 1 in the paper.

Original icons, the poster, and paper materials are retained in `local/inputs/`. The icon background-removal record is in `local/inputs/icon-background-removal.md`. The old SVG icon, icon with a gray background, and unused fonts are archived in `local/unused-assets/` and excluded from the published website.
