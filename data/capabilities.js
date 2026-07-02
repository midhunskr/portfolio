/**
 * Capabilities tab content — Design / Develop / Automate panels.
 *
 * Phase 1: placeholder structure + typedefs only. Real content in Phase 6.
 *
 * @typedef {'design'|'develop'|'automate'} CapabilityKey
 *
 * @typedef {Object} CapabilitySide
 * @property {string} eyebrow
 * @property {'green'|'amber'|'muted'} tone
 * @property {string[]} [steps]   Process step chain (arrow-separated in UI).
 * @property {string} [text]      Free text (e.g. "Seen in …").
 *
 * @typedef {Object} Capability
 * @property {CapabilityKey} key
 * @property {string} tabLabel
 * @property {string} icon         Glyph or marker for the header chip.
 * @property {string} title
 * @property {string} description
 * @property {string} skillsLabel  e.g. "What it includes" / "The stack".
 * @property {string[]} tags
 * @property {CapabilitySide[]} side
 */

/** @type {Capability[]} */
export const capabilities = [
  // Placeholder — real panels migrated in Phase 6.
];
