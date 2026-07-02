/**
 * Project / case-study content.
 *
 * Phase 1: placeholder structure + typedefs only. Real content is
 * migrated in Phase 5. See data/schema.md for the full contract.
 *
 * @typedef {'lifeos'|'card'|'flow'|'code'|'phone'} MockKind
 * @typedef {'today'|'tasks'|'calendar'|'habits'|'ada'|'insights'} ScreenKind
 *
 * @typedef {Object} ProjectNarrative
 * @property {string} challenge
 * @property {string} approach
 * @property {string} process
 * @property {string} solution
 * @property {string} outcome
 *
 * @typedef {Object} ShowcaseFeature
 * @property {string} num         Two-digit ordinal, e.g. "01".
 * @property {string} title
 * @property {string} description
 * @property {ScreenKind} screen  Which LifeOS mock screen renders alongside.
 *
 * @typedef {Object} Showcase
 * @property {string} [liveUrl]
 * @property {string} summary
 * @property {ShowcaseFeature[]} features
 * @property {string[]} tech
 * @property {string} hero        Hero-composition key for the dark band.
 *
 * @typedef {Object} Project
 * @property {string} slug
 * @property {string} order       Two-digit ordinal, e.g. "01".
 * @property {string} name
 * @property {string} category
 * @property {string} tagline
 * @property {ProjectNarrative} narrative
 * @property {string[]} tags
 * @property {MockKind} mock
 * @property {Showcase} [showcase]
 */

/** @type {Project[]} */
export const projects = [
  // Placeholder — real projects migrated in Phase 5.
];
