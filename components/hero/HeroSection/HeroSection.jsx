import styles from './HeroSection.module.css';
import { OrbitSystem } from '@/components/hero/orbit/OrbitSystem';

/**
 * Hero section shell (Phase 1 placeholder).
 * Composes the OrbitSystem shell so the tree is wired. Real intro stagger,
 * layout and orbit behavior land in Phase 3.
 */
export function HeroSection() {
  return (
    <section id="top" className={styles.placeholder}>
      <span className={styles.label}>HeroSection</span>
      <OrbitSystem />
    </section>
  );
}
