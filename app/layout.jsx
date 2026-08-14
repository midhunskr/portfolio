import { Bricolage_Grotesque, Hanken_Grotesk, JetBrains_Mono } from 'next/font/google';
import '@/styles/globals.css';
import { CursorFollower } from '@/components/layout/CursorFollower/CursorFollower';

/* next/font loads the three families and exposes each as a CSS variable,
   which styles/tokens.css maps onto --font-display / --font-sans / --font-mono. */
const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-bricolage',
  display: 'swap',
});

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-hanken',
  display: 'swap',
});

const jbMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jbmono',
  display: 'swap',
});

/** @type {import('next').Metadata} */
export const metadata = {
  metadataBase: new URL('https://midhunshankar.me'),
  title: {
    default: 'Midhun Shankar — Design · Build · Automate',
    template: '%s · Midhun Shankar',
  },
  description:
    'From the first idea to the launched product — one person across UX design, frontend development and AI-powered automation.',
  keywords: [
    'product designer',
    'frontend developer',
    'AI automation',
    'UX design',
    'Next.js',
    'portfolio',
  ],
  authors: [{ name: 'Midhun Shankar' }],
  creator: 'Midhun Shankar',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: '/',
    title: 'Midhun Shankar — Design · Build · Automate',
    description:
      'One person across UX design, frontend development and AI-powered automation.',
    siteName: 'Midhun Shankar',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Midhun Shankar — Design · Build · Automate',
    description:
      'One person across UX design, frontend development and AI-powered automation.',
  },
  robots: { index: true, follow: true },
};

/** @type {import('next').Viewport} */
export const viewport = {
  themeColor: '#F4F0E8',
  width: 'device-width',
  initialScale: 1,
};

/**
 * @param {{ children: import('react').ReactNode }} props
 */
export default function RootLayout({ children }) {
  const fontVars = `${bricolage.variable} ${hanken.variable} ${jbMono.variable}`;
  return (
    <html lang="en" className={fontVars}>
      <body>
        <CursorFollower />
        {children}
      </body>
    </html>
  );
}
