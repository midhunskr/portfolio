/**
 * Contact-confirmation email — sent to the visitor right after a
 * successful contact-form submission. A personal acknowledgement, not
 * a marketing template: table-based layout + inline styles throughout
 * (the only reliable way to render consistently across Gmail, Outlook,
 * and Apple Mail — none of them support external/embedded CSS
 * reliably). Colors/radius are the portfolio's own token values,
 * hand-copied here since email HTML can't reference styles/tokens.css.
 *
 * lib/contact.js imports and calls buildContactConfirmationEmail() —
 * the Server Action never constructs markup itself.
 */

const COLOR_CREAM = '#F4F0E8';
const COLOR_INK = '#1B1A16';
const COLOR_INK_MUTED = '#57534B';
const COLOR_INK_FAINT = '#908B80';
const COLOR_GREEN = '#12886A';
const BORDER = 'rgba(27, 26, 22, 0.10)';
const RADIUS = '20px';
const FONT_SANS =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const FONT_MONO =
  "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace";

const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/midhunsankar199/' },
  { label: 'Instagram', href: 'https://instagram.com/midhun.builds' },
  { label: 'WhatsApp', href: 'https://wa.me/919539588810' },
];

/**
 * Escapes text for safe interpolation into the HTML email body.
 * @param {string} value
 */
function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function summaryRow(label, value, isLast) {
  return `
    <tr>
      <td style="padding: 0 0 ${isLast ? '0' : '14px'} 0; font-family: ${FONT_MONO}; font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase; color: ${COLOR_INK_FAINT};">
        ${label}
      </td>
    </tr>
    <tr>
      <td style="padding: 2px 0 ${isLast ? '0' : '18px'} 0; font-family: ${FONT_SANS}; font-size: 15px; color: ${COLOR_INK};">
        ${value}
      </td>
    </tr>
  `;
}

/**
 * @param {{ name: string, email: string, mobile: string }} payload
 * @returns {{ subject: string, html: string, text: string }}
 */
export function buildContactConfirmationEmail({ name, email, mobile }) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMobile = mobile ? escapeHtml(mobile) : '—';

  const socialLinksHtml = SOCIAL_LINKS.map(
    (s) =>
      `<a href="${s.href}" style="color: ${COLOR_INK_FAINT}; text-decoration: none; font-size: 12px;">${s.label}</a>`
  ).join(
    `<span style="color: ${BORDER}; font-size: 12px; padding: 0 10px;">&middot;</span>`
  );

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Thanks for reaching out</title>
</head>
<body style="margin: 0; padding: 0; background-color: #EFEADF; font-family: ${FONT_SANS};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #EFEADF;">
    <tr>
      <td align="center" style="padding: 40px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width: 100%; max-width: 600px; background-color: ${COLOR_CREAM}; border: 1px solid ${BORDER}; border-radius: ${RADIUS};">
          <tr>
            <td style="padding: 44px 40px 36px 40px;">

              <!-- Badge -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="40" height="40" style="width: 40px; height: 40px; background-color: ${COLOR_INK}; border-radius: 11px; text-align: center; vertical-align: middle; font-family: ${FONT_SANS}; font-weight: 700; font-size: 14px; color: ${COLOR_CREAM};">
                    MS
                  </td>
                </tr>
              </table>

              <!-- Heading -->
              <div style="margin: 28px 0 24px 0; font-family: ${FONT_SANS}; font-weight: 700; font-size: 28px; line-height: 1.15; letter-spacing: -0.02em; color: ${COLOR_INK};">
                Thanks for reaching out.
              </div>

              <!-- Body copy -->
              <p style="margin: 0 0 18px 0; font-family: ${FONT_SANS}; font-size: 15px; line-height: 1.65; color: ${COLOR_INK};">
                Hi ${safeName},
              </p>
              <p style="margin: 0 0 18px 0; font-family: ${FONT_SANS}; font-size: 15px; line-height: 1.65; color: ${COLOR_INK_MUTED};">
                Thank you for taking the time to contact me through my portfolio.
              </p>
              <p style="margin: 0 0 18px 0; font-family: ${FONT_SANS}; font-size: 15px; line-height: 1.65; color: ${COLOR_INK_MUTED};">
                I've received your message safely and I'll personally review it.
              </p>
              <p style="margin: 0 0 32px 0; font-family: ${FONT_SANS}; font-size: 15px; line-height: 1.65; color: ${COLOR_INK_MUTED};">
                If your enquiry is a good fit, I'll get back to you as soon as possible &mdash; usually within 1&ndash;2 business days.
              </p>

              <!-- Summary card -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border: 1px solid ${BORDER}; border-radius: 14px;">
                <tr>
                  <td style="padding: 24px 24px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      ${summaryRow('Name', safeName)}
                      ${summaryRow('Email', safeEmail)}
                      ${summaryRow('Mobile', safeMobile, true)}
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Closing -->
              <p style="margin: 32px 0 26px 0; font-family: ${FONT_SANS}; font-size: 15px; line-height: 1.65; color: ${COLOR_INK_MUTED};">
                Looking forward to speaking with you.
              </p>

              <p style="margin: 0 0 2px 0; font-family: ${FONT_SANS}; font-size: 15px; color: ${COLOR_INK};">
                &mdash;
              </p>
              <p style="margin: 0 0 2px 0; font-family: ${FONT_SANS}; font-weight: 700; font-size: 16px; color: ${COLOR_INK};">
                Midhun Shankar
              </p>
              <p style="margin: 0 0 2px 0; font-family: ${FONT_SANS}; font-size: 13px; color: ${COLOR_INK_MUTED};">
                Product Designer &amp; Frontend Developer
              </p>
              <p style="margin: 0 0 2px 0; font-family: ${FONT_SANS}; font-size: 13px;">
                <a href="mailto:hello@midhunshankar.me" style="color: ${COLOR_GREEN}; text-decoration: none;">hello@midhunshankar.me</a>
              </p>
              <p style="margin: 0; font-family: ${FONT_SANS}; font-size: 13px;">
                <a href="https://www.midhunshankar.me" style="color: ${COLOR_GREEN}; text-decoration: none;">www.midhunshankar.me</a>
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 22px 40px; border-top: 1px solid ${BORDER}; text-align: center;">
              ${socialLinksHtml}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  const text = [
    'Thanks for reaching out.',
    '',
    `Hi ${name},`,
    '',
    "Thank you for taking the time to contact me through my portfolio.",
    "I've received your message safely and I'll personally review it.",
    "If your enquiry is a good fit, I'll get back to you as soon as possible — usually within 1–2 business days.",
    '',
    '— Your submission —',
    `Name: ${name}`,
    `Email: ${email}`,
    `Mobile: ${mobile || '—'}`,
    '',
    'Looking forward to speaking with you.',
    '',
    '—',
    'Midhun Shankar',
    'Product Designer & Frontend Developer',
    'hello@midhunshankar.me',
    'https://www.midhunshankar.me',
    '',
    SOCIAL_LINKS.map((s) => `${s.label}: ${s.href}`).join('\n'),
  ].join('\n');

  return {
    subject: "Thanks for reaching out — I've received your message",
    html,
    text,
  };
}
