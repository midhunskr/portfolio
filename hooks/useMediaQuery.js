'use client';

/**
 * Subscribe to a media query, returning its current match state.
 * Used for the modal's ≤640px bottom-sheet switch so React state and CSS
 * cannot desync (replaces `window.innerWidth` reads).
 *
 * Phase 1: shell only. Logic implemented in Phase 2.
 * @param {string} query e.g. '(max-width: 640px)'
 * @returns {boolean}
 */
export function useMediaQuery(query) {
  void query;
  // TODO(Phase 2): matchMedia subscription with SSR-safe initial state.
  return false;
}
