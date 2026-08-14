'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './ShowcaseFrame.module.css';

/**
 * @param {Object} props
 * @param {() => void} [props.onImageReady]  Fires once, in addition to the
 *   internal fade-in state, when this image finishes loading. Optional —
 *   lets a consumer (e.g. ShowcaseModal) track completion across several
 *   ShowcaseFrame instances without ShowcaseFrame knowing why.
 */
export function ShowcaseFrame({ image, sizes, className, priority, onImageReady }) {
  const [loaded, setLoaded] = useState(false);
  const isSvg = image.src.endsWith('.svg');

  return (
    <div className={`${styles.frame} ${className || ''}`}>
      <div className={styles.imgWrap}>
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes={sizes}
          unoptimized={isSvg}
          priority={priority}
          className={styles.img}
          data-loaded={loaded || undefined}
          onLoad={() => {
            setLoaded(true);
            onImageReady?.();
          }}
        />
      </div>
    </div>
  );
}
