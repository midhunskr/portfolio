'use client';

import { motion } from 'framer-motion';
import styles from './HeroIntro.module.css';
import { heroReveal } from '@/lib/motion';

/**
 * Hero intro — the left text column, at visual parity with the reference.
 * Each element reveals on mount with the reference's index-based stagger
 * (heroReveal). Reduced-motion is honored globally via the MotionConfig in
 * HeroSection. The orbit stage (right column) belongs to Phase 3B.
 */
export function HeroIntro() {
  return (
    <div className={styles.intro}>
      <motion.div
        className={styles.badge}
        variants={heroReveal(0)}
        initial="hidden"
        animate="shown"
      >
        <span className={styles.badgeDotWrap}>
          <span className={styles.badgeDot} />
          <span className={styles.badgeDotPulse} />
        </span>
        <span className={styles.badgeText}>
          Available for freelance &amp; full-time · Kerala, India
        </span>
      </motion.div>

      <h1 className={styles.h1}>
        <motion.span
          className={styles.h1Line}
          variants={heroReveal(1)}
          initial="hidden"
          animate="shown"
        >
          Hi, I&apos;m Midhun.
        </motion.span>
        <motion.span
          className={styles.h1Line}
          variants={heroReveal(2)}
          initial="hidden"
          animate="shown"
        >
          I <span className="accent-green">design</span>,{' '}
          <span className="accent-green">build</span>
        </motion.span>
        <motion.span
          className={styles.h1Line}
          variants={heroReveal(3)}
          initial="hidden"
          animate="shown"
        >
          &amp; <span className="accent-amber">automate</span> products.
        </motion.span>
      </h1>

      <motion.p
        className={styles.para}
        variants={heroReveal(4)}
        initial="hidden"
        animate="shown"
      >
        From the first idea to the launched product — one person across UX design,
        frontend development and AI-powered automation. I turn concepts into
        experiences people actually enjoy using.
      </motion.p>

      <motion.div
        className={styles.ctaRow}
        variants={heroReveal(5)}
        initial="hidden"
        animate="shown"
      >
        <a href="#work" data-cursor className={styles.ctaPrimary}>
          View selected work <span className={styles.ctaArrow}>→</span>
        </a>
        <a href="#contact" data-cursor className={styles.ctaSecondary}>
          Start a conversation
        </a>
      </motion.div>

      <motion.div
        className={styles.statsRow}
        variants={heroReveal(6)}
        initial="hidden"
        animate="shown"
      >
        <div>
          <div className={styles.statValue}>3-in-1</div>
          <div className={styles.statLabel}>Design · Dev · AI</div>
        </div>
        <div className={styles.statDivider} />
        <div>
          <div className={styles.statValue}>End-to-end</div>
          <div className={styles.statLabel}>Idea → Launch</div>
        </div>
        <div className={styles.statDivider} />
        <div>
          <div className={styles.statValue}>18+</div>
          <div className={styles.statLabel}>Tools &amp; tech</div>
        </div>
      </motion.div>
    </div>
  );
}
