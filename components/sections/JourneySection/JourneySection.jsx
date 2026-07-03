'use client';

import styles from './JourneySection.module.css';
import { journeySteps } from '@/data/journey';
import { cx } from '@/lib/utils';

const EYEBROW_TONE = {
  green: styles.eyebrowGreen,
  amber: styles.eyebrowAmber,
  light: styles.eyebrowLight,
};

const NODE_VARIANT = {
  first: styles.nodeFirst,
  mid: styles.node,
  last: styles.nodeLast,
};

/**
 * Journey timeline — 5 alternating milestone cards on a vertical track.
 * Phase 4A: structure only (no scroll-linked fill, no reveal animations).
 */
export function JourneySection() {
  return (
    <section id="journey" className={styles.section}>
      <div className={styles.container}>
        {/* Section header */}
        <div className={styles.header}>
          <div className={styles.eyebrowRow}>
            <span className={styles.eyebrowNum}>01</span>
            <span className={styles.eyebrowLabel}>The Journey</span>
          </div>
          <h2 className={styles.h2}>
            From <span className="accent-green">curiosity</span> to building{' '}
            <span className="accent-amber">whole products.</span>
          </h2>
          <p className={styles.para}>
            Each stage didn&apos;t replace the last — it stacked on top of it.
            That&apos;s how one person ended up owning the entire arc.
          </p>
        </div>

        {/* Timeline */}
        <div className={styles.timelineWrap}>
          <div className={styles.track} />
          <div className={styles.fill} />

          <div className={styles.steps}>
            {journeySteps.map((step, i) => (
              <div key={i} className={styles.row}>
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
              </div>
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
      <div className={cx(styles.cardEyebrow, EYEBROW_TONE[step.tone])}>
        {step.eyebrow}
      </div>
      <div className={step.titleLg ? styles.cardTitleLg : styles.cardTitle}>
        {step.title}
      </div>
      <p className={step.dark ? styles.cardParaDark : styles.cardPara}>
        {step.body}
      </p>
    </div>
  );
}
