import { FloatingCard } from './FloatingCard';

/* Stroke-icon helper — matches the reference Feather-style inline SVGs. */
function StrokeIcon({ size = 10, sw = 2, children }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={sw}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

/* ── Main card icons (16px) ───────────────────────────── */
const DesignIcon = (
  <StrokeIcon size={16} sw={1.7}>
    <path d="M12 19l7-7 3 3-7 7-3-3z" />
    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
    <path d="M2 2l7.586 7.586" />
    <circle cx="11" cy="11" r="1.6" />
  </StrokeIcon>
);

const AutomationIcon = (
  <StrokeIcon size={16} sw={1.7}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </StrokeIcon>
);

const DevIcon = (
  <StrokeIcon size={16} sw={1.9}>
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </StrokeIcon>
);

const ToolsIcon = (
  <StrokeIcon size={16} sw={1.7}>
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </StrokeIcon>
);

/* ── Skill icons (10px) ───────────────────────────────── */
const SearchIcon = (
  <StrokeIcon>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </StrokeIcon>
);
const PenIcon = (
  <StrokeIcon>
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
  </StrokeIcon>
);
const GridIcon = (
  <StrokeIcon>
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </StrokeIcon>
);
const WorkflowIcon = (
  <StrokeIcon>
    <polyline points="16 3 21 3 21 8" />
    <line x1="4" y1="20" x2="21" y2="3" />
    <polyline points="21 16 21 21 16 21" />
    <line x1="15" y1="15" x2="21" y2="21" />
  </StrokeIcon>
);
const SettingsIcon = (
  <StrokeIcon>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
  </StrokeIcon>
);
const CpuIcon = (
  <StrokeIcon>
    <rect x="2" y="6" width="20" height="12" rx="2" />
    <path d="M6 12h.01M10 12h.01M14 12h.01" />
  </StrokeIcon>
);
const CodeIcon = (
  <StrokeIcon>
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </StrokeIcon>
);
const AtomIcon = (
  <StrokeIcon>
    <circle cx="12" cy="12" r="3" />
    <circle cx="12" cy="12" r="9" />
    <line x1="3" y1="12" x2="21" y2="12" />
  </StrokeIcon>
);
const TailwindSkillIcon = (
  <StrokeIcon>
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44A2.5 2.5 0 0 1 4.5 17h15a2.5 2.5 0 0 1 .44 4.96A2.5 2.5 0 0 1 17 19.5V4.5A2.5 2.5 0 0 1 19.5 2h-10z" />
  </StrokeIcon>
);

/* Tailwind wordmark glyph for the tools row (filled, not stroked). */
const TailwindGlyph = (
  <svg width="16" height="10" viewBox="0 0 24 14" fill="none" aria-hidden="true">
    <path
      d="M6 7c1-3 2.4-4.5 4.8-4.5C13.8 2.5 14 5 16 6c1.4.7 2.6.4 3.6-.6-1 3-2.4 4.5-4.8 4.5C11.8 9.4 11.6 6.9 9.6 6 8.2 5.3 7 5.6 6 7z"
      fill="currentColor"
    />
    <path
      d="M1.2 12.5c1-3 2.4-4.5 4.8-4.5C9 8 9.2 10.5 11.2 11.5c1.4.7 2.6.4 3.6-.6-1 3-2.4 4.5-4.8 4.5C7 15.4 6.8 12.9 4.8 12c-1.4-.7-2.6-.4-3.6.5z"
      fill="currentColor"
      opacity="0.5"
    />
  </svg>
);

/**
 * The four floating capability cards around the orbit stage.
 * Content and placement ported verbatim from the reference.
 */
export function FloatingCards() {
  return (
    <>
      <FloatingCard
        corner="tl"
        status="green"
        iconTone="green"
        icon={DesignIcon}
        title="Product Design"
        floatDuration={6.4}
        floatDelay={0}
        skills={[
          { icon: SearchIcon, label: 'User Research' },
          { icon: PenIcon, label: 'UI / UX Design' },
          { icon: GridIcon, label: 'Design Systems' },
        ]}
      />

      <FloatingCard
        corner="tr"
        status="amber"
        iconTone="amber"
        icon={AutomationIcon}
        title="AI Automation"
        floatDuration={7.1}
        floatDelay={-1.5}
        skills={[
          { icon: WorkflowIcon, label: 'Workflow Design' },
          { icon: SettingsIcon, label: 'n8n · Make' },
          { icon: CpuIcon, label: 'AI Integrations' },
        ]}
      />

      <FloatingCard
        corner="br"
        status="green"
        iconTone="green"
        icon={DevIcon}
        title="Development"
        floatDuration={6.8}
        floatDelay={-0.8}
        skills={[
          { icon: CodeIcon, label: 'Next.js' },
          { icon: AtomIcon, label: 'React' },
          { icon: TailwindSkillIcon, label: 'Tailwind CSS' },
        ]}
      />

      <FloatingCard
        corner="bl"
        iconTone="dark"
        icon={ToolsIcon}
        title="Tools I Use"
        titleTools
        floatDuration={7.4}
        floatDelay={-2.1}
        tools={[
          { kind: 'figma', label: 'Fi', title: 'Figma' },
          { kind: 'next', label: 'N', title: 'Next.js' },
          { kind: 'tw', node: TailwindGlyph, title: 'Tailwind' },
          { kind: 'n8n', label: 'n8', title: 'n8n' },
          { kind: 'more', label: '···' },
        ]}
      />
    </>
  );
}
