'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { ShowcaseFrame } from '@/components/ui/ShowcaseFrame/ShowcaseFrame';
import { Tag } from '@/components/ui/Tag/Tag';
import { useModalHistory } from '@/hooks/useModalHistory';
import styles from './ShowcaseModal.module.css';

export function ShowcaseModal({ project, onClose }) {
  const { showcase, name, category } = project;
  const overlayRef = useRef(null);
  const bodyRef = useRef(null);
  const closeRef = useRef(null);

  // Content mounts immediately so every <Image> starts fetching right
  // away, but stays visually hidden behind the loader until all of
  // them report ready — the modal opens instantly, the *content*
  // crossfades in once it has something complete to show.
  const totalImages = 1 + (showcase.images?.length || 0); // hero + walkthrough
  const [loadedCount, setLoadedCount] = useState(0);
  const allLoaded = loadedCount >= totalImages;

  const handleImageReady = useCallback(() => {
    setLoadedCount((c) => c + 1);
  }, []);

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
        aria-busy={!allLoaded}
      >
        <button
          ref={closeRef}
          className={styles.close}
          onClick={handleClose}
          aria-label="Close showcase"
        >
          ×
        </button>

        <div
          className={styles.loader}
          data-visible={allLoaded ? undefined : true}
          role="status"
          aria-live="polite"
        >
          <span className={styles.loaderSpinner} aria-hidden="true" />
          <span className={styles.srOnly}>Loading project preview…</span>
        </div>

        <div
          ref={bodyRef}
          className={styles.body}
          data-ready={allLoaded || undefined}
          aria-hidden={!allLoaded}
          inert={!allLoaded ? '' : undefined}
        >
          <div className={styles.heroWrap}>
            <div className={styles.heroBg} />
            <div className={styles.heroInner}>
              <ShowcaseFrame
                image={showcase.hero}
                sizes="(max-width: 760px) 90vw, 800px"
                className={styles.heroFrame}
                priority
                onImageReady={handleImageReady}
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
              <div className={styles.walkthrough}>
                {showcase.images.map((section, i) => {
                  const imageFirst = i % 2 === 1;
                  return (
                    <div key={i} className={styles.walkSection}>
                      <div className={imageFirst ? styles.walkTextAlt : styles.walkText}>
                        <div className={styles.walkEyebrow}>{section.eyebrow}</div>
                        <h3 className={styles.walkTitle}>{section.title}</h3>
                        <p className={styles.walkDesc}>{section.description}</p>
                      </div>
                      <ShowcaseFrame
                        image={section.image}
                        sizes="(max-width: 760px) 90vw, 560px"
                        className={imageFirst ? styles.walkImageAlt : styles.walkImage}
                        priority
                        onImageReady={handleImageReady}
                      />
                    </div>
                  );
                })}
              </div>
            )}

            {showcase.tech && (
              <div className={styles.tech}>
                <div className={styles.techLabel}>Built with</div>
                <div className={styles.techChips}>
                  {showcase.tech.map((t) => (
                    <Tag key={t} variant="chip">{t}</Tag>
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
