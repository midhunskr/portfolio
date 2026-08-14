import styles from './Eyebrow.module.css';
import { cx } from '@/lib/utils';

const VARIANT_CLASS = {
  journeyCard: styles.journeyCard,
  capability: styles.capability,
};

const TONE_CLASS = {
  green: styles.toneGreen,
  amber: styles.toneAmber,
  bright: styles.toneBright,
  faint: styles.toneFaint,
};

/**
 * Small mono uppercase label, used two ways:
 *   - Section eyebrow: pass `number` + `label` (e.g. "03" / "Selected Work").
 *   - Inline tone eyebrow: pass `label` + `variant` + `tone`, no `number`.
 *
 * @param {Object} props
 * @param {string} [props.number]   Two-digit ordinal. Presence selects the
 *                                  section-eyebrow shape.
 * @param {string} props.label
 * @param {'journeyCard'|'capability'} [props.variant]  Required when `number`
 *                                  is omitted — selects size/tracking/margin.
 * @param {'green'|'amber'|'bright'|'faint'} [props.tone='green']
 * @param {string} [props.className]
 */
export function Eyebrow({ number, label, variant, tone = 'green', className }) {
  if (number) {
    return (
      <div className={cx(styles.row, className)}>
        <span className={styles.num}>{number}</span>
        <span className={styles.label}>{label}</span>
      </div>
    );
  }

  return (
    <div className={cx(VARIANT_CLASS[variant], TONE_CLASS[tone], className)}>
      {label}
    </div>
  );
}
