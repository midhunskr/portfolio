import styles from './Monogram.module.css';

/**
 * Personal brand mark — a single continuous geometric construction that
 * subtly reads as "MS" without typing either letter. Built from three
 * flat bars (top / diagonal connector / bottom), one stroke width, no
 * SVG. Purely decorative — the full name sits beside it in the Navbar,
 * so this is `aria-hidden`.
 */
export function Monogram() {
  return (
    <span className={styles.mark} aria-hidden="true">
      <span className={styles.connector} />
    </span>
  );
}
