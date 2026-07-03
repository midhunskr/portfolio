'use client';

import { useEffect } from 'react';
import { lerp, clamp } from '@/lib/utils';

/**
 * Mouse parallax for the orbit stage — a single rAF loop that smooths the
 * normalized cursor offset (window-level, so it responds even over the hero
 * text) and writes a depth-scaled translate to every `[data-depth]` element,
 * plus a small rotation to the `[data-orbit-tilt]` ring group. Ported from the
 * reference initHeroOrbit (lerp 0.07, gain 11px, tilt 5deg).
 *
 * Imperative on purpose (per the approved motion strategy): one loop writing
 * compositor-friendly transforms to many elements, rather than plumbing motion
 * values through five component files. Elements are positioned via top/left, so
 * these transforms are a purely visual offset — geometry is never altered, and
 * at rest (or on cleanup) the transform resets to none.
 *
 * @param {import('react').RefObject<HTMLElement>} stageRef
 * @param {Object} [options]
 * @param {boolean} [options.enabled=true] Typically fine-pointer && !reduced-motion.
 * @param {number} [options.smoothing=0.07]
 * @param {number} [options.gain=11]
 * @param {number} [options.tiltGain=5]
 * @returns {void}
 */
export function useMouseParallax(
  stageRef,
  { enabled = true, smoothing = 0.07, gain = 11, tiltGain = 5 } = {}
) {
  useEffect(() => {
    if (!enabled) return undefined;
    const stage = stageRef.current;
    if (!stage) return undefined;

    const targets = [...stage.querySelectorAll('[data-depth]')].map((el) => ({
      el,
      depth: parseFloat(el.dataset.depth) || 1,
    }));
    const tilt = stage.querySelector('[data-orbit-tilt]');

    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let raf = 0;

    const onMove = (e) => {
      const r = stage.getBoundingClientRect();
      tx = clamp((e.clientX - (r.left + r.width / 2)) / r.width, -1, 1);
      ty = clamp((e.clientY - (r.top + r.height / 2)) / r.height, -1, 1);
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
    };

    const loop = () => {
      cx = lerp(cx, tx, smoothing);
      cy = lerp(cy, ty, smoothing);
      for (const t of targets) {
        t.el.style.transform = `translate3d(${(cx * t.depth * gain).toFixed(2)}px, ${(
          cy * t.depth * gain
        ).toFixed(2)}px, 0)`;
      }
      if (tilt) tilt.style.transform = `rotate(${(cx * tiltGain).toFixed(2)}deg)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    stage.addEventListener('mouseleave', onLeave);
    loop();

    return () => {
      window.removeEventListener('mousemove', onMove);
      stage.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
      // Reset so no residual offset remains if parallax is disabled.
      for (const t of targets) t.el.style.transform = '';
      if (tilt) tilt.style.transform = '';
    };
  }, [stageRef, enabled, smoothing, gain, tiltGain]);
}
