'use client';

import { MotionConfig, motion } from 'framer-motion';
import styles from './HeroSection.module.css';
import { HeroIntro } from '@/components/hero/HeroIntro/HeroIntro';
import { OrbitSystem } from '@/components/hero/orbit/OrbitSystem';
import { heroReveal } from '@/lib/motion';

/**
 * Hero section shell — two-column layout (intro + orbit stage), static
 * dot-grid background, and the scroll hint. Phase 3A implements the intro
 * and section chrome; the right column stays the OrbitSystem placeholder
 * (Phase 3B). Parallax blobs are also deferred to 3B.
 *
 * MotionConfig reducedMotion="user" makes every Framer reveal below honor
 * prefers-reduced-motion (transforms drop, opacity remains).
 */
export function HeroSection() {
  return (
    <section id="top" className={styles.hero}>
      <div className={styles.dotGrid} aria-hidden="true" />

      <MotionConfig reducedMotion="user">
        <div className={styles.grid}>
          <HeroIntro />
          <div className={styles.portraitWrap}>
            <OrbitSystem />
          </div>
        </div>

        <div className={styles.scrollHint}>
          <motion.div
            className={styles.scrollHintInner}
            variants={heroReveal(8)}
            initial="hidden"
            animate="shown"
          >
            <span className={styles.scrollLabel}>Scroll</span>
            <span className={styles.scrollWheel}>
              <span className={styles.scrollBob} />
            </span>
          </motion.div>
        </div>
      </MotionConfig>
    </section>
  );
}
