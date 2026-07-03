/**
 * Journey timeline content — the narrative arc (Curiosity → Product Building).
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
 * @property {boolean} [titleLg]       Uses the larger title size (28px).
 */

/** @type {JourneyStep[]} */
export const journeySteps = [
  {
    eyebrow: 'Where it began',
    tone: 'green',
    title: 'Curiosity',
    body: '"Why is this so clunky?" — a habit of taking products apart and believing they could be better.',
    side: 'left',
    node: 'first',
  },
  {
    eyebrow: 'Milestone 01',
    tone: 'green',
    title: 'Design',
    body: 'Research, hierarchy and interaction — learning to shape experiences people understand instantly.',
    side: 'right',
    node: 'mid',
  },
  {
    eyebrow: 'Milestone 02',
    tone: 'green',
    title: 'Development',
    body: 'React, Next.js & TypeScript — closing the gap between the mockup and the shipped product.',
    side: 'left',
    node: 'mid',
  },
  {
    eyebrow: 'Milestone 03',
    tone: 'amber',
    title: 'Automation',
    body: 'AI tools, APIs and n8n pipelines that quietly remove the repetitive parts of building.',
    side: 'right',
    node: 'mid',
  },
  {
    eyebrow: 'Today',
    tone: 'light',
    title: 'Product Building',
    titleLg: true,
    body: 'Design, build and automate held in one head — so ideas reach reality with far less lost in translation.',
    side: 'left',
    node: 'last',
    dark: true,
  },
];
