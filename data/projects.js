/**
 * Project / case-study content.
 *
 * Image convention: all project images live under
 *   /images/projects/{slug}/
 * Helper `img(slug, name)` builds the path so every reference
 * stays consistent and greppable.
 *
 * @typedef {Object} ProjectImage
 * @property {string} src     Path relative to /public, e.g. "/images/projects/lifeos/thumbnail.png"
 * @property {string} alt     Accessible description.
 * @property {number} width   Intrinsic width in px (for Next Image).
 * @property {number} height  Intrinsic height in px (for Next Image).
 *
 * @typedef {Object} ProjectNarrative
 * @property {string} challenge
 * @property {string} process
 * @property {string} solution
 * @property {string} outcome
 *
 * @typedef {Object} ShowcaseFeature
 * @property {string} num         Two-digit ordinal, e.g. "01".
 * @property {string} title
 * @property {string} description
 * @property {ProjectImage} image
 *
 * @typedef {Object} Showcase
 * @property {string} [liveUrl]
 * @property {string} summary
 * @property {ProjectImage} hero       Hero image for the showcase modal header.
 * @property {ShowcaseFeature[]} features
 * @property {string[]} tech
 *
 * @typedef {Object} Project
 * @property {string} slug          URL-safe identifier, matches asset folder name.
 * @property {string} order         Two-digit ordinal, e.g. "01".
 * @property {string} name
 * @property {string} category
 * @property {string} tagline
 * @property {ProjectNarrative} narrative
 * @property {string[]} tags
 * @property {ProjectImage} thumbnail  Card-row preview image.
 * @property {Showcase} [showcase]     Full case-study modal (only for deep projects).
 */

const img = (slug, name) => `/images/projects/${slug}/${name}`;

/** @type {Project[]} */
export const projects = [
  {
    slug: 'lifeos',
    order: '01',
    name: 'LifeOS',
    category: 'Personal Productivity Platform',
    tagline: 'A unified workspace for goals, tasks and daily workflows.',
    narrative: {
      challenge:
        'People juggle goals across a dozen disconnected apps and lose the thread between intention and action.',
      process:
        'Product strategy and UX research first, then UI design, then a frontend build with AI-assisted workflows woven in.',
      solution:
        'One calm, structured workspace that ties long-term goals to the tasks of the day.',
      outcome:
        'A coherent system a single user can actually keep up with — designed, built and shipped end-to-end.',
    },
    tags: [
      'Product Strategy',
      'UX Research',
      'UI Design',
      'Frontend',
      'AI Workflows',
    ],
    thumbnail: {
      src: img('lifeos', 'thumbnail.svg'),
      alt: 'LifeOS dashboard overview',
      width: 800,
      height: 600,
    },
    showcase: {
      liveUrl: 'https://www.getlifeos.cloud/',
      summary:
        'LifeOS is a full-stack personal productivity platform built to unify goals, tasks, habits, focus sessions and reflection in one calm workspace. Designed end-to-end — from research to shipped product.',
      hero: {
        src: img('lifeos', 'hero.png'),
        alt: 'LifeOS hero composition',
        width: 1400,
        height: 800,
      },
      features: [
        {
          num: '01',
          title: 'Dashboard',
          description:
            'Your entire day at a glance. Focus blocks, priorities, mood tracking, habits and quick capture — all wired together so nothing slips through.',
          image: {
            src: img('lifeos', 'feature-dashboard.png'),
            alt: 'LifeOS dashboard screen',
            width: 1200,
            height: 800,
          },
        },
        {
          num: '02',
          title: 'Task Management',
          description:
            'List, Kanban and Timeline views for organising and prioritising work with energy level estimates and time budgets.',
          image: {
            src: img('lifeos', 'feature-tasks.png'),
            alt: 'LifeOS task management screen',
            width: 1200,
            height: 800,
          },
        },
        {
          num: '03',
          title: 'Calendar',
          description:
            'Weekly planning with focus blocks, meetings and rest breaks. Schedule balance shown at a glance so every week stays intentional.',
          image: {
            src: img('lifeos', 'feature-calendar.png'),
            alt: 'LifeOS calendar screen',
            width: 1200,
            height: 800,
          },
        },
        {
          num: '04',
          title: 'Habit Tracking',
          description:
            'Build consistency with daily habits, streak tracking and weekly completion rates. Small routines, compounded over time.',
          image: {
            src: img('lifeos', 'feature-habits.png'),
            alt: 'LifeOS habit tracking screen',
            width: 1200,
            height: 800,
          },
        },
        {
          num: '05',
          title: 'Ada — AI Assistant',
          description:
            'Ada lives inside LifeOS. Summarise your day, plan tomorrow, find focus blocks or capture a thought — all in a single conversational interface.',
          image: {
            src: img('lifeos', 'feature-ada.png'),
            alt: 'LifeOS AI assistant Ada',
            width: 1200,
            height: 800,
          },
        },
        {
          num: '06',
          title: 'Insights',
          description:
            'Understand your energy patterns, mood distribution, burnout signals and habit consistency. Data that actually shapes how you plan.',
          image: {
            src: img('lifeos', 'feature-insights.png'),
            alt: 'LifeOS insights dashboard',
            width: 1200,
            height: 800,
          },
        },
      ],
      tech: [
        'Next.js',
        'React',
        'TypeScript',
        'Supabase',
        'PostgreSQL',
        'OpenAI',
        'Claude',
        'Framer Motion',
        'n8n',
        'Tailwind CSS',
      ],
    },
  },
  {
    slug: 'finx',
    order: '02',
    name: 'FinX',
    category: 'Fintech Conversion Page',
    tagline: 'A responsive marketing site built to convert.',
    narrative: {
      challenge:
        'Communicate dense credit-card benefits clearly while driving sign-ups.',
      process:
        'Landing-page architecture, clear visual hierarchy, responsive layout and SEO considerations.',
      solution:
        'A conversion-focused page where the value is obvious in seconds and the CTA never gets lost.',
      outcome:
        'A clean, fast, responsive funnel optimised around a single decisive action.',
    },
    tags: ['UX Design', 'Responsive', 'SEO', 'Conversion UI'],
    thumbnail: {
      src: img('finx', 'thumbnail.svg'),
      alt: 'FinX credit card landing page',
      width: 800,
      height: 600,
    },
  },
  {
    slug: 'skillgap-navigator',
    order: '03',
    name: 'SkillGap Navigator',
    category: 'Career Development Tool',
    tagline: 'Identify skill gaps and chart a learning path.',
    narrative: {
      challenge:
        'Professionals struggle to identify which skills to learn next for their career goals.',
      process:
        'User research, information architecture, then a clear UI that maps current skills against target roles.',
      solution:
        'An interactive tool that visualises skill gaps and recommends a prioritised learning path.',
      outcome:
        'A focused, actionable view that turns vague career ambition into a concrete plan.',
    },
    tags: [
      'UX Research',
      'Information Architecture',
      'UI Design',
      'Data Visualization',
    ],
    thumbnail: {
      src: img('skillgap-navigator', 'thumbnail.svg'),
      alt: 'SkillGap Navigator interface',
      width: 800,
      height: 600,
    },
  },
];
