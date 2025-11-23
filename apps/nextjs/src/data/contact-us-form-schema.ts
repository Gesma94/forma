import { z } from 'zod';

export const contactUsFormSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  companyName: z.string().nullable(),
  email: z.email('Email is not valid'),
  message: z.string().min(1, 'Message is required')
});

export type ContactUsFormSchema = z.infer<typeof contactUsFormSchema>;
