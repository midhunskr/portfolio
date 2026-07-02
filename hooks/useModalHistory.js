'use client';

/**
 * Mobile back-button contract for the showcase modal: on open (≤640px) push a
 * '#sc-modal' history entry; close on popstate; replaceState on programmatic
 * close. Replaces the original's imperative history/popstate handling.
 *
 * Phase 1: shell only. Logic implemented in Phase 5.
 * @param {Object} params
 * @param {boolean} params.open
 * @param {boolean} params.isMobile
 * @param {() => void} params.onClose
 * @returns {void}
 */
export function useModalHistory(params) {
  void params;
  // TODO(Phase 5): pushState on open, popstate -> onClose, replaceState on close.
}
