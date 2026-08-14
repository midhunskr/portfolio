'use client';

import { motion } from 'framer-motion';
import styles from './LegalPage.module.css';
import { Navbar } from '@/components/layout/Navbar/Navbar';
import { Footer } from '@/components/layout/Footer/Footer';
import { Eyebrow } from '@/components/ui/Eyebrow/Eyebrow';
import { revealVariants, REVEAL_VIEWPORT } from '@/lib/motion';

/**
 * Shared shell for standalone content pages (/privacy, /terms) — same
 * Navbar/Footer as the homepage, same header-reveal pattern used by
 * every homepage section, so these read as portfolio pages rather than
 * a separate "legal" template. Content itself is passed as `children`
 * from each page's server component, so the long-form text stays
 * server-rendered even though this shell is a client component (same
 * pattern ContactSection already uses).
 *
 * @param {Object} props
 * @param {string} props.eyebrowNumber
 * @param {string} props.eyebrowLabel
 * @param {string} props.title
 * @param {string} props.lastUpdated
 * @param {import('react').ReactNode} props.children
 */
export function LegalPage({ eyebrowNumber, eyebrowLabel, title, lastUpdated, children }) {
  return (
    <div className={styles.root}>
      <Navbar />
      <main>
        <section className={styles.section}>
          <div className={styles.container}>
            <motion.div
              variants={revealVariants('up')}
              initial="hidden"
              whileInView="shown"
              viewport={REVEAL_VIEWPORT}
            >
              <Eyebrow number={eyebrowNumber} label={eyebrowLabel} />
              <h1 className={styles.title}>{title}</h1>
              <p className={styles.lastUpdated}>Last updated {lastUpdated}</p>
            </motion.div>

            <div className={styles.prose}>{children}</div>
          </div>

          <Footer />
        </section>
      </main>
    </div>
  );
}
