'use client';

import { useEffect, useState } from 'react';

/**
 * Reports whether the device has a fine pointer (mouse/trackpad).
 * Gates cursor, magnetic and parallax behaviors — mirrors the original's
 * `matchMedia('(pointer: coarse)')` checks (inverted here to "fine").
 *
 * SSR-safe: starts false so coarse/unknown devices never mount pointer chrome.
 * @returns {boolean}
 */
export function usePointerFine() {
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)');
    const update = () => setFine(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return fine;
}
