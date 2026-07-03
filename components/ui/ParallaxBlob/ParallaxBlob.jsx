'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useScrollParallax } from '@/hooks/useScrollParallax';
import styles from './ParallaxBlob.module.css';

/**
 * Reusable decorative blob with scroll-linked vertical parallax.
 * Position, dimensions and color are supplied by the consuming section.
 *
 * @param {Object} props
 * @param {string} [props.className]
 * @param {number} [props.factor=0.05]
 */
export function ParallaxBlob({ className = '', factor = 0.05 }) {
  const ref = useRef(null);
  const { y } = useScrollParallax(ref, factor);

  return (
    <motion.div
      ref={ref}
      className={`${styles.blob} ${className}`}
      style={{ y }}
      aria-hidden="true"
    />
  );
}
