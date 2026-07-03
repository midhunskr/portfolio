'use client';

import { useEffect, useRef } from 'react';

/**
 * Magnetic pull for a button/link — ported from the reference initMagnetic.
 * While the pointer is over the element it translates toward the cursor by
 * (dx*0.14, dy*0.26); on leave it snaps back to origin. The element's CSS
 * `transition: transform` (already on the hero primary CTA) smooths the motion.
 * Attaches listeners to the element itself, so it only reacts on hover.
 *
 * @param {Object} [options]
 * @param {number} [options.strengthX=0.14]
 * @param {number} [options.strengthY=0.26]
 * @param {boolean} [options.enabled=true] Typically fine-pointer && !reduced-motion.
 * @returns {import('react').RefObject<HTMLElement>} Ref to attach to the target.
 */
export function useMagnetic({ strengthX = 0.14, strengthY = 0.26, enabled = true } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    if (!enabled) return undefined;
    const el = ref.current;
    if (!el) return undefined;

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${(x * strengthX).toFixed(2)}px, ${(y * strengthY).toFixed(2)}px)`;
    };
    const onLeave = () => {
      el.style.transform = 'translate(0, 0)';
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);

    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      el.style.transform = '';
    };
  }, [enabled, strengthX, strengthY]);

  return ref;
}
