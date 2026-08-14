/**
 * Contact form field configuration.
 *
 * @typedef {Object} ContactField
 * @property {string} name          Matches the payload key in handleSubmit.
 * @property {string} label
 * @property {'text'|'email'|'tel'} type
 * @property {string} placeholder
 * @property {string} autoComplete  Standard autocomplete token.
 * @property {boolean} required
 * @property {'text'|'email'|'tel'} [inputMode]  Mobile keyboard hint.
 */

/** @type {ContactField[]} */
export const contactFields = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    placeholder: 'Your name',
    autoComplete: 'name',
    required: true,
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'you@example.com',
    autoComplete: 'email',
    required: true,
  },
  {
    name: 'mobile',
    label: 'Mobile Number',
    type: 'tel',
    placeholder: '+1 (555) 000-0000',
    autoComplete: 'tel',
    inputMode: 'tel',
    required: false,
  },
];

export const contactCta = "Let's Talk";
