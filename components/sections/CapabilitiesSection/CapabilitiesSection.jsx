'use client';

import { useState } from 'react';
import styles from './CapabilitiesSection.module.css';
import { capabilities } from '@/data/capabilities';
import { cx } from '@/lib/utils';

const ICON_TONE = {
  green: styles.iconGreen,
  amber: styles.iconAmber,
  code: styles.iconCode,
};

const SIDE_EYEBROW_TONE = {
  green: styles.sideEyebrowGreen,
  amber: styles.sideEyebrowAmber,
  muted: styles.sideEyebrowMuted,
};

const ARROW_TONE = {
  green: styles.arrowGreen,
  amber: styles.arrowAmber,
  muted: styles.arrowGreen,
};

export function CapabilitiesSection() {
  const [activeKey, setActiveKey] = useState('design');

  return (
    <section id="capabilities" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.eyebrowRow}>
            <span className={styles.eyebrowNum}>02</span>
            <span className={styles.eyebrowLabel}>What I Do</span>
          </div>
          <h2 className={styles.h2}>
            Three capabilities that <span className="accent-green">compound</span>{' '}
            when one person holds them.
          </h2>
        </div>

        <div className={styles.tabs}>
          {capabilities.map((cap) => (
            <button
              key={cap.key}
              className={activeKey === cap.key ? styles.tabActive : styles.tabInactive}
              onClick={() => setActiveKey(cap.key)}
            >
              {cap.tabLabel}
            </button>
          ))}
        </div>

        <div className={styles.panelsWrap}>
          {capabilities.map((cap) => (
            <div
              key={cap.key}
              className={activeKey === cap.key ? styles.panelGrid : styles.panelHidden}
            >
              <div className={styles.cardMain}>
                <div className={styles.cardHeader}>
                  <span className={cx(styles.cardIcon, ICON_TONE[cap.iconTone])}>
                    {cap.icon}
                  </span>
                  <div className={styles.cardH3}>{cap.title}</div>
                </div>
                <p className={styles.cardPara}>{cap.description}</p>
                <div className={styles.skillsLabel}>{cap.skillsLabel}</div>
                <div className={styles.tags}>
                  {cap.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              </div>

              <div className={styles.sideCol}>
                {cap.side.map((s, i) => (
                  <div key={i} className={styles.sideCard}>
                    <div className={cx(styles.sideEyebrow, SIDE_EYEBROW_TONE[s.tone])}>
                      {s.eyebrow}
                    </div>
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
