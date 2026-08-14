'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './PortraitFrame.module.css';

/**
 * Portrait frame — ported from the reference .portrait-orbit-wrap. Conic glow
 * ring, circular clipped photo with a frosted border and depth shadow, plus
 * the green tint and bottom-fade overlays. Parallax depth is deferred to 3B.2.
 *
 * Fade-in-on-load state is local here (not routed through ShowcaseFrame)
 * because this uses `fill` mode inside a circular-clip wrapper, a
 * structurally different layout than ShowcaseFrame's intrinsic
 * width/height frame.
 */
export function PortraitFrame() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={styles.wrap} data-depth="0.7">
      <div className={styles.glowRing} aria-hidden="true" />
      <div className={styles.circle}>
        <Image
          src="/images/portrait.webp"
          alt="Midhun Shankar"
          fill
          priority
          sizes="(max-width: 640px) 180px, (max-width: 1024px) 240px, 250px"
          className={styles.img}
          data-loaded={loaded || undefined}
          onLoad={() => setLoaded(true)}
        />
        <div className={styles.overlayGreen} aria-hidden="true" />
        <div className={styles.overlayBottom} aria-hidden="true" />
      </div>
    </div>
  );
}
