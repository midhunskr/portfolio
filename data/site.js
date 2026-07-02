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
  name: 'Midhun Shankar',
  logoInitial: 'M',
  // email / location / socials / contactPath are migrated in Phase 8.
  email: '',
  location: '',
  // Nav content is migrated here in Phase 2 (Navbar). Mirrors the reference.
  nav: [
    { label: 'Work', href: '#work' },
    { label: 'Capabilities', href: '#capabilities' },
    { label: 'Process', href: '#process' },
    { label: "Let's talk", href: '#contact', cta: true },
  ],
  socials: [],
  contactPath: [],
};
