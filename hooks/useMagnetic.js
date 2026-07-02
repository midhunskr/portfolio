'use client';

/**
 * Magnetic pull for a button/link: translate by (dx*0.14, dy*0.26) toward the
 * cursor while hovered, snap back on leave. Fine-pointer only.
 *
 * Phase 1: shell only. Logic implemented in Phase 5/8 (hero + contact CTAs).
 * @param {Object} [options]
 * @param {number} [options.strengthX=0.14]
 * @param {number} [options.strengthY=0.26]
 * @returns {{ ref: import('react').RefObject<HTMLElement> }}
 */
export function useMagnetic(options) {
  void options;
  // TODO: mousemove translate + spring release, returns a ref to attach.
  return { ref: { current: null } };
}
