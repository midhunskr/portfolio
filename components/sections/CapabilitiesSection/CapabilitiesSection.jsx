'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './CapabilitiesSection.module.css';
import { capabilities } from '@/data/capabilities';
import { cx } from '@/lib/utils';
import { revealVariants, REVEAL_VIEWPORT, panelFade } from '@/lib/motion';
import { Eyebrow } from '@/components/ui/Eyebrow/Eyebrow';
import { Tag } from '@/components/ui/Tag/Tag';

const ICON_TONE = {
  green: styles.iconGreen,
  amber: styles.iconAmber,
  code: styles.iconCode,
};

const SIDE_EYEBROW_TONE = {
  green: 'green',
  amber: 'amber',
  muted: 'faint',
};

const ARROW_TONE = {
  green: styles.arrowGreen,
  amber: styles.arrowAmber,
  muted: styles.arrowGreen,
};

export function CapabilitiesSection() {
  const [activeKey, setActiveKey] = useState('design');
  const activeCap = capabilities.find((c) => c.key === activeKey);

  return (
    <section id="capabilities" className={styles.section}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          variants={revealVariants('up')}
          initial="hidden"
          whileInView="shown"
          viewport={REVEAL_VIEWPORT}
        >
          <Eyebrow number="02" label="What I Do" />
          <h2 className={styles.h2}>
            Three capabilities that <span className="accent-green">compound</span>{' '}
            when one person holds them.
          </h2>
        </motion.div>

        <motion.div
          className={styles.tabs}
          variants={revealVariants('up')}
          initial="hidden"
          whileInView="shown"
          viewport={REVEAL_VIEWPORT}
        >
          {capabilities.map((cap) => (
            <button
              key={cap.key}
              className={activeKey === cap.key ? styles.tabActive : styles.tabInactive}
              onClick={() => setActiveKey(cap.key)}
            >
              {cap.tabLabel}
            </button>
          ))}
        </motion.div>

        <div className={styles.panelsWrap}>
          <AnimatePresence mode="wait">
            {activeCap && (
              <motion.div
                key={activeCap.key}
                className={styles.panelGrid}
                variants={panelFade}
                initial="hidden"
                animate="shown"
                exit="exit"
              >
                <div className={styles.cardMain}>
                  <div className={styles.cardHeader}>
                    <span className={cx(styles.cardIcon, ICON_TONE[activeCap.iconTone])}>
                      {activeCap.icon}
                    </span>
                    <div className={styles.cardH3}>{activeCap.title}</div>
                  </div>
                  <p className={styles.cardPara}>{activeCap.description}</p>
                  <div className={styles.skillsLabel}>{activeCap.skillsLabel}</div>
                  <div className={styles.tags}>
                    {activeCap.tags.map((tag) => (
                      <Tag key={tag} variant="muted">{tag}</Tag>
                    ))}
                  </div>
                </div>

                <div className={styles.sideCol}>
                  {activeCap.side.map((s, i) => (
                    <div key={i} className={styles.sideCard}>
                      <Eyebrow
                        label={s.eyebrow}
                        variant="capability"
                        tone={SIDE_EYEBROW_TONE[s.tone]}
                      />
                      {s.steps ? (
                        <div className={styles.processSteps}>
                          {s.steps.map((step, j) => (
                            <span key={j}>
                              {j > 0 && (
                                <span className={ARROW_TONE[s.tone]}>→ </span>
                              )}
                              {step}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <div className={styles.seenText}>{s.text}</div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
