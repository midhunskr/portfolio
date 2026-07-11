# Project Assets Guide

## Folder Structure

```
public/images/projects/
├── lifeos/
│   ├── thumbnail.webp          Card-row preview (1200×900)
│   ├── showcase-hero.webp      Showcase modal header (1600×1200)
│   ├── modal-hero.webp         Alternate hero — not currently referenced
│   ├── feature-dashboard.webp  Feature section image
│   ├── feature-tasks.webp
│   ├── feature-calendar.webp
│   ├── feature-habits.webp
│   ├── feature-ada.webp
│   └── feature-insights.webp
├── finx/
│   └── thumbnail.svg           Placeholder
└── skillgap-navigator/
    └── thumbnail.svg           Placeholder
```

## Image Types

| Type | Usage | Dimensions | Aspect Ratio | Format |
|------|-------|------------|--------------|--------|
| `thumbnail` | Project card row preview | 1200 × 900 | 4:3 | WebP (SVG placeholder) |
| `showcase-hero` | Showcase modal header | 1600 × 1200 | 4:3 | WebP |
| `feature-*` | Showcase feature sections | 1200 × 1200 | 1:1 | WebP |

## File Naming

- **Slug-based folders**: folder name matches the project `slug` in `data/projects.js`
- **Lowercase, hyphenated**: `feature-dashboard.webp`, not `FeatureDashboard.webp`
- **Descriptive suffix**: `feature-{name}.webp` where `{name}` matches the feature purpose
- **No spaces or special characters**

## Adding a New Project

1. Create a folder: `public/images/projects/{slug}/`
2. Add at minimum: `thumbnail.webp` (1200 × 900)
3. Add entry to `data/projects.js` — use the `img(slug, name)` helper for paths
4. If the project has a showcase, add `showcase-hero.webp` and `feature-*.webp` files

## Replacing an Image

1. Find the project folder: `public/images/projects/{slug}/`
2. Replace the file with a new one at the same filename
3. Keep the same dimensions listed above for layout consistency
4. No code changes needed — paths are built from the slug automatically

## How Paths Work

All image paths are built by the `img()` helper in `data/projects.js`:

```js
const img = (slug, name) => `/images/projects/${slug}/${name}`;
```

This means:
- Every image reference is greppable (`/images/projects/`)
- Moving a project = rename folder + update `slug` in data
- The `ProjectImage` type includes `width` and `height` for Next.js `<Image>` optimization

## Supported Formats

WebP is the default for real assets. SVG placeholders are used for projects without final screenshots.
