/**
 * Project / case-study content.
 *
 * Image convention: all project images live under
 *   /images/projects/{slug}/
 * Helper `img(slug, name)` builds the path so every reference
 * stays consistent and greppable.
 *
 * Asset structure per project:
 *   thumbnail.webp      — card-row preview + expanded accordion
 *   modal-hero.webp     — showcase modal header
 *   showcase-01..04.webp — walkthrough images inside modal
 *
 * @typedef {Object} ProjectImage
 * @property {string} src     Path relative to /public.
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
 * @typedef {Object} WalkthroughSection
 * @property {string} eyebrow      Short mono label, e.g. "Navigation".
 * @property {string} title        Large display headline for this section.
 * @property {string} description  Supporting paragraph.
 * @property {ProjectImage} image  The showcase image for this section.
 *
 * @typedef {Object} Showcase
 * @property {string} [liveUrl]
 * @property {string} summary
 * @property {ProjectImage} hero              Modal header image.
 * @property {WalkthroughSection[]} images    Walkthrough sections (eyebrow, title, description, image).
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
 * @property {ProjectImage} thumbnail  Card-row preview image (reused in expanded accordion).
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
      src: img('lifeos', 'thumbnail.webp'),
      alt: 'LifeOS dashboard overview',
      width: 1448,
      height: 1086,
    },
    showcase: {
      liveUrl: 'https://www.getlifeos.cloud/',
      summary:
        'LifeOS is a full-stack personal productivity platform built to unify goals, tasks, habits, focus sessions and reflection in one calm workspace. Designed end-to-end — from research to shipped product.',
      hero: {
        src: img('lifeos', 'modal-hero.webp'),
        alt: 'LifeOS hero composition',
        width: 1448,
        height: 1086,
      },
      images: [
        {
          eyebrow: 'Navigation',
          title: 'A workspace built around focus, not folders',
          description:
            'Every surface — goals, tasks, calendar, habits — lives behind a single calm navigation system, so context never gets lost switching between apps.',
          image: {
            src: img('lifeos', 'showcase-01.webp'),
            alt: 'LifeOS navigation and workspace layout',
            width: 1448,
            height: 1086,
          },
        },
        {
          eyebrow: 'Priorities',
          title: 'Know what matters before you open a single task',
          description:
            'Daily priorities surface automatically from your goals and calendar, so the first five minutes of the day are about doing — not deciding what to do.',
          image: {
            src: img('lifeos', 'showcase-02.webp'),
            alt: 'LifeOS task priorities and daily planning',
            width: 1536,
            height: 1024,
          },
        },
        {
          eyebrow: 'Calendar',
          title: 'A week that plans itself around your energy',
          description:
            'Focus blocks, meetings and rest sit side by side, giving you an honest picture of how the week is actually shaping up.',
          image: {
            src: img('lifeos', 'showcase-03.webp'),
            alt: 'LifeOS calendar and schedule view',
            width: 1448,
            height: 1086,
          },
        },
        {
          eyebrow: 'Habits & Insights',
          title: 'Consistency you can actually see',
          description:
            'Streaks, completion rates and energy patterns turn small daily habits into a long-term signal — instead of disappearing into a checklist.',
          image: {
            src: img('lifeos', 'showcase-04.webp'),
            alt: 'LifeOS habit tracking and analytics',
            width: 1448,
            height: 1086,
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
    slug: 'moro',
    order: '02',
    name: 'MORO',
    category: 'Food Ordering Platform',
    tagline:
      'A food ordering experience designed around discovery, consistency and effortless checkout across every screen.',
    narrative: {
      challenge:
        'Food apps default to listings — a wall of restaurants before anyone has decided what they actually want to eat.',
      process:
        'Product strategy and UX research first, then an interaction and design system built to stay consistent from a craving to a completed order.',
      solution:
        'A continuous journey from discovery to checkout, designed for Kochi, that carries the same structure across web, tablet and mobile.',
      outcome:
        'An ordering flow where every screen answers a question before it becomes a doubt — designed end-to-end.',
    },
    tags: [
      'Product Strategy',
      'UX Research',
      'Interaction Design',
      'Design System',
      'Responsive Design',
    ],
    thumbnail: {
      src: img('moro', 'thumbnail.webp'),
      alt: 'MORO food ordering app overview',
      width: 1536,
      height: 1024,
    },
    showcase: {
      summary:
        'Designed for Kochi, MORO turns discovering food into a continuous journey — from craving to checkout — through one consistent experience across web, tablet and mobile.',
      hero: {
        src: img('moro', 'hero.webp'),
        alt: 'MORO hero composition',
        width: 1536,
        height: 1024,
      },
      images: [
        {
          eyebrow: 'Discovery',
          title: "Start with what you're craving, not where you're ordering from.",
          description:
            'The home screen opens with intent instead of listings. Cuisine shortcuts, personalised recommendations and nearby favourites help people decide what they want before asking them to choose a restaurant.',
          image: {
            src: img('moro', 'food-discovery.webp'),
            alt: 'MORO home screen with cuisine shortcuts and recommendations',
            width: 1536,
            height: 1024,
          },
        },
        {
          eyebrow: 'Consistency',
          title: 'Every restaurant tells its story the same way.',
          description:
            'Menus, offers, delivery information and signatures stay in a familiar structure across every restaurant. Once people learn one page, they understand them all.',
          image: {
            src: img('moro', 'restaurant-discovery.webp'),
            alt: 'MORO restaurant page with menu and offers',
            width: 1536,
            height: 1024,
          },
        },
        {
          eyebrow: 'Decision',
          title: 'The cart answers questions before they become doubts.',
          description:
            "Order edits, applied offers and the final price stay visible together, so people always know what they're paying for. The goal wasn't adding more information — it was removing hesitation.",
          image: {
            src: img('moro', 'cart.webp'),
            alt: 'MORO cart with order edits and pricing',
            width: 1448,
            height: 1086,
          },
        },
        {
          eyebrow: 'Checkout',
          title: "The last step shouldn't feel like another journey.",
          description:
            'Delivery details, payment summary and confirmation are organised into one calm flow. Nothing changes unexpectedly, giving people confidence to complete their order without second-guessing.',
          image: {
            src: img('moro', 'checkout.webp'),
            alt: 'MORO checkout flow with delivery and payment summary',
            width: 1536,
            height: 1024,
          },
        },
      ],
      tech: [
        'Product Strategy',
        'UX Research',
        'Interaction Design',
        'Design System',
        'Responsive Design',
        'React',
        'Next.js',
      ],
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
