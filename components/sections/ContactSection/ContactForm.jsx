'use client';

import { useState } from 'react';
import { contactFields, contactCta } from '@/data/contact';
import styles from './ContactForm.module.css';

/**
 * Contact form — replaces the email CTA. UI only: submit logs the payload
 * and transitions straight to a success state. `handleSubmit` is isolated
 * so a future phase can swap its body for a real Server Action / Resend
 * call without touching the surrounding component.
 *
 * Layout: single horizontal row (Name / Email / Mobile / CTA) on desktop,
 * wrapping naturally at tighter widths, explicit vertical stack on mobile.
 */
export function ContactForm() {
  const [values, setValues] = useState({ name: '', email: '', mobile: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errors] = useState({});

  function handleChange(field) {
    return (e) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
    };
  }

  /**
   * @param {{ name: string, email: string, mobile: string }} payload
   */
  async function handleSubmit(payload) {
    // Phase 1: no backend. Future phase swaps this body for a Server
    // Action / Resend call — the payload shape and status transitions
    // below are already what that integration will need.
    console.log(payload);
    setStatus('success');
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
