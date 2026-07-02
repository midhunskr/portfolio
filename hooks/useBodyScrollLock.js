'use client';

import { useEffect } from 'react';

/**
 * Locks body scroll while active (modal / mobile drawer open). Restores the
 * previous overflow on release. Mirrors the reference's
 * `document.body.style.overflow = 'hidden'` handling.
 *
 * @param {boolean} locked
 * @returns {void}
 */
export function useBodyScrollLock(locked) {
  useEffect(() => {
    if (!locked) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [locked]);
}
