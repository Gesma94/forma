import { CalendarDate } from '@internationalized/date';
import { z } from 'zod';

export const bookFormSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  phoneNumber: z.e164('Phone number is not valid'),
  email: z.email('Email is not valid'),
  appointmentDate: z.instanceof(CalendarDate, { error: 'Appointment date is required' }),
  appointmentSlot: z.string().min(1, 'Appointment slot is required'),
  companyStudio: z.string().min(1, 'Company/Studio is required'),
  projectAbout: z.string().min(1, 'Project description is required'),
  deadlineDate: z.string().regex(/^\\d{2}-\\d{2}-\\d{4}$/, { error: 'Deadline must be in the format DD-MM-YYYY' }),
  projectPhase: z.string().nullable()
});

export type BookFormSchema = z.infer<typeof bookFormSchema>;
