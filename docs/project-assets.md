# Project Assets Guide

## Folder Structure

```
public/images/projects/
├── lifeos/
│   ├── thumbnail.png          Card-row preview
│   ├── hero.png               Showcase modal header
│   ├── feature-dashboard.png  Feature section image
│   ├── feature-tasks.png
│   ├── feature-calendar.png
│   ├── feature-habits.png
│   ├── feature-ada.png
│   └── feature-insights.png
├── finx/
│   └── thumbnail.png          Card-row preview
└── skillgap-navigator/
    └── thumbnail.png          Card-row preview
```

## Image Types

| Type | Usage | Dimensions | Format |
|------|-------|------------|--------|
| `thumbnail.png` | Project card row preview | 800 × 600 | PNG or WebP |
| `hero.png` | Showcase modal header band | 1400 × 800 | PNG or WebP |
| `feature-*.png` | Showcase feature sections | 1200 × 800 | PNG or WebP |

## File Naming

- **Slug-based folders**: folder name matches the project `slug` in `data/projects.js`
- **Lowercase, hyphenated**: `feature-dashboard.png`, not `FeatureDashboard.png`
- **Descriptive suffix**: `feature-{name}.png` where `{name}` matches the feature purpose
- **No spaces or special characters**

## Adding a New Project

1. Create a folder: `public/images/projects/{slug}/`
2. Add at minimum: `thumbnail.png` (800 × 600)
3. Add entry to `data/projects.js` — use the `img(slug, name)` helper for paths
4. If the project has a showcase modal, add `hero.png` and `feature-*.png` files

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

PNG is the default. WebP is supported — just change the extension in the data file.
For best quality at reasonable size, use PNG for screenshots with text, WebP for photos.
