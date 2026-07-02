'use client';

import { useEffect } from 'react';
import { lerp } from '@/lib/utils';

/**
 * Cursor infrastructure: an instant dot and a lagging ring that grows over
 * interactive elements. Ported from the reference initCursor —
 *   - dot follows the pointer directly
 *   - ring eases toward it (lerp factor 0.18) in a single rAF loop
 *   - grow/shrink uses event delegation on `mouseover`
 *     (closest('a,button,[data-cursor]')) instead of per-element listeners
 *
 * Visual state is expressed via a `data-grown` attribute on the ring; the
 * component's CSS Module owns the appearance. Detailed polish is deferred to
 * a later phase — this only wires the behavior.
 *
 * @param {Object} params
 * @param {import('react').RefObject<HTMLElement>} params.dotRef
 * @param {import('react').RefObject<HTMLElement>} params.ringRef
 * @param {boolean} [params.enabled=true] Typically the usePointerFine result.
 * @returns {void}
 */
export function useCursor({ dotRef, ringRef, enabled = true }) {
  useEffect(() => {
    if (!enabled) return undefined;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return undefined;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px)`;
    };

    const loop = () => {
      rx = lerp(rx, mx, 0.18);
      ry = lerp(ry, my, 0.18);
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(loop);
    };

    const onOver = (e) => {
      const target = /** @type {Element} */ (e.target);
      const interactive =
        target && target.closest && target.closest('a, button, [data-cursor]');
      if (interactive) ring.setAttribute('data-grown', '');
      else ring.removeAttribute('data-grown');
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver);
    loop();

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(raf);
    };
  }, [dotRef, ringRef, enabled]);
}
