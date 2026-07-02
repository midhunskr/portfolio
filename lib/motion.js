/**
 * Motion foundation — shared Framer Motion constants, variants and presets.
 *
 * This is the single source of truth for motion values on the JS side.
 * Its CSS counterpart is styles/tokens.css (--ease-signature, --dur-*).
 * Keep the two in sync.
 *
 * Phase 1: definitions only. Nothing here is wired to a section yet.
 * Values ported verbatim from the approved motion architecture.
 */

/* ── Easing ───────────────────────────────────────────── */
/** The signature easing used for essentially every meaningful move. */
export const EASE = [0.16, 1, 0.3, 1];
/** Ease-out cubic — used by the count-up animation. */
export const EASE_OUT_CUBIC = [0.33, 1, 0.68, 1];

/* ── Durations (seconds) ──────────────────────────────── */
export const DUR = {
  micro: 0.3,
  standard: 0.45,
  accordion: 0.7,
  reveal: 1,
  hero: 1.1,
  pathFill: 1.9,
};

/* ── Stagger recipes (seconds) ────────────────────────── */
/** Delays expressed in seconds to match Framer's time unit.
 *  Original values were ms: hero 110/120, steps 125/130, stages 340/300. */
export const STAGGER = {
  hero: { children: 0.11, delay: 0.12 },
  projectSteps: { children: 0.125, delay: 0.13 },
  contactStages: { children: 0.34, delay: 0.3 },
};

/* ── Reveal presets ───────────────────────────────────── */
/** Initial offset per reveal direction (mirrors [data-reveal="…"]). */
const REVEAL_OFFSET = {
  up: { y: 40 },
  left: { x: -38 },
  right: { x: 38 },
  scale: { scale: 0.94 },
};

/**
 * Build a reveal variant pair for a given direction and optional delay.
 * @param {'up'|'left'|'right'|'scale'} [direction='up']
 * @param {number} [delay=0] seconds
 * @returns {import('framer-motion').Variants}
 */
export function revealVariants(direction = 'up', delay = 0) {
  const offset = REVEAL_OFFSET[direction] ?? REVEAL_OFFSET.up;
  return {
    hidden: { opacity: 0, ...offset },
    shown: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: { duration: DUR.reveal, ease: EASE, delay },
    },
  };
}

/** Shared viewport config for scroll reveals (mirrors the IO thresholds). */
export const REVEAL_VIEWPORT = {
  once: true,
  amount: 0.12,
  margin: '0px 0px -7% 0px',
};

/* ── Hero mount stagger ───────────────────────────────── */
/** @type {import('framer-motion').Variants} */
export const heroContainer = {
  hidden: {},
  shown: {
    transition: {
      staggerChildren: STAGGER.hero.children,
      delayChildren: STAGGER.hero.delay,
    },
  },
};

/** @type {import('framer-motion').Variants} */
export const heroItem = {
  hidden: { opacity: 0, y: 34 },
  shown: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.hero, ease: EASE },
  },
};

/* ── Project step stagger ─────────────────────────────── */
/** @type {import('framer-motion').Variants} */
export const stepContainer = {
  hidden: {},
  shown: {
    transition: {
      staggerChildren: STAGGER.projectSteps.children,
      delayChildren: STAGGER.projectSteps.delay,
    },
  },
};

/** @type {import('framer-motion').Variants} */
export const stepItem = {
  hidden: { opacity: 0, y: 16 },
  shown: { opacity: 1, y: 0, transition: { duration: DUR.accordion, ease: EASE } },
};

/* ── Modal variants ───────────────────────────────────── */
/** @type {import('framer-motion').Variants} */
export const modalOverlay = {
  hidden: { opacity: 0 },
  shown: { opacity: 1, transition: { duration: 0.38, ease: EASE } },
  exit: { opacity: 0, transition: { duration: 0.3, ease: EASE } },
};

/** Desktop panel: scale + rise. */
/** @type {import('framer-motion').Variants} */
export const modalPanel = {
  hidden: { scale: 0.94, y: 18, opacity: 0 },
  shown: { scale: 1, y: 0, opacity: 1, transition: { duration: 0.52, ease: EASE } },
  exit: { scale: 0.94, y: 18, opacity: 0, transition: { duration: 0.3, ease: EASE } },
};

/** Mobile bottom-sheet panel: slide up. */
/** @type {import('framer-motion').Variants} */
export const modalPanelMobile = {
  hidden: { y: 48, opacity: 0 },
  shown: { y: 0, opacity: 1, transition: { duration: 0.52, ease: EASE } },
  exit: { y: 48, opacity: 0, transition: { duration: 0.3, ease: EASE } },
};

/* ── Tab / filter crossfade ───────────────────────────── */
/** @type {import('framer-motion').Variants} */
export const panelFade = {
  hidden: { opacity: 0 },
  shown: { opacity: 1, transition: { duration: 0.35, ease: 'easeInOut' } },
  exit: { opacity: 0, transition: { duration: 0.35, ease: 'easeInOut' } },
};
