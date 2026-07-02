'use client';

/**
 * Reports whether the device has a fine pointer (mouse/trackpad).
 * Gates cursor, magnetic and parallax behaviors — mirrors the original's
 * `matchMedia('(pointer: coarse)')` checks.
 *
 * Phase 1: shell only. Logic implemented in Phase 2.
 * @returns {boolean}
 */
export function usePointerFine() {
  // TODO(Phase 2): matchMedia('(pointer: fine)') with subscription.
  return false;
}
