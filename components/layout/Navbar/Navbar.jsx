'use client';

import { useEffect, useState } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import styles from './Navbar.module.css';
import { MobileDrawer } from './MobileDrawer';
import { cx } from '@/lib/utils';
import { site } from '@/data/site';
import { BrandMark } from '@/components/ui/BrandMark/BrandMark';

/**
 * Global navigation, at visual parity with the reference.
 *  - scroll-aware condensed state (scrollY > 40) via Framer's useScroll;
 *    the visual condense (background / blur / shadow / padding) is a CSS
 *    transition on non-transform properties, per the approved property-
 *    ownership rule (Framer only reads the scroll position here).
 *  - active section indication via IntersectionObserver scroll-spy.
 *  - mobile drawer + hamburger morph below 880px.
 */
export function Navbar() {
  const [condensed, setCondensed] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState('');

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (v) => setCondensed(v > 40));
  useEffect(() => {
    setCondensed(window.scrollY > 40);
  }, []);

  // Scroll-spy: highlight the nav link whose section is in the upper viewport.
  useEffect(() => {
    const ids = site.nav
      .filter((l) => !l.cta && l.href.startsWith('#'))
      .map((l) => l.href.slice(1));
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((el) => el !== null);
    if (!targets.length) return undefined;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  // Escape closes the mobile drawer.
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <nav
        className={styles.navBar}
        data-condensed={condensed}
        role="navigation"
        aria-label="Main navigation"
      >
        <a href="#top" data-cursor className={styles.logoLink} aria-label="Back to top">
          <span className={styles.logoBadge}>
            <BrandMark />
          </span>
          <span className={styles.logoName}>{site.name}</span>
        </a>

        <div className={styles.navLinks} role="list">
          {site.nav.map((link) =>
            link.cta ? (
              <a
                key={link.href}
                href={link.href}
                data-cursor
                className={styles.navCta}
                role="listitem"
              >
                {link.label}
              </a>
            ) : (
              <a
                key={link.href}
                href={link.href}
                data-cursor
                role="listitem"
                aria-current={activeId === link.href.slice(1) ? 'true' : undefined}
                className={cx(
                  styles.navLink,
                  activeId === link.href.slice(1) && styles.navLinkActive
                )}
              >
                {link.label}
              </a>
            )
          )}
        </div>

        <button
          type="button"
          className={cx(styles.hamburger, open && styles.hamburgerOpen)}
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={styles.bar} />
        </button>
      </nav>

      <MobileDrawer open={open} links={site.nav} onClose={() => setOpen(false)} />
    </>
  );
}
