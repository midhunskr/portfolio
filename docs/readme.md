# Portfolio V3 — Rebuild Status

Next.js App Router rebuild of the original static portfolio (`index.html`, `style.css`, `support.js`, `mockups.js`). Goal is **visual parity** — not a redesign. The original site is the visual source of truth.

## Stack

- **Framework**: Next.js 14 App Router, JavaScript (no TypeScript)
- **Styling**: CSS Modules (no Tailwind), design tokens in `styles/tokens.css`
- **Motion**: Framer Motion — shared system in `lib/motion.js`
- **Branch**: `rebuild-v2`

## Phase Status

| Phase | Description | Commit | Status |
|-------|-------------|--------|--------|
| 1 | Next.js foundation and architecture | `e777210` | Locked |
| 2 | Layout and navigation system | `16a4485` | Locked |
| 3A | Hero intro section | `cf5bd44` | Locked |
| 3B.1 | Orbit geometry | `4196f3d` | Locked |
| 3B.2A | Orbit ambient motion | `c657103` | Locked |
| 3B.2B.1 | Floating cards and anchor pill | `1d9fa0a` | Locked |
| 3B.2B.2 | Orbit interactive motion | `917093d` | Locked |
| 3C | Hero parity fixes | `b15dea2` | Locked |
| 4A | Journey timeline structure | `e7a111b` | Locked |
| 4B | Journey timeline motion | `f455924` | Locked |
| 5A | Capabilities structure | `1d7da61` | Locked |
| 5B | Capabilities motion | `3568818` | Locked |
| 6A | Project architecture | `cf4b25a` | Locked |
| 6B | Projects structure and expansion | `87c17a8` | Locked |
| **6C** | **Showcase modal content and motion** | — | **Next** |

## Architecture

```
app/
  layout.jsx          Root layout (fonts, metadata, global CSS)
  page.jsx            Section composition

components/
  hero/
    HeroSection/      Hero wrapper
    HeroIntro/        Text intro + CTA
    orbit/            OrbitSystem, OrbitRings, OrbitNode, PortraitFrame,
                      AnchorPill, FloatingCard(s)
  layout/
    Navbar/           Navbar + MobileDrawer
    CursorFollower/   Custom cursor
  sections/
    JourneySection/   Timeline with scroll-linked fill
    CapabilitiesSection/  Tabbed panels (Design/Develop/Automate)
    ProjectsSection/  Accordion cards + showcase modal
    SkillsSection/    (placeholder)
    ContactSection/   (placeholder)
  ui/
    ParallaxBlob/     Background decoration

data/
  journey.js          5 timeline steps
  capabilities.js     3 capability panels with skills, process, references
  projects.js         3 projects with narratives, tags, showcases

lib/
  motion.js           Shared variants: revealVariants(), REVEAL_VIEWPORT,
                      panelFade, heroContainer/heroItem, stepContainer/stepItem,
                      modalOverlay/modalPanel

styles/
  tokens.css          Design tokens (colors, radii, fonts, spacing)
  globals.css         Reset + global base styles
```

## Motion System (`lib/motion.js`)

All reveal animations use a shared system:
- **`revealVariants(direction, delay)`** — opacity 0→1, translateY 40→0
- **Easing**: `[0.16, 1, 0.3, 1]` (1s duration) — the signature easing
- **`REVEAL_VIEWPORT`**: IO threshold 0.12, rootMargin `0px 0px -7% 0px`
- **`panelFade`**: Tab crossfade (0.35s easeInOut), used with `AnimatePresence mode="wait"`
- **Property ownership rule**: A given animatable property on a given element has exactly one owner (Framer OR CSS, never both)

## Project Image System

All project images live under `public/images/projects/{slug}/`. Paths are built by `img(slug, name)` helper in `data/projects.js`.

| Type | Dimensions | Usage |
|------|-----------|-------|
| `thumbnail.png` | 800 × 600 | Card row preview |
| `hero.png` | 1400 × 800 | Showcase modal header |
| `feature-*.png` | 1200 × 800 | Showcase feature sections |

Current thumbnails are `.svg` placeholders. The `isSvg()` helper adds `unoptimized` prop to Next.js `<Image>` to bypass the image optimizer for SVGs.

See `docs/project-assets.md` for full asset guide.

## Phase 6B Audit Findings

Review conducted after Phase 6B completion. These should be addressed in Phase 6C or as separate fixes.

### High Priority

1. **Missing `aria-expanded` on toggle** — The project card toggle (`role="button"`) lacks `aria-expanded={isOpen}`. Screen readers cannot determine card state.

### Medium Priority

2. **Hint text implies all projects have showcases** — "Click any project to open the full case study →" but only LifeOS has a showcase. Hint should be more accurate or removed.

3. **No `aspect-ratio` on thumbnails** — The `.rowThumb` container has no aspect-ratio constraint, so layout may shift while images load.

### Low Priority

4. **`isSvg()` helper is temporary** — Will be removed once real PNG/WebP thumbnails replace the SVG placeholders.

5. **480px media query duplicates 640px rule** — `.projName` clamp at 480px is identical to the 640px rule and can be removed.

### Phase 6C Considerations

6. **Modal focus trap needed** — The showcase modal should trap focus for accessibility (tab cycling within modal, restore focus on close).

7. **Mobile modal positioning** — On small viewports the modal should go full-screen or near-full-screen rather than centered with padding.

8. **Modal enter/exit animations** — Overlay fade + panel slide-up, using `modalOverlay` and `modalPanel` variants already defined in `lib/motion.js`.

## Known Patterns and Pitfalls

- **CSS Modules keyframe localization** (Phase 3): CSS Modules hash `@keyframes` names, breaking cross-file references. Workaround: use inline `style` for elements needing global keyframe names.
- **SVG + Next.js `<Image>`**: SVGs sent through `/_next/image` return 400. Use `unoptimized` prop.
- **Preview scroll in dev tools**: `scrollIntoView` and `window.scrollTo` often fail. Use `window.location.hash = '#sectionId'` instead.
- **Sections not yet rebuilt**: SkillsSection and ContactSection are placeholders.

## Development

```bash
npm run dev -- -p 4321    # Dev server on port 4321
```

Dev server config is in `.claude/launch.json` as `portfolio-next`.

## Reference Files (Read-Only Source of Truth)

The original static site files are the visual spec:
- `index.html` — Structure and JS behavior
- `style.css` — All styling rules
- `support.js` — Utility JS
- `mockups.js` — Programmatic SVG/HTML mockups (being replaced by real images)
