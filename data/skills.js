/**
 * Skills constellation content — three clusters, each with tool nodes.
 *
 * @typedef {'design'|'develop'|'automate'} ClusterKey
 *
 * @typedef {Object} SkillCluster
 * @property {ClusterKey} key
 * @property {string} label
 * @property {string} color    Hub / line accent color.
 * @property {string} tint     Soft fill for the hub inner square.
 * @property {string[]} tools  Tool pill labels (5 per cluster).
 */

/** @type {SkillCluster[]} */
export const skillClusters = [
  {
    key: 'design',
    label: 'Design',
    color: '#12886A',
    tint: 'rgba(18, 136, 106, 0.14)',
    tools: ['Figma', 'UI / UX', 'Wireframing', 'Prototyping', 'Design Systems'],
  },
  {
    key: 'develop',
    label: 'Development',
    color: '#1B1A16',
    tint: 'rgba(27, 26, 22, 0.08)',
    tools: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'JavaScript'],
  },
  {
    key: 'automate',
    label: 'Automation',
    color: '#CC8636',
    tint: 'rgba(204, 134, 54, 0.16)',
    tools: ['n8n', 'OpenAI API', 'Prompt Eng.', 'Supabase', 'GitHub'],
  },
];

/**
 * Filter bar options for the constellation.
 * @type {{ key: string, label: string }[]}
 */
export const skillFilters = [
  { key: 'all', label: 'Whole system' },
  { key: 'design', label: 'Design' },
  { key: 'develop', label: 'Development' },
  { key: 'automate', label: 'Automation' },
];
