'use client'

import { TextField } from "@/ui/fields/text-field/text-field"
import { DateValue, Form } from "react-aria-components"
import { SelectField } from "@/ui/fields/select-field/select-field"
import { SelectOption } from "@/ui/fields/select-field/select-option"
import { TextAreaField } from "@/ui/fields/text-area-field/text-area-field"
import { DateField } from "@/ui/fields/date-field/date-field"
import { TCalendlyAvailableSlot } from "types/calendly"
import { isSameDay } from "date-fns"
import { Button } from "@/ui/buttons/button/button"
import { FieldErrors, useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { bookFormSchema, BookFormSchema } from "data/book-form-schema"
import { sendBookEmail } from "actions/send-book-email"
import { useMemo, useState } from "react"
import { FormTextField } from "./form-text-field"
import { BookModuleDocumentType } from "types/generated/sanity-types-generated"

type TProps = {
    availableSlots: TCalendlyAvailableSlot[];
}

export const BookModuleForm = ({ availableSlots }: TProps) => {
    const [submitError, setSubmitError] = useState(false);
    const { handleSubmit, control, watch, formState: { isValid } } = useForm<BookFormSchema>({
        resolver: zodResolver(bookFormSchema),
        defaultValues: {
            fullName: '',
            phoneNumber: '',
            email: '',
            appointmentDate: '',
            appointmentSlot: undefined,
            companyStudio: '',
            projectAbout: '',
            deadlineDate: '',
            projectPhase: undefined
        }
    })

    const appointmentDate = watch('appointmentDate');

    const availableAppointmentSlots = useMemo(() => {
        console.log("appointmentDate is: " + appointmentDate);
        return availableSlots.filter(x => isSameDay(x.date, new Date(appointmentDate)));
    }, [appointmentDate, availableSlots]);

    const onValid = async (data: BookFormSchema) => {
        setSubmitError(await sendBookEmail(data));
    }

    const onInvalid = (errors: FieldErrors<BookFormSchema>) => {
        console.log(errors);
    }

    const handleIsDateUnavailable = (date: DateValue) => {
        return !availableSlots.some(x => isSameDay(x.date, date.toString()));
    }

    return (
      <Form onSubmit={handleSubmit(onValid, onInvalid)} className="flex flex-col pt-20 gap-4 w-full max-w-2xl mx-auto">
        <div className='flex flex-col sm:grid sm:grid-cols-2 gap-4'>
            <FormTextField control={control} type="text" label='Full name' name='fullName' />
            <FormTextField control={control} type="tel" label='Phone number' name='phoneNumber' />
        </div>
            <FormTextField control={control} type="email" label='Email' name='email' />
        <div className='flex flex-col sm:grid sm:grid-cols-2 gap-4'>
            <DateField label='Appointment Date' isDateUnavailable={handleIsDateUnavailable} />
            <SelectField label='Appointment slot'>
                {availableAppointmentSlots.map(x => (
                <SelectOption>{x.startTime}</SelectOption>
                ))}
                {/* <SelectOption>Cat</SelectOption>
                <SelectOption>Dog</SelectOption>
                <SelectOption>Kangaroo</SelectOption>
                <SelectOption>Panda</SelectOption>
                <SelectOption>Snake</SelectOption> */}
            </SelectField>
        </div>
        <FormTextField control={control} type='text' label='Company/Studio' name='companyStudio' />
        <TextAreaField label='Whats the project about?' rows={4} />
        <div className='flex flex-col sm:grid sm:grid-cols-2 gap-4'>
            <DateField label='When is the deadline?' />
            <SelectField label='In which phase is the project?'>
                <SelectOption>Concept Development</SelectOption>
                <SelectOption>Design Development</SelectOption>
                <SelectOption>Presentation Submission</SelectOption>
                <SelectOption>Competition Submission</SelectOption>
                <SelectOption>Marketing</SelectOption>
            </SelectField>
        </div>
        <div>
            <Button type="submit" className='min-w-2xs mt-10' size='large' variant='primary' surface='bg'>
                Submit
            </Button>
        </div>
    </Form>)
}