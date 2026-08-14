import styles from './Tag.module.css';
import { cx } from '@/lib/utils';

const VARIANT_CLASS = {
  muted: styles.muted,
  mono: styles.mono,
  chip: styles.chip,
};

/**
 * Pill-shaped text label.
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {'muted'|'mono'|'chip'} [props.variant='muted']
 *   muted -> plain sans-serif pill (CapabilitiesSection tags)
 *   mono  -> mono-font pill (ProjectsSection tags)
 *   chip  -> bordered, hoverable pill (ShowcaseModal tech chips)
 */
export function Tag({ children, variant = 'muted' }) {
  return (
    <span className={cx(styles.tag, VARIANT_CLASS[variant])}>{children}</span>
  );
}
