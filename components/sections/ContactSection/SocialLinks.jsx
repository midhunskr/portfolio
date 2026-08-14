import styles from './SocialLinks.module.css';

/* Stroke-icon helper — matches the same Feather-style inline SVG
   convention already used by the Hero's FloatingCards icons. */
function StrokeIcon({ children }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const InstagramIcon = (
  <StrokeIcon>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </StrokeIcon>
);

const LinkedInIcon = (
  <StrokeIcon>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </StrokeIcon>
);

const MailIcon = (
  <StrokeIcon>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </StrokeIcon>
);

const WhatsAppIcon = (
  <StrokeIcon>
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </StrokeIcon>
);

const socialLinks = [
  { label: 'Instagram', href: 'https://instagram.com/midhun.builds', icon: InstagramIcon, external: true },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/midhunsankar199/', icon: LinkedInIcon, external: true },
  { label: 'Email', href: 'mailto:hello@midhunshankar.me', icon: MailIcon, external: false },
  { label: 'WhatsApp', href: 'https://wa.me/919539588810', icon: WhatsAppIcon, external: true },
];

/**
 * Icon-only social row for the Contact section's footer bar. Keyboard
 * accessible, aria-labelled per link since the icons carry no visible
 * text. Section-specific — not a components/ui primitive.
 */
export function SocialLinks() {
  return (
    <div className={styles.row}>
      {socialLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          aria-label={link.label}
          data-cursor
          className={styles.link}
          {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
}
