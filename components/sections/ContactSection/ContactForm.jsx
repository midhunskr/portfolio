'use client';

import { useState } from 'react';
import { contactFields, contactCta } from '@/data/contact';
import { submitContactForm } from '@/lib/contact';
import styles from './ContactForm.module.css';

/**
 * Contact form — replaces the email CTA. Submits via the
 * submitContactForm Server Action (lib/contact.js), which validates
 * with Zod and sends through Resend.
 *
 * Layout: single horizontal row (Name / Email / Mobile / CTA) on desktop,
 * wrapping naturally at tighter widths, explicit vertical stack on mobile.
 */
export function ContactForm() {
  const [values, setValues] = useState({ name: '', email: '', mobile: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  function handleChange(field) {
    return (e) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
    };
  }

  /**
   * @param {{ name: string, email: string, mobile: string }} payload
   */
  async function handleSubmit(payload) {
    setStatus('loading');
    setErrors({});
    setErrorMessage('');

    const result = await submitContactForm(payload);

    if (result.status === 'success') {
      setStatus('success');
      return;
    }

    if (result.fieldErrors) {
      setErrors(result.fieldErrors);
      setStatus('idle');
      return;
    }

    setErrorMessage(result.message);
    setStatus('error');
  }

  function onSubmit(e) {
    e.preventDefault();
    handleSubmit(values);
  }

  if (status === 'success') {
    return (
      <div className={styles.success} role="status">
        <span className={styles.successTitle}>Message sent.</span>
        <span className={styles.successBody}>
          Thanks for reaching out — I&apos;ll get back to you soon.
        </span>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      {contactFields.map((field) => (
        <Field
          key={field.name}
          field={field}
          value={values[field.name]}
          error={errors[field.name]}
          onChange={handleChange(field.name)}
        />
      ))}

      <button
        type="submit"
        className={styles.submit}
        disabled={status === 'loading'}
        aria-busy={status === 'loading'}
      >
        {status === 'loading' ? 'Sending…' : contactCta}
        <span className={styles.submitArrow}>→</span>
      </button>

      {status === 'error' ? (
        <span className={styles.formError} role="alert">
          {errorMessage}
        </span>
      ) : null}
    </form>
  );
}

/**
 * @param {{ field: import('@/data/contact').ContactField, value: string, error?: string, onChange: (e: any) => void }} props
 */
function Field({ field, value, error, onChange }) {
  const id = `contact-${field.name}`;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className={styles.fieldGroup}>
      <label className={styles.label} htmlFor={id}>
        {field.label}
        {field.required ? <span className={styles.required}>*</span> : null}
      </label>
      <input
        id={id}
        name={field.name}
        type={field.type}
        className={styles.input}
        placeholder={field.placeholder}
        autoComplete={field.autoComplete}
        inputMode={field.inputMode}
        required={field.required}
        aria-invalid={Boolean(error)}
        aria-describedby={errorId}
        value={value}
        onChange={onChange}
      />
      {error ? (
        <span id={errorId} className={styles.errorText}>
          {error}
        </span>
      ) : null}
    </div>
  );
}
