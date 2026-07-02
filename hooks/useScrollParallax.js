'use client';

/**
 * Scroll-linked vertical parallax for decorative blobs: translateY equal to
 * the element's viewport-center offset times a factor (original range
 * -0.06 … 0.05). Built on Framer's useScroll + useTransform.
 *
 * Phase 1: shell only. Logic implemented in Phase 3+.
 * @param {import('react').RefObject<HTMLElement>} ref
 * @param {number} [factor=0.05]
 * @returns {{ y: unknown }} Framer motion value bound to translateY.
 */
export function useScrollParallax(ref, factor) {
  void ref;
  void factor;
  // TODO: useScroll({ target }) + useTransform to translateY.
  return { y: null };
}
