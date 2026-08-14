import { LegalPage } from '@/components/layout/LegalPage/LegalPage';
import { site } from '@/data/site';

/** @type {import('next').Metadata} */
export const metadata = {
  title: 'Privacy Policy',
  description:
    "How Midhun Shankar's portfolio collects, uses and protects the information you share through the contact form.",
  alternates: {
    canonical: '/privacy',
  },
  openGraph: {
    type: 'website',
    url: '/privacy',
    title: 'Privacy Policy · Midhun Shankar',
    description:
      "How Midhun Shankar's portfolio collects, uses and protects the information you share through the contact form.",
    siteName: 'Midhun Shankar',
    images: [site.ogImage],
  },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = 'August 15, 2026';

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrowNumber="—"
      eyebrowLabel="Privacy Policy"
      title="Privacy Policy"
      lastUpdated={LAST_UPDATED}
    >
      <h2>Introduction</h2>
      <p>
        This is a personal portfolio belonging to Midhun Shankar. This page
        explains, in plain language, what information this site collects when
        you get in touch, why it&apos;s collected, and how it&apos;s handled.
        There&apos;s no account system, no marketing list, and nothing
        collected beyond what&apos;s needed to reply to you.
      </p>

      <h2>Information We Collect</h2>
      <p>
        The only information collected is what you choose to submit through
        the contact form on this site:
      </p>
      <ul>
        <li>Your name</li>
        <li>Your email address</li>
        <li>Your mobile number, if you choose to share it</li>
      </ul>
      <p>
        Nothing else is collected through the form. There&apos;s no tracking
        of what you type before you submit it, and no fields exist beyond the
        three above.
      </p>

      <h2>Purpose of Collection</h2>
      <p>This information is used for exactly two things:</p>
      <ul>
        <li>Responding to your enquiry</li>
        <li>Ongoing professional communication, if a conversation follows</li>
      </ul>
      <p>
        Your details are never sold, rented, or shared with third parties for
        marketing purposes.
      </p>

      <h2>Email Delivery</h2>
      <p>
        When you submit the contact form, your message is processed and
        delivered using{' '}
        <a href="https://resend.com" target="_blank" rel="noopener noreferrer">
          Resend
        </a>
        , an email delivery service. Resend handles the transmission of your
        message to my inbox and the confirmation email sent back to you — it
        doesn&apos;t use your information for anything beyond that delivery.
      </p>

      <h2>Analytics</h2>
      <p>
        This site does not currently use any analytics tools. Google
        Analytics 4 (GA4) may be introduced in the future to understand
        anonymous visitor behaviour — for example, which pages are viewed and
        how visitors generally navigate the site. If and when GA4 is enabled,
        this policy will be updated first, and any data collected through it
        will be aggregated and anonymous — it won&apos;t identify you
        personally.
      </p>

      <h2>Cookies</h2>
      <p>
        Today, this site uses only essential cookies required for it to
        function correctly — nothing related to tracking or advertising. If
        GA4 analytics is enabled in the future, this section will be updated
        to explain the analytics cookies it uses and how you can opt out.
      </p>

      <h2>Data Retention</h2>
      <p>
        Messages submitted through the contact form are retained only for as
        long as needed to respond to your enquiry and maintain a reasonable
        record of professional correspondence. If you&apos;d like your
        information removed sooner, just ask — see the contact details below.
      </p>

      <h2>Your Rights</h2>
      <p>You can, at any time, ask to:</p>
      <ul>
        <li>See what information is held about you</li>
        <li>Have that information corrected</li>
        <li>Have that information deleted</li>
      </ul>
      <p>Just send a message to the email address below to make any of these requests.</p>

      <h2>Contact</h2>
      <p>
        Questions about this policy or your data can be sent to{' '}
        <a href="mailto:hello@midhunshankar.me">hello@midhunshankar.me</a>.
      </p>
    </LegalPage>
  );
}
