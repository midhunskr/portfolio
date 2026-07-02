import styles from './OrbitNode.module.css';
import { cx } from '@/lib/utils';

/**
 * A single orbit node — colored dot + surrounding ring. Positioned by its
 * top-left corner at (top, left) within the stage, exactly as the reference.
 * Ring pulse (nodeBeat) is deferred to Phase 3B.2.
 *
 * @param {Object} props
 * @param {string} props.top
 * @param {string} props.left
 * @param {number} props.size  Dot diameter in px.
 * @param {'green'|'amber'} props.color
 */
export function OrbitNode({ top, left, size, color }) {
  const amber = color === 'amber';
  return (
    <div className={styles.wrap} style={{ top, left }} aria-hidden="true">
      <span className={styles.dotWrap} style={{ width: `${size}px`, height: `${size}px` }}>
        <span className={cx(styles.inner, amber ? styles.innerAmber : styles.innerGreen)} />
        <span className={cx(styles.ring, amber && styles.ringAmber)} />
      </span>
    </div>
  );
}
