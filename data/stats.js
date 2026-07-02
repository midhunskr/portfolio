/**
 * Proof stats + testimonials content.
 *
 * Phase 1: placeholder structure + typedefs only. Real content in Phase 7.
 *
 * @typedef {Object} ProofStat
 * @property {number|string} value  Numeric for count-up, or a glyph like "∞".
 * @property {string} [suffix]      e.g. "+".
 * @property {boolean} [pad]        Zero-pad values below 10.
 * @property {boolean} [count]      Whether to animate a count-up.
 * @property {string} desc
 * @property {number} delay         Reveal delay in ms.
 *
 * @typedef {Object} Testimonial
 * @property {string} text
 * @property {string} name
 * @property {string} role
 * @property {boolean} [isPlaceholder] Keeps the dashed "Add quote" state.
 */

/** @type {ProofStat[]} */
export const proofStats = [
  // Placeholder — real stats migrated in Phase 7.
];

/** @type {Testimonial[]} */
export const testimonials = [
  // Placeholder — real / placeholder testimonials migrated in Phase 7.
];
