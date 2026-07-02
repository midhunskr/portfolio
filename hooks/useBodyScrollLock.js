'use client';

/**
 * Locks body scroll while active (modal / mobile drawer open). Restores the
 * previous overflow on release.
 *
 * Phase 1: shell only. Logic implemented in Phase 2/5.
 * @param {boolean} locked
 * @returns {void}
 */
export function useBodyScrollLock(locked) {
  void locked;
  // TODO: toggle document.body.style.overflow with cleanup.
}
