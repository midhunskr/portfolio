import styles from './Footer.module.css';
import { site } from '@/data/site';
import { SocialLinks } from './SocialLinks';

/**
 * Site-wide footer — social row, tagline, legal links, copyright.
 * Rendered at the end of the homepage (inside ContactSection) and at
 * the end of every standalone page (e.g. /privacy, /terms) so there is
 * exactly one footer design across the site, not a separate one for
 * legal pages.
 */
export function Footer() {
  return (
    <div className={styles.footerBar}>
      <SocialLinks />
      <div className={styles.footerMeta}>
        <span className={styles.footerTagline}>
          Design · Development · Automation
        </span>
        <div className={styles.footerLegal}>
          <a href="/privacy" className={styles.footerLink}>
            Privacy
          </a>
          <a href="/terms" className={styles.footerLink}>
            Terms
          </a>
        </div>
        <span className={styles.footerCopy}>
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </span>
      </div>
    </div>
  );
}
