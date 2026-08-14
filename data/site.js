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
  email: 'hello@midhunshankar.me',
  location: 'Kerala, India',
  // Nav content is migrated here in Phase 2 (Navbar). Mirrors the reference.
  nav: [
    { label: 'Capabilities', href: '#capabilities' },
    { label: 'Work', href: '#work' },
    { label: 'Skills', href: '#skills' },
    { label: "Let's talk", href: '#contact', cta: true },
  ],
  socials: [
    {
      label: 'LinkedIn ↗',
      href: 'https://www.linkedin.com/in/midhunsankar199',
      external: true,
    },
    { label: 'Email ↗', href: 'mailto:hello@midhunshankar.me' },
  ],
  contactPath: [
    { label: 'Curiosity', color: '#908B80' },
    { label: 'Design', color: '#12886A' },
    { label: 'Development', color: '#1B1A16' },
    { label: 'Automation', color: '#CC8636' },
    { label: 'Build together', color: '#12886A', final: true },
  ],
};
