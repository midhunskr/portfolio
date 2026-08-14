import { z } from 'zod';

/**
 * Contact form validation — single source of truth for the shape the
 * Server Action accepts. Field names match data/contact.js's
 * contactFields[].name so the action can map Zod's fieldErrors
 * straight into the form's `errors` state.
 */
export const contactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100, 'Name is too long'),
  email: z.string().trim().min(1, 'Email is required').email('Enter a valid email'),
  mobile: z.string().trim().max(30, 'Mobile number is too long').optional().or(z.literal('')),
});
