# Project Assets Guide

Single source of truth for all portfolio project images.

## Asset convention

Every project owns a folder under `public/images/projects/{slug}/`.
Each folder contains exactly these files:

| File | Purpose | Used in |
|------|---------|---------|
| `thumbnail.webp` | Card-row preview + expanded accordion preview | ProjectCard (row + expanded) |
| `modal-hero.webp` | Showcase modal header image | ShowcaseModal hero section |
| `showcase-01.webp` | Walkthrough image 1 | ShowcaseModal gallery |
| `showcase-02.webp` | Walkthrough image 2 | ShowcaseModal gallery |
| `showcase-03.webp` | Walkthrough image 3 | ShowcaseModal gallery |
| `showcase-04.webp` | Walkthrough image 4 | ShowcaseModal gallery |

## Folder structure

```
public/images/projects/
├── lifeos/
│   ├── thumbnail.webp
│   ├── modal-hero.webp
│   ├── showcase-01.webp
│   ├── showcase-02.webp
│   ├── showcase-03.webp
│   └── showcase-04.webp
├── finx/
│   └── thumbnail.svg            (placeholder — upgrade to .webp when ready)
└── skillgap-navigator/
    └── thumbnail.svg            (placeholder — upgrade to .webp when ready)
```

## Naming rules

- **Lowercase, kebab-case** — no spaces, no uppercase.
- **WebP only** for production assets. SVG placeholders are temporary.
- Slug must match the project's `slug` field in `data/projects.js`.
- Showcase images are numbered sequentially: `showcase-01`, `showcase-02`, etc.
- No feature-specific names (e.g. ~~feature-dashboard~~, ~~feature-calendar~~).

## Resolution and aspect ratio

| Asset | Target resolution | Aspect ratio |
|-------|------------------|--------------|
| `thumbnail.webp` | ~1448×1086 | ~4:3 |
| `modal-hero.webp` | ~1448×1086 | ~4:3 |
| `showcase-*.webp` | ~1448×1086 or ~1536×1024 | ~4:3 or 3:2 |

Exact pixel counts can vary. What matters:
- All assets in a project should share a consistent aspect ratio where possible.
- Minimum width: 1200px (renders crisp at 2× on a 600px container).
- Maximum width: 1600px (diminishing returns past this).

## Export settings

- **Format**: WebP
- **Quality**: 80–85 (good balance of size and clarity)
- **Target file size**: 60–140 KB per image
- **Color profile**: sRGB
- **No transparency needed** — all images sit on solid backgrounds.

## Showcase image philosophy

Each showcase image should focus on **1–2 UI components**, not entire dashboards.
Think product marketing shots (Apple, Linear, Notion, Raycast style).

Good examples:
- Navigation sidebar close-up
- AI assistant conversation
- Task priority board
- Calendar week view
- Habit tracker grid
- Analytics chart

Bad examples:
- Full application screenshot at 100% zoom
- Entire dashboard with every panel visible
- Raw dev screenshots

## Image replacement workflow

1. Generate or export the new image at target resolution.
2. Export as WebP at quality 80–85.
3. Name it according to the convention above.
4. Drop it into `public/images/projects/{slug}/`.
5. If dimensions changed, update `width` and `height` in `data/projects.js`.
6. Verify in the browser: accordion thumbnail, expanded preview, showcase modal.

## Adding a new project

1. Create `public/images/projects/{slug}/`.
2. Add all 6 assets (thumbnail + modal-hero + showcase-01..04).
3. Add the project entry to `data/projects.js` with correct `thumbnail` and `showcase` data.
4. The `ShowcaseFrame` component and `ShowcaseModal` handle rendering automatically.

## Data reference

All image paths are built via the `img(slug, name)` helper in `data/projects.js`.
Every `ProjectImage` object requires: `src`, `alt`, `width`, `height`.

```js
const img = (slug, name) => `/images/projects/${slug}/${name}`;

// Example
thumbnail: {
  src: img('lifeos', 'thumbnail.webp'),
  alt: 'LifeOS dashboard overview',
  width: 1448,
  height: 1086,
},
```
