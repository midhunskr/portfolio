import { LegalPage } from '@/components/layout/LegalPage/LegalPage';
import { site } from '@/data/site';

/** @type {import('next').Metadata} */
export const metadata = {
  title: 'Terms of Use',
  description:
    "The terms governing use of Midhun Shankar's portfolio — intellectual property, external links, and liability.",
  alternates: {
    canonical: '/terms',
  },
  openGraph: {
    type: 'website',
    url: '/terms',
    title: 'Terms of Use · Midhun Shankar',
    description:
      "The terms governing use of Midhun Shankar's portfolio — intellectual property, external links, and liability.",
    siteName: 'Midhun Shankar',
    images: [site.ogImage],
  },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = 'August 15, 2026';

export default function TermsPage() {
  return (
    <LegalPage
      eyebrowNumber="—"
      eyebrowLabel="Terms of Use"
      title="Terms of Use"
      lastUpdated={LAST_UPDATED}
    >
      <h2>Acceptance of Terms</h2>
      <p>
        By browsing this site or submitting the contact form, you&apos;re
        agreeing to the terms on this page. If something here doesn&apos;t
        sit right with you, the simplest option is to not use the site.
      </p>

      <h2>Purpose of This Site</h2>
      <p>
        This site exists to showcase Midhun Shankar&apos;s work as a product
        designer and frontend developer, and to make it easy for people to
        get in touch about potential projects or collaboration. It&apos;s a
        personal portfolio, not a commercial product or service.
      </p>

      <h2>Intellectual Property</h2>
      <p>
        Everything on this site — the design, layout, writing, code and
        original visuals — belongs to Midhun Shankar unless stated otherwise.
        You&apos;re welcome to browse and share links to it, but please
        don&apos;t copy, reproduce, or reuse the design or content as your
        own without asking first.
      </p>

      <h2>Client Work &amp; Trademarks</h2>
      <p>
        Case studies shown here describe real projects built for or with
        clients. Any product names, logos, or trademarks referenced belong to
        their respective owners and are shown only to describe the work
        accurately — their inclusion doesn&apos;t imply endorsement by, or
        affiliation with, those companies.
      </p>

      <h2>External Links</h2>
      <p>
        This site links out to other places — live project sites, social
        profiles, and similar. Those destinations are outside my control, and
        this site isn&apos;t responsible for their content, availability, or
        privacy practices. Links are provided for convenience, not as an
        endorsement of everything found there.
      </p>

      <h2>Disclaimer</h2>
      <p>
        This site and its content are provided as-is. While care is taken to
        keep everything accurate and up to date, there&apos;s no guarantee
        that all information here is complete, current, or error-free at any
        given moment.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        To the fullest extent permitted by law, Midhun Shankar isn&apos;t
        liable for any loss or damage arising from your use of this site,
        including anything resulting from downtime, inaccuracies, or reliance
        on the information presented here.
      </p>

      <h2>Changes to These Terms</h2>
      <p>
        These terms may be updated occasionally as the site evolves. The
        &ldquo;last updated&rdquo; date at the top of this page reflects the
        most recent revision — check back if you&apos;d like to stay current.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms can be sent to{' '}
        <a href="mailto:hello@midhunshankar.me">hello@midhunshankar.me</a>.
      </p>
    </LegalPage>
  );
}
