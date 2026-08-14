'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './ContactSection.module.css';
import { site } from '@/data/site';
import { ParallaxBlob } from '@/components/ui/ParallaxBlob/ParallaxBlob';
import { revealVariants, REVEAL_VIEWPORT, DUR, EASE } from '@/lib/motion';
import { ContactForm } from './ContactForm';

/**
 * Contact section — badge, staged journey path, headline, contact form,
 * socials, location and footer bar. Ported from the reference
 * .contact-badge / .contact-path / .contact-h2 rules; the email CTA has
 * been replaced by ContactForm (UI-only, see ContactForm.jsx).
 */
export function ContactSection() {
  const pathRef = useRef(null);
  const [pathVisible, setPathVisible] = useState(false);
  const [activeStages, setActiveStages] = useState(() => new Set());

  useEffect(() => {
    const el = pathRef.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setPathVisible(true);
        site.contactPath.forEach((_, i) => {
          setTimeout(() => {
            setActiveStages((prev) => new Set(prev).add(i));
          }, 300 + i * 340);
        });
        observer.disconnect();
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" className={styles.section}>
      <ParallaxBlob className={styles.blobGreen} factor={-0.04} />

      <div className={styles.container}>
        <motion.div
          className={styles.badge}
          variants={revealVariants('up')}
          initial="hidden"
          whileInView="shown"
          viewport={REVEAL_VIEWPORT}
        >
          <span className={styles.badgeDotWrap}>
            <span className={styles.badgeDot} />
            <span className={styles.badgeDotPulse} />
          </span>
          <span className={styles.badgeText}>
            The next chapter starts with a message
          </span>
        </motion.div>

        <motion.div
          ref={pathRef}
          className={styles.pathWrap}
          variants={revealVariants('up', 0.04)}
          initial="hidden"
          whileInView="shown"
          viewport={REVEAL_VIEWPORT}
        >
          <div className={styles.pathRow}>
            <div className={styles.track} />
            <div
              className={styles.fill}
              style={{
                width: pathVisible ? '82%' : '0%',
                transition: `width ${DUR.pathFill}s cubic-bezier(${EASE.join(',')})`,
              }}
            />
            {site.contactPath.map((stage, i) => (
              <div
                key={stage.label}
                className={styles.stage}
                style={{ '--stage-color': stage.color }}
                data-active={activeStages.has(i) ? '' : undefined}
              >
                <span className={stage.final ? styles.dotFinal : styles.dot}>
                  {stage.final ? '✦' : null}
                </span>
                <span className={styles.label}>{stage.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.h2
          className={styles.h2}
          variants={revealVariants('up', 0.08)}
          initial="hidden"
          whileInView="shown"
          viewport={REVEAL_VIEWPORT}
        >
          Let&apos;s build something worth talking about.
        </motion.h2>

        <motion.p
          className={styles.para}
          variants={revealVariants('up', 0.12)}
          initial="hidden"
          whileInView="shown"
          viewport={REVEAL_VIEWPORT}
        >
          Have a project in mind, or just want to talk shop? My inbox is
          always open — I read and reply to everything myself.
        </motion.p>

        <motion.div
          className={styles.formWrap}
          variants={revealVariants('up', 0.16)}
          initial="hidden"
          whileInView="shown"
          viewport={REVEAL_VIEWPORT}
        >
          <ContactForm />
        </motion.div>

        <motion.div
          className={styles.socialRow}
          variants={revealVariants('up', 0.2)}
          initial="hidden"
          whileInView="shown"
          viewport={REVEAL_VIEWPORT}
        >
          {site.socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              data-cursor
              className={styles.socialBtn}
              {...(social.external
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
            >
              {social.label}
            </a>
          ))}
        </motion.div>

        <div className={styles.location}>{site.location}</div>
      </div>

      <div className={styles.footerBar}>
        <span className={styles.footerTagline}>
          Design · Development · Automation
        </span>
        <span className={styles.footerCopy}>
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </span>
      </div>
    </section>
  );
}
