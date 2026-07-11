'use client';

import { useEffect, useRef, useCallback } from 'react';
import { ShowcaseFrame } from '@/components/ui/ShowcaseFrame/ShowcaseFrame';
import styles from './ShowcaseModal.module.css';

export function ShowcaseModal({ project, onClose }) {
  const { showcase, name, category } = project;
  const overlayRef = useRef(null);
  const bodyRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handleClose = useCallback(() => {
    const el = overlayRef.current;
    if (el) {
      el.classList.add(styles.closing);
      const onEnd = () => onClose();
      el.addEventListener('transitionend', onEnd, { once: true });
      setTimeout(onEnd, 400);
    } else {
      onClose();
    }
  }, [onClose]);

  const handleOverlayClick = useCallback((e) => {
    if (e.target === e.currentTarget) handleClose();
  }, [handleClose]);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = 0;
  }, []);

  return (
    <div
      ref={overlayRef}
      className={styles.overlay}
      onClick={handleOverlayClick}
    >
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-label={`${name} showcase`}
      >
        <button
          className={styles.close}
          onClick={handleClose}
          aria-label="Close showcase"
        >
          ×
        </button>

        <div ref={bodyRef} className={styles.body}>
          <div className={styles.heroWrap}>
            <div className={styles.heroBg} />
            <div className={styles.heroInner}>
              <ShowcaseFrame
                image={showcase.hero}
                sizes="(max-width: 760px) 90vw, 800px"
                className={styles.heroFrame}
              />
            </div>
          </div>

          <div className={styles.inner}>
            <div className={styles.info}>
              <div className={styles.infoEyebrow}>{category}</div>
              <h2 className={styles.infoTitle}>{name}</h2>
              <p className={styles.infoSummary}>{showcase.summary}</p>
            </div>

            <div className={styles.features}>
              {showcase.features.map((feat, i) => (
                <div
                  key={feat.num}
                  className={i % 2 === 1 ? styles.featAlt : styles.feat}
                >
                  <div className={styles.featText}>
                    <div className={styles.featEyebrow}>{feat.num} — Feature</div>
                    <h3 className={styles.featTitle}>{feat.title}</h3>
                    <p className={styles.featDesc}>{feat.description}</p>
                  </div>
                  <ShowcaseFrame
                    image={feat.image}
                    sizes="(max-width: 760px) 90vw, 420px"
                    className={styles.featImage}
                  />
                </div>
              ))}
            </div>

            {showcase.tech && (
              <div className={styles.tech}>
                <div className={styles.techLabel}>Built with</div>
                <div className={styles.techChips}>
                  {showcase.tech.map((t) => (
                    <span key={t} className={styles.techChip}>{t}</span>
                  ))}
                </div>
              </div>
            )}

            {showcase.liveUrl && (
              <div className={styles.cta}>
                <a
                  href={showcase.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.liveBtn}
                >
                  Open Live Site
                  <span className={styles.liveArrow}>↗</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
