# Docs Index

This folder holds project documentation for the Portfolio V3 rebuild (Next.js App Router rebuild of the original static portfolio, branch `rebuild-v2`).

**[`docs/rebuild-progress.md`](./rebuild-progress.md) is the canonical handoff document and source of truth for the rebuild.** It contains current project status, locked architecture decisions, completed work, asset architecture, UI standards, remaining work, technical debt, and the refactor roadmap. Future Claude sessions (and anyone else picking up this project) should start there — not here.

## Documents

- **[rebuild-progress.md](./rebuild-progress.md)** — canonical status doc. Read this first, every time.
- **[project-assets.md](./project-assets.md)** — reference guide for the project-image folder convention (`public/images/projects/{slug}/`: thumbnail/hero/showcase-01..04). Note it still lists `finx` as an example slug — the actual third project is `skillgap-navigator` (see `rebuild-progress.md`); treat the filename convention as current, the example slug as stale.
- **readme.md** (this file) — lightweight index only. No project status or architecture content lives here; it all lives in `rebuild-progress.md` to avoid duplication.
