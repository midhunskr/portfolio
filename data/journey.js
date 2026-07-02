/**
 * Journey timeline content — the narrative arc (Curiosity → Product Building).
 *
 * Phase 1: placeholder structure + typedefs only. Real content in Phase 4.
 *
 * @typedef {'green'|'amber'|'light'} EyebrowTone
 *
 * @typedef {Object} JourneyStep
 * @property {string} eyebrow          Small label, e.g. "Milestone 01".
 * @property {EyebrowTone} tone        Eyebrow color tone.
 * @property {string} title
 * @property {string} body
 * @property {'left'|'right'} side      Which side the card sits on (desktop).
 * @property {'first'|'mid'|'last'} node Node style variant.
 * @property {boolean} [dark]          Renders the inverted dark card.
 */

/** @type {JourneyStep[]} */
export const journeySteps = [
  // Placeholder — real steps migrated in Phase 4.
];
