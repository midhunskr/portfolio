import Image from 'next/image';
import styles from './PortraitFrame.module.css';

/**
 * Portrait frame — ported from the reference .portrait-orbit-wrap. Conic glow
 * ring, circular clipped photo with a frosted border and depth shadow, plus
 * the green tint and bottom-fade overlays. Parallax depth is deferred to 3B.2.
 */
export function PortraitFrame() {
  return (
    <div className={styles.wrap}>
      <div className={styles.glowRing} aria-hidden="true" />
      <div className={styles.circle}>
        <Image
          src="/images/portrait.png"
          alt="Midhun Shankar"
          fill
          priority
          sizes="(max-width: 640px) 180px, (max-width: 1024px) 240px, 250px"
          className={styles.img}
        />
        <div className={styles.overlayGreen} aria-hidden="true" />
        <div className={styles.overlayBottom} aria-hidden="true" />
      </div>
    </div>
  );
}
