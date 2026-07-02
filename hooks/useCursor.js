'use client';

/**
 * Drives the custom cursor: an instant dot and a lagging ring that grows /
 * tints over interactive elements. rAF lerp (ring factor 0.18); disabled on
 * coarse pointers. Uses event delegation (closest('a,button,[data-cursor]'))
 * rather than per-element listeners.
 *
 * Phase 1: shell only. Logic implemented in Phase 2.
 * @param {Object} refs
 * @param {import('react').RefObject<HTMLElement>} refs.dotRef
 * @param {import('react').RefObject<HTMLElement>} refs.ringRef
 * @returns {void}
 */
export function useCursor(refs) {
  void refs;
  // TODO(Phase 2): mousemove + rAF ring lerp + hover grow/shrink delegation.
}
