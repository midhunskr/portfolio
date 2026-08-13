'use client';

import { useEffect, useRef, useCallback } from 'react';
import { ShowcaseFrame } from '@/components/ui/ShowcaseFrame/ShowcaseFrame';
import { useModalHistory } from '@/hooks/useModalHistory';
import styles from './ShowcaseModal.module.css';

export function ShowcaseModal({ project, onClose }) {
  const { showcase, name, category } = project;
  const overlayRef = useRef(null);
  const bodyRef = useRef(null);
  const closeRef = useRef(null);

  const handleClose = useCallback(() => {
    const el = overlayRef.current;
    if (el) {
      el.classList.add(styles.closing);
      let fired = false;
      const onEnd = () => {
        if (fired) return;
        fired = true;
        onClose();
      };
      el.addEventListener('transitionend', onEnd, { once: true });
      setTimeout(onEnd, 400);
    } else {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Enter animation: reflow forces browser to snapshot opacity:0,
  // then adding .open triggers the CSS transition to opacity:1.
  useEffect(() => {
    const el = overlayRef.current;
    if (el) {
      void el.offsetHeight;
      el.classList.add(styles.open);
    }
  }, []);

  useEffect(() => {
    if (closeRef.current) closeRef.current.focus();
  }, []);

  // Escape to close + focus trap
  useEffect(() => {
    const modal = overlayRef.current?.querySelector('[role="dialog"]');
    const onKey = (e) => {
      if (e.key === 'Escape') {
        handleClose();
        return;
      }
      if (e.key === 'Tab' && modal) {
        const focusable = modal.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleClose]);

  useModalHistory(handleClose);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = 0;
  }, []);

  const handleOverlayClick = useCallback((e) => {
    if (e.target === e.currentTarget) handleClose();
  }, [handleClose]);

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
          ref={closeRef}
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
                priority
              />
            </div>
          </div>

          <div className={styles.inner}>
            <div className={styles.info}>
              <div className={styles.infoEyebrow}>{category}</div>
              <h2 className={styles.infoTitle}>{name}</h2>
              <p className={styles.infoSummary}>{showcase.summary}</p>
            </div>

            {showcase.images?.length > 0 && (
              <div className={styles.gallery}>
                {showcase.images.map((image, i) => (
                  <ShowcaseFrame
                    key={i}
                    image={image}
                    sizes="(max-width: 760px) 90vw, 800px"
                    className={styles.galleryFrame}
                  />
                ))}
              </div>
            )}

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
