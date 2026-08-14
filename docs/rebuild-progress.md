# Portfolio V3 — Rebuild Progress

**This is the canonical handoff document.** It reflects the current state of the repository, not the history of how it got there. Read this fully before doing any work. Do not re-derive architecture decisions already locked in below.

Branch: `rebuild-v2` · Stack: Next.js 14 App Router, **JavaScript** (not TypeScript), CSS Modules (not Tailwind), Framer Motion.

---

# Project Status

**Current phase:** Section rebuild is functionally complete through Contact. Next phase is a final architecture/polish pass (production-readiness) — see Remaining Work.

**Completed sections** (all verified for desktop/tablet/mobile, production build, hydration, console):
- Navbar + mobile drawer, cursor follower
- Hero (intro + orbit system)
- Journey timeline
- Capabilities tabs
- Projects accordion, 3 full case studies (LifeOS, MORO, SkillGap Navigator), showcase modal
- Skills section
- Contact section

**Remaining sections:** Process grid, Proof/stats section, Behind-the-work section — confirmed missing (audited directly against `app/page.jsx`, `components/`, and `data/`), see [Remaining Work](#remaining-work). Footer is resolved — extracted into a shared `components/layout/Footer/` component used by the homepage and the new `/privacy` and `/terms` pages.

**Overall rebuild progress:** All primary content sections referenced in `app/page.jsx` are built. What's left is largely non-visual: SEO, performance, accessibility, and a final consistency/architecture audit — plus building the three confirmed-missing sections (Process, Proof, Behind-the-work).

---

# Architecture Decisions (locked)

These are settled. Do not revisit or re-litigate them without an explicit user request.

- **Next.js App Router**, server components by default; `'use client'` only on components that own state, refs, or browser APIs.
- **JavaScript, not TypeScript.** No `.ts`/`.tsx` files. Types are documented via JSDoc `@typedef` blocks in `data/*.js` files.
- **CSS Modules, not Tailwind.** Every component's styles live in a co-located `Component.module.css`. Global-only concerns (reset, keyframes shared across modules, a small set of true utility classes) live in `styles/`.
- **Design tokens** in `styles/tokens.css` — colors, alpha ramps, radii, shadows, easing, durations, spacing/container widths, typography scale, z-index. Components reference `var(--token)`; literals are only used where no token exists yet (documented per-component in commit messages, not tracked centrally).
- **`lib/motion.js`** is the JS-side mirror of the motion tokens (`EASE`, `DUR`, `STAGGER`, `revealVariants()`, `REVEAL_VIEWPORT`, modal/hero/step variant presets). Keep it in sync with `tokens.css` — they encode the same values in two forms.
- **Reusable UI primitives** (frozen set, in `components/ui/`):
  - `Eyebrow` — number+label (section headers) and label+variant+tone (inline tone eyebrows), semantic CSS-Module variants (`journeyCard`, `capability`, etc.) — no inline sizing/tracking custom properties.
  - `Tag` — `variant` prop: `muted | mono | chip`.
  - `ShowcaseFrame` — the single reusable "framed screenshot" component (see Asset Architecture below).
  - `ShowcaseModal` — the project case-study modal.
  - `ParallaxBlob` — scroll-linked decorative blob (`className`, `factor` props), built on `useScrollParallax`.
- **Data-driven content architecture.** All copy, project narratives, skill clusters, journey steps, capability panels, and site-wide content (nav, socials, email, contact path) live in `data/*.js`, never hardcoded in JSX. Adding/editing content should almost never require touching a component.
- **No inline SVG/CSS-art placeholders for completed projects.** All three shipped case studies use real `.webp` photography/screenshots through `ShowcaseFrame`. (Placeholder SVG mockups were part of the original static site and have been fully retired for finished projects — see Asset Architecture.)
- **Production-grade component architecture**: one folder per component (`ComponentName/ComponentName.jsx` + `.module.css`), hooks in `hooks/` isolate every rAF/listener pattern (magnetic buttons, parallax, reduced-motion, pointer-fine gating), no prop-drilled global state — each interactive section owns its own local state.
- **Property-ownership rule for animation**: a given animatable CSS property on a given element has exactly one owner — either Framer Motion or a CSS transition/keyframe, never both on the same property at the same time. (Contact section's stage dots are an explicit example: colors/box-shadow are CSS-transitioned off a `data-active` attribute that JS toggles on a stagger, rather than trying to force Framer to interpolate multi-layer box-shadows.)
- **Pixel parity over hook reuse when they conflict.** Where an existing shared hook's exact behavior (scoping, clamping, easing) doesn't match a section's original spec, a local implementation is used instead and the divergence is documented in the commit message (e.g. Skills' constellation drift is host-scoped + unclamped, deliberately not reusing the window-scoped + clamped `useMouseParallax`).

---

# Completed Work

In rough chronological order (see `git log` for exact commits/diffs — this section summarizes outcome, not process):

- **Phase 1–2 — Foundation & navigation**: Next.js scaffold, fonts, global CSS, Navbar + mobile drawer, cursor follower.
- **Phase 3 — Hero**: intro copy/stagger + full orbit system (rings, nodes, portrait, floating capability cards, anchor pill, mouse parallax). Later parity-audited against the reference and fixed (background blobs, entrance reveal, cursor-dot hide behavior).
- **Phase 4 — Journey timeline**: structure + scroll-linked fill line, alternating cards.
- **Phase 5 — Capabilities**: tabbed panels (Design/Develop/Automate) with crossfade.
- **Phase 6 — Projects** (the largest phase, many sub-steps):
  - 6A–6B: accordion architecture, card structure, expansion.
  - 6C: `ShowcaseModal` — production-quality case-study modal (overlay/panel motion, mobile bottom-sheet, tech chips, CTA).
  - 6D: **image architecture migration** — moved all three projects off CSS-art/SVG mockups onto real photography via `ShowcaseFrame`; iteratively refined the frame's visual treatment (border, radius, layered shadow, transparent background) until every usage (accordion thumbnail, expanded preview, modal hero, modal walkthrough images) converged on byte-identical computed styles from one shared CSS source.
  - Full case studies written and shipped for **LifeOS**, **MORO** (replaced an earlier FinX placeholder), and **SkillGap Navigator** (replaced an earlier placeholder).
  - Numerous small UX/visual fixes: accordion +/× icon redrawn in CSS bars, showcase-trigger button repositioned and re-anchored, thumbnail sizing/padding/radius corrected multiple times to match `ShowcaseFrame` exactly, uniform row-thumbnail sizing across all three projects.
- **Repository cleanup**: legacy files and orphaned assets removed (Phase 2, Priority 1).
- **Design token migration** (Phase 2, Commit A): remaining hardcoded easing/shadow/padding/font-size values in `ShowcaseModal`, `ProjectsSection`, and `CapabilitiesSection` replaced with `var(--token)` references.
- **UI primitive extraction, Part 1**: `Eyebrow` and `Tag` extracted into `components/ui/` from duplicated per-section markup (Journey, Capabilities, Projects, ShowcaseModal all migrated). This set was then explicitly **frozen** — no further primitive extraction until the final architecture pass.
- **Skills section rebuild**: full constellation (hub/tool-pill layout math ported verbatim from the original percent-coordinate formulas, horizontal/vertical layout switch at a JS-measured 720px container width, filter bar, hover/filter dimming, host-scoped mouse drift).
- **Contact section rebuild**: pulsing badge, 5-stage journey path with scroll-triggered fill bar + staggered stage-dot colorize (IntersectionObserver + CSS transitions), headline, magnetic email CTA (reusing `useMagnetic` at Hero's exact strengths), social pills, footer bar. `data/site.js` populated with real email/location/socials/contact-path content.
- **Repository consistency audit**: confirmed `aria-expanded` is present on the project accordion toggle (`ProjectsSection.jsx`) — resolved, no longer open debt. Confirmed the doubled-selector CSS specificity hack exists in both `ShowcaseModal.module.css` and `ProjectsSection.module.css`. Confirmed Process, Proof, and Behind-the-work sections are fully unbuilt (stub/empty data files, no components, not imported in `app/page.jsx`). Removed a stale "Phase 1 shells" comment from `app/page.jsx` left over from early scaffolding.
- **Contact form UI → backend integration**: `ContactForm` rebuilt from a large multi-field layout down to Name/Email/Mobile in a single-row responsive layout; wired to a real Server Action (`lib/contact.js`) that validates with Zod (`lib/contact-schema.js`) and sends via Resend (HTML + text body, `Reply-To` set to the submitter's email) to `hello@midhunshankar.me`. Field-level and submission-level error states both verified live against the real action. The `send.midhunshankar.me` domain-verification blocker noted earlier is **resolved** — real end-to-end sends have since been confirmed working (owner notification + visitor confirmation, see below).
- **Contact footer social row**: added `SocialLinks` (Instagram/LinkedIn/Email/WhatsApp, icon-only, Feather-style inline SVG matching the Hero's existing `StrokeIcon` convention) to the footer bar, above the existing tagline/copyright line. `.footerBar` restructured into a column with a new `.footerMeta` row carrying the old two-item flex-between layout.
- **Modal image loading**: replaced a broken click-to-preload approach (which prefetched the wrong URL — the raw `/images/...` path, not the `/_next/image?...` URL `next/image` actually requests) with an in-modal loading gate. `ShowcaseModal` now tracks completion of every image it renders (hero + all walkthrough images, all `priority` so lazy-loading can't stall the gate) via a local counter and a new optional `ShowcaseFrame` `onImageReady` callback, and crossfades from a spinner to content only once everything has loaded.
- **Contact form email**: added a real HTML+text confirmation email sent to the visitor on successful submission (`lib/email/contactConfirmation.js`, imported by `lib/contact.js`) — table-based layout, fully inline styles, MS badge, portfolio color/type tokens hand-copied for email-client compatibility. Verified via a real submission (dev server log showed a single successful POST covering both sends) and by rendering the generated HTML directly in-browser at desktop/mobile widths.
- **Legal pages**: added `/privacy` and `/terms` as standalone routes sharing a new `LegalPage` shell (`components/layout/LegalPage/`) — same Navbar, same header-reveal pattern, same typography/spacing tokens as every homepage section, plain semantic HTML content styled via scoped element selectors (no per-paragraph classNames needed). The site footer was extracted from `ContactSection` into a shared `Footer` component (`components/layout/Footer/`, `SocialLinks` moved there with it) so the homepage and both new pages render the exact same footer — now with "Privacy" / "Terms" links added into it. Both pages have full metadata (title/description/OG). Verified desktop/tablet/mobile, zero console errors, and the extraction confirmed byte-identical footer output on the homepage before/after.
- **Production hardening — SEO/PWA/404/nav**: fixed `metadataBase` (was `midhunshankar.com`, corrected to the real domain `midhunshankar.me`, which every other reference in the codebase already used). Added `alternates.canonical` per route (`/`, `/privacy`, `/terms`), `app/robots.js`, `app/sitemap.js`, and `app/manifest.js` via the Metadata Routes API. Added `app/icon.svg` — a plain static SVG reusing the exact Navbar badge (ink bg, cream "MS") — after a first attempt using `next/og`'s `ImageResponse` failed on this Windows dev environment (a font-loading `file://` URL bug inside Next's bundled `@vercel/og`); dropped that approach entirely for a static SVG rather than work around a third-party bug, per "simplicity over cleverness." Added a custom `app/not-found.jsx` matching the site's typography/spacing/CTA conventions. Fixed `Navbar` so it's pathname-aware (`usePathname()`): on the homepage it behaves exactly as before, off it (`/privacy`, `/terms`, 404) every nav href and the logo link are prefixed to route back to `/` and land on the correct anchor there, instead of dead-ending. Scroll-spy IntersectionObserver setup is now skipped entirely off the homepage. **Observed but out of scope**: in-page `#anchor` scrolling (both the pre-existing homepage links and the newly-fixed cross-page ones) did not visibly scroll during automated browser testing in this environment — a control test confirmed this reproduces even for original, untouched homepage anchor links, so it predates this change; unclear whether it's a real production issue or a testing-harness artifact. Worth a manual check in a real browser before considering it a bug.

---

# Current Project Asset Architecture

Each **completed** project (`lifeos`, `moro`, `skillgap-navigator`) lives under `public/images/projects/{slug}/` and follows this pattern:

```
public/images/projects/{slug}/
├── thumbnail.webp     — accordion row thumbnail + expanded preview
├── hero.webp          — showcase modal header band
└── showcase-01.webp … showcase-04.webp   — modal walkthrough images
```

Paths are built via the `img(slug, name)` helper in `data/projects.js` — never hardcode a path in a component.

**Known deviation:** `moro` currently uses semantically-named walkthrough files (`food-discovery.webp`, `restaurant-discovery.webp`, `cart.webp`, `checkout.webp`) instead of the `showcase-01..04` numbering used by the other two projects. Both patterns work identically through `ShowcaseFrame` since `data/projects.js` supplies the exact filename per section — this is a naming inconsistency, not a functional gap. Worth normalizing during the final audit (see Technical Debt), but not urgent.

**The old CSS-art/inline-SVG mockup architecture (`mockups.js` from the original static site) is fully retired for all three completed projects.** No project in `data/projects.js` currently uses a placeholder or programmatic mockup — every image reference points to a real `.webp` asset.

**`ShowcaseFrame` is the single reusable image-framing component**, used consistently in all four contexts:
1. Accordion row thumbnail (collapsed card)
2. Expanded accordion preview
3. Modal hero (header band) — via `ShowcaseModal`, pinned/edge-to-edge styling override
4. Modal walkthrough images — one `ShowcaseFrame` per showcase feature section

Because every usage pulls from the same `ShowcaseFrame.module.css`, style changes (border, radius, shadow, background) apply everywhere automatically — verified during Phase 6D via computed-style diffing (`boxShadow`, `borderRadius`, `backgroundImage` reported byte-identical across all four usages).

---

# Current UI Standards (locked)

These visual/interaction conventions are considered settled. Apply them by default in any new or touched section rather than re-deriving a look from scratch.

- **Transparent framed screenshots** — `ShowcaseFrame` has no opaque background; the image is the content, the frame adds border/radius/shadow only.
- **Medium radius** on cards/frames (`--radius-xl`, ~20px) — not the smaller chip radius, not the large `--radius-3xl` reserved for modals/major panels.
- **Layered, subtle drop shadow** — a tight contact shadow plus soft ambient shadow(s), not a single flat box-shadow.
- **Soft 1–1.5px border** at low ink-alpha (`--ink-a07`–`--ink-a12`), never a hard/solid-color border on cards.
- **Walkthrough storytelling in project modals** — each showcase feature is presented as eyebrow → title → description → framed image, stacked vertically with generous spacing (`clamp(72px, 10vw, 120px)` between sections). Not a feature grid, not a plain gallery.
- **Human copywriting** — project narratives (challenge/approach/process/solution/outcome) are written in first-person, specific, non-generic language; avoid template-sounding case-study copy.
- **Project narrative structure** — every project with a `showcase` follows the same section shape (info block → walkthrough → tech stack → live-site CTA); don't invent a one-off structure per project.
- **Modal presentation style** — dark hero band, frosted-blur overlay, scale+rise entrance on desktop, bottom-sheet slide-up on mobile (≤640px), all via the shared `modalOverlay`/`modalPanel`/`modalPanelMobile` variants in `lib/motion.js`.
- **Reusable image framing only** — never write a one-off `border-radius`/`box-shadow` combination for a screenshot outside `ShowcaseFrame`; extend the primitive instead.
- **Signature motion**: `EASE = [0.16, 1, 0.3, 1]` for essentially every meaningful transition; reveals use `revealVariants(direction, delay)` + `REVEAL_VIEWPORT` (12% visible, `-7%` bottom margin, once).
- **State-driven CSS** for anything a reference implementation drove off a `data-*` attribute originally (e.g. `data-active`, `data-dim`, `data-expanded`) — set the attribute from React state, let CSS transitions own the interpolation. Don't reach for Framer just because a section has "an animation."

---

# Remaining Work

- **Process section** (`#process`, "5-step method" grid in the original spec) — **confirmed missing.** `data/process.js` exists but `processSteps` is an empty placeholder array; no `ProcessSection` component exists in `components/`; not imported in `app/page.jsx`.
- **Proof/stats section** (`#proof` — stat count-ups + testimonial placeholders in the original spec) — **confirmed missing.** `data/stats.js` exists but `proofStats`/`testimonials` are empty placeholder arrays; no `ProofSection` component exists; not imported in `app/page.jsx`.
- **Behind-the-work section** (`#life` — personality/currently-building cards) — **confirmed missing.** No data file and no component exist for this section at all.
- **SEO** — `metadata` API usage, OG image, sitemap/robots, structured data (Person/CreativeWork), semantic landmark audit.
- **Performance pass** — image weight audit (the original portrait asset was flagged at 2.4MB pre-rebuild; confirm current `public/images` sizes are reasonable), bundle audit, `LazyMotion`/Framer tree-shaking if not already applied.
- **Accessibility pass** — focus trap + focus return on `ShowcaseModal`, keyboard navigation audit across interactive sections, color-contrast spot check. (`aria-expanded` on the project accordion toggle is confirmed present — see Completed Work.)
- **Final responsive QA** — full screenshot-diff pass at 1440/1024/768/640/375 across every section, not just the ones rebuilt most recently.
- **Code audit** — see Technical Debt below.
- **Production optimization** — Lighthouse pass, verify `prefers-reduced-motion` is honored consistently across every animated section (not just the ones built with it in mind from the start).
- **Deployment checklist** — not yet started (hosting target, environment variables, analytics, domain).

---

# Technical Debt

Only genuine outstanding debt — do not list work that's already done.

- **`moro` walkthrough filenames diverge** from the `showcase-01..04` convention used by the other two projects (see Asset Architecture). Cosmetic/consistency issue only; not a functional bug.
- **Doubled-selector CSS specificity workaround** (`.foo.foo`) — **confirmed present in two files**: `ShowcaseModal.module.css` (`.heroFrame.heroFrame`) and `ProjectsSection.module.css` (`.rowThumb.rowThumb`), both overriding `ShowcaseFrame` styles. Outstanding cleanup item for the final architecture pass.
- **No centralized tracking of which literal (non-token) values are intentional** — components that use literals instead of tokens document this in their commit message only, not in a single reference file. A future pass could either extend `tokens.css` to cover the remaining common literals, or add a short "intentional literals" note per component.

---

# Future Refactor Plan

- Repository cleanup — ✅ done (legacy files/orphaned assets removed).
- Design token migration — ✅ done (Commit A: remaining hardcoded values in ShowcaseModal/ProjectsSection/CapabilitiesSection ported to tokens).
- UI primitive extraction — ✅ Part 1 done and **frozen** (`Eyebrow`, `Tag`, plus pre-existing `ShowcaseFrame`/`ShowcaseModal`/`ParallaxBlob`). No further extraction happened during the Skills or Contact rebuilds by explicit instruction — duplication introduced by those sections (if any) has not yet been audited for extraction opportunities.
- **Remaining primitive opportunities** (unaudited — identify during the final pass, don't extract speculatively before then): possible candidates include a shared "framed panel" pattern beyond `ShowcaseFrame`, a shared magnetic-CTA button component (currently `useMagnetic` is reused as a hook but the button markup/styles are duplicated per section — Hero and Contact both hand-roll their own magnetic button JSX/CSS).
- **Final audit** — not started. Should cover: primitive-extraction opportunities across the now-complete section set, motion consolidation (confirm no duplicate variant definitions have crept into individual sections instead of `lib/motion.js`), CSS cleanup (dead classes, specificity hacks), and confirming the "one owner per animatable property" rule hasn't been violated anywhere.
- **Performance optimization** — not started; see Remaining Work.

---

# Locked Engineering Rules

These are process/decision-making rules, distinct from the Architecture Decisions (tech stack) and Current UI Standards (visual conventions) above. They govern *how* work gets done in this repo, not what it looks like. Settled — apply by default, don't re-derive per task.

- **Verify documentation against the actual codebase before trusting it.** This doc summarizes intent and outcome, not live truth. Before relying on a claim here (build status, "fixed", a hook/component's existence), confirm it by reading the actual files — `app/page.jsx`, the component tree, `data/*.js`. Update this doc when a claim turns out to be stale (see the 2026-08-14 repository consistency audit for a worked example: `aria-expanded` was confirmed fixed, the doubled-selector hack was confirmed still present, Process/Proof/Behind-the-work were confirmed fully unbuilt).
- **Recover and consult the original static-site reference before rebuilding any remaining section.** The pre-rebuild prototype (`index.html`, `style.css`, `support.js`, `mockups.js`) was deleted from the working tree in commit `e24a1e5` ("Phase 2, Priority 1: remove legacy files") but remains recoverable from git history — e.g. `git show <commit-before-e24a1e5>:index.html`. Pull the relevant markup/CSS/JS for a section before writing its React/CSS-Module equivalent; don't invent structure or copywriting from scratch when a reference implementation exists.
- **No speculative abstraction.** Implement a new interaction locally in the section first; only extract a shared hook or primitive once a pattern has actually repeated across sections *and* a task calls for it. (E.g. Proof's count-up logic is implemented local to `ProofSection` — no `useCountUp` hook until reuse is proven.)
- **Pixel/behavior parity over hook reuse when they conflict.** A section-local implementation beats forcing an existing shared hook to fit; document the divergence in the commit message.
- **One owner per animatable CSS property** — Framer Motion or a CSS transition/keyframe, never both on the same property on the same element at once.
- **Data-driven content.** New sections populate the existing typed `data/*.js` stubs rather than hardcoding copy in JSX; if no stub exists yet (e.g. Behind-the-work), define the typedef before writing content.
- **No new visual language.** Match Current UI Standards (frames, radius, shadow, easing, copy tone) for any new section rather than improvising a fresh look.
- **A section isn't done until this document says so.** Update `rebuild-progress.md` — move the section from "confirmed missing" to Completed Work, update Remaining Work/Technical Debt — as part of the deliverable, not as a follow-up.
- **Confirm build order and placement decisions with the user before deviating from an agreed plan** (e.g. section order in `app/page.jsx`, nav anchor placement, which section ships first).

---

# Session Handoff

**Start here** if you are a new Claude session picking up this project:

1. **Read this document first**, completely, before touching code or asking the user to re-explain context.
2. **Do not re-audit completed phases.** Hero, Journey, Capabilities, Projects (all three case studies), Skills, and Contact are done and verified — treat them as correct unless the user explicitly reports a bug in one.
3. **Continue from the Remaining Work section only**, unless the user directs otherwise. Process, Proof, and Behind-the-work are confirmed missing (not "unconfirmed" — see Remaining Work); approved build order is **Proof → Process → Behind-the-work**.
4. **Preserve all locked architecture decisions** above — Next.js App Router, JavaScript (never introduce `.ts`/`.tsx`), CSS Modules (never introduce Tailwind), the frozen primitive set, the data-driven content pattern, and the property-ownership rule for animation.
5. **Preserve existing UI quality and styling.** Match the Current UI Standards section for any new work — framed screenshots, medium radius, layered shadows, human copywriting, the established modal presentation style. Don't introduce a new visual language for new sections.
6. **Never reintroduce duplicate implementations.** Before writing new component styles or markup, check whether `Eyebrow`, `Tag`, `ShowcaseFrame`, `ParallaxBlob`, or a `lib/motion.js` variant already covers the need. If a genuinely new repeated pattern emerges, flag it for the Future Refactor Plan's final audit rather than extracting a primitive mid-task unless the user asks for it.
7. **Follow the Locked Engineering Rules above** — recover the original static-site reference from git history before rebuilding a section, implement new interactions locally before considering a shared hook, and verify this document against the actual code rather than trusting it blindly.
