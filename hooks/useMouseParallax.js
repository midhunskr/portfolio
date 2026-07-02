'use client';

/**
 * Single rAF loop producing smoothed, normalized cursor offset (motion
 * values cx, cy) for a stage element. Children derive their own offset by
 * multiplying by a depth factor. Powers the orbit hero and the constellation
 * drift. Lerp factor and gains are configurable to match the originals
 * (orbit: lerp 0.07, gain 11, tilt 5; constellation: lerp 0.06, gain 9).
 *
 * Phase 1: shell only. Logic implemented in Phase 3.
 * @param {import('react').RefObject<HTMLElement>} stageRef
 * @param {Object} [options]
 * @param {number} [options.lerp=0.07]
 * @param {boolean} [options.enabled=true]
 * @returns {{ cx: unknown, cy: unknown }} Framer motion values.
 */
export function useMouseParallax(stageRef, options) {
  void stageRef;
  void options;
  // TODO(Phase 3): window mousemove -> normalized target -> rAF lerp motion values.
  return { cx: null, cy: null };
}
