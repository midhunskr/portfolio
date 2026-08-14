'use server';

import { Resend } from 'resend';
import { contactSchema } from '@/lib/contact-schema';
import { buildContactConfirmationEmail } from '@/lib/email/contactConfirmation';

const resend = new Resend(process.env.RESEND_API_KEY);

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

/**
 * Submits the contact form: validates the payload, then sends a
 * notification email via Resend. Never throws — always returns a typed
 * result so the client can drive its status/error UI directly off it.
 *
 * @param {{ name: string, email: string, mobile: string }} payload
 * @returns {Promise<
 *   | { status: 'success' }
 *   | { status: 'error', fieldErrors: Record<string, string> }
 *   | { status: 'error', message: string }
 * >}
 */
export async function submitContactForm(payload) {
  const parsed = contactSchema.safeParse(payload);

  if (!parsed.success) {
    const fieldErrors = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (field && !fieldErrors[field]) fieldErrors[field] = issue.message;
    }
    return { status: 'error', fieldErrors };
  }

  const { name, email, mobile } = parsed.data;
  const submittedAt = new Date().toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata',
  });

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMobile = mobile ? escapeHtml(mobile) : '—';

  const html = `
    <div style="font-family: sans-serif; font-size: 15px; color: #1B1A16; line-height: 1.6;">
      <p><strong>Name:</strong> ${safeName}</p>
      <p><strong>Email:</strong> ${safeEmail}</p>
      <p><strong>Mobile:</strong> ${safeMobile}</p>
      <p><strong>Submitted from:</strong> midhunshankar.me</p>
      <p><strong>Timestamp:</strong> ${submittedAt}</p>
    </div>
  `.trim();

  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Mobile: ${mobile || '—'}`,
    `Submitted from: midhunshankar.me`,
    `Timestamp: ${submittedAt}`,
  ].join('\n');

  try {
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM,
      to: process.env.CONTACT_TO,
      replyTo: email,
      subject: `New message from ${name} — Portfolio contact form`,
      html,
      text,
    });

    if (error) {
      return { status: 'error', message: 'Something went wrong — please email me directly.' };
    }
  } catch {
    return { status: 'error', message: 'Something went wrong — please email me directly.' };
  }

  // Confirmation to the visitor is best-effort: the notification above
  // is what the returned status is about, so a failure here shouldn't
  // turn a successful submission into an error the visitor sees.
  try {
    const confirmation = buildContactConfirmationEmail({ name, email, mobile });
    await resend.emails.send({
      from: process.env.CONTACT_FROM,
      to: email,
      replyTo: process.env.CONTACT_TO,
      subject: confirmation.subject,
      html: confirmation.html,
      text: confirmation.text,
    });
  } catch {
    // swallow — owner notification already succeeded, which is what matters.
  }

  return { status: 'success' };
}
