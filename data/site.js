/**
 * Site-wide content — identity, navigation, socials, contact.
 *
 * Phase 1: placeholder structure + typedefs only. Real content migrated
 * alongside the sections that consume it.
 *
 * @typedef {Object} NavLink
 * @property {string} label
 * @property {string} href        In-page anchor, e.g. "#work".
 * @property {boolean} [cta]      Renders as the dark pill CTA.
 *
 * @typedef {Object} SocialLink
 * @property {string} label
 * @property {string} href
 * @property {boolean} [external]
 *
 * @typedef {Object} ContactStage
 * @property {string} label
 * @property {string} color
 * @property {boolean} [final]
 *
 * @typedef {Object} SiteContent
 * @property {string} name
 * @property {string} logoInitial
 * @property {string} email
 * @property {string} location
 * @property {NavLink[]} nav
 * @property {SocialLink[]} socials
 * @property {ContactStage[]} contactPath
 */

/** @type {SiteContent} */
export const site = {
  name: '',
  logoInitial: '',
  email: '',
  location: '',
  nav: [],
  socials: [],
  contactPath: [],
};
