'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { type BookFormSchema, bookFormSchema } from 'data/book-form-schema';
import { addMinutes, format } from 'date-fns';
import { isNil } from 'es-toolkit';
import { isEmpty } from 'es-toolkit/compat';
import { useMemo, useState } from 'react';
import { type DateValue, Form } from 'react-aria-components';
import { type FieldErrors, useForm } from 'react-hook-form';
import { postCalcomBooking } from 'services/cal-com';
import type { TCalendarAvailabilities } from 'types/calendar';
import { Button } from '@/ui/buttons/button/button';
import { SelectOption } from '@/ui/fields/select-field/select-option';
import { FormDateField } from './form-date-field';
import { FormSelectField } from './form-select-field';
import { FormTextAreaField } from './form-text-area-field';
import { FormTextField } from './form-text-field';

type TProps = {
  availablePhases: string[];
  availableSlots: TCalendarAvailabilities;
};

export const BookModuleForm = ({ availableSlots, availablePhases }: TProps) => {
  const [_, setSubmitError] = useState(false);
  const { handleSubmit, control, watch } = useForm<BookFormSchema>({
    resolver: zodResolver(bookFormSchema),
    defaultValues: {
      fullName: '',
      phoneNumber: '',
      email: '',
      appointmentDate: null,
      appointmentSlot: null,
      companyStudio: '',
      projectAbout: '',
      deadlineDate: null,
      projectPhase: null
    }
  });

  const appointmentDate = watch('appointmentDate');

  const availableAppointmentSlots = useMemo(() => {
    if (isNil(appointmentDate)) {
      return [];
    }

    return availableSlots.availableSlots[appointmentDate.toString()];
  }, [appointmentDate, availableSlots]);

  const onValid = async (data: BookFormSchema) => {
    const { deadlineDate, ...bookingData } = data;
    const intlOptions = Intl.DateTimeFormat().resolvedOptions();
    setSubmitError(
      !(await postCalcomBooking(bookingData, deadlineDate.toString(), {
        language: intlOptions.locale,
        timeZone: intlOptions.timeZone
      }))
    );
  };

  const onInvalid = (errors: FieldErrors<BookFormSchema>) => {
    console.log(errors);
  };

  const handleIsDateUnavailable = (date: DateValue) => {
    return availableSlots.daysWithAvailability[date.toString()] !== true;
  };

  const getSlotLabel = (startTime: Date) => {
    const formatFn = (date: Date) => format(date, 'hh:mm a');
    return `${formatFn(startTime)} - ${formatFn(addMinutes(startTime, 30))}`;
  };

  const getEmptyAppointmentSlotLabel = () => {
    return isNil(appointmentDate) ? 'Select a date first' : 'No available slots for this date';
  };

  return (
    <Form onSubmit={handleSubmit(onValid, onInvalid)} className='flex flex-col pt-20 gap-4 w-full max-w-2xl mx-auto'>
      <div className='flex flex-col sm:grid sm:grid-cols-2 gap-4'>
        <FormTextField control={control} type='text' label='Full name' name='fullName' />
        <FormTextField control={control} type='tel' label='Phone number' name='phoneNumber' />
      </div>
      <FormTextField control={control} type='email' label='Email' name='email' />
      <div className='flex flex-col sm:grid sm:grid-cols-2 gap-4'>
        <FormDateField
          control={control}
          name='appointmentDate'
          label='Appointment Date'
          isDateUnavailable={handleIsDateUnavailable}
        />
        <FormSelectField control={control} name='appointmentSlot' label='Appointment slot'>
          {availableAppointmentSlots.map(x => (
            <SelectOption id={x.toISOString()} key={x.toISOString()}>
              {getSlotLabel(x)}
            </SelectOption>
          ))}
          {isEmpty(availableAppointmentSlots) && (
            <SelectOption isDisabled={true}>{getEmptyAppointmentSlotLabel()}</SelectOption>
          )}
        </FormSelectField>
      </div>
      <FormTextField control={control} type='text' label='Company/Studio' name='companyStudio' />
      <FormTextAreaField control={control} label='Whats the project about?' name='projectAbout' rows={4} />
      <div className='flex flex-col sm:grid sm:grid-cols-2 gap-4'>
        <FormDateField control={control} name='deadlineDate' label='When is the deadline?' />
        <FormSelectField control={control} name='projectPhase' label='In which phase is the project?'>
          {availablePhases.map(phase => (
            <SelectOption id={phase} key={phase}>
              {phase}
            </SelectOption>
          ))}
        </FormSelectField>
      </div>
      <div>
        <Button type='submit' className='min-w-2xs mt-10' size='large' variant='primary' surface='bg'>
          Submit
        </Button>
      </div>
    </Form>
  );
};
