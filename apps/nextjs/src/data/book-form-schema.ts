import type { CalendarDate } from '@internationalized/date';
import { isNotNil } from 'es-toolkit';
import { z } from 'zod';

export const bookFormSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  phoneNumber: z.string().regex(/^[0-9-+\s]+$/, { error: 'Phone number is not valid' }),
  email: z.email('Email is not valid'),
  appointmentDate: z.custom<CalendarDate>(x => isNotNil(x), { error: 'Appointment date is required' }),
  appointmentSlot: z.string({ error: 'Appoint slot is required' }).min(1, 'Appointment slot is required'),
  companyStudio: z.string().min(1, 'Company/Studio is required'),
  projectAbout: z.string().min(1, 'Project description is required'),
  deadlineDate: z.custom().nullable(),
  projectPhase: z.string().nullable(),
  reason: z.string().optional()
});

export type BookFormSchema = z.infer<typeof bookFormSchema>;
