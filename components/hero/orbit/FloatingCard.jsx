import { cx } from '@/lib/utils';
import styles from './FloatingCard.module.css';

const CORNER = { tl: styles.tl, tr: styles.tr, br: styles.br, bl: styles.bl };
const ICON_TONE = { green: styles.iconGreen, amber: styles.iconAmber, dark: styles.iconDark };
const CHIP = {
  figma: [styles.chipLight, styles.chipFigma],
  next: [styles.chipDark, styles.chipNext],
  tw: [styles.chipLight, styles.chipTw],
  n8n: [styles.chipAmber, styles.chipN8n],
  more: [styles.chipLight, styles.chipMore],
};

/**
 * A single floating capability card — glass shell, status dot, icon chip,
 * title, and either a skill list or a tools row. Positioned by `corner`.
 * The floatY bob is applied inline so it references the global keyframe.
 * Parallax / hover are Phase 3B.2B.2.
 *
 * @param {Object} props
 * @param {'tl'|'tr'|'br'|'bl'} props.corner
 * @param {'green'|'amber'} [props.status]
 * @param {'green'|'amber'|'dark'} props.iconTone
 * @param {import('react').ReactNode} props.icon
 * @param {string} props.title
 * @param {boolean} [props.titleTools]
 * @param {number} props.floatDuration
 * @param {number} props.floatDelay
 * @param {number} props.depth Parallax depth factor.
 * @param {{ icon: import('react').ReactNode, label: string }[]} [props.skills]
 * @param {{ kind: keyof typeof CHIP, label?: string, node?: import('react').ReactNode, title?: string }[]} [props.tools]
 */
export function FloatingCard({
  corner,
  status,
  iconTone,
  icon,
  title,
  titleTools,
  floatDuration,
  floatDelay,
  depth,
  skills,
  tools,
}) {
  return (
    <div className={cx(styles.ecoFc, CORNER[corner])} data-depth={depth}>
      <div
        className={styles.card}
        style={{ animation: `floatY ${floatDuration}s ease-in-out infinite ${floatDelay}s` }}
      >
        {status && (
          <span
            className={cx(styles.statusDot, status === 'amber' ? styles.statusAmber : styles.statusGreen)}
          />
        )}

        <div className={cx(styles.iconWrap, ICON_TONE[iconTone])}>{icon}</div>

        <div className={titleTools ? styles.cardTitleTools : styles.cardTitle}>{title}</div>

        {skills && (
          <div className={styles.skillList}>
            {skills.map((s) => (
              <span key={s.label} className={styles.skillItem}>
                <span className={styles.skillIcon}>{s.icon}</span>
                {s.label}
              </span>
            ))}
          </div>
        )}

        {tools && (
          <div className={styles.toolsRow}>
            {tools.map((t) => (
              <span key={t.title ?? t.label} title={t.title} className={cx(styles.chip, ...CHIP[t.kind])}>
                {t.node ?? t.label}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
