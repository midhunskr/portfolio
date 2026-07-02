'use client';

import styles from './OrbitSystem.module.css';
import { OrbitRings } from './OrbitRings';
import { OrbitNode } from './OrbitNode';
import { PortraitFrame } from './PortraitFrame';
import { orbitNodes } from './orbitConfig';

/**
 * Orbit stage — geometry and layering only (Phase 3B.1).
 * Layers, back to front (matching the reference z-index order):
 *   halos (glow) → rings + connection lines (z1) → nodes (z2) → portrait (z3).
 * Floating cards, anchor pill, signals, parallax, hover and ambient motion
 * all belong to Phase 3B.2.
 */
export function OrbitSystem() {
  return (
    <div className={styles.stage}>
      <div className={styles.haloGreen} aria-hidden="true" />
      <div className={styles.haloAmber} aria-hidden="true" />

      <OrbitRings />

      {orbitNodes.map((node) => (
        <OrbitNode key={`${node.top}-${node.left}`} {...node} />
      ))}

      <PortraitFrame />
    </div>
  );
}
