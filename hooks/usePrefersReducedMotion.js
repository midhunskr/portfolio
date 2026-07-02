'use client';

import { useEffect, useState } from 'react';

/**
 * Reports the user's reduced-motion preference. Gates ambient loops and
 * parallax in JS (the CSS kill-switch lives in styles/animations.css).
 *
 * SSR-safe: starts false.
 * @returns {boolean}
 */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return reduced;
}
