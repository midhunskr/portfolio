import Image from 'next/image';
import styles from './ShowcaseFrame.module.css';

export function ShowcaseFrame({ image, sizes, className }) {
  const isSvg = image.src.endsWith('.svg');

  return (
    <div className={`${styles.frame} ${className || ''}`}>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        unoptimized={isSvg}
      />
    </div>
  );
}
