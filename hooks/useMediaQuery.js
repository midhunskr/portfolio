'use client';

import { useEffect, useState } from 'react';

/**
 * Subscribe to a media query, returning its current match state.
 * Used for the modal's ≤640px bottom-sheet switch so React state and CSS
 * cannot desync (replaces `window.innerWidth` reads).
 *
 * SSR-safe: starts false, resolves on mount.
 * @param {string} query e.g. '(max-width: 640px)'
 * @returns {boolean}
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [query]);

  return matches;
}
