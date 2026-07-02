'use client';

/**
 * Reports the user's reduced-motion preference. Gates ambient loops and
 * parallax in JS (the CSS kill-switch lives in styles/animations.css).
 *
 * Phase 1: shell only. Logic implemented in Phase 2.
 * @returns {boolean}
 */
export function usePrefersReducedMotion() {
  // TODO(Phase 2): matchMedia('(prefers-reduced-motion: reduce)').
  return false;
}
