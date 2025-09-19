import {z} from "zod";

export const bookFormSchema = z.object({
    fullName: z.string().min(1, "Full name is required"),
    phoneNumber: z.e164("Phone number is not valid"),
    email: z.email("Email is not valid"),
    appointmentDate: z.string().regex(/^\d{2}-\d{2}-\d{2}$/, "Appointment date is not valid"),
    appointmentSlot: z.string().min(1, "Appointment slot is required"),
    companyStudio: z.string().min(1, "Company/Studio is required"),
    projectAbout: z.string().min(1, "Project description is required"),
    deadlineDate:z.string().regex(/^\d{2}-\d{2}-\d{2}$/, "Appointment date is not valid"),
    projectPhase: z.string().min(1, "Project phase is required"),
})

export type BookFormSchema = z.infer<typeof bookFormSchema>;