'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './ShowcaseFrame.module.css';

export function ShowcaseFrame({ image, sizes, className, priority }) {
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
          onLoad={() => setLoaded(true)}
        />
      </div>
    </div>
  );
}
