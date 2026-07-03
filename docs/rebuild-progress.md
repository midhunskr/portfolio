I'll reverse-engineer the portfolio thoroughly before writing the report. Let me start by mapping the codebase.

HTML fully mapped. Now the CSS (tokens, keyframes, breakpoints).

I've now fully reverse-engineered all four source files — the HTML template ([index.html](index.html), 1,385 lines), the stylesheet ([style.css](style.css), 3,360 lines), the generated Claude Design runtime ([support.js](support.js)), and the CSS-art mockup factory ([mockups.js](mockups.js)). Here is the complete rebuild specification. Per your constraints, nothing was created or modified — this is analysis only.

---

# Portfolio Rebuild Architecture Report

**Target:** Next.js App Router · TypeScript · Tailwind CSS · Framer Motion
**Principle:** Visual parity. The current site is the spec; nothing below proposes a redesign.

## 0 — What the current architecture actually is

Understanding this drives every migration decision:

- **`index.html`** holds all static markup inside a proprietary `<x-dc>` template, plus an inline `<script type="text/x-dc">` defining a single `Component extends DCLogic` React class. Everything happens imperatively in `componentDidMount()`: 16 init functions wire up all interactivity via `querySelector`, `addEventListener`, `IntersectionObserver`, and rAF loops that write inline styles.
- **`support.js`** is the generated dc-runtime (marked "GENERATED — do not edit"). It parses `<x-dc>`, evals the logic class, and mounts it with a global React. This is the layer being deleted.
- **`mockups.js`** is a `Mockups` object producing large inline-styled HTML strings — pure CSS-art device mockups (browser frames, a miniature LifeOS app with 6 screens, plus generic card/flow/code/phone previews). No images are used for previews.
- **`style.css`** is well-organized flat CSS: state-attribute selectors (`[data-reveal]`, `[data-shown]`, `[data-expanded]`…), ~1,000 lines of utility-ish classes, keyframes, and stacked `max-width` media queries.

Key implication: **the DOM is the state store.** JS toggles attributes (`data-shown`, `data-expanded`, `data-active`, `data-in`) and CSS transitions do the animating. The rebuild replaces this with React state + Framer Motion, but the *animation values* (durations, easings, offsets) must be carried over verbatim.

Two projects (LifeOS's showcase modal, and the project list itself) are **data-driven already** — arrays of objects rendered via template strings. This is the easiest part to migrate and confirms a data-first architecture is the right shape.

---

## Deliverable 1 — Current Portfolio Breakdown

### 1. Global chrome (cursor, progress bar, parallax blobs)
- **Purpose:** Ambient polish; brand feel of a "living" page.
- **Visual structure:** Fixed 7px green cursor dot + 34px lagging ring (z-index 9000); 2px gradient scroll-progress bar (z 9001); 8 radial-gradient blobs absolutely positioned inside sections.
- **Interaction:** Cursor ring grows to 52px and tints green over any `a, button, [data-cursor]`. Blobs translate vertically on scroll by `elementCenterOffset × factor` (factors −0.06…0.05).
- **Motion:** Dot tracks instantly; ring lerps at 0.18/frame. Blobs via rAF-throttled scroll listener with `translate3d`. Everything disabled at `(pointer: coarse)`.
- **Complexity:** Medium. **Risk:** Low. **Rebuild difficulty:** Easy — three small hooks.

### 2. Navbar + mobile drawer
- **Purpose:** Anchor navigation (`#work #capabilities #process #contact`), brand mark.
- **Visual structure:** Fixed full-width bar; logo badge "M" + name; pill-group of links in a frosted container; dark pill CTA. Below 880px: hamburger (3 bars morphing to X) + full-screen frosted drawer with oversized links.
- **Interaction:** At `scrollY > 40` the bar condenses: translucent cream bg, `blur(14px)`, hairline shadow, padding 20px→14px (all transitioned .45s). Drawer locks body scroll, closes on link/Escape.
- **Complexity:** Low-medium. **Risk:** Low. **Difficulty:** Easy.

### 3. Hero (left copy + orbit stage) — *see Deliverable 6*
- **Purpose:** Identity statement — "design, build & automate" — with the orbit system as visual proof of the three-capability concept.
- **Visual structure:** 2-col grid (1.04fr/0.96fr, max 1300px). Left: mono badge with pulsing dot, 3-line display headline with green/amber accent words, paragraph, primary (magnetic) + secondary CTAs, 3-stat row with dividers. Right: the orbit stage. Bottom-center scroll hint (mouse-wheel glyph with bobbing pip). Dot-grid background with radial mask.
- **Motion:** Load-time stagger — every `[data-hero-anim]` fades/rises (34px, 1.1s, signature easing) at `120 + i×110ms`. Plus all orbit behaviors.
- **Complexity:** **High** (highest on page). **Risk:** High. **Difficulty:** Hard.

### 4. Journey timeline (`#journey`, section 01)
- **Purpose:** Narrative arc: Curiosity → Design → Development → Automation → Product Building.
- **Visual structure:** Centered header; vertical 2px track at `clamp(22px, 4vw, 50%)` — i.e., centered on desktop, left-gutter on mobile; 5 alternating rows (card left / node / spacer, then mirrored). Cards: white rounded-20, mono eyebrows (green/amber/light-green), 26–28px display titles; final card inverts to dark.
- **Interaction/motion:** Rows scroll-reveal individually. A gradient fill line (`#12886A→#1FB68C`, glow shadow) grows in height per scroll: `progress = clamp((vh×0.6 − rect.top) / (height×0.8))`. Node styles: first green-ringed, middles neutral, last solid green with halo.
- **Complexity:** Medium. **Risk:** Medium (scroll-linked fill + responsive re-layout). **Difficulty:** Moderate.

### 5. Capabilities tabs (`#capabilities`, section 02) — bg shifts to `#EFEADF`
- **Purpose:** Deep-dive on Design / Develop / Automate.
- **Visual structure:** Left header; 3 pill tabs (active = dark solid); each panel is a 2-col grid: main white card (icon chip, 28px h3, paragraph, label, tag pills) + side column with two cards ("The process" arrow-chain, "Seen in" list).
- **Interaction:** Tab click crossfades panels: outgoing fades .35s then `display:none`; incoming `display:grid` → double-rAF → fade in. Container has `min-height: 360px` to stop layout jumps.
- **Complexity:** Low-medium. **Risk:** Low. **Difficulty:** Easy (Framer `AnimatePresence` is a direct upgrade).

### 6. Projects accordion (`#work`, section 03)
- **Purpose:** Case-study list; the page's conversion core.
- **Visual structure:** Header row (title + mono hint) then 5 stacked white cards. Collapsed row: mono number · category eyebrow · big name · tagline · small CSS-art mockup (~150–230px, hidden ≤640px) · 46px "+" circle. Expanded body: 0.92/1.08fr grid — preview frame with big mockup + tag pills, and a 4-step vertical Challenge/Process/Solution/Outcome rail with numbered dots on a gradient line. LifeOS additionally reveals a dark circular "↗" showcase trigger (bottom-right, spins in).
- **Interaction/motion:** Single-open accordion. Open: `max-height = scrollHeight+40`, opacity, marginTop 28px (.7s signature easing); steps stagger in at `130 + i×125ms`; "+" rotates 135° and turns green; row mockup lifts `translateY(-4px) scale(1.03)`. Hover lifts card shadow. Resize listener re-measures open card.
- **Complexity:** Medium-high. **Risk:** Medium (height animation + dynamic HTML). **Difficulty:** Moderate.

### 7. Showcase modal (LifeOS)
- **Purpose:** Full case-study "site within a site."
- **Visual structure:** Fixed overlay `rgba(15,14,12,.72)` + blur(16); 940px panel, radius 24, `max-height: 88vh`; dark hero band with 3 radial glows and a composed LifeOS mockup; info block (eyebrow/title/summary); 6 alternating feature rows (text ↔ framed screen mockup, `direction: rtl` trick for alternation); tech chip row; centered "Open Live Site" CTA.
- **Interaction/motion:** Open: overlay fade .38s, panel `scale(.94) translateY(18px)` → identity .52s. Close: ×-button (rotates 90° on hover), backdrop click, Escape. Body scroll lock. **Mobile (≤640px):** bottom-sheet styling applied via JS inline styles (absolute inset 52/10/10/10, radius 20) to survive bfcache restore, plus `history.pushState('#sc-modal')` so hardware Back closes the modal; `popstate` + `pageshow` handlers. This encodes several hard-won bug fixes (visible in git history) that must be preserved behaviorally.
- **Complexity:** High. **Risk:** High (history/bfcache edge cases; mobile viewport). **Difficulty:** Moderate-hard.

### 8. Process grid (`#process`, section 04) — dark section `#1B1A16`
- **Purpose:** 5-step method (Observe…Refine).
- **Visual structure:** 1px-gap grid (`auto-fit minmax(190px,1fr)`) simulating hairline dividers; cells: mono number (green/muted/amber) top, heading + paragraph bottom, min-height ~230–290px.
- **Motion:** Reveals with 90ms delay ramp; hover lightens cell background to `#222019`.
- **Complexity:** Low. **Risk:** Low. **Difficulty:** Trivial.

### 9. Skills constellation (`#stack`, section 05)
- **Purpose:** Skills as a connected system — 3 hubs (Design/Development/Automation) each with 5 tool pills, connected by SVG lines.
- **Visual structure:** Rounded 24 panel with radial cream gradient, `clamp(460px, 54vw, 580px)` tall. Entirely JS-built: an SVG (`viewBox 0 0 100 100`, `preserveAspectRatio: none`, `vector-effect: non-scaling-stroke`) for lines + an absolute div layer for nodes, all positioned in **percent coordinates**. Desktop: hubs at (19,47)/(50,57)/(81,47), tools on partial ellipses (rx 13, ry 24) with per-cluster arc ranges. ≤720px container width: vertical hub stack at x=50, tools in explicit left/right column offsets. Dashed animated "signal" lines connect hubs.
- **Interaction:** Filter pill row (Whole system/Design/Development/Automation) + hub hover both dim non-cluster nodes (opacity .22, desaturate) and re-weight line opacities. Whole layer drifts with mouse (lerp 0.06, ±9px). Tool pills glow with cluster color on hover.
- **Complexity:** **High.** **Risk:** High (bespoke layout math, resize handling). **Difficulty:** Hard — second only to the hero.

### 10. Proof section (`#proof`) — bg `#EFEADF`
- **Purpose:** Stats + (placeholder) testimonials.
- **Visual structure:** 4 stat cards (05 / 03 / 18+ / ∞) then 2 dashed-border testimonial placeholder cards with "Add quote" corner tags.
- **Motion:** Count-up on 60% visibility: 1400ms, `1−(1−p)³` ease, zero-padding and suffix support; staggered reveals (0/80/160/240ms).
- **Complexity:** Low. **Risk:** Low. **Difficulty:** Trivial.

### 11. Behind the Work (`#life`)
- **Purpose:** Personality section.
- **Visual structure:** 3-card grid: dark "Currently building" card with glowing status dot; "What I explore" tag card (tags hover to green); "Off the clock" card. Full-width quote card beneath.
- **Complexity:** Low. **Risk:** Low. **Difficulty:** Trivial.

### 12. Contact + footer (`#contact`)
- **Purpose:** Conversion close.
- **Visual structure:** Centered: pulsing badge → 5-stage journey path (Curiosity→…→"Build together") → giant display headline (up to 6.4rem) → paragraph → huge dark email pill (magnetic) → LinkedIn/Email pills + location → hairline footer bar.
- **Motion:** Journey path on 50% visibility: fill bar animates to 82% width over 1.9s while stage dots sequentially colorize/scale at `300 + i×340ms` using per-stage `data-color`. Email button is magnetic (x×0.14, y×0.26). Staggered reveals throughout (40–280ms).
- **Complexity:** Medium. **Risk:** Low-medium. **Difficulty:** Easy-moderate.

### 13. CSS-art mockup system (`mockups.js`)
- **Purpose:** All project imagery, with zero image assets.
- **Structure:** Browser-chrome frames (traffic-light dots); a miniature LifeOS design system (sidebar, chrome, and 6 screens: today/tasks/calendar/habits/ada/insights) rendered oversized then shrunk via `transform: scale(0.42–0.5)` with `width/height: 1/S %` compensation; generic card/flow/code/phone mockups from bar/box primitives.
- **Complexity:** Medium-high in volume (71KB), low in logic. **Risk:** Medium (font-size fidelity at sub-10px, scaling math). **Difficulty:** Moderate — mechanical JSX conversion.

---

## Deliverable 2 — Component Hierarchy

```
RootLayout (app/layout.tsx)                     — fonts, metadata, <body> bg
└── HomePage (app/page.tsx)                     — assembles sections; server component
    ├── CursorFollower        (client)          — dot + ring; reads interactive-element hovers
    ├── ScrollProgressBar     (client)
    ├── Navbar                (client)
    │   ├── NavLogo
    │   ├── NavLinks (desktop pill group)
    │   └── MobileNav — HamburgerButton + MobileDrawer
    ├── HeroSection           (client)
    │   ├── ParallaxBlob ×2
    │   ├── HeroIntro         — badge, headline, copy, CTAs, stats (staggered)
    │   │   ├── PulseBadge
    │   │   ├── MagneticButton (shared)
    │   │   └── HeroStats
    │   ├── OrbitSystem       — see Deliverable 6
    │   └── ScrollHint
    ├── JourneySection        (client)
    │   ├── SectionHeader     (shared: eyebrow num+label, h2, para)
    │   └── JourneyTimeline   — track + scroll-linked fill
    │       └── JourneyRow ×5 → JourneyCard (variant: light|dark) + JourneyNode
    ├── CapabilitiesSection   (client)
    │   ├── TabBar            (shared pill-tab group; reused by skills filter)
    │   └── CapabilityPanel ×3 → CapabilityMainCard + CapabilitySideCard ×2
    ├── ProjectsSection       (client)
    │   └── ProjectCard ×N    (accordion item)
    │       ├── ProjectCardHeader (num/cat/name/tagline/mock/plus)
    │       ├── ProjectCardBody   — PreviewFrame + ProjectSteps (staggered rail)
    │       └── ShowcaseTrigger   (conditional)
    ├── ProjectModal          (client, portal)  — see Deliverable 8
    ├── ProcessSection        → ProcessCell ×5
    ├── SkillsSection         (client)
    │   ├── TabBar (filter variant)
    │   └── SkillsConstellation — ConstellationSvg (lines) + HubNode ×3 + ToolPill ×15
    ├── ProofSection          → StatCard ×4 (CountUp) + TestimonialCard ×2
    ├── BehindSection         → BehindCard ×3 + QuoteCard
    ├── ContactSection        (client)
    │   ├── ContactPath       → ContactStage ×5 + path fill
    │   ├── MagneticButton    (email CTA)
    │   └── SocialRow
    └── Footer

Shared primitives:
  Reveal            — viewport-reveal wrapper (direction, delay) — replaces [data-reveal]
  SectionHeader     — eyebrow + heading + optional paragraph, align variants
  Pill / Tag        — the ubiquitous rounded-full chip
  CountUp           — number animation
  mockups/*         — BrowserFrame, ScaledScreen, LifeOSSidebar, LifeOSChrome,
                      LifeOSScreen (today|tasks|calendar|habits|ada|insights),
                      GenericMock (card|flow|code|phone), LifeOSHeroComposition
```

**Responsibilities & data flow:**
- **Server by default.** Static sections (Process, Proof text, Behind, Footer) render on the server; only components owning listeners/state are `"use client"`. Since almost every section has a reveal animation, the pragmatic split is: section shells are server components that render `<Reveal>` (a thin client wrapper) around static content.
- **Data flows down only.** `data/projects.ts`, `data/skills.ts`, `data/journey.ts`, `data/capabilities.ts`, `data/site.ts` → imported by `page.tsx` → passed as props. No context needed except one: **`ModalContext`** (or simply state lifted to `ProjectsSection`) holding `activeShowcase: Project | null`, connecting `ShowcaseTrigger` → `ProjectModal`.
- **Accordion state** (`expandedId: string | null`) lives in `ProjectsSection` — this natively encodes the single-open rule that the current code enforces by force-closing siblings.
- **Cursor/magnetic/parallax** are hooks (`useCursor`, `useMagnetic`, `useMouseParallax`, `useScrollParallax`), not prop-drilled — they attach behavior locally.

---

## Deliverable 3 — Folder Structure

```
portfolio/
├── app/
│   ├── layout.tsx            # fonts (next/font), metadata, body bg, CursorFollower + ProgressBar
│   ├── page.tsx              # section assembly, imports data
│   ├── globals.css           # Tailwind directives, ::selection, scroll-behavior, base resets
│   ├── sitemap.ts / robots.ts / opengraph-image.tsx   # Phase 10
│   └── (future) projects/[slug]/page.tsx  # optional deep-linkable case studies
├── components/
│   ├── layout/               # Navbar, MobileDrawer, Footer, ScrollProgressBar, CursorFollower
│   ├── hero/                 # HeroSection, HeroIntro, HeroStats, ScrollHint
│   │   └── orbit/            # OrbitSystem, OrbitNode, OrbitRings, SignalPath,
│   │                         #   PortraitFrame, FloatingCard, AnchorPill, HaloLayer
│   ├── sections/             # JourneySection, CapabilitiesSection, ProjectsSection,
│   │                         #   ProcessSection, SkillsSection, ProofSection,
│   │                         #   BehindSection, ContactSection
│   ├── projects/             # ProjectCard, ProjectCardBody, ProjectSteps,
│   │                         #   ProjectModal, ProjectFeature, ProjectHero,
│   │                         #   ProjectTechStack, ProjectCTA, ShowcaseTrigger
│   ├── skills/               # SkillsConstellation, HubNode, ToolPill, ConstellationSvg
│   ├── mockups/              # BrowserFrame, ScaledScreen, LifeOS* screens, GenericMock
│   └── ui/                   # Reveal, SectionHeader, Pill, TabBar, MagneticButton,
│                             #   CountUp, ParallaxBlob, PulseBadge
├── hooks/                    # useCursor, useMagnetic, useScrollParallax, useMouseParallax,
│                             #   useBodyScrollLock, useModalHistory (mobile back-button),
│                             #   usePointerFine (media-query gate), usePrefersReducedMotion
├── lib/                      # motion.ts (shared variants/easing/durations),
│                             #   utils.ts (cn), constants.ts
├── data/                     # projects.ts, skills.ts, journey.ts, capabilities.ts,
│                             #   process.ts, stats.ts, site.ts (nav, socials, email)
├── types/                    # project.ts, skills.ts, content.ts — all content interfaces
├── styles/                   # (only if tokens outgrow tailwind config; else omit)
├── public/
│   ├── images/portrait.png   # re-exported/compressed (currently 2.4MB — must shrink)
│   └── favicon / og assets
├── tailwind.config.ts
└── next.config.mjs
```

**Purpose notes:** `data/` is the single place content edits happen — the rebuild's core maintainability win (today content lives in 3 places: HTML, the JS array, and mockups). `hooks/` isolates every rAF/listener pattern currently inlined in `componentDidMount`. `lib/motion.ts` centralizes the signature easing and durations so parity is enforced in one file. `types/` makes the project/showcase schema explicit so adding FinX (or project #7) is a typed data entry, not surgery.

---

## Deliverable 4 — Design System Extraction

### Color tokens
| Token | Value | Usage |
|---|---|---|
| `cream` | `#F4F0E8` | page bg, light text on dark |
| `cream-deep` | `#EFEADF` | alt section bg, tag-pill bg |
| `ink` | `#1B1A16` | headings, dark sections/buttons |
| `ink-soft` | `#3E3B34` | step body text |
| `text-muted` | `#57534B` | body copy |
| `text-faint` | `#908B80` | labels, mono captions |
| `green` | `#12886A` | primary accent |
| `green-bright` | `#1FB68C` | gradients, on-dark accent |
| `amber` | `#CC8636` | secondary accent |
| `surface` | `#FFFFFF` | cards |

Alpha conventions (encode as Tailwind opacity modifiers of `ink`/`green`/`amber`/`white`): borders `ink/7–10`, hairlines `ink/12–18`, tints `green/10–16`, `amber/14–18`, frosted surfaces `white/60–82` + backdrop-blur. Mockups use a **separate stone/green palette** (`#16A34A`, `#1C1917`, `#57534E`, `#A8A29E`, `#E7E5E4`, `#F7F6F3`, `#FAFAF9`) — namespace it (`los-*`) so LifeOS art stays true without polluting site tokens. Dark-section hover: `#222019`.

### Typography tokens
- **Families:** `display` = Bricolage Grotesque (500/600/700); `sans` = Hanken Grotesk (300–700); `mono` = JetBrains Mono (400/500). Load via `next/font/google` with `display: swap`.
- **Scale (fluid, keep exact clamps):**
  - `display-hero`: `clamp(2.6rem, 6.6vw, 5.6rem)` / lh 0.98 / ls −0.03em (≤480px: `clamp(2.2rem, 9vw, 2.6rem)`)
  - `display-contact`: `clamp(2.6rem, 8vw, 6.4rem)` / 0.98 / −0.03em
  - `h2`: `clamp(2rem, 4.6vw, 3.6rem)` / 1.02–1.04 / −0.025em
  - `h3-card`: 26–28px / −0.01em · `proj-name`: `clamp(1.5rem, 3vw, 2.4rem)`
  - Body: 14–17px / 1.5–1.68 · `eyebrow`: mono 10–12px, tracking 0.1–0.22em, uppercase · `stat`: `clamp(2.6rem, 4.6vw, 4rem)`
- Headline width constraints via `max-w-[16ch|18ch|20ch]`.

### Spacing tokens
- **Section padding:** `py-[clamp(80px,12vh,150px)] px-[clamp(20px,5vw,72px)]` — universal; encode once as a `section` component class or Tailwind plugin utility.
- **Containers:** 1000 / 1100 / 1240 / 1300px max-widths.
- **Header→content gaps:** `clamp(30px…90px)` per section (values documented in §1).
- Card padding: 26–44px fluid clamps; chip padding 7–12px × 13–22px.

### Radius tokens
`full` (100px pills, circles) · `24` (major cards, modal, constellation) · `20–22` (journey/proof/behind cards, mobile modal) · `16–18` (fc-cards, preview frames) · `9–13` (icon chips, logo badge) · mockup-internal `2–10px`.

### Shadow tokens (one family, ink-based)
- `card`: `0 22px 50px -36px rgba(27,26,22,0.30)` · `card-hover`: `0 34px 70px -34px rgba(27,26,22,0.42)`
- `float` (fc-cards/pills): `0 24px 46px -22px rgba(27,26,22,0.40)` · `portrait`: `0 46px 92px -34px rgba(27,26,22,0.50)`
- `modal`: `0 40px 120px -30px rgba(0,0,0,0.55)` · glow shadows: `0 0 12px rgba(18,136,106,0.4)` for fills/dots.

### Animation tokens
- **Signature easing:** `cubic-bezier(.16, 1, .3, 1)` — used for *everything* meaningful. Framer: `ease: [0.16, 1, 0.3, 1]`.
- **Durations:** micro 0.25–0.35s · standard 0.4–0.52s · accordion 0.7s · reveal 1.0s · hero 1.1s · path fill 1.9s.
- **Keyframes to port to Tailwind config:** `pulseDot` 2.4s, `nodeBeat` 2.6–3.5s, `floatY` 6.4–7.4s, `haloBreath` 8s, `ringspin` 95s, `ringspinrev` 72s, `signal` (dashoffset −100) 2.6–5s, `bobA` 1.6s.
- **Stagger recipes:** hero `120 + i×110ms`; project steps `130 + i×125ms`; contact stages `300 + i×340ms`; reveal delays 0/40/80/90/120/160/180/200/240/270/280/360ms.

### Breakpoint strategy
Current CSS is **max-width** at 1024/880/768/760/640/540/480 + `pointer: coarse`. Recommendation: define Tailwind custom screens matching these exactly (e.g. `max-lg:1024`, `max-nav:880`, `max-md:760`, `max-sm:640`, `max-xs:480`, plus 540 where needed) using Tailwind's `max-*` variants, rather than translating to mobile-first — translation is where parity bugs will breed. `pointer: coarse` gating moves into hooks (`usePointerFine`), not CSS.

---

## Deliverable 5 — Motion Architecture

| # | Pattern | Purpose | Trigger | Style / values | Framer Motion recommendation |
|---|---|---|---|---|---|
| 1 | **Hero reveal** | Sequenced first impression | Mount | opacity 0→1, y 34→0, 1.1s sig-ease, stagger 110ms after 120ms delay | Parent `variants` + `staggerChildren: 0.11, delayChildren: 0.12`; children share one `heroItem` variant. Note: current stagger is DOM-order across *both* columns (portrait is item 7) — preserve order |
| 2 | **Section reveal** | Scroll entrance | Viewport (12% visible, −7% bottom margin) | up 40px / left−38 / right 38 / scale .94 → identity; 1s sig-ease; per-element delay | `<Reveal>` wrapper: `whileInView` + `viewport={{ once: true, amount: 0.12, margin: '0px 0px -7% 0px' }}`, `direction` + `delay` props |
| 3 | **Orbit mouse-parallax** | Hero depth | Global mousemove (fine pointers only) | offset = lerp(0.07) of normalized cursor × depth × 11px; ring group rotates cx×5° | rAF hook writing to `useMotionValue` per depth layer, or `useSpring(mv, { stiffness/damping tuned to match lerp 0.07 })`; each `OrbitNode` binds `x/y` transforms |
| 4 | **Ring spin / signals** | Ambient life | Always | 95s/72s linear rotation; stroke-dashoffset drift 2.6–3.4s | Pure CSS keyframes (Tailwind `animate-*`) — no JS needed; don't convert to Framer (wasteful) |
| 5 | **Node beat / floatY / haloBreath / pulseDot / scroll-bob** | Ambient life | Always | scale/opacity or ±7–13px sine loops with negative delays | Pure CSS keyframes with per-instance duration/delay props |
| 6 | **Card hover lift** | Affordance | Hover | shadow deepen + translateY(−2px), .4s | CSS `hover:` classes (or `whileHover` where already a motion element) |
| 7 | **Magnetic buttons** | Playfulness (hero CTA, email CTA) | mousemove within element | translate (dx×0.14, dy×0.26), reset on leave | `useMagnetic` hook → motion values + `useSpring` for the release snap |
| 8 | **Custom cursor** | Brand | mousemove | dot: direct; ring: lerp 0.18; grows 34→52px, tints on interactive hover | Dedicated client component; rAF + motion values; hover state via event delegation (`closest('a,button,[data-cursor]')`) — do **not** re-bind per element like the original |
| 9 | **Scroll parallax blobs** | Depth | Scroll | y = elementCenter-vs-viewport × factor (−0.06…0.05) | `useScroll({ target })` + `useTransform` per blob; hardware-accelerated transform only |
| 10 | **Nav condensation** | Wayfinding | scrollY > 40 | bg/blur/shadow/padding, .45s ease | `useScroll` scrollY listener toggling a boolean class state |
| 11 | **Progress bar** | Orientation | Scroll | width = % scrolled | `useScroll().scrollYProgress` + `scaleX` (cheaper than width) |
| 12 | **Tab/filter crossfade** | Content switch | Click | .35s opacity, display swap | `AnimatePresence mode="wait"` + fade variants; keep `min-height` on container |
| 13 | **Project accordion** | Progressive disclosure | Click | max-height via scrollHeight, .7s sig-ease; plus→× rotate 135°; steps stagger 125ms; mock lift | `AnimatePresence` + `motion.div` `animate={{ height: 'auto' }}` (kills the scrollHeight/resize-listener hack); steps as staggered variants re-triggered per open |
| 14 | **Showcase modal** | Case study | Trigger click | overlay fade .38s; panel scale .94+y18 → 1/0, .52s; mobile bottom-sheet y48→0 | Portal + `AnimatePresence`; desktop and mobile as variant sets keyed by breakpoint; scroll-lock + history hooks (see D8) |
| 15 | **Count-up** | Proof | 60% visible once | 1400ms, ease-out-cubic, pad/suffix | `useMotionValue(0)` + `animate(mv, target, { duration: 1.4, ease: [0.33,1,0.68,1] })` + `useTransform` for formatting |
| 16 | **Journey line fill** | Progress metaphor | Scroll through section | height % = (vh×0.6 − top)/(0.8×height) | `useScroll({ target, offset })` + `useTransform` → `scaleY` with top origin; tune offsets to reproduce the exact ramp |
| 17 | **Contact path sequence** | Story climax | 50% visible once | fill→82% over 1.9s; dots colorize/scale at 300+i×340ms | `whileInView` orchestration: fill `animate width`, stages as staggered variants (`delayChildren 0.3, staggerChildren 0.34`); per-stage color from data |
| 18 | **Constellation dim/drift** | Focus | hover/filter/mousemove | opacity .22 + desaturate .4s; layer drift lerp .06 ×9px | React state for active cluster (drives classes); drift via same parallax hook family |
| 19 | **Showcase trigger reveal** | Discoverability | Card expanded | scale .7 rotate −18° → 1/0°, .42–.52s | Variant on expanded state |
| 20 | **Hamburger / drawer** | Mobile nav | Click | bars→X .35s; drawer fade .35s | CSS class morph for bars; `AnimatePresence` for drawer |

**Global rule:** every loop/parallax gates on `pointer: fine` today; the rebuild should *add* `prefers-reduced-motion` support (reveal-only, no loops) — a behavior addition, not a redesign.

---

## Deliverable 6 — Orbit Hero Analysis (priority area)

### Reverse-engineered anatomy

**Stage:** `.eco-stage` — `position: relative`, `aspect-ratio: 1/1`, `max-width: 466px`, right-aligned in the grid (centered ≤1024px at 440px, 340px ≤640px). **Everything inside is positioned in percentages of this square** — this is the load-bearing insight: the whole system scales as one unit.

**Layers (z-order):**
1. **Halos (z 0):** green radial halo (`inset: 8%`, blur 16, `haloBreath` 8s, participates in parallax at depth 0.3) + static amber halo (`inset: −6%`, blur 12).
2. **SVG orbit layer (z 1):** `viewBox="0 0 100 100"`, overflow visible, pointer-events none.
   - `<g class="ring-tilt">` (transform-origin 50,50 — **JS writes `rotate(cx×5deg)`**) containing: ellipse r 47 (ink 10%, w 0.22, dash `0.5 2.1`, spins 95s) · ellipse r 38.5 (green 20%, w 0.3, counter-spins 72s) · ellipse r 30 (ink 8%, static).
   - 4 quadratic **signal paths** outside the tilt group, curving from the four quadrants toward center (e.g. `M28,24 Q40,38 46,45`), green/amber at 42–55% alpha, dash `1.6 2.6`, dashoffset-animated at 2.6/3.1/2.9/3.4s.
3. **Orbit nodes (z 2):** 7 dots at fixed % positions — (47,11) d3.3 11px green · (20,29) d3.7 9px green · (69,15) d3.0 10px amber · (92,49) d2.7 11px amber · (13,63) d3.4 9px green · (62,60) d2.5 8px green · (48,89) d2.0 9px green. Each = colored core + expanding `nodeBeat` ring (green or amber, durations 2.6–3.5s, staggered negative delays).
4. **Portrait (z 3):** wrapper at `top 21% / left 23.5% / width 53%`, square, **depth 0.7** (moves *less* than nodes — the parallax inversion that sells depth). Inside: conic-gradient glow ring (`inset −6%`, blur 3, green→amber→green, opacity .55); circular clipped photo (5px frosted white border, deep shadow, `object-position: center 16%`); green radial tint overlay (top-left); dark bottom gradient overlay.
5. **Floating capability cards (z 4):** 4 glass cards (`white/76` + blur 14, radius 16, float shadow) at corners *outside* the stage bounds (e.g. tl: `top −3% / left −8%`), width `clamp(140px, 27%, 170px)`. Contents: status dot, tinted icon chip (16px stroke SVG), title, and either 3 icon+label skill rows (Product Design / AI Automation / Development) or a tool-chip row (Tools: Fi / N / Tailwind-SVG / n8 / ···). Each bobs on `floatY` with distinct duration/negative delay (6.4/7.1/6.8/7.4s; 0/−1.5/−0.8/−2.1s). Depths 2.6/2.9/2.7/2.4.
6. **Anchor pill (z 5):** bottom-center (`bottom −5%`), glass pill — ✦ badge + "From idea to launch. / One person. End-to-end." Depth 1.3.

### Behaviors
- **Mouse parallax:** *global* (window-level) mousemove → normalized to stage center, clamped ±1 → per-frame lerp `c += (t−c)×0.07` → each `[data-orbit]` gets `translate3d(cx×depth×11px, cy×depth×11px, 0)`; ring group additionally tilts `rotate(cx×5°)`. Resets to 0 on stage mouseleave. **Entirely skipped on coarse pointers** — mobile gets a static (but still CSS-animated) composition.
- **Hover:** no per-node hover; cards have no hover state; only the ambient loops + parallax.
- **Reveal:** stage is one `data-hero-anim` unit (7th in the hero stagger, so ~890ms after load); CSS loops start immediately.
- **Responsive:** ≤1024px stage centers below copy (440px); ≤1024px fc-cards compact (tool row hidden, 9.5px skill text, width clamp(100px,24%,130px)); ≤640px stage 340px, cards pulled inside edges (±1%), anchor pill drops to −14%.

### Proposed React architecture (no code)

```
OrbitSystem                     "use client"; owns the parallax engine
│   useMouseParallax(stageRef, { lerp: 0.07, gain: 11, tiltGain: 5, enabled: pointerFine })
│     → returns spring/motion values (cx, cy); children derive offsets by depth
├── HaloLayer                   two halo divs; green one registered at depth 0.3
├── OrbitRings                  the SVG: rings (CSS spin) + ring-tilt group bound to rotate(cx×5°)
│   └── SignalPath ×4           path data + duration as props
├── OrbitNode ×7                data-driven: { xPct, yPct, size, color, depth, beatDuration, beatDelay }
├── PortraitFrame               depth 0.7; next/image (priority) + glow ring + overlays
├── FloatingCard ×4             data-driven: { corner, depth, floatDuration, floatDelay,
│                                 icon, title, variant: 'skills' | 'tools', items[] }
└── AnchorPill                  depth 1.3
Sibling: HeroIntro              owns the mount stagger; OrbitSystem participates as one stagger item
```

Design decisions: (a) **one rAF loop** in `OrbitSystem`, not per node — children subscribe via motion values with a depth multiplier (`useTransform(cx, v => v * depth * 11)`); (b) node/card geometry lives in `data/` or a local config array — 7 nodes and 4 cards become two mapped arrays instead of 200 lines of markup; (c) ambient loops stay CSS keyframes for compositor-thread smoothness; (d) percent-based layout is preserved exactly — do not convert to pixel math; (e) the global-vs-stage mousemove distinction matters (parallax responds even when the cursor is over the hero *text*) — keep the window listener.

---

## Deliverable 7 — Responsive Audit

| Section | Desktop >1024 | Laptop/tablet 640–1024 | Mobile <640 | Rebuild notes |
|---|---|---|---|---|
| Nav | Pill links | ≤880: hamburger + drawer | Same | Clean; keep 880 cutover |
| Hero | 2-col, stage right | 1-col, stage centered 440px; compact fc-cards, tools row hidden | Stage 340px; text/CTAs/badge centered; stat dividers hidden; cards tucked to ±1% | **Highest-risk area.** fc-card compaction is a distinct "mini" variant — model it as a prop/`max-lg:` class set, not overrides-on-overrides. Anchor pill −5%→−14% shift is easy to miss |
| Journey | Center spine, alternating | ≤880: left spine at 20px, rows become stacked columns, spacers hidden | Same | Left offset `clamp(22px,4vw,50%)` must stay consistent across track, fill, and nodes — one shared constant |
| Capabilities | 2-col panels | ≤880: 1-col (`two-col` collapse) | Same | Watch `min-height: 360px` clipping when stacked — verify |
| Projects | Row + wide 2-col body | ≤760: body 1-col | ≤640: row mockup hidden; sc-trigger 36px at 8px inset | `height:auto` animation makes the current resize-listener hack obsolete |
| Modal | Centered 940px panel | Same | ≤640: bottom-sheet (absolute 52/10/10/10), back-button integration | Reimplement as **breakpoint-keyed variants**, not JS inline styles — the bfcache hacks exist only because styles were imperative |
| Process | auto-fit ≥190px (5→3→2) | Same | ≤480: 1-col, min-height auto | Trivial |
| Skills | Horizontal triangle layout | ≥720px container: same | <720: vertical hub stack, 2-left/3-right pill columns; ≤480 height 520–640px; ≤540 pill font 11px | Two genuinely different layout algorithms — encode as a `layout: 'horizontal' | 'vertical'` computed from container width (use ResizeObserver / container queries, not window width) |
| Proof / Behind | auto-fit grids | Degrade naturally | Same | Trivial |
| Contact | 780px path | Same | ≤540: label 9px, track 6% insets; ≤480 email btn stacks vertically, arrow hidden | Keep 82% fill + 6%/9% inset relationship exact |
| Footer | Row | Same | ≤540 stacks | Trivial |

**Recommendations:** (1) mirror the existing max-width breakpoints 1:1 (see D4); (2) replace all window-width JS checks (`innerWidth <= 640` in modal, `clientWidth >= 720` in constellation) with a `useMediaQuery`/ResizeObserver hook so React state and layout can't desync; (3) the hero and constellation are the only two sections needing *structural* (not just flow) changes per breakpoint — budget QA time there; (4) preserve `pointer: coarse` (not width) as the gate for cursor/parallax/magnetic.

---

## Deliverable 8 — Project Showcase Architecture

### Data model (types/project.ts)

```
Project {
  slug, order ('01'…), name, category, tagline,
  narrative: { challenge, approach, process, solution, outcome },
  tags: string[],
  mock: MockKind ('lifeos' | 'card' | 'flow' | 'code' | 'phone' | future kinds),
  showcase?: Showcase
}
Showcase {
  liveUrl?, summary,
  features: { num, title, description, screen: ScreenKind }[],
  tech: string[],
  hero: HeroCompositionKind          // which mockup composition renders in the dark band
}
```

Currently 5 projects exist (LifeOS, Credit Card Landing Page, AI Workflow Automation System, Design-to-Code Experiment, Concept Product Case Study); only LifeOS has a `showcase`. **Note:** your brief lists a 6th project, *FinX*, which does not exist in the current codebase — under this architecture it's purely a new entry in `data/projects.ts` plus (optionally) a new mock kind, with zero component changes. The section heading copy ("Five problems…") lives in data too, so it updates alongside.

### Component design

- **`ProjectCard`** — accordion item. Props: `project`, `expanded`, `onToggle`, `onOpenShowcase`. Renders header row, animated body (`height: 'auto'`), staggered `ProjectSteps`, `PreviewFrame` (resolves `mock` via a mockup registry map), tags, and `ShowcaseTrigger` iff `showcase` exists.
- **`ProjectModal`** — portal-rendered, `AnimatePresence`-controlled by `activeShowcase`. Owns: scroll lock (`useBodyScrollLock`), Escape/backdrop close, focus trap + focus return (an accessibility upgrade the original lacks; invisible, so parity-safe), and `useModalHistory` — the mobile back-button contract: on open (≤640px) push `#sc-modal`; close on `popstate`; `replaceState` on programmatic close; because styling is declarative, the bfcache re-apply hack disappears while the *behavior* (Back closes modal, restored page renders correctly) is preserved.
- **`ProjectHero`** — dark band: radial-glow bg + a hero composition resolved from `showcase.hero` (LifeOS: dashboard + offset Ada panel composition).
- **`ProjectFeature`** — one alternating row; alternation from index parity via grid order (drop the `direction: rtl` trick — same visual, saner code); image side = `BrowserFrame` + `LifeOSScreen(screen)` clipped to `clamp(160px, 20vw, 240px)`.
- **`ProjectTechStack`** — label + chip row. **`ProjectCTA`** — dark pill → `liveUrl`, hover green lift, arrow nudge.
- **`ProjectGallery`** *(future-proofing, in your list)* — not in the current UI; specify as an optional `showcase.gallery` block rendering the same `BrowserFrame` treatment for real screenshots, so image-based case studies (FinX?) don't need CSS-art.
- **Mockup registry** — `mockups/index.ts` maps `MockKind → component`; adding a project preview = adding one component + one map entry. LifeOS screens (`today/tasks/calendar/habits/ada/insights`) become individual components sharing `LifeOSSidebar`/`LifeOSChrome`/`ScaledScreen` (the scale-and-compensate wrapper: render at natural size, `scale(S)` with `width/height = 100/S %`).

Optional Phase-10 extension: intercepted route `/projects/[slug]` so showcases are deep-linkable/shareable while still opening as a modal in-page — the data model above already supports it.

---

## Deliverable 9 — Risk Assessment

**High-risk sections**
1. **Orbit hero** — most moving parts, most breakpoint variance, first thing anyone sees. *Mitigation:* build early (Phase 3), side-by-side against the live site at 1440/1024/768/375; drive geometry from config arrays; screenshot-diff at each width.
2. **Skills constellation** — bespoke % coordinate math with two layout modes and hand-tuned arc formulas. *Mitigation:* port the layout function **verbatim** (same constants: hubs (19,47)/(50,57)/(81,47), rx 13/ry 24, arc ranges 0.58+0.84π etc.) into a pure, unit-testable function returning positions; render output declaratively; use ResizeObserver.
3. **Showcase modal on mobile** — the git history shows five commits fixing bfcache/back-button/padding bugs. *Mitigation:* treat those behaviors as acceptance tests (open → Back closes; open → Open Live Site → Back → modal state correct; padding intact after bfcache restore). Declarative styling removes the root cause of most of them.

**Animation risks**
- *Easing/duration drift* — parity dies by a thousand near-misses. Mitigation: `lib/motion.ts` as the single source; forbid inline magic numbers in review.
- *Lerp vs spring mismatch* — Framer springs don't natively express `c += (t−c)×k`. Mitigation: keep the tiny rAF-lerp hooks for cursor/orbit/constellation-drift rather than approximating with springs; use Framer for state-driven animation only.
- *Stagger semantics* — current staggers are DOM-order `setTimeout`s (hero stagger spans both columns). Mitigation: document intended order per section; verify visually.
- *Accordion height* — replacing scrollHeight hacks with `height: 'auto'`; test with images/mockups that resize during open.

**Responsive risks** — hero fc-card compaction and constellation mode switch (detailed in D7); `!important`-based overrides in current CSS mask specificity issues that Tailwind will surface — resolve by *reading intent*, not translating selectors.

**SVG risks**
- `preserveAspectRatio="none"` + `vector-effect="non-scaling-stroke"` on constellation lines — subtle; forgetting either distorts dashes/widths.
- `transform-origin: 50px 50px` on SVG groups (user-space units) behaves differently across browsers than CSS %-origins — keep viewBox-space origins; test Safari.
- Inline icon set (~20 Feather-style paths) — extract to typed icon components once; don't re-draw.
- Sub-pixel strokes (0.22–0.42 in a 100-unit viewBox) render fine but will look wrong if anyone "cleans up" values.

**Performance risks**
- `portrait.png` is **2.4MB** — the single biggest real-world perf issue. Mitigation: `next/image`, resized/AVIF, `priority`.
- Multiple concurrent rAF loops (cursor, ring-lag, orbit, constellation, scroll handlers) — fine now; in React, ensure loops live in refs/motion values and **never setState per frame**.
- `backdrop-filter` blur on many glass layers — already shipped and acceptable; don't add more.
- Hydration: heavy client sections (hero, constellation) should not block LCP text — hero copy renders server-side; only behavior hydrates.

**Migration risks**
- *Content drift* — three copies of truth today (HTML text, JS arrays, mockup labels). Mitigation: Phase 1 extracts ALL copy to `data/` before any component work; parity review of the data files against the live site.
- *Runtime coupling* — `style-hover` attributes (a dc-runtime feature) silently do nothing without support.js; each must become a real `hover:` class — grep for `style-hover` and map every instance (nav links, CTAs, tags, process cells, socials).
- *The "5 problems" heading vs adding FinX* — copy lives in data; update together.
- *Placeholder testimonials* — keep as placeholders (parity), model as data with an `isPlaceholder` flag.

---

## Deliverable 10 — Implementation Roadmap

| Phase | Scope | Why this order |
|---|---|---|
| **1 · Foundation** | Next.js + TS + Tailwind scaffold; fonts via `next/font`; full token system (D4) into `tailwind.config.ts`; all keyframes; `lib/motion.ts`; **all content extracted to `data/` + `types/`**; `Reveal`, `SectionHeader`, `Pill`, `MagneticButton`, `CountUp`, `TabBar`, `ParallaxBlob` primitives; compressed portrait | Everything downstream consumes tokens, data, and primitives. Getting the signature easing/reveal wrapper right once means every later section inherits parity for free |
| **2 · Navigation & chrome** | Navbar + condensation, mobile drawer, progress bar, cursor follower, footer | Small, self-contained, exercises the scroll/pointer hook patterns (`useScroll`, `usePointerFine`) that harder phases reuse — a cheap rehearsal |
| **3 · Hero / Orbit** | HeroIntro stagger + full OrbitSystem (D6) | Highest risk → earliest, while schedule slack exists. Validates the one-rAF-loop parallax architecture and the multi-breakpoint variant approach the constellation will also need |
| **4 · Journey** | Timeline, scroll-linked fill, alternating cards | First scroll-linked (`useScroll`+`useTransform`) pattern; moderate risk; completes the top fold |
| **5 · Projects** | Accordion cards, mockup registry + all CSS-art components, showcase modal + history/scroll-lock hooks | Largest phase (accordion + modal + entire mockups library). Depends on data model (P1) and reveal/stagger patterns (P3–4). The conversion core — deserves its own QA pass incl. the mobile back-button acceptance tests |
| **6 · Capabilities + Skills** | Tab panels; constellation (ported layout function, filters, drift) | Constellation is the second-hardest piece; by now every pattern it needs (parallax drift, dim states, TabBar, resize handling) already exists. Capabilities rides along since it shares TabBar |
| **7 · Proof + Behind** | Stat count-ups, testimonial placeholders, behind cards, quote | Low-risk filler sections; fast wins while hard sections stabilize in review |
| **8 · Contact** | Path sequence, email/social CTAs, final assembly of `page.tsx` | Needs MagneticButton (P1) and stagger orchestration (P3); closing the page last allows a full-scroll integration pass |
| **9 · Optimization & parity QA** | Screenshot diffs at 1440/1024/768/640/375 vs live site; Lighthouse; bundle audit (Framer tree-shaking, `LazyMotion`); `prefers-reduced-motion`; rAF consolidation; a11y sweep (focus trap, aria states carried over) | Parity is verified, not assumed. Done after everything exists so diffs are meaningful |
| **10 · SEO & launch** | `metadata` API, OG image, sitemap/robots, semantic landmark audit, structured data (Person/CreativeWork), analytics, deploy | Content-dependent and zero visual risk — safe last. Optional: `/projects/[slug]` intercepted routes for shareable case studies |

---

### Summary of the three decisions that matter most

1. **Data-first:** all copy, project narratives, orbit geometry, skill clusters, and journey stages move to typed `data/` files — the rebuild's entire maintainability payoff lives here.
2. **Hybrid motion:** Framer Motion for state/viewport-driven animation; CSS keyframes for infinite ambient loops; small rAF-lerp hooks for cursor/parallax — matching each pattern's current implementation class is what makes parity achievable.
3. **Mirror the breakpoints, don't translate them:** keep the exact max-width values and the two structural-relayout components (hero, constellation) as explicit layout variants.

The riskiest work is the orbit hero, the skills constellation, and the mobile modal — all three have exact numeric specs captured above (positions, depths, durations, easings), so an engineer can rebuild them without opening the original codebase. Ready for review before implementation begins.


# Architecture Report — Revision 2 (Stack Change)

**Stack:** Next.js App Router · **JavaScript** · **CSS Modules** · Framer Motion
**Unchanged:** component hierarchy, motion architecture, orbit system, modal system, responsive strategy, roadmap phases, and all extracted values (colors, type scale, easings, durations, breakpoints, geometry) from the original report.

Honest assessment up front: this stack change is *low-risk* for this particular project. The current site is already plain CSS with semantic class names, so CSS Modules is arguably a **more direct migration path than Tailwind was** — much of `style.css` can be ported nearly verbatim into modules. The real cost is losing TypeScript's safety on the data layer (covered in Migration Impact).

---

## 1 — Revised Folder Structure

```
portfolio/
├── jsconfig.json                     # path aliases (@/components, @/data…) + checkJs option
├── next.config.mjs
├── app/
│   ├── layout.jsx                    # fonts (next/font), metadata, globals import
│   ├── page.jsx                      # section assembly
│   ├── sitemap.js / robots.js        # Phase 10
│   └── opengraph-image.jsx
├── styles/                           # ALL global CSS lives here (see §2)
│   ├── globals.css                   # reset, base element styles, ::selection, body bg
│   ├── tokens.css                    # :root design tokens (colors, radii, shadows, type, spacing)
│   ├── animations.css                # all shared @keyframes (nodeBeat, floatY, signal, …)
│   └── utilities.css                 # small set of shared single-purpose global classes
├── components/
│   ├── layout/
│   │   ├── Navbar/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Navbar.module.css
│   │   │   ├── MobileDrawer.jsx
│   │   │   └── MobileDrawer.module.css
│   │   ├── Footer/               (Footer.jsx, Footer.module.css)
│   │   ├── CursorFollower/       (CursorFollower.jsx, CursorFollower.module.css)
│   │   └── ScrollProgressBar/    (ScrollProgressBar.jsx, ScrollProgressBar.module.css)
│   ├── hero/
│   │   ├── HeroSection/          (HeroSection.jsx, HeroSection.module.css)
│   │   ├── HeroIntro/            (HeroIntro.jsx, HeroIntro.module.css)
│   │   └── orbit/                # see §6 Orbit notes
│   ├── sections/
│   │   ├── JourneySection/
│   │   ├── CapabilitiesSection/
│   │   ├── ProjectsSection/
│   │   ├── ProcessSection/
│   │   ├── SkillsSection/
│   │   ├── ProofSection/
│   │   ├── BehindSection/
│   │   └── ContactSection/       # each: Name.jsx + Name.module.css (+ subcomponents)
│   ├── projects/
│   │   ├── ProjectCard/          (ProjectCard.jsx, ProjectCard.module.css)
│   │   ├── ProjectModal/         (ProjectModal.jsx, ProjectModal.module.css,
│   │   │                          ProjectFeature.jsx, ProjectHero.jsx,
│   │   │                          ProjectTechStack.jsx, ProjectCTA.jsx — share the module)
│   │   └── ShowcaseTrigger/
│   ├── skills/
│   │   ├── SkillsConstellation/  (SkillsConstellation.jsx, SkillsConstellation.module.css,
│   │   │                          HubNode.jsx, ToolPill.jsx, ConstellationSvg.jsx)
│   ├── mockups/
│   │   ├── BrowserFrame/         (BrowserFrame.jsx, BrowserFrame.module.css)
│   │   ├── ScaledScreen/         # scale-and-compensate wrapper
│   │   ├── lifeos/               # LifeOSSidebar, LifeOSChrome, screens/Today.jsx … Insights.jsx
│   │   │                         #   one shared lifeos.module.css (they share a mini design system)
│   │   ├── GenericMock/          # card | flow | code | phone variants, one module
│   │   └── index.js              # mockup registry: kind → component map
│   └── ui/
│       ├── Reveal/               (Reveal.jsx — no module needed; pure Framer)
│       ├── SectionHeader/        (SectionHeader.jsx, SectionHeader.module.css)
│       ├── Pill/                 (Pill.jsx, Pill.module.css)
│       ├── TabBar/               (TabBar.jsx, TabBar.module.css)
│       ├── MagneticButton/       (MagneticButton.jsx — behavior only, styles from parent)
│       ├── CountUp/              (CountUp.jsx)
│       ├── ParallaxBlob/         (ParallaxBlob.jsx, ParallaxBlob.module.css)
│       └── PulseBadge/           (PulseBadge.jsx, PulseBadge.module.css)
├── hooks/                        # unchanged list, .js extension:
│   ├── useCursor.js, useMagnetic.js, useScrollParallax.js, useMouseParallax.js,
│   ├── useBodyScrollLock.js, useModalHistory.js, usePointerFine.js,
│   ├── useMediaQuery.js, usePrefersReducedMotion.js
├── lib/
│   ├── motion.js                 # shared variants, EASE constant, durations, stagger recipes
│   └── utils.js                  # cx() classname joiner
├── data/                         # projects.js, skills.js, journey.js, capabilities.js,
│   │                             #   process.js, stats.js, site.js
│   └── schema.md                 # ← replaces types/ — documented data contracts (see §7)
└── public/
    └── images/portrait.png       # compressed
```

Conventions: **one folder per component, module co-located with its JSX.** Small subcomponents that only exist as part of a parent (e.g. `ProjectFeature`) share the parent's module rather than fragmenting styles. The `types/` folder is deleted; its role moves to `data/schema.md` + JSDoc (see Migration Impact).

---

## 2 — Styling Strategy (replaces all Tailwind recommendations)

### Where styles live — four layers

**Layer 1 · `styles/tokens.css` — design tokens.** Every color, radius, shadow, easing, duration, font stack, and container width as a CSS variable on `:root`. This is the single source of truth the whole codebase reads. No component may hard-code a hex value that exists here.

**Layer 2 · `styles/globals.css` + `animations.css` + `utilities.css` — global, unscoped.**
- `globals.css`: the reset (`* { margin:0; padding:0; box-sizing:border-box }`), `html` smooth-scroll/antialiasing, `body` background, `::selection`. Imports the other three files. Imported once in `app/layout.jsx`.
- `animations.css`: **all shared `@keyframes`** (`pulseDot`, `nodeBeat`, `floatY`, `haloBreath`, `ringspin`, `ringspinrev`, `signal`, `bobA`, `drawline`, `travel`). Keyframes are global by nature; defining them once avoids CSS Modules hashing them per-module (`@keyframes` in a module get scoped names — fine within one module, but these are shared across many).
- `utilities.css`: a deliberately tiny set (<15) of global classes for patterns used in 5+ places where per-module duplication would cause drift: `.container-1240` (and 1000/1100/1300), `.section-pad` (the universal `clamp(80px,12vh,150px) / clamp(20px,5vw,72px)` padding), `.eyebrow` (mono label style), `.accent-green` / `.accent-amber`, `.visually-hidden`. Everything else is module-scoped.

**Layer 3 · Section-level modules.** Each section's module owns its layout, its cards, and its responsive rules. Section modules map almost 1:1 onto blocks of the current `style.css` (e.g. `JourneySection.module.css` receives everything from `.timeline-wrap` through `.journey-node-last`) — this is the parity-preserving migration path: port, rename to local camelCase, replace raw values with `var(--…)`.

**Layer 4 · Shared-primitive modules** (`Pill`, `TabBar`, `SectionHeader`…). Variants via co-located classes composed in JSX: `cx(styles.pill, styles.pillDark)`. Use CSS Modules' `composes:` sparingly (same-file composition only); prefer explicit multi-class composition in JSX — easier to trace.

### Rules of engagement
- **State styling stays in CSS via data-attributes**, exactly like the original: `.card[data-expanded]`, `.navBar[data-condensed]`. React sets the attribute; the module styles it. This keeps the original's proven pattern and keeps specificity flat. The current site's `!important`-laden state selectors (`[data-shown]`) become unnecessary because Framer owns those states instead.
- **Dynamic values** (per-node orbit positions, per-card float delays, per-stage contact colors) are passed as **inline CSS variables** from JSX: `style={{ '--x': '47%', '--depth': 3.3, '--beat-dur': '2.6s' }}`, consumed in the module as `left: var(--x)`. This replaces both the original's inline styles and Tailwind arbitrary values, while keeping data-driven rendering.
- No global tag selectors outside `globals.css`; no `:global` escapes except for third-party interop (none expected).

---

## 3 — Design Tokens as CSS Variables (`styles/tokens.css`)

```css
:root {
  /* ── Color ─────────────────────────────── */
  --color-cream:        #F4F0E8;
  --color-cream-deep:   #EFEADF;
  --color-ink:          #1B1A16;
  --color-ink-soft:     #3E3B34;
  --color-ink-hover:    #222019;      /* dark-section cell hover */
  --color-text-muted:   #57534B;
  --color-text-faint:   #908B80;
  --color-green:        #12886A;
  --color-green-bright: #1FB68C;
  --color-amber:        #CC8636;
  --color-surface:      #FFFFFF;

  /* alpha ramps (the rgba() values used throughout the original) */
  --ink-a05: rgba(27,26,22,0.05);  --ink-a07: rgba(27,26,22,0.07);
  --ink-a08: rgba(27,26,22,0.08);  --ink-a10: rgba(27,26,22,0.10);
  --ink-a12: rgba(27,26,22,0.12);  --ink-a15: rgba(27,26,22,0.15);
  --ink-a18: rgba(27,26,22,0.18);  --ink-a25: rgba(27,26,22,0.25);
  --green-a10: rgba(18,136,106,0.10);  --green-a16: rgba(18,136,106,0.16);
  --green-a20: rgba(18,136,106,0.20);  --green-a45: rgba(18,136,106,0.45);
  --amber-a14: rgba(204,134,54,0.14);  --amber-a18: rgba(204,134,54,0.18);
  --cream-a60: rgba(244,240,232,0.6);  /* on-dark muted text */
  --white-a60: rgba(255,255,255,0.60); --white-a70: rgba(255,255,255,0.70);
  --white-a76: rgba(255,255,255,0.76); --white-a82: rgba(255,255,255,0.82);

  /* LifeOS mockup palette — namespaced, do not mix with site tokens */
  --los-green: #16A34A;  --los-ink: #1C1917;   --los-text: #57534E;
  --los-faint: #A8A29E;  --los-border: #E7E5E4; --los-bg: #FAFAF9;
  --los-panel: #F7F6F3;  --los-frame: #FBF9F4;  --los-red: #DC2626;

  /* ── Typography ────────────────────────── */
  --font-display: 'Bricolage Grotesque', sans-serif;   /* via next/font variable */
  --font-sans:    'Hanken Grotesk', sans-serif;
  --font-mono:    'JetBrains Mono', monospace;

  --text-hero:     clamp(2.6rem, 6.6vw, 5.6rem);
  --text-contact:  clamp(2.6rem, 8vw, 6.4rem);
  --text-h2:       clamp(2rem, 4.6vw, 3.6rem);
  --text-stat:     clamp(2.6rem, 4.6vw, 4rem);
  --text-proj-name: clamp(1.5rem, 3vw, 2.4rem);
  --tracking-display: -0.03em;
  --tracking-h2:      -0.025em;
  --tracking-eyebrow: 0.18em;
  --leading-display:  0.98;
  --leading-h2:       1.04;

  /* ── Layout ────────────────────────────── */
  --container-sm: 1000px;  --container-md: 1100px;
  --container-lg: 1240px;  --container-xl: 1300px;
  --section-pad-y: clamp(80px, 12vh, 150px);
  --section-pad-x: clamp(20px, 5vw, 72px);

  /* ── Radius ────────────────────────────── */
  --radius-sm: 9px;   --radius-md: 13px;  --radius-lg: 16px;
  --radius-xl: 20px;  --radius-2xl: 22px; --radius-3xl: 24px;
  --radius-full: 100px;

  /* ── Shadows ───────────────────────────── */
  --shadow-card:       0 22px 50px -36px rgba(27,26,22,0.30);
  --shadow-card-hover: 0 34px 70px -34px rgba(27,26,22,0.42);
  --shadow-float:      0 24px 46px -22px rgba(27,26,22,0.40);
  --shadow-portrait:   0 46px 92px -34px rgba(27,26,22,0.50);
  --shadow-modal:      0 40px 120px -30px rgba(0,0,0,0.55);
  --shadow-glow-green: 0 0 12px rgba(18,136,106,0.40);

  /* ── Motion ────────────────────────────── */
  --ease-signature: cubic-bezier(0.16, 1, 0.3, 1);
  --dur-micro: 0.3s;   --dur-standard: 0.45s;  --dur-accordion: 0.7s;
  --dur-reveal: 1s;    --dur-hero: 1.1s;       --dur-path-fill: 1.9s;

  /* ── Z-index scale ─────────────────────── */
  --z-drawer: 7999;  --z-nav: 8000;  --z-cursor: 9000;
  --z-progress: 9001; --z-modal: 9500;
}
```

**Motion token duplication rule:** the easing/durations exist twice by necessity — here for CSS transitions, and in `lib/motion.js` for Framer (`export const EASE = [0.16, 1, 0.3, 1]`). Add a comment in both files pointing at the other; these two files are the only places motion constants may be defined.

---

## 4 — Framer Motion + CSS Modules Integration

The division of labor (unchanged from the approved motion architecture, restated for this stack):

| Concern | Owner | How they meet |
|---|---|---|
| Static appearance, layout, hover states | CSS Module class | `<motion.div className={styles.card} …>` — className and motion props coexist freely |
| State/viewport-driven animation (reveals, staggers, accordion, modal, tab fades) | Framer (`variants`, `whileInView`, `AnimatePresence`) | Framer writes inline `transform`/`opacity`; module must **not** transition those same properties (see conflict rule) |
| Infinite ambient loops (floatY, nodeBeat, ringspin, signal, pulseDot) | CSS `@keyframes` in `animations.css`, applied by module classes | Per-instance timing via inline CSS vars: `animation: floatY var(--float-dur) ease-in-out infinite var(--float-delay)` |
| Cursor / orbit / drift lerps | rAF hooks writing Framer `motionValue`s | Bound with `style={{ x, y }}` on motion elements — no re-renders |
| Scroll-linked (journey fill, blobs, progress) | `useScroll` + `useTransform` | Same motion-value binding |

**The one hard rule — property ownership:** a given animatable property on a given element has exactly one owner. If Framer animates `transform`/`opacity`, the module class must not declare a `transition` on them (double-easing artifacts) and must not use a keyframe animation that also writes `transform` on the *same element*. Where both are needed — e.g. a floating card that bobs (CSS) *and* parallaxes (Framer) — keep the original's solution: **two nested elements** (outer `.ecoFc` gets Framer x/y; inner `.fcCard` gets the CSS `floatY` keyframe). The original site already separates these layers everywhere; preserve its wrapper structure and this problem never arises.

Practical patterns:
- Shared variants live in `lib/motion.js` (`revealVariants(direction)`, `heroContainer`, `heroItem`, `stepStagger`, `modalOverlay`, `modalPanel`, `modalPanelMobile`) — components import variants, never re-declare timing.
- The `Reveal` wrapper renders `motion.div` with `whileInView`, taking `direction`/`delay`/`className` props so section modules can still style the wrapper box.
- State classes vs Framer: use Framer for anything that animates; use data-attribute + module CSS only for non-animated or trivially-transitioned state (nav condensation's background/padding, plus-icon rotation, dim states on constellation nodes — all fine as CSS transitions since Framer isn't touching those properties).
- `usePrefersReducedMotion` gates loops and parallax; ambient CSS animations get a global `@media (prefers-reduced-motion: reduce)` kill-switch in `animations.css`.

---

## 5 — Responsive Strategy with CSS Modules

Breakpoints unchanged: **1024 / 880 / 768 / 760 / 640 / 540 / 480 (max-width) + `pointer: coarse`**.

CSS Modules has no native variable-in-media-query support (`@media (max-width: var(--bp))` is invalid CSS). Options, in order of recommendation:

1. **Plain literal media queries in each module** (recommended). `@media (max-width: 880px) { .navLinks { display: none } }`. Zero tooling, matches the original stylesheet exactly, and the 7 values are stable. Document the canonical list in `tokens.css` as a comment block. This is the lowest-risk choice for a parity rebuild.
2. *(Optional upgrade)* PostCSS Custom Media (`postcss-custom-media`, one line in `postcss.config.js`) enabling `@custom-media --bp-nav (max-width: 880px)` defined once and used as `@media (--bp-nav)` in every module. Nice DRY-ness; adds a build dependency. Take it only if the team wants it — not required.

Placement rule (mirrors the original's structure): **responsive overrides live at the bottom of the module they modify**, grouped by breakpoint — e.g. `HeroSection.module.css` ends with its 1024/640/480 blocks. No central "responsive.css"; the original's single-file media-query stacking is exactly what we're decomposing.

JS-side breakpoints (modal ≤640 bottom-sheet + history behavior; constellation <720 container-width mode) use `useMediaQuery('(max-width: 640px)')` and a ResizeObserver respectively — never `window.innerWidth` reads — so React state and CSS can't desync. `pointer: coarse` remains the gate for cursor/magnetic/parallax via `usePointerFine`, and `.cursorEl { display: none }` under `@media (pointer: coarse)` stays as CSS belt-and-braces.

---

## 6 — Component Implementation Notes (CSS Module structure)

**Hero**
```
hero/
├─ HeroSection/
│  ├─ HeroSection.jsx            # grid, blobs, scroll hint; composes intro + orbit
│  └─ HeroSection.module.css     # .heroSection .heroGrid .dotGrid .scrollHint…
│                                #   + @media 1024/640/480 blocks (center text, stat wrap)
├─ HeroIntro/
│  ├─ HeroIntro.jsx              # badge/headline/CTAs/stats; owns heroContainer variants
│  └─ HeroIntro.module.css       # .badge .h1 .para .ctaRow .statsRow…
```
The hero stagger is one Framer `variants` tree spanning intro items *and* the orbit stage (item 7) — `HeroSection` owns the container variant so DOM-order parity is preserved.

**Orbit System**
```
hero/orbit/
├─ OrbitSystem.jsx               # "use client"; single rAF lerp → motionValues (cx, cy)
├─ OrbitSystem.module.css        # .ecoStage (aspect-ratio, max-widths per breakpoint), halos
├─ OrbitRings.jsx                # SVG rings + tilt group (rotate bound to cx×5°) + SignalPath
├─ OrbitRings.module.css         # .ringSpin .ringSpinRev .sigPath (uses global keyframes)
├─ OrbitNode.jsx                 # positioned via inline vars --x --y --size --beat-dur --beat-delay
├─ OrbitNode.module.css          # .nodeWrap .nodeInner .nodeRing / .nodeRingAmber
├─ PortraitFrame.jsx / .module.css   # glow ring, circle clip, overlays; next/image
├─ FloatingCard.jsx / .module.css    # .ecoFc corner classes (.tl .tr .br .bl) +
│                                    #   1024px compact variant + 640px position pulls
└─ AnchorPill.jsx / .module.css
```
Depth-based offsets: each child receives the shared `cx, cy` motion values and derives `x = useTransform(cx, v => v * depth * 11)` — CSS never touches parallax transforms; keyframe bobs live on inner elements (see §4 nesting rule). Node/card geometry stays in a local config array; JSX maps it to inline CSS variables.

**Journey**
```
sections/JourneySection/
├─ JourneySection.jsx            # header + timeline; useScroll fill
├─ JourneySection.module.css     # .timelineWrap .track .fill .row .leftPane .rightPane
│                                #   .card .cardDark .node .nodeFirst .nodeLast
│                                #   + @media 880px stack block
└─ JourneyCard.jsx               # variant prop: light | dark (styles.card vs styles.cardDark)
```
Critical parity detail: the spine offset `clamp(22px, 4vw, 50%)` (→ `20px` ≤880px) is used by track, fill, and all nodes — define it once as a module-level custom property on `.timelineWrap` (`--spine-x`) so the four consumers can't drift. Fill uses Framer `scaleY` (origin top) driven by `useScroll` offsets tuned to the original ramp.

**Projects**
```
projects/
├─ ProjectCard/
│  ├─ ProjectCard.jsx            # header row, AnimatePresence body (height:'auto'), steps stagger
│  └─ ProjectCard.module.css     # .card .toggle .num .info .rowMock .plus[data-expanded]
│                                #   .bodyGrid .previewFrame .stepsCol .step .stepNum…
│                                #   + @media 760 (body 1-col) / 640 (hide rowMock)
├─ ShowcaseTrigger/ (.jsx + .module.css)   # spin-in variant; 640px size shift
```
The `+`→`×` rotation, hover lift, and tag pills are pure CSS (data-attribute + `:hover`); expansion height and step stagger are Framer.

**Modal**
```
projects/ProjectModal/
├─ ProjectModal.jsx              # portal; AnimatePresence; useBodyScrollLock; useModalHistory;
│                                #   variant set chosen by useMediaQuery(640)
├─ ProjectModal.module.css       # .overlay .modal .close .body .inner .heroWrap .heroBg
│                                #   .info .features .feat .featAlt .featImage .tech .cta
│                                #   + @media 760 (features stack, image first) /
│                                #     640 (bottom-sheet: align-end, radius, insets) / 480
├─ ProjectHero.jsx               # dark band + hero composition from showcase.hero
├─ ProjectFeature.jsx            # alternation via grid order (index parity), not rtl
├─ ProjectTechStack.jsx / ProjectCTA.jsx    # share ProjectModal.module.css
```
The mobile bottom-sheet becomes **declarative module CSS** under the 640 query plus a `panelMobile` Framer variant (`y: 48 → 0`) — this deletes `_applyMobileModalStyles` and the `pageshow` bfcache re-apply hack entirely, while `useModalHistory` preserves the back-button contract (push `#sc-modal` on open ≤640, close on `popstate`, `replaceState` on programmatic close).

**Skills Constellation**
```
skills/SkillsConstellation/
├─ SkillsConstellation.jsx       # ResizeObserver → layout mode; pure layout fn → positions;
│                                #   filter/hover state; drift via motionValues
├─ constellationLayout.js        # the ported math, verbatim constants — pure & testable
├─ SkillsConstellation.module.css # .wrap .bg (radial panel, clamp heights + 480 override)
│                                #   .layer .hub .toolPill [data-dim] states, line opacities
├─ ConstellationSvg.jsx          # lines only; preserveAspectRatio=none, non-scaling-stroke
├─ HubNode.jsx / ToolPill.jsx    # positioned by inline --x/--y vars from layout fn
```
The original built everything with `document.createElement` + `style.cssText`; here the layout function returns position data and React renders it — the module holds all the styling the original inlined. Dim/undim is a data-attribute driven by React state, transitioned in CSS (`.4s`), exactly matching current behavior.

**Contact**
```
sections/ContactSection/
├─ ContactSection.jsx            # whileInView orchestration (fill 82% / 1.9s + 340ms dot stagger)
├─ ContactSection.module.css     # .badge .pathRow .track .fill .stage .dot .label
│                                #   .emailBtn .socialRow .footerBar
│                                #   + @media 540 (labels/insets) / 480 (email stacks)
└─ ContactStage.jsx              # per-stage color via inline --stage-color; final variant
```
Stage colorization (background/border/box-shadow/scale per stage) becomes a Framer variant reading `--stage-color`, replacing the original's setTimeout inline-style writes.

---

## 7 — Migration Impact of the Stack Change

### Because Tailwind is removed
- **Net effect: migration gets *easier*.** The original is hand-written CSS with named classes; section modules are near-transplants of existing blocks. The "translate intent, not selectors" risk from the first report shrinks — but the `style-hover="…"` attributes (dc-runtime feature) still must each become a real `:hover` rule in a module; the grep-and-map task stands.
- **Token discipline is now on you.** Tailwind physically prevented off-scale values; CSS variables only help if used. Mitigations: `tokens.css` is the law; PR review rule "no raw hex/shadow/easing literals in modules"; optionally add Stylelint (`declaration-property-value-allowed-list` or `scale-unlimited/declaration-strict-value`) to enforce `var()` usage for color/shadow/easing properties.
- **Purge/tree-shaking:** non-issue — CSS Modules only ship what's imported; unused-class detection is weaker than Tailwind's, but the surface is small.
- **Class composition:** you lose `tailwind-merge`-style conflict resolution; keep a 5-line `cx()` joiner in `lib/utils.js` and avoid passing style-overriding classNames across component boundaries (pass variant props instead).
- **Duplication risk** replaces utility reuse: the "eyebrow", pill, and card-shadow patterns appear in 8+ sections. That's exactly what `utilities.css` + shared primitives (`Pill`, `SectionHeader`) exist for — hold that line or the modules will drift apart visually, which is a *parity* risk, not just hygiene.

### Because TypeScript is removed
- **The data layer loses its safety net — this is the only material regression.** The rebuild's core design is data-driven (`projects.js`, showcase schema, orbit geometry, skill clusters). With TS, a malformed FinX entry fails at compile time; with JS it fails at runtime (or silently renders wrong). Mitigations, in order of value:
  1. **JSDoc typedefs** on every data file (`@typedef Project`, `@type {Project[]}`) — VS Code/`jsconfig.json` with `"checkJs": true` gives ~80% of TS's editor-level checking with zero build change. This is strongly recommended and costs almost nothing.
  2. `data/schema.md` documenting each content contract in prose (replaces `types/`).
  3. Defensive rendering at the few schema boundaries: mockup registry falls back to the `phone` frame for unknown `mock` kinds; `showcase` blocks are conditional throughout (already the design).
- **Hooks/props contracts** (motion values passed into orbit children, variant names, `useModalHistory` options) also lose checking — JSDoc `@param` annotations on the hooks and `lib/motion.js` exports cover the highest-risk surfaces.
- **File renames only:** `.tsx/.ts → .jsx/.js`; `tailwind.config.ts` disappears; `jsconfig.json` replaces `tsconfig.json` for path aliases. No architectural change.

### Risk register delta (vs. original report)
| Risk | Direction | Note |
|---|---|---|
| CSS parity (values, breakpoints) | ↓ lower | near-verbatim port of existing CSS into modules |
| Token/easing drift over time | ↑ higher | no compiler enforcement — mitigate via tokens.css discipline + optional Stylelint |
| Data-schema errors (esp. when adding FinX/new showcases) | ↑ higher | mitigate via JSDoc + `checkJs` — the one mitigation I'd treat as non-optional |
| Keyframe scoping mistakes | new, small | shared keyframes must live in global `animations.css`, not modules |
| Framer/CSS transform conflicts | unchanged | governed by the property-ownership + nested-wrapper rule (§4) |
| Everything else (orbit, constellation math, modal history, performance) | unchanged | stack-agnostic; original assessments stand |

### Roadmap impact
Phase sequence and rationale are **unchanged**. Only Phase 1's contents shift: instead of `tailwind.config.ts`, Phase 1 delivers `tokens.css` / `globals.css` / `animations.css` / `utilities.css`, `jsconfig.json` with `checkJs`, JSDoc'd data files, and `lib/motion.js`. Phase 9 adds a Stylelint token-enforcement pass if adopted.

---

Everything else in the approved report — section breakdowns, component hierarchy, motion inventory with exact values, orbit anatomy, responsive audit, showcase data model, and the 10-phase roadmap — carries over unmodified. Ready for implementation sign-off.



I'll implement Phase 1 foundation only. Let me first check what exists so I don't collide with the reference files.

No `package.json` yet — this is a fresh scaffold. The old static files (`index.html`, `style.css`, `support.js`, `mockups.js`) stay in place as the visual reference; Next.js serves from `app/` so they won't collide. Let me build the foundation.

Now the styling foundation — the four global CSS files with the full token system.

Noted on verification — I'll install deps and confirm the app compiles at the end. Continuing with the animation and utility globals.

Now the motion foundation (`lib/motion.js`) and `lib/utils.js`.

Now the data layer — 7 files with JSDoc typedefs and placeholder structure only (no real content migration).

Now the empty hook shells — signatures and JSDoc, no logic yet.

Now the app shell (`layout.jsx` with fonts + metadata, `page.jsx`) and the 8 base component shells. Starting with the app root.

Now the 8 base component shells. Each imports its CSS Module and renders a labelled placeholder.

The five remaining section shells share the same placeholder pattern, each with its own co-located module.

Now add the public asset structure and install dependencies so I can verify the app compiles.

Dependencies installed. Now let me verify the app compiles by starting the dev server and checking it renders.

That started the old static server, not Next.js. Let me add a Next dev config to launch.json and start it.

Next is booting. Let me check the rendered page and console.

The server responds. Let me capture the rendered output and console to confirm the shells render and fonts load without errors.

All shells render, metadata title is applied, semantic structure is correct, and there are zero console errors. Let me confirm the token system + CSS Modules resolve correctly by inspecting a placeholder's computed styles.

Full chain verified end-to-end: CSS Module hashing (`Navbar_placeholder__0cthn`), tokens resolving (`#908B80`, `--ink-a07`), and next/font wiring (`--font-mono` → JetBrains Mono) all work. Let me grab a screenshot as proof, then commit.

The foundation renders cleanly — cream background, mono labels in token color, the OrbitSystem placeholder with its dashed frame, all shells stacked. Let me commit.

`node_modules` and `.next` are correctly excluded (only source is staged). The CRLF warnings are harmless. Committing now.

Phase 1 is complete, verified, and committed. Stopping here as instructed — no Phase 2 work.

## 1. File Tree

```
PortfolioV3/
├── app/
│   ├── layout.jsx                 # next/font wiring + metadata/viewport
│   ├── page.jsx                   # assembles the 6 section shells
│   └── page.module.css            # root wrapper (overflow-x guard)
├── components/
│   ├── layout/Navbar/             # Navbar.jsx + Navbar.module.css
│   ├── hero/
│   │   ├── HeroSection/           # HeroSection.jsx + .module.css
│   │   └── orbit/                 # OrbitSystem.jsx + .module.css ("use client")
│   └── sections/
│       ├── JourneySection/        # .jsx + .module.css
│       ├── CapabilitiesSection/   # .jsx + .module.css
│       ├── ProjectsSection/       # .jsx + .module.css
│       ├── SkillsSection/         # .jsx + .module.css
│       └── ContactSection/        # .jsx + .module.css
├── hooks/                         # 9 shell hooks (signatures + JSDoc, no logic)
│   ├── useCursor.js  useMagnetic.js  useMouseParallax.js  useScrollParallax.js
│   ├── useBodyScrollLock.js  useModalHistory.js
│   └── usePointerFine.js  useMediaQuery.js  usePrefersReducedMotion.js
├── lib/
│   ├── motion.js                  # EASE, DUR, STAGGER, reveal/hero/step/modal variants
│   └── utils.js                   # cx(), clamp(), lerp()
├── data/                          # placeholder structure + JSDoc typedefs
│   ├── projects.js  skills.js  journey.js  capabilities.js
│   ├── process.js   stats.js   site.js
│   └── schema.md                  # data contracts (replaces types/)
├── styles/
│   ├── tokens.css                 # all design tokens as CSS variables
│   ├── globals.css                # reset + base + @imports
│   ├── animations.css             # shared @keyframes + reduced-motion kill-switch
│   └── utilities.css              # ~10 shared global classes
├── public/
│   ├── images/portrait.png        # copied from assets/ (compress in Phase 9)
│   └── README.md
├── .claude/launch.json            # added portfolio-next (port 4321)
├── jsconfig.json                  # path aliases + "checkJs": true
├── next.config.mjs   .eslintrc.json   .gitignore
├── package.json      package-lock.json
└── [reference — untouched] index.html  style.css  support.js  mockups.js  assets/  uploads/
```

## 2. Created Files
**Config (7):** package.json, package-lock.json, jsconfig.json, next.config.mjs, .eslintrc.json, .gitignore, .claude/launch.json (modified). **App (3):** layout.jsx, page.jsx, page.module.css. **Styles (4):** tokens.css, globals.css, animations.css, utilities.css. **Motion/utils (2):** lib/motion.js, lib/utils.js. **Data (8):** 7 data files + schema.md. **Hooks (9).** **Components (16):** 8 shells × (.jsx + .module.css). **Public (2):** portrait.png, README.md.

## 3. Architecture Validation
- **Stack:** Next.js App Router + JavaScript (`.jsx`/`.js`) + CSS Modules + Framer Motion (installed). No TypeScript, no Tailwind. ✅
- **Folder structure** matches the Revision-2 report (one folder per component, module co-located). ✅
- **Tokens** ported verbatim (colors, alpha ramps, LifeOS palette, type scale, radii, shadows, motion, z-index). Verified live: nav placeholder computes `#908B80`, `--ink-a07` border, JetBrains Mono via `--font-mono`, `0.18em` tracking → the full **token → CSS Module → next/font** chain resolves. ✅
- **Motion foundation** defines `EASE = [0.16,1,0.3,1]`, durations, stagger recipes, and reveal/hero/step/modal/panel variants — defined, not wired to sections. ✅
- **Data layer** has JSDoc typedefs + `checkJs` enabled; placeholder structure only, no real content. ✅
- **Hooks** are empty shells with signatures/JSDoc, no logic. ✅
- **Shells** render labelled placeholders, import their modules, and compile — confirmed: page returns HTTP 200, correct metadata title, semantic `nav`/`main`/`section` tree, **zero console errors**. ✅
- **Constraints honored:** no section visuals, layouts, animations, or content migration; nothing redesigned; reference files untouched. ✅

## 4. Git Commit
`e777210 — Phase 1: Next.js foundation and architecture setup` (source only; `node_modules`/`.next` correctly gitignored).

## 5. Stop
Phase 1 foundation is done and verified. **Awaiting your approval before beginning Phase 2 (Navigation & chrome).**

One note for when you resume: the dev server runs via the new `portfolio-next` launch config on **port 4321** (port 3000 is OS-reserved on this machine).


Phase 2: layout & navigation. I'll build the Navbar with scroll-condense + mobile drawer + scroll-spy, the cursor infrastructure, and finalize the global layout — all against the reference values I extracted earlier. First, populate the nav content in the data layer and implement the supporting hooks.

Now the hooks — implementing the real logic for the ones Phase 2 needs.

Now the CursorFollower component (infrastructure) and its module.

Now the Navbar (replacing the shell) and MobileDrawer, ported to reference values.

Now the two nav modules, ported from the reference CSS with token values.

Now finalize the global layout: mount `CursorFollower` globally and add scroll-padding for the fixed nav.

Now let me verify. The dev server is running — reload and check for errors, then test the three breakpoints.

Those are stale HMR errors from compiling mid-write — both files exist. Let me confirm on disk and force a fresh compile.

All four files exist. The errors were from a mid-write compile. Let me reload fresh and re-check console.

The files exist on disk but webpack's watcher didn't pick up the newly-created sibling modules (a known Windows dev-server cache issue). A clean restart clears it.

The restart cleared it — Navbar renders fully (logo "M", name, Work/Capabilities/Process/Let's talk) with zero console errors. Now let me verify the three breakpoints and the condensed state. First desktop at scroll top vs scrolled.

Resting desktop state matches reference (transparent, 20px padding, links pill at white/60 + blur). Now test the condensed state by scrolling.

Condensed state is an exact match to the reference (`rgba(244,240,232,0.8)`, 14px padding, hairline shadow, blur 14px). Now the mobile breakpoint — hamburger should appear and desktop links hide at ≤880px. Let me test mobile and the drawer.

At mobile: desktop links hidden, hamburger visible (40px). Now open the drawer and confirm it renders + locks scroll.

Drawer opens correctly — dialog with all 4 links, body scroll locked, aria-expanded true, hamburger relabeled "Close". Let me screenshot it, then confirm clicking a link closes it and unlocks scroll.

Drawer is at visual parity — frosted cream backdrop, centered Bricolage links, dark "Let's talk" CTA pill, hamburger morphed to X. Now confirm a link click closes it and restores scroll.

Full mobile lifecycle verified — link click closes the drawer and restores body scroll. Let me confirm tablet (768px is below the 880 cutover, so hamburger regime), check console is clean, then reset to desktop for a final proof shot.

Tablet also correct (hamburger shown), console clean across all interactions. Reset to desktop for the final proof shot.

Desktop nav is at full parity — logo badge + name, frosted pill link group, dark "Let's talk" CTA. The green cursor ring is also visible at the left edge, confirming the cursor infrastructure mounts and runs. All three breakpoints verified with zero console errors and no regressions to the section placeholders. Committing Phase 2.

Phase 2 is complete, verified against the reference at all three breakpoints, and committed. Stopping here as instructed.

## What was built

**Navbar** (`components/layout/Navbar/`) — recreated at visual parity with the reference:
- Logo badge "M" + name, frosted pill link group (Work/Capabilities/Process), dark "Let's talk" CTA — all ported values (sizing, spacing, typography, radii, colors) from tokens.
- **Scroll-condensed state** via Framer's `useScroll`/`useMotionValueEvent` (scrollY > 40); the visual condense stays a CSS transition per the approved property-ownership rule. Verified exact match: `rgba(244,240,232,0.8)`, `blur(14px)`, `0 1px 0 rgba(27,26,22,0.07)` shadow, padding 20px→14px.
- **Hover behavior** (link pill bg on hover, CTA → green) as CSS.
- **Active section indication** — new per your Phase 2 request. Implemented as IntersectionObserver scroll-spy applying a subtle darken-to-ink on the current link (no persistent pill), staying within the existing palette so it doesn't diverge from the reference resting look. *Flagging this since the reference has no active indicator — easy to dial back if you'd prefer.*

**Mobile navigation** (`MobileDrawer.jsx`) — hamburger (morphs to X) appears at ≤880px, desktop links hide; full-screen frosted drawer fades via Framer `AnimatePresence` (0.35s signature easing), locks body scroll, closes on link click and Escape. Verified: opens, screenshot matches reference, link click closes it and restores scroll.

**Cursor infrastructure** (`CursorFollower.jsx` + `useCursor`) — instant dot + lagging ring (lerp 0.18), grow-on-hover via `mouseover` event delegation, fine-pointer gated. Mounted globally in `layout.jsx`. Behavior wired; polish deferred as instructed (the green ring is visible in the desktop shot).

**Global layout** — page wrapper (`overflow-x: hidden`), token-driven container/section-padding utilities (from Phase 1), smooth scroll, `scroll-padding-top: 90px` so anchor jumps clear the fixed nav, body scroll handling via `useBodyScrollLock`, viewport in `layout.jsx`.

**Supporting hooks implemented:** `usePointerFine`, `useMediaQuery`, `usePrefersReducedMotion`, `useBodyScrollLock`, `useCursor` (all SSR-safe). Nav content migrated into `data/site.js`.

## Verification
- **Desktop (1280px):** links pill shown, condense confirmed on scroll. ✅
- **Tablet (768px):** hamburger regime (below 880 cutover). ✅
- **Mobile (375px):** links hidden, hamburger 40px, drawer open→close lifecycle + scroll lock. ✅
- **Console:** zero errors across all interactions. Section placeholders untouched — no regressions.

## Notes for resuming
- Dev server runs via `portfolio-next` on **port 4321**. A clean restart (`rm -rf .next`) was needed once because the Windows dev-server file watcher didn't pick up newly-created sibling modules mid-write — worth knowing for later phases.
- One decision needs your eye: the **active-section indicator** is an addition to the reference (see above).

## Commit
`16a4485 — Phase 2: Layout and navigation system`

**Awaiting approval before Phase 3 (Hero / Orbit System).**


Phase 3A: Hero Intro. I'll build the left text column (badge, headline, description, CTAs, stats) with the reference's index-based reveal stagger, plus the hero section shell and scroll hint. The OrbitSystem placeholder stays on the right (that's 3B). First, add an index-based hero reveal factory to the motion foundation.

Now the HeroIntro component with the reference content and per-index reveal.

Now the HeroSection shell — grid layout, dot-grid background, portrait wrapper (holding the OrbitSystem placeholder), and the reveal-staggered scroll hint. Wrapped in `MotionConfig reducedMotion="user"` for accessibility.

Now verify. Given the earlier Windows watcher issue with newly-created files, let me reload and check for module-resolution errors first.

No errors — the new files resolved this time. Let me check the rendered hero and verify parity.

All intro content is present and correctly structured. Let me verify computed styles (headline, accent color, grid) and confirm the reveal settled.

Headline is exact parity (Bricolage 600, line-height 0.98 → 62px, letter-spacing −0.03em → −1.9px, ink color, reveal settled at opacity 1) and accent-green resolves to `#12886A`. Now the visual proof at all three breakpoints.

That's rendering at ~800px wide, so the ≤1024 single-column layout is (correctly) active. Let me check the true 2-column desktop at 1440px, then tablet and mobile.

2-column desktop layout confirmed at 1440px — intro left, orbit placeholder right, vertically centered. Headline wrapping is identical to the reference by construction (same max-width, fr ratios, gap, and clamp). Now tablet and mobile.

Tablet (768px): single column, left-aligned intro (centering only kicks in at 640), hamburger nav, stats row intact, orbit placeholder below. Correct. Now mobile.

Mobile (375px): centered intro exactly per the reference's 640 rules — centered headline/paragraph/CTAs, badge block centered with left-aligned text, stats wrapped with dividers hidden, and the headline scaled down via the 480 rule. All three breakpoints match the reference. Final console check, then commit.

Phase 3A complete, verified at all three breakpoints, and committed. Stopping here as instructed.

## What was built

**HeroIntro** (`components/hero/HeroIntro/`) — the left text column at visual parity:
- **Badge** — frosted pill, pulsing green dot (`pulseDot` keyframe), mono caption.
- **Headline** — 3-line Bricolage 600 display type, `clamp(2.6rem, 6.6vw, 5.6rem)`, line-height 0.98, −0.03em tracking, with green (`design`, `build`) and amber (`automate`) accents via the shared `accent-*` utilities. Verified computed values match the reference exactly.
- **Description**, **CTA buttons** (dark primary with arrow + outlined secondary, both with reference hover states), and **stats row** (3-in-1 / End-to-end / 18+ with dividers).

**HeroSection** (`components/hero/HeroSection/`) — the section shell: 2-column `1.04fr/0.96fr` grid (max 1300px), static dot-grid background, portrait wrapper (holding the untouched OrbitSystem placeholder), and the scroll hint.

**Motion** — added `heroReveal(i)` to the motion foundation: an index-based reveal (delay `0.12 + i×0.11s`, 1.1s signature easing, y 34→0) that reproduces the reference's DOM-order stagger exactly — so the three headline lines animate individually despite sharing one `<h1>`. Wrapped in `MotionConfig reducedMotion="user"` so every reveal honors `prefers-reduced-motion`. The scroll hint uses a nested structure (outer centers, inner animates) to avoid the transform-ownership conflict.

## Verification (vs. reference)
- **Desktop 1440px:** 2-column layout, intro left / orbit placeholder right, vertically centered; headline wrapping identical by construction (same max-width/fr/gap/clamp). ✅
- **Tablet 768px:** single column (< 1024), left-aligned intro, orbit below. ✅
- **Mobile 375px:** centered intro per the 640 rules (centered headline/para/CTAs, badge block centered with left-aligned text, stats wrapped, dividers hidden), headline scaled via the 480 rule. ✅
- Reveal settled to opacity 1; **zero console errors**; nav and section placeholders unchanged.

## Scope notes
- **Deferred to 3B as instructed:** OrbitSystem, portrait, rings, floating cards, signal paths, parallax, connection lines. Also deferred the **parallax blobs** (they carry `data-parallax`) and **magnetic** pull on the primary CTA (motion behavior, not core intro) — the CTA has its hover states and `data-cursor`. The static **dot-grid** background *is* included since it's neither orbit nor parallax and materially affects hero parity — flagging in case you'd rather it move to 3B.

## Commit
`cf5bd44 — Phase 3A: Hero intro section`

**Awaiting approval before Phase 3B (Orbit System).**


Phase 3B.1: orbit geometry — portrait frame, rings, nodes, and connection lines, all static (no animation/parallax/floating-cards). I'll drive node and line geometry from a config ported verbatim from the reference. Starting with the geometry config and sub-components.

Now the OrbitRings (SVG with rings + connection lines), OrbitNode, and PortraitFrame components with their modules.

Now rebuild `OrbitSystem.jsx` to compose the stage, and replace its placeholder module with the real stage styles.

Now verify. Reload and check for module-resolution errors (new files may hit the Windows watcher issue).

No errors. Let me view the orbit — set desktop 1440 for the 2-column layout and screenshot.

The orbit renders with correct layering — portrait in a frosted circular frame with the conic glow ring, surrounded by rings, green/amber nodes at the edges, and connection lines, over the green halo glow. Let me take precise measurements to prove geometry parity with the reference ratios.

Geometry is an **exact** match to the reference: stage 466² square, portrait at left 23.5% / top 21% / width 53%, SVG covering the stage, and all 7 nodes at their exact reference percentages (47/11, 20/29, 69/15, 92/49, 13/63, 62/60, 48/89). Now verify stage sizing across the required breakpoints.

1280px: 2-column (564.6/521.2 ≈ 1.04/0.96 ratio), stage 466². Now 1024, 768, 390.

1024px: single column, stage 440² (the ≤1024 rule). Now 768 and 390.

390px: stage 340² (the ≤640 rule), and the internal geometry (portrait 53% / 23.5%) scales proportionally — the whole orbit is one unit. Let me capture the mobile orbit render and confirm the console is clean.

The mobile orbit renders correctly — portrait, rings, nodes, connection lines, and halo all scale as one proportional unit. Let me confirm the console is clean and the portrait image loaded.

The console is clean; the "failed" network entries are aborted document navigations from earlier reloads (normal), not asset failures — and the portrait is clearly loaded and rendered in the screenshot. Geometry parity is proven. Committing Phase 3B.1.

Phase 3B.1 complete, geometry verified to exact reference parity, and committed. Stopping here.

## What was built (geometry & layering only)

**PortraitFrame** — conic glow ring (green→amber→green, `from 130deg`), circular clipped `next/image` (priority, `object-position: center 16%`) with 5px frosted border + depth shadow, plus green-tint and bottom-fade overlays. Positioned at top 21% / left 23.5% / width 53%, z-index 3.

**OrbitRings** (`OrbitRings.jsx`) — the SVG (`viewBox 0 0 100 100`, z-index 1): 3 concentric ellipses (rx 47 dashed ink/10, rx 38.5 green/20, rx 30 ink/8) with the tilt/spin group nesting preserved for 3B.2, plus the 4 **connection lines** (quadratic signal paths, exact `d`/color/`stroke-width 0.42`/`dasharray 1.6 2.6`).

**OrbitNode** (data-driven from `orbitConfig.js`) — 7 nodes at their exact reference positions/sizes/colors, each a colored dot + surrounding ring (green or amber), positioned by top-left corner, z-index 2.

**OrbitSystem** — composes the stage with the reference z-order: static halos (glow) → rings + lines → nodes → portrait. Stage is `max-width 466`, square, right-aligned; drops to 440 (≤1024, centered) and 340 (≤640).

## Geometry parity — measurements
| Element | Measured | Reference |
|---|---|---|
| Stage | 466² square | 466 aspect 1/1 ✅ |
| Portrait | left 23.5%, top 21%, width 53% | identical ✅ |
| Nodes | 47/11, 20/29, 69/15, 92/49, 13/63, 62/60, 48/89 | identical ✅ |
| SVG | covers stage exactly | ✅ |

## Responsive (stage width, all verified)
- **1440 / 1280:** 2-column (1.04/0.96 ratio confirmed), stage **466²**.
- **1024 / 768:** single column, stage **440²**.
- **390:** stage **340²**, internal geometry (portrait 53%/23.5%) scales proportionally — the orbit behaves as one unit.

Console clean, no asset failures, portrait loads and renders.

## Deferred to Phase 3B.2 (as instructed)
Floating cards, anchor pill, signal/dash animation, ring spin, node beat, halo breathing, parallax, hover, and cursor interactions. The group nesting, `transform-origin`, `will-change`, and node beat-timing data are already in place so those attach cleanly next.

## Commit
`4196f3d — Phase 3B.1: Orbit geometry`

**Awaiting approval before Phase 3B.2 (orbit motion & floating cards).**


Phase 3B.2A: ambient motion via CSS infinite loops (the approved strategy — no Framer needed, since these are all infinite ambient animations). The keyframes already exist in `styles/animations.css`; I'm attaching them with per-instance timing and touching nothing about geometry. The global `prefers-reduced-motion` kill-switch in `animations.css` already covers all of these.

Let me wire ring rotation + signal flow into OrbitRings.

Now node breathing — pass beat timing into the ring, and halo pulse on the green halo.

All ambient motion wired via CSS. Let me restart the preview server and verify.

No errors. Now confirm every ambient animation is applied and actually running — I'll read computed `animation-*` on each element and sample the outer ring's transform matrix twice to prove it's rotating.

The computed `animation-name` came back **hashed** (`OrbitRings_ringspin__ygZIp`) — CSS Modules localized the keyframe reference, so it no longer matches the global `@keyframes ringspin` in `animations.css`. That means the animations likely aren't actually running. Let me confirm by sampling a node ring's transform over time.

Confirmed broken — the ring transform stays `none`. CSS Modules localized the `animation-name` to a hashed keyword that doesn't match the global `@keyframes`. This is the classic CSS-Modules-vs-global-keyframes pitfall.

The robust fix: apply the `animation` shorthand via inline `style` (which bypasses CSS Modules localization and references the true global keyframes), keeping `transform-origin`/`will-change` in the modules. Inline animation is still compositor-driven CSS — not JS animation — and the stylesheet's `!important` reduced-motion kill-switch still overrides it. Let me correct all four.

Now the halo — move its animation inline in OrbitSystem.jsx.

Now re-verify the animations actually run. Reload and sample the node ring transform and ring rotation over time.

All four ambient motions now run correctly: node ring **breathing** (scale 1.548→1.277), ring **rotation** (matrix angle advancing), halo **breath** (scale 1.019→1.006), and signal **dash flow** (offset −47.9→−74.9) — all compositor-driven CSS on transform/opacity/stroke-dashoffset. Let me confirm geometry is unchanged (motion must not have shifted anything) and the console is clean.

Geometry is untouched — stage 466², portrait 23.5/21 w53, all nodes at exact positions — and the console is clean. Motion didn't disturb layout. Now confirm motion runs and geometry holds at the smaller breakpoints. Checking 390 (motion + stage) and 1024/768 (stage).

All breakpoints hold: stage 466 (1440) / 440 (1024, 768) / 340 (390), geometry identical to 3B.1, and node motion confirmed running at mobile too. Let me capture the desktop orbit as final proof, then commit.

The page retained scroll position. Let me scroll to top for a clean shot of the hero with the orbit.

The hero renders cleanly with the animated orbit — portrait framed by the rotating rings, breathing nodes, flowing signal lines, and pulsing halo (all confirmed moving via the transform sampling). Geometry is pixel-identical to 3B.1. Committing Phase 3B.2A.

Phase 3B.2A complete, motion parity verified, and committed. Stopping here.

## What was built (ambient motion only)

All four ambient loops, ported to the reference timing, driven by the existing global keyframes in `styles/animations.css`:

- **Ring motion** — outer dashed ring `ringspin 95s linear`, inner green ring counter-rotates `ringspinrev 72s linear`.
- **Signal animation** — 4 connection lines flow via `signal` at per-path durations (2.6 / 3.1 / 2.9 / 3.4s), `stroke-dashoffset` drift.
- **Node motion** — each ring breathes via `nodeBeat` at its own duration/delay (2.6–3.5s, staggered negative delays), scale 1→1.55 + opacity.
- **Halo motion** — green halo pulses via `haloBreath 8s ease-in-out` (opacity + scale); amber halo stays static, matching the reference.

## Motion architecture & the one correction worth flagging
Per the approved strategy, these are **pure CSS infinite loops — no Framer, no JS animation**. During verification I caught a real bug: referencing a *global* `@keyframes` from a *CSS Module* caused Next's css-loader to localize the keyframe name (`ringspin` → `OrbitRings_ringspin__ygZIp`), which matched nothing — so the animations silently didn't run (node ring transform stayed `none`). Fixed by applying the `animation` shorthand via inline `style` (bypasses CSS Modules localization, references the true global keyframe), keeping `transform-origin`/`will-change` in the modules. It's still compositor-driven CSS, and the stylesheet's `!important` reduced-motion kill-switch still overrides inline animation per the cascade — so `prefers-reduced-motion` is respected. Worth remembering for later phases that reuse these keyframes.

## Performance
Everything animates `transform` / `opacity` (+ `stroke-dashoffset` for the dash flow, which doesn't reflow), with `will-change` hints. No layout-affecting properties.

## Verification
- **Motion running** (sampled over time): node ring scale 1.548→1.277, ring rotation matrix advancing, halo scale 1.019→1.006, signal offset −47.9→−74.9. ✅
- **Geometry unchanged** from 3B.1 at every breakpoint — **1440** stage 466², portrait 23.5/21 w53, nodes 47/11·20/29·69/15·92/49·13/63·62/60·48/89; **1024/768** 440²; **390** 340² with motion confirmed running. ✅
- Console clean; no positioning/sizing/responsive changes.

## Deferred to Phase 3B.2B (as instructed)
Floating cards, anchor pill, mouse parallax, hover motion, cursor reactions, magnetic effects. The `ringTilt` group and node `will-change` are already in place for the parallax layer.

## Commit
`c657103 — Phase 3B.2A: Orbit ambient motion`

**Awaiting approval before Phase 3B.2B.**


Phase 3B.2B.1: floating capability cards (4) + anchor pill — composition and positioning, ported from the reference. I'll build a reusable `FloatingCard` shell, a data-driven `FloatingCards` composition (with the exact reference SVG icons), and the `AnchorPill`. 

First the card shell module with all card styles + responsive rules.

Now the FloatingCard shell component.

Now the composition with the exact reference SVG icons and card content.

Now the AnchorPill and wiring both into OrbitSystem.

Let me update the OrbitSystem doc comment to reflect the new layers, then verify.

Now verify. Reload and check for errors, then view at desktop.

No errors. Scroll to top and screenshot the full orbit with cards.

Cards and anchor pill render around the orbit with correct composition — Product Design (TL), AI Automation (TR), Development (BR), Tools I Use (BL), and the "From idea to launch." anchor pill (center-bottom). Now precise measurements relative to the stage.

Every measurement is an **exact** match: TL (w140, −8%/−3%), TR (w140, top 2%/right −9%), BR (w140, right −7%/bottom 11%), BL (w144, left −9%/bottom 7%); card style radius 16px, padding 13px 15px, bg rgba(255,255,255,0.76), blur(14px); anchor pill centered, bottom −5%. Now the responsive screenshots. Starting with 1280.

1280px: full cards with the tools-row chips visible. Now 1024 (compact cards regime).

1024px: stage 440, card width 106 (24% clamp), tools row hidden, skill icons shown at 0.65 opacity — the compact regime is correct. Screenshot to confirm visually.

At 1024 the orbit is below the fold (single column). Let me scroll to it.

1024px compact cards are exactly right — skill icons now shown with labels, and the "Tools I Use" chips row is hidden per the reference. Now 390 (edge-pulled regime).

390px: all cards w120 pulled to edges (±1%), anchor pill bottom −14% — exact match to the reference ≤640 rules. Screenshot to confirm.

390px cards are edge-pulled and compact, anchor pill at −14% — matches the reference mobile layout. Let me confirm 768 (same compact regime, >640 so not edge-pulled) for completeness.

768px: stage 440, compact w106, TL at base −8% (not edge-pulled, correct for >640), tools row hidden. All breakpoints match. Let me confirm the console is clean and the floatY bob actually runs (guarding against the earlier keyframe-localization pitfall).

Console clean; the floatY bob runs correctly (`animationName: "floatY"` — the true global keyframe, applied inline, transform changing over time). Everything verified. Committing Phase 3B.2B.1.

Phase 3B.2B.1 complete, geometry parity proven with measurements, and committed. Stopping here.

## What was built

**Floating capability cards (4)** — `FloatingCard.jsx` (reusable glass shell) + `FloatingCards.jsx` (data-driven composition with the exact reference Feather-style SVG icons):
- **TL** Product Design (green) — User Research / UI·UX Design / Design Systems
- **TR** AI Automation (amber) — Workflow Design / n8n·Make / AI Integrations
- **BR** Development (green) — Next.js / React / Tailwind CSS
- **BL** Tools I Use (dark) — chips Fi / N / Tailwind glyph / n8 / ···

Glass styling (`rgba(255,255,255,0.76)` + `blur(14px)`, radius 16, layered shadows), status dots, tinted icon chips, titles, and z-index 4 all ported verbatim.

**Anchor pill** — `AnchorPill.jsx`, center-bottom "From idea to launch. / One person. End-to-end." with the ✦ badge, glass pill, z-index 5. The outer keeps `translateX(-50%)` centering; an inner `.anchor` wrapper is reserved for parallax depth in the next phase.

## Measurements (1440px, stage 466 — all exact)
| Card | Width | Position | Reference |
|---|---|---|---|
| TL | 140 | left −8%, top −3% | ✅ |
| TR | 140 | right −9%, top 2% | ✅ |
| BR | 140 | right −7%, bottom 11% | ✅ |
| BL | 144 | left −9%, bottom 7% | ✅ |

Card style: radius 16px, padding 13px 15px, bg `rgba(255,255,255,0.76)`, blur 14px. Anchor pill: X-centered, bottom −5%. All match.

## Responsive (verified at every required width)
- **1440 / 1280:** full cards (w140/144), tools-row chips visible.
- **1024 / 768:** stage 440, compact cards **w106** (24% clamp), tools row hidden, skill icons shown at 0.65 opacity, TL stays −8%.
- **390:** stage 340, cards **w120** pulled to edges (±1%), anchor pill bottom −14%.

Geometry (nodes, portrait, rings) untouched; console clean.

## One decision to flag
I included the cards' **floatY bob** (gentle vertical drift, per-card durations 6.4–7.4s / staggered delays). Rationale: it's the cards' *ambient* signature (consistent with Phase 3B.2A's ambient-motion work), it's what makes them "floating," and it isn't in this phase's do-not list (which is all *interactive* motion — parallax/hover/cursor/magnetic). Applied inline to reference the global keyframe (the CSS-Modules pitfall from 3B.2A), verified running. If you'd prefer the cards static until a later phase, it's a one-line removal per card.

**Deferred to 3B.2B.2 (as instructed):** mouse parallax, hover motion, cursor reactions, magnetic behavior — the `.ecoFc`/`.anchor` `will-change` hooks are already in place.

## Commit
`1d9fa0a — Phase 3B.2B.1: Floating cards and anchor pill`

**Awaiting approval before Phase 3B.2B.2 (interactive motion).**


Phase 3B.2B.2: interactive motion. Let me first confirm exactly what the reference does so I recreate rather than invent. From `support.js`: `initHeroOrbit` runs a single window-level rAF parallax loop (lerp 0.07) writing `translate3d(cx·depth·11, cy·depth·11)` to every `[data-orbit]` element and `rotate(cx·5deg)` to the ring-tilt group; `initMagnetic` makes `[data-magnetic]` elements (the hero primary CTA) pull by `(x·0.14, y·0.26)`. The hero **floating cards have no hover and no cursor reaction** in the reference — I'll flag that rather than invent one. Cursor growth over CTAs already works from Phase 2.

Let me implement the two hooks first.

Now wire parallax into OrbitSystem with the fine-pointer + reduced-motion gate, and add the depth markers.

Now the depth markers on each orbit element: nodes, portrait, cards, anchor, and the ring-tilt group.

Now the FloatingCard needs a `depth` prop, the ring-tilt group needs the tilt marker, and FloatingCards must pass per-card depths.

Now the magnetic behavior on the hero primary CTA (the reference's only `data-magnetic` element in the hero).

All wired. Let me verify — reload, check console, then drive a mouse move and confirm parallax transforms apply while geometry (top/left/width) stays fixed.

No errors. Now the key verification: drive a window mouse-move and confirm parallax transforms apply to the depth elements + ring tilt, while the layout box (top/left/width) is unchanged.

Transforms are identity — parallax isn't applying. Geometry is correctly unchanged, but I need to find why the loop isn't moving elements. Let me check the pointer media query the gate depends on.

Pointer is fine, reduced-motion false, 13 depth elements + tilt present — so parallax should be enabled. The loop uses `requestAnimationFrame`, which headless previews often throttle when the page isn't "visible." Let me check that.

The parallax **works** — the node's inline style shows `transform: translate3d(14.46px, -14.5px, 0px)`, which is exactly `cx(0.4)·depth(3.3)·11` and `cy(-0.4)·3.3·11`. The identity reads earlier were a timing artifact: the preview page is backgrounded (`visibilityState: hidden`), so `requestAnimationFrame` is throttled — but the loop still applied the correct depth-scaled offset. Let me read all elements' applied transforms to confirm depth scaling and the ring tilt.

Every depth response is **exact** (cx≈0.4, cy≈−0.4): node d3.3→14.5px, portrait d0.7→3.08px, card d2.6→11.4px, anchor d1.3→5.7px, tilt→rotate(2deg). Deeper elements move more than the portrait — the correct subtle depth illusion (gain 11px / tilt 5deg, matching the reference). Now verify reset-on-leave restores geometry, and the magnetic CTA.

Node transform is decaying (14.49→10.84 after `mouseleave`) — reset works; it returns to rest (full settle is just slow under throttled rAF), with top/left unchanged. Now the magnetic CTA — this applies directly on `mousemove` (no rAF), so it's testable synchronously.

Magnetic works exactly: pull `translate(8.3px, 4.96px)` for a (60,20) offset (≈ 0.14/0.26 strengths) and snaps back to `translate(0,0)` on leave; the CTA also has `data-cursor` so the Phase-2 cursor grows over it. 

Reduced-motion is gated in code (`enabled = fine && !reduced`, cleanup resets transforms). The hero **floating cards have no hover/cursor reaction in the reference**, so I did not add any (flagging, not inventing).

Let me reload for a clean at-rest state, then confirm the composed hero and geometry across breakpoints.

At rest: stage 466, node at exact geometry (51.25/219 = 11%/47%), parallax neutral `translate3d(0,0,0)`. Screenshot to confirm the composed hero is unchanged at rest.

At rest the hero is visually identical to 3B.2B.1 — parallax only activates on cursor movement. Let me confirm geometry is intact at the smaller breakpoints and the console is clean.

At 390: stage 340, node at 11%, card w120 — geometry identical to 3B.2B.1, console clean. Interaction is purely additive transform; base layout is untouched at every breakpoint. All interactive motion verified. Committing Phase 3B.2B.2.

Phase 3B.2B.2 complete, all interactive motion verified, and committed. Stopping here.

## What was built

**Mouse parallax** (`useMouseParallax`) — one window-level rAF loop (so it responds even over the hero text), smoothing the normalized cursor offset (lerp 0.07) and writing a depth-scaled `translate3d` to every `[data-depth]` element plus `rotate(cx·5deg)` to the ring-tilt group. Ported verbatim from `initHeroOrbit` (gain 11px, tilt 5deg). Depth markers added: nodes (2.0–3.7), portrait (0.7), cards (2.4–2.9), anchor (1.3). Fine-pointer + non-reduced-motion gated; cleanup resets transforms.

**Magnetic CTA** (`useMagnetic`) — the hero primary CTA (the reference's only hero `data-magnetic` element) pulls toward the cursor by `(x·0.14, y·0.26)` on hover, snaps back on leave; the CTA's CSS `transition: transform` smooths it.

**Cursor integration** — already provided by Phase 2's `useCursor`; the hero CTAs carry `data-cursor`, so the ring grows over them (confirmed).

## Verification (measured)
- **Parallax depth responses** (cursor toward upper-right, cx≈0.4/cy≈−0.4) — every value exact:
  - node d3.3 → `translate3d(14.5px, −14.5px)` · portrait d0.7 → `3.08px` · card d2.6 → `11.4px` · anchor d1.3 → `5.7px` · tilt → `rotate(2deg)`. Deeper elements move more than the portrait — the correct subtle depth illusion.
- **Geometry unchanged during interaction** — node stays `top: 11%; left: 47%` (transform is additive); at rest, `translate3d(0,0,0)`.
- **Reset on leave** — transforms decay back toward origin, geometry restored.
- **Magnetic** — pull `translate(8.3px, 4.96px)` for a (60,20) offset, snaps to `translate(0,0)`.
- **Breakpoints** — 1440 (full parallax + geometry intact) and 390 (stage 340, node 11%, card w120) confirmed; 1024/768 geometry untouched (no geometry CSS changed). Console clean at all.

## Motion rules honored
Single compositor-friendly rAF loop (transform-only), fine-pointer gated, **reduced-motion gated** (`enabled = fine && !reduced`, cleanup resets). Note: the preview page runs backgrounded so `requestAnimationFrame` is throttled — I verified correctness by reading the applied inline transforms rather than screenshots (a real, focused browser runs it at 60fps).

## One decision to flag
The task's "Hover Motion — floating card lift/scale/shadow" and "cursor reactions for cards" **are not present in the reference** — the hero floating cards have no hover, no `data-cursor`, and no lift in `support.js`/`style.css`. Per "maintain visual parity" and the "do not invent" discipline, I did **not** add them (that shadow/lift/scale pattern exists on the *project* cards, a later phase). If you'd like card hover added anyway, say the word.

## Commit
`917093d — Phase 3B.2B.2: Orbit interactive motion`

This completes the full Hero + Orbit system (Phase 3). **Awaiting approval before Phase 4 (Journey timeline).**


Before proceeding to Phase 4, I'll audit the rebuilt Hero against the reference. Let me gather evidence rather than rely on memory — first inspecting my rebuild's DOM for specific parity points, then standing up the reference for a side-by-side.

My rebuild confirmed: **0 hero blobs** (reference has 2), dot-grid present, and the **orbit stage renders at opacity 1 with no reveal** (reference gives the portrait/orbit column a `data-hero-anim` entrance). Now let me stand up the reference to compare visually.

The reference renders. Let me screenshot its hero at 1440 to compare visually against my rebuild.

The reference shows a subtle **green ambient glow in the top-left corner** (and amber bottom-right) that my rebuild lacks. Let me confirm the reference's blob elements and the orbit-column reveal attribute as hard evidence.

Confirmed: the reference has both blobs (green −0.06, amber 0.05 scroll-parallax) and the portrait/orbit column carries `data-hero-anim` (entrance reveal). Let me cross-check a few computed typography/layout values on the reference to rule out any other drift.

Now the same values on my rebuild for direct comparison.

My rebuild is **pixel-identical** to the reference on typography (h1 89.6px/87.808px/−2.688px/600), grid columns (636.156/587.234), stage (466), badge (12px mono), and CTA padding (15px 26px). Let me stop the reference server and write the audit.

# Hero Parity Audit — Rebuild vs. Reference

Method: side-by-side of the rebuilt Hero (`localhost:4321`) against the reference (`index.html` served on `localhost:5173`), combining computed-style measurements, DOM inspection, and visual comparison at 1440px, plus the per-breakpoint measurements captured during Phases 3A–3B.2B.2.

## Summary

The Hero is at **near-complete parity**. Layout, typography, colors, spacing, orbit geometry, ambient + interactive motion, floating cards, anchor pill, CTAs, and responsive behavior all match — most to the exact pixel/percentage. Three differences remain, none critical: two are missing reference features (background blobs, orbit entrance reveal), one is a minor cursor detail.

## Verified at parity (no action needed)

| Dimension | Evidence |
|---|---|
| **Layout** | `grid-template-columns` 636.156px / 587.234px — identical (1.04/0.96) |
| **Typography** | h1 89.6px / lh 87.808px / ls −2.688px / 600 — identical; badge 12px JetBrains Mono — identical |
| **Spacing** | CTA padding 15px 26px — identical; section paddings/clamps ported verbatim |
| **Colors** | tokens ported exactly; accent green `#12886A`, amber `#CC8636` verified |
| **Orbit geometry** | stage 466², portrait 23.5/21 w53, 7 nodes at exact %s (Phase 3B.1) |
| **Orbit motion** | ring spin 95/72s, node beat, signal flow, halo breath, mouse parallax depth responses all exact (3B.2A / 3B.2B.2) |
| **Floating cards** | w140/140/140/144, corner offsets, glass/shadow/blur — exact (3B.2B.1) |
| **Anchor pill** | centered, bottom −5%, styling exact |
| **CTA buttons** | dark primary + outlined secondary, hover states, magnetic pull (0.14/0.26) — exact |
| **Responsive** | stage 466/440/340 and card compaction/edge-pull verified at 1440/1280/1024/768/390 |

---

## Differences found

### 1. Missing hero background blobs (green + amber)
- **Description:** The reference renders two `.parallax-blob` elements in the hero — `blob-hero-green` (top −10% / left −6%, `data-parallax="-0.06"`) and `blob-hero-amber` (bottom −12% / right −4%, `data-parallax="0.05"`) — soft radial glows that tint the top-left and bottom-right corners and drift on scroll. The rebuild has **0 blobs** (confirmed via DOM query). Visible in the reference as a green ambient glow behind the headline's top-left; the rebuilt hero's corners read flatter/cooler.
- **Dimension:** Colors / ambient depth (+ scroll motion).
- **Severity:** **Medium** — a genuinely missing visual element, though subtle (0.13–0.14 alpha gradients).
- **Recommended fix:** Add two `ParallaxBlob` elements in `HeroSection` behind the dot-grid, ported from `.blob-hero-green` / `.blob-hero-amber`, and implement the `useScrollParallax` hook (currently a shell) to apply `translateY = viewport-center-offset × factor` (−0.06 / 0.05) via a Framer `useScroll`/`useTransform` binding. This is also the shared blob system reused by Work/Process/Skills/Contact, so it's worth building once now.

### 2. Orbit/portrait column has no entrance reveal
- **Description:** In the reference the entire right column (`.hero-portrait-wrap`) carries `data-hero-anim` (confirmed `true`), so the orbit — portrait, rings, nodes, cards, anchor — fades and rises in (`opacity 0→1`, `translateY 34→0`, 1.1s) as item 7 of the hero mount stagger (~890ms). The rebuild renders the orbit stage at `opacity: 1` immediately (confirmed), so on load the text staggers in but the orbit "pops" fully formed instead of revealing with the sequence.
- **Dimension:** Orbit motion / entrance choreography.
- **Severity:** **Medium** — noticeable during the first ~1s of load; static state is unaffected.
- **Recommended fix:** Wrap the orbit stage in a `motion.div` using `heroReveal(7)` (the index already reserved in the stagger — scroll hint is 8) with `initial="hidden" animate="shown"`, under the existing `MotionConfig reducedMotion="user"`. Caution: the reveal writes `transform` (translateY), which would fight the parallax loop's `transform` on the stage — apply the reveal to a **wrapper** element, not the `.stage` that parallax/children target, to preserve the property-ownership rule.

### 3. Cursor dot does not hide when the ring grows
- **Description:** The reference `initCursor` sets `dot.style.opacity = '0'` on hover over interactive elements (so only the enlarged ring shows). The rebuild's `useCursor` toggles the ring's `data-grown` state but leaves the 7px dot visible, so over a CTA both the grown ring and the dot render.
- **Dimension:** Cursor interaction (CTA hover).
- **Severity:** **Low** — a subtle cursor-chrome detail; I explicitly deferred cursor "polish" in Phase 2.
- **Recommended fix:** In `useCursor`'s `onOver`, also toggle the dot: set `dot.style.opacity = interactive ? '0' : '1'` (the dot already has `transition: opacity .25s`). One line.

---

## Intentional enhancement (not a defect — flagging for awareness)

- **Reduced-motion support:** The rebuild adds `prefers-reduced-motion` handling the reference lacks — global CSS kill-switch, `MotionConfig reducedMotion="user"` on hero reveals, and `enabled` gates on the parallax/magnetic hooks. This is a deliberate a11y improvement, so a reduced-motion user sees a calmer hero than the reference would show. Recommend keeping it. (If strict byte-for-byte reference behavior were ever required, it'd be a difference — but I'd advise against reverting.)

---

## Recommendation

Three fixes, all low-effort: blobs + scroll parallax (#1), orbit entrance reveal (#2), cursor dot hide (#3). #1 and #2 are Medium and worth doing before Phase 4 since #1's blob/scroll-parallax system is shared by later sections. None are blockers. No fixes implemented — awaiting your direction on whether to address these now or fold them into a later pass.