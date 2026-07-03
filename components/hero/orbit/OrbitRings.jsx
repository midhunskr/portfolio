import styles from './OrbitRings.module.css';
import { signalPaths } from './orbitConfig';

/**
 * Orbit rings + connection (signal) lines, ported from the reference
 * .svg-orbit. Geometry only — no spin or dash animation (Phase 3B.2).
 * The tilt/spin group nesting is preserved so 3B.2 can attach rotation.
 */
export function OrbitRings() {
  return (
    <svg viewBox="0 0 100 100" className={styles.svg} aria-hidden="true">
      <g className={styles.ringTilt} data-orbit-tilt>

        <g className={styles.ringSpin} style={{ animation: 'ringspin 95s linear infinite' }}>
          <ellipse
            cx="50"
            cy="50"
            rx="47"
            ry="47"
            fill="none"
            stroke="rgba(27,26,22,0.10)"
            strokeWidth="0.22"
            strokeDasharray="0.5 2.1"
          />
        </g>
        <g
          className={styles.ringSpinRev}
          style={{ animation: 'ringspinrev 72s linear infinite' }}
        >
          <ellipse
            cx="50"
            cy="50"
            rx="38.5"
            ry="38.5"
            fill="none"
            stroke="rgba(18,136,106,0.20)"
            strokeWidth="0.3"
          />
        </g>
        <ellipse
          cx="50"
          cy="50"
          rx="30"
          ry="30"
          fill="none"
          stroke="rgba(27,26,22,0.08)"
          strokeWidth="0.22"
        />
      </g>

      {/* Connection / signal lines — structure + styling only. */}
      <g fill="none" strokeLinecap="round">
        {signalPaths.map((p) => (
          <path
            key={p.d}
            d={p.d}
            stroke={p.color}
            strokeWidth="0.42"
            strokeDasharray="1.6 2.6"
            style={{ animation: `signal ${p.duration}s linear infinite` }}
          />
        ))}
      </g>
    </svg>
  );
}
