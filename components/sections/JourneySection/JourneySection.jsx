'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './JourneySection.module.css';
import { journeySteps } from '@/data/journey';
import { revealVariants, REVEAL_VIEWPORT } from '@/lib/motion';
import { Eyebrow } from '@/components/ui/Eyebrow/Eyebrow';

const EYEBROW_TONE = {
  green: 'green',
  amber: 'amber',
  light: 'bright',
};

const NODE_VARIANT = {
  first: styles.nodeFirst,
  mid: styles.node,
  last: styles.nodeLast,
};

/**
 * Journey timeline — 5 alternating milestone cards on a vertical track.
 * Phase 4B adds: scroll-linked fill line + per-row scroll reveals.
 *
 * Fill formula (ported from reference initJourney):
 *   progress = clamp(0, 1, (vh*0.6 - rect.top) / (rect.height * 0.8))
 * Implemented via useScroll + useTransform rather than a raw rAF loop.
 */
export function JourneySection() {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);

  // Tracked against .timelineWrap, not the whole section — the section
  // also contains the header (eyebrow/h2/para) above the timeline, so
  // measuring against it meant the fill's 0%/100% points didn't line
  // up with the actual first/last node.
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.6', 'end 0.2'],
  });

  const fillHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="journey" className={styles.section} ref={sectionRef}>
      <div className={styles.container}>
        {/* Section header — reveals on scroll */}
        <motion.div
          className={styles.header}
          variants={revealVariants('up')}
          initial="hidden"
          whileInView="shown"
          viewport={REVEAL_VIEWPORT}
        >
          <Eyebrow number="01" label="The Journey" />
          <h2 className={styles.h2}>
            From <span className="accent-green">curiosity</span> to building{' '}
            <span className="accent-amber">whole products.</span>
          </h2>
          <p className={styles.para}>
            Each stage didn&apos;t replace the last — it stacked on top of it.
            That&apos;s how one person ended up owning the entire arc.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className={styles.timelineWrap} ref={timelineRef}>
          <div className={styles.track} />
          <motion.div className={styles.fill} style={{ height: fillHeight }} />

          <div className={styles.steps}>
            {journeySteps.map((step, i) => (
              <motion.div
                key={i}
                className={styles.row}
                variants={revealVariants('up')}
                initial="hidden"
                whileInView="shown"
                viewport={REVEAL_VIEWPORT}
              >
                {step.side === 'left' ? (
                  <>
                    <div className={styles.leftPane}>
                      <JourneyCard step={step} />
                    </div>
                    <span className={NODE_VARIANT[step.node]} />
                    <div className={styles.spacer} />
                  </>
                ) : (
                  <>
                    <div className={styles.spacer} />
                    <span className={NODE_VARIANT[step.node]} />
                    <div className={styles.rightPane}>
                      <JourneyCard step={step} />
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * @param {{ step: import('@/data/journey').JourneyStep }} props
 */
function JourneyCard({ step }) {
  const cardClass = step.dark ? styles.cardDark : styles.card;
  return (
    <div className={cardClass}>
      <Eyebrow label={step.eyebrow} variant="journeyCard" tone={EYEBROW_TONE[step.tone]} />
      <div className={step.titleLg ? styles.cardTitleLg : styles.cardTitle}>
        {step.title}
      </div>
      <p className={step.dark ? styles.cardParaDark : styles.cardPara}>
        {step.body}
      </p>
    </div>
  );
}
