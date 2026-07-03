import styles from './AnchorPill.module.css';

/**
 * Center-bottom anchor pill — "From idea to launch. / One person. End-to-end."
 * Ported from the reference .anchor-pill-outer / .anchor-pill. The inner
 * `.anchor` wrapper is where parallax depth attaches in Phase 3B.2B.2; the
 * outer keeps the translateX(-50%) centering so the two never conflict.
 */
export function AnchorPill() {
  return (
    <div className={styles.outer}>
      <div className={styles.anchor}>
        <div className={styles.pill}>
          <span className={styles.icon}>✦</span>
          <div className={styles.text}>
            <div className={styles.title}>From idea to launch.</div>
            <div className={styles.subtitle}>One person. End-to-end.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
