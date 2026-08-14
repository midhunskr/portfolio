import styles from './BrandMark.module.css';

/**
 * Brand mark — a constructed "MS" lockup.
 *
 * Both letters are built from flat bars at one shared stroke width:
 * the M from two full-height legs joined by a shallow V, the S from
 * a top bar, a diagonal, and a bottom bar forming one zigzag. No
 * font, no SVG, no assets — every stroke is a styled span or a
 * pseudo-element.
 *
 * Purely decorative — the full name sits beside it in the Navbar, so
 * this is `aria-hidden`.
 */
export function BrandMark() {
  return (
    <span className={styles.mark} aria-hidden="true">
      <span className={styles.m}>
        <span className={styles.mLeft} />
        <span className={styles.mRight} />
      </span>
      <span className={styles.s}>
        <span className={styles.sConnector} />
      </span>
    </span>
  );
}
