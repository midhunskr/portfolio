'use client';

import { useRef } from 'react';
import styles from './CursorFollower.module.css';
import { useCursor } from '@/hooks/useCursor';
import { usePointerFine } from '@/hooks/usePointerFine';

/**
 * Global cursor chrome — dot + lagging ring. Fine-pointer only.
 * Phase 2 wires the infrastructure (movement, ring lerp, grow-on-hover);
 * base styling matches the reference, further polish is deferred.
 */
export function CursorFollower() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const fine = usePointerFine();

  // Hook runs unconditionally; it no-ops until enabled + refs exist.
  useCursor({ dotRef, ringRef, enabled: fine });

  if (!fine) return null;

  return (
    <>
      <div ref={dotRef} className={styles.dot} aria-hidden="true" />
      <div ref={ringRef} className={styles.ring} aria-hidden="true" />
    </>
  );
}
