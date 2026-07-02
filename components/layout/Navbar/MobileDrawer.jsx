'use client';

import { AnimatePresence, motion } from 'framer-motion';
import styles from './MobileDrawer.module.css';
import { EASE } from '@/lib/motion';
import { cx } from '@/lib/utils';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';

/**
 * Full-screen mobile navigation drawer. Fades in/out (opacity, 0.35s
 * signature easing) via AnimatePresence — matching the reference drawer
 * transition. Mount/unmount replaces the reference's opacity + pointer-events
 * toggle. Body scroll is locked while open.
 *
 * @param {Object} props
 * @param {boolean} props.open
 * @param {import('@/data/site').NavLink[]} props.links
 * @param {() => void} props.onClose
 */
export function MobileDrawer({ open, links, onClose }) {
  useBodyScrollLock(open);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-nav"
          className={styles.drawer}
          role="dialog"
          aria-label="Mobile navigation"
          aria-modal="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={cx(link.cta ? styles.cta : styles.link)}
            >
              {link.label}
            </a>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
