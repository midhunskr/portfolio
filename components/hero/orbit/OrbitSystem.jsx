'use client';

import { useRef } from 'react';
import styles from './OrbitSystem.module.css';
import { OrbitRings } from './OrbitRings';
import { OrbitNode } from './OrbitNode';
import { PortraitFrame } from './PortraitFrame';
import { FloatingCards } from './FloatingCards';
import { AnchorPill } from './AnchorPill';
import { orbitNodes } from './orbitConfig';
import { useMouseParallax } from '@/hooks/useMouseParallax';
import { usePointerFine } from '@/hooks/usePointerFine';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

/**
 * Orbit stage — composition, layering and ambient motion.
 * Layers, back to front (matching the reference z-index order):
 *   halos (glow) → rings + connection lines (z1) → nodes (z2) →
 *   portrait (z3) → floating cards (z4) → anchor pill (z5).
 * Mouse parallax, hover, cursor reactions and magnetic behavior belong to
 * Phase 3B.2B.2.
 */
export function OrbitSystem() {
  const stageRef = useRef(null);
  const fine = usePointerFine();
  const reduced = usePrefersReducedMotion();
  useMouseParallax(stageRef, { enabled: fine && !reduced });

  return (
    <div className={styles.stage} ref={stageRef}>
      <div
        className={styles.haloGreen}
        style={{ animation: 'haloBreath 8s ease-in-out infinite' }}
        aria-hidden="true"
      />
      <div className={styles.haloAmber} aria-hidden="true" />

      <OrbitRings />

      {orbitNodes.map((node) => (
        <OrbitNode key={`${node.top}-${node.left}`} {...node} />
      ))}

      <PortraitFrame />

      <FloatingCards />
      <AnchorPill />
    </div>
  );
}
