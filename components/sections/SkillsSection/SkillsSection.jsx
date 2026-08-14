'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './SkillsSection.module.css';
import { skillClusters, skillFilters } from '@/data/skills';
import { ParallaxBlob } from '@/components/ui/ParallaxBlob/ParallaxBlob';
import { Eyebrow } from '@/components/ui/Eyebrow/Eyebrow';
import { revealVariants, REVEAL_VIEWPORT } from '@/lib/motion';
import { usePointerFine } from '@/hooks/usePointerFine';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

/* Layout switches from a 3-hub triangle to a vertical stack below this
   host width. JS-measured only — no matching CSS breakpoint exists in
   the reference, so this must stay a clientWidth check, not a media query. */
const HORIZONTAL_BREAKPOINT = 720;

const HUB_POS = {
  horizontal: { design: [19, 47], develop: [50, 57], automate: [81, 47] },
  vertical: { design: [50, 14], develop: [50, 50], automate: [50, 86] },
};

/* Fixed percent-point offsets for the vertical (mobile) layout — tools
   fan left/right of their hub rather than following the ellipse formula. */
const MOBILE_TOOL_OFFSETS = [
  [-26, -6],
  [-26, 6],
  [26, -10],
  [26, 0],
  [26, 10],
];

function clampPct(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

/** @param {string} hex  e.g. "#12886A" @param {number} alpha */
function hexToRgba(hex, alpha) {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function computeLayout(width) {
  const horizontal = width >= HORIZONTAL_BREAKPOINT;
  const hubPos = horizontal ? HUB_POS.horizontal : HUB_POS.vertical;
  const rx = horizontal ? 13 : 0;
  const ry = horizontal ? 24 : 0;

  const clusters = skillClusters.map((cluster) => {
    const [hx, hy] = hubPos[cluster.key];
    const n = cluster.tools.length;

    const tools = cluster.tools.map((tool, i) => {
      let x;
      let y;
      if (horizontal) {
        let a;
        if (cluster.key === 'design') a = Math.PI * (0.58 + (i / (n - 1)) * 0.84);
        else if (cluster.key === 'automate') a = Math.PI * (-0.42 + (i / (n - 1)) * 0.84);
        else a = (i / n) * Math.PI * 2 - Math.PI / 2;
        x = clampPct(hx + rx * Math.cos(a), 8, 92);
        y = clampPct(hy + ry * Math.sin(a), 9, 91);
      } else {
        const [dx, dy] = MOBILE_TOOL_OFFSETS[i % MOBILE_TOOL_OFFSETS.length];
        x = clampPct(hx + dx, 6, 94);
        y = clampPct(hy + dy, 6, 94);
      }
      return { tool, x, y };
    });

    return { cluster, hx, hy, tools };
  });

  const coreLines = clusters.map((_, i) => ({
    a: clusters[i],
    b: clusters[(i + 1) % clusters.length],
  }));

  return { clusters, coreLines };
}

export function SkillsSection() {
  const hostRef = useRef(null);
  const layerRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoverKey, setHoverKey] = useState(null);

  const pointerFine = usePointerFine();
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const measure = () => setWidth(el.clientWidth);
    measure();
    window.addEventListener('resize', measure, { passive: true });
    return () => window.removeEventListener('resize', measure);
  }, []);

  const layout = useMemo(() => computeLayout(width), [width]);
  const focusKey = hoverKey ?? (activeFilter !== 'all' ? activeFilter : null);

  const lineOpacity = useCallback(
    (clKey) => {
      if (!focusKey) return clKey === 'core' ? 1 : 0.32;
      return clKey === focusKey ? 0.9 : 0.05;
    },
    [focusKey]
  );

  /* Mouse-driven drift of the whole constellation layer — host-scoped
     (not window), lerp 0.06, gain 9px. Gated to fine pointer + no
     reduced-motion preference. */
  useEffect(() => {
    const host = hostRef.current;
    const layer = layerRef.current;
    if (!host || !layer || !pointerFine || reducedMotion) return;

    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let raf;

    const onMove = (e) => {
      const r = host.getBoundingClientRect();
      tx = (e.clientX - (r.left + r.width / 2)) / r.width;
      ty = (e.clientY - (r.top + r.height / 2)) / r.height;
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
    };
    const loop = () => {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      layer.style.transform = `translate(${(cx * 9).toFixed(1)}px, ${(cy * 9).toFixed(1)}px)`;
      raf = requestAnimationFrame(loop);
    };

    host.addEventListener('mousemove', onMove);
    host.addEventListener('mouseleave', onLeave);
    loop();

    return () => {
      host.removeEventListener('mousemove', onMove);
      host.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
      layer.style.transform = '';
    };
  }, [pointerFine, reducedMotion, width]);

  return (
    <section id="skills" className={styles.section}>
      <ParallaxBlob className={styles.blobGreen} factor={0.045} />
      <ParallaxBlob className={styles.blobAmber} factor={-0.035} />

      <div className={styles.container}>
        <motion.div
          className={styles.header}
          variants={revealVariants('up')}
          initial="hidden"
          whileInView="shown"
          viewport={REVEAL_VIEWPORT}
        >
          <Eyebrow number="05" label="Skills & Tools" />
          <h2 className={styles.h2}>
            Not a tag cloud — a{' '}
            <span className="accent-green">connected system.</span>
          </h2>
          <p className={styles.para}>
            Three clusters that feed each other. Hover one to trace how
            design, development and automation actually connect.
          </p>
        </motion.div>

        <motion.div
          className={styles.filterBar}
          variants={revealVariants('up')}
          initial="hidden"
          whileInView="shown"
          viewport={REVEAL_VIEWPORT}
        >
          {skillFilters.map((f) => (
            <button
              key={f.key}
              type="button"
              data-cursor
              className={
                activeFilter === f.key ? styles.filterActive : styles.filterInactive
              }
              onClick={() => setActiveFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        <motion.div
          className={styles.constellationWrap}
          variants={revealVariants('up')}
          initial="hidden"
          whileInView="shown"
          viewport={REVEAL_VIEWPORT}
        >
          <div ref={hostRef} className={styles.constellationBg}>
            {width > 0 && (
              <div ref={layerRef} className={styles.driftLayer}>
                <svg
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className={styles.svg}
                  aria-hidden="true"
                >
                  {layout.coreLines.map((line, i) => (
                    <line
                      key={`core-${i}`}
                      x1={line.a.hx}
                      y1={line.a.hy}
                      x2={line.b.hx}
                      y2={line.b.hy}
                      stroke="rgba(27, 26, 22, 0.18)"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeDasharray="3 4"
                      vectorEffect="non-scaling-stroke"
                      className={styles.signalLine}
                      style={{ opacity: lineOpacity('core') }}
                    />
                  ))}
                  {layout.clusters.map((c) =>
                    c.tools.map((t, i) => (
                      <line
                        key={`${c.cluster.key}-line-${i}`}
                        x1={c.hx}
                        y1={c.hy}
                        x2={t.x}
                        y2={t.y}
                        stroke={c.cluster.color}
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        vectorEffect="non-scaling-stroke"
                        className={styles.toolLine}
                        style={{ opacity: lineOpacity(c.cluster.key) }}
                      />
                    ))
                  )}
                </svg>

                <div className={styles.nodeLayer}>
                  {layout.clusters.map((c, ci) => (
                    <div key={c.cluster.key}>
                      <div
                        className={styles.hub}
                        style={{ left: `${c.hx}%`, top: `${c.hy}%` }}
                        data-dim={
                          focusKey && focusKey !== c.cluster.key ? '' : undefined
                        }
                        onMouseEnter={() => setHoverKey(c.cluster.key)}
                        onMouseLeave={() => setHoverKey(null)}
                      >
                        <span
                          className={styles.hubDisc}
                          style={{ borderColor: c.cluster.color }}
                        >
                          <span
                            className={styles.hubHalo}
                            style={{
                              borderColor: c.cluster.color,
                              animationDuration: `${3 + ci * 0.4}s`,
                            }}
                          />
                          <span
                            className={styles.hubCore}
                            style={{ background: c.cluster.tint }}
                          />
                        </span>
                        <span className={styles.hubLabel}>{c.cluster.label}</span>
                      </div>

                      {c.tools.map((t, i) => (
                        <div
                          key={i}
                          className={styles.toolPill}
                          style={{
                            left: `${t.x}%`,
                            top: `${t.y}%`,
                            '--tool-accent': c.cluster.color,
                            '--tool-shadow': hexToRgba(c.cluster.color, 0.4),
                          }}
                          data-dim={
                            focusKey && focusKey !== c.cluster.key ? '' : undefined
                          }
                        >
                          <span
                            className={styles.toolDot}
                            style={{ background: c.cluster.color }}
                          />
                          <span className={styles.toolLabel}>{t.tool}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
