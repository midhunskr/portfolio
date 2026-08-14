import styles from './BrandMark.module.css';

/**
 * Brand mark — "The Open Loop".
 *
 * A single thin ring, broken once on the upper-right diagonal, with a
 * solid node at its centre. Built from two pseudo-elements on one span:
 * no SVG, no assets, no child markup.
 *
 * Purely decorative — the full name sits beside it in the Navbar, so
 * this is `aria-hidden`.
 */
export function BrandMark() {
  return <span className={styles.mark} aria-hidden="true" />;
}
