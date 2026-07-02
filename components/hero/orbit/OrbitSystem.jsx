'use client';

import styles from './OrbitSystem.module.css';

/**
 * Orbit system shell (Phase 1 placeholder).
 * Marked a client component up front since Phase 3 owns the parallax rAF
 * engine. Real rings, nodes, portrait, floating cards and anchor pill land
 * in Phase 3.
 */
export function OrbitSystem() {
  return (
    <div className={styles.placeholder} aria-hidden="true">
      OrbitSystem
    </div>
  );
}
