# Data Schemas

This file documents the content contracts for `data/*.js`. It replaces the
`types/` folder from the TypeScript plan — with `checkJs` enabled (see
`jsconfig.json`), the JSDoc `@typedef` blocks in each data file give
editor-level checking, and this doc gives the prose contract.

> Phase 1 status: all data files contain **placeholder structure only**.
> Real content is migrated in later phases (noted per file).

| File | Exports | Typedef | Migrated in |
|------|---------|---------|-------------|
| `projects.js` | `projects` | `Project`, `Showcase`, `ShowcaseFeature`, `ProjectNarrative` | Phase 5 |
| `skills.js` | `skillClusters`, `skillFilters` | `SkillCluster` | Phase 6 |
| `journey.js` | `journeySteps` | `JourneyStep` | Phase 4 |
| `capabilities.js` | `capabilities` | `Capability`, `CapabilitySide` | Phase 6 |
| `process.js` | `processSteps` | `ProcessStep` | Phase 7 |
| `stats.js` | `proofStats`, `testimonials` | `ProofStat`, `Testimonial` | Phase 7 |
| `site.js` | `site` | `SiteContent`, `NavLink`, `SocialLink`, `ContactStage` | with sections |

## Conventions

- **Ordinals** (`order`, `num`) are two-digit strings (`"01"`), not numbers,
  because they render literally.
- **Colors** in data are raw values only where they are genuinely dynamic
  (per-stage contact colors, per-cluster skill colors). Everything else reads
  design tokens from `styles/tokens.css`.
- **`isPlaceholder`** on testimonials preserves the original dashed
  "Add quote" state — parity, not a TODO.
- Adding a new project (e.g. FinX) is a typed data entry plus, if needed, a new
  `MockKind` and one entry in the mockup registry — no component changes.
