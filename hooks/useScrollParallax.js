'use client';

import { useEffect } from 'react';
import { useMotionValue, useScroll } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

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
export function useScrollParallax(ref, factor = 0.05) {
  const { scrollY } = useScroll();
  const reduced = usePrefersReducedMotion();
  const y = useMotionValue(0);

  useEffect(() => {
    const update = () => {
      const element = ref.current;
      if (!element || reduced) {
        y.set(0);
        return;
      }

      const rect = element.getBoundingClientRect();
      const viewportCenterOffset = rect.top + rect.height / 2 - window.innerHeight / 2;
      y.set(viewportCenterOffset * factor);
    };

    update();
    const unsubscribe = scrollY.on('change', update);
    window.addEventListener('resize', update, { passive: true });

    return () => {
      unsubscribe();
      window.removeEventListener('resize', update);
      y.set(0);
    };
  }, [factor, reduced, ref, scrollY, y]);

  return { y };
}
