/**
 * Skills constellation content — three clusters, each with tool nodes.
 *
 * Phase 1: placeholder structure + typedefs only. Real content in Phase 6.
 *
 * @typedef {'design'|'develop'|'automate'} ClusterKey
 *
 * @typedef {Object} SkillCluster
 * @property {ClusterKey} key
 * @property {string} label
 * @property {string} color    Hub / line accent color.
 * @property {string} tint     Soft fill for the hub inner square.
 * @property {string[]} tools  Tool pill labels (5 per cluster in the original).
 */

/** @type {SkillCluster[]} */
export const skillClusters = [
  // Placeholder — real clusters migrated in Phase 6.
];

/**
 * Filter bar options for the constellation.
 * @type {{ key: string, label: string }[]}
 */
export const skillFilters = [
  // Placeholder — e.g. { key: 'all', label: 'Whole system' }, …
];
