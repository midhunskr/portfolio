'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import styles from './Navbar.module.css';
import { MobileDrawer } from './MobileDrawer';
import { cx } from '@/lib/utils';
import { site } from '@/data/site';

/**
 * Global navigation, at visual parity with the reference.
 *  - scroll-aware condensed state (scrollY > 40) via Framer's useScroll;
 *    the visual condense (background / blur / shadow / padding) is a CSS
 *    transition on non-transform properties, per the approved property-
 *    ownership rule (Framer only reads the scroll position here).
 *  - active section indication via IntersectionObserver scroll-spy.
 *  - mobile drawer + hamburger morph below 880px.
 *  - off the homepage (e.g. /privacy, /terms, 404), section anchors
 *    don't exist on the current page — nav hrefs are prefixed with
 *    "/" so they navigate back to the homepage and land on the right
 *    anchor there, instead of silently doing nothing.
 */
export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  const [condensed, setCondensed] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState('');

  const navLinks = isHome
    ? site.nav
    : site.nav.map((link) => ({ ...link, href: `/${link.href}` }));
  const logoHref = isHome ? '#top' : '/';

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (v) => setCondensed(v > 40));
  useEffect(() => {
    setCondensed(window.scrollY > 40);
  }, []);

  // Scroll-spy: highlight the nav link whose section is in the upper
  // viewport. Only meaningful on the homepage — off it, none of these
  // ids exist on the page, so skip setting up the observer entirely.
  useEffect(() => {
    if (!isHome) return undefined;
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
  }, [isHome]);

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
        <a href={logoHref} data-cursor className={styles.logoLink} aria-label="Back to top">
          <span className={styles.logoBadge}>MS</span>
          <span className={styles.logoName}>{site.name}</span>
        </a>

        <div className={styles.navLinks} role="list">
          {navLinks.map((link) =>
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
                aria-current={activeId === link.href.split('#')[1] ? 'true' : undefined}
                className={cx(
                  styles.navLink,
                  activeId === link.href.split('#')[1] && styles.navLinkActive
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

      <MobileDrawer open={open} links={navLinks} onClose={() => setOpen(false)} />
    </>
  );
}
