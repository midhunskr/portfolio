/**
 * Capabilities tab content — Design / Develop / Automate panels.
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
 * @property {'green'|'amber'|'code'} iconTone
 * @property {string} title
 * @property {string} description
 * @property {string} skillsLabel  e.g. "What it includes" / "The stack".
 * @property {string[]} tags
 * @property {CapabilitySide[]} side
 */

/** @type {Capability[]} */
export const capabilities = [
  {
    key: 'design',
    tabLabel: 'Design',
    icon: '✦',
    iconTone: 'green',
    title: 'Design the experience',
    description:
      'Research-led product design — turning ambiguity into clear, usable systems people understand at a glance.',
    skillsLabel: 'What it includes',
    tags: [
      'UX Research',
      'Wireframing',
      'Information Architecture',
      'Interaction Design',
      'Design Systems',
      'Prototyping',
    ],
    side: [
      {
        eyebrow: 'The process',
        tone: 'green',
        steps: ['Discover', 'Define', 'Design', 'Validate'],
      },
      {
        eyebrow: 'Seen in',
        tone: 'muted',
        text: 'LifeOS · Concept Product Case Study · Credit Card Landing Page',
      },
    ],
  },
  {
    key: 'develop',
    tabLabel: 'Develop',
    icon: '</>',
    iconTone: 'code',
    title: 'Build the product',
    description:
      'Translating design into fast, accessible, production-ready interfaces — with a real component system behind them.',
    skillsLabel: 'The stack',
    tags: [
      'React',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Responsive',
      'Component Systems',
    ],
    side: [
      {
        eyebrow: 'The process',
        tone: 'green',
        steps: ['Structure', 'Build', 'Polish', 'Ship'],
      },
      {
        eyebrow: 'Seen in',
        tone: 'muted',
        text: 'LifeOS · Credit Card Landing Page · Design-to-Code Experiment',
      },
    ],
  },
  {
    key: 'automate',
    tabLabel: 'Automate',
    icon: '⚡',
    iconTone: 'amber',
    title: 'Automate the workflow',
    description:
      'Removing repetitive work with AI tools, APIs and automation pipelines that quietly run in the background.',
    skillsLabel: 'The toolkit',
    tags: [
      'n8n',
      'OpenAI API',
      'Prompt Engineering',
      'Process Automation',
      'AI-Assisted Dev',
    ],
    side: [
      {
        eyebrow: 'The process',
        tone: 'amber',
        steps: ['Map', 'Integrate', 'Automate', 'Optimise'],
      },
      {
        eyebrow: 'Seen in',
        tone: 'muted',
        text: 'AI Workflow Automation System · Design-to-Code Experiment',
      },
    ],
  },
];
