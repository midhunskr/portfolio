/**
 * Orbit geometry — ported verbatim from the reference eco-stage markup.
 * Percentages are relative to the square stage; SVG paths use the 0–100
 * viewBox. Beat timings (node pulse) are carried for Phase 3B.2 but unused
 * in 3B.1 (no animation yet).
 *
 * @typedef {'green'|'amber'} NodeColor
 *
 * @typedef {Object} OrbitNode
 * @property {string} top          e.g. '11%' — dot top-left Y within the stage.
 * @property {string} left         e.g. '47%' — dot top-left X within the stage.
 * @property {number} size         Dot diameter in px.
 * @property {NodeColor} color
 * @property {number} depth        Parallax depth (Phase 3B.2).
 * @property {number} beatDuration Ring pulse duration in s (Phase 3B.2).
 * @property {number} beatDelay    Ring pulse delay in s (Phase 3B.2).
 *
 * @typedef {Object} SignalPath
 * @property {string} d            SVG quadratic path in the 0–100 viewBox.
 * @property {string} color        Stroke color (bespoke alpha, kept literal).
 * @property {number} duration     Signal dash animation duration in s (3B.2).
 */

/** @type {OrbitNode[]} */
export const orbitNodes = [
  { top: '11%', left: '47%', size: 11, color: 'green', depth: 3.3, beatDuration: 2.6, beatDelay: 0 },
  { top: '29%', left: '20%', size: 9, color: 'green', depth: 3.7, beatDuration: 3.1, beatDelay: -0.6 },
  { top: '15%', left: '69%', size: 10, color: 'amber', depth: 3.0, beatDuration: 2.8, beatDelay: -1.2 },
  { top: '49%', left: '92%', size: 11, color: 'amber', depth: 2.7, beatDuration: 3.3, beatDelay: -0.3 },
  { top: '63%', left: '13%', size: 9, color: 'green', depth: 3.4, beatDuration: 2.7, beatDelay: -1.6 },
  { top: '60%', left: '62%', size: 8, color: 'green', depth: 2.5, beatDuration: 3.0, beatDelay: -0.9 },
  { top: '89%', left: '48%', size: 9, color: 'green', depth: 2.0, beatDuration: 3.5, beatDelay: -1.1 },
];

/** @type {SignalPath[]} */
export const signalPaths = [
  { d: 'M28,24 Q40,38 46,45', color: 'rgba(18,136,106,0.55)', duration: 2.6 },
  { d: 'M74,28 Q60,40 54,45', color: 'rgba(204,134,54,0.55)', duration: 3.1 },
  { d: 'M72,74 Q60,60 54,54', color: 'rgba(18,136,106,0.55)', duration: 2.9 },
  { d: 'M26,72 Q40,60 46,54', color: 'rgba(18,136,106,0.42)', duration: 3.4 },
];
