'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { type BookFormSchema, bookFormSchema } from 'data/book-form-schema';
import { addMinutes, differenceInMinutes, format } from 'date-fns';
import { isNil, isNotNil } from 'es-toolkit';
import { isEmpty } from 'es-toolkit/compat';
import { useMemo } from 'react';
import { type DateValue, Form } from 'react-aria-components';
import { type FieldErrors, useForm } from 'react-hook-form';
import { useLocalStorage } from 'react-use';
import { postCalcomBooking } from 'services/cal-com';
import type { TCalendarAvailabilities } from 'types/calendar';
import { toastQueue } from '@/layout/toast-notification/subs/toast-queue';
import { Button } from '@/ui/buttons/button/button';
import { SelectOption } from '@/ui/fields/select-field/select-option';
import { FormTextAreaField } from '../../../../ui/form-fields/form-text-area-field/form-text-area-field';
import { FormTextField } from '../../../../ui/form-fields/form-text-field/form-text-field';
import { FormCalendarField } from './form-calendar-field';
import { FormDateField } from './form-date-field';
import { FormSelectField } from './form-select-field';

type TProps = {
  availablePhases: string[];
  availableSlots: TCalendarAvailabilities;
};

type TLastBookingDetails = {
  timestamp: string;
  bookedSlot: string;
};

export const BookModuleForm = ({ availableSlots, availablePhases }: TProps) => {
  const [lastBookingTimestamp, setLastBookingTimestamp] = useLocalStorage<TLastBookingDetails>(
    'last-booking-timestamp',
    null
  );
  const {
    handleSubmit,
    control,
    watch,
    getValues,
    formState: { isSubmitting }
  } = useForm<BookFormSchema>({
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

    return availableSlots.availableSlots[appointmentDate.toString()] ?? [];
  }, [appointmentDate, availableSlots]);

  const onValid = async (data: BookFormSchema) => {
    if (isNotNil(lastBookingTimestamp?.bookedSlot) && isNotNil(lastBookingTimestamp.timestamp)) {
      const lastBookingTimestampDate = new Date(lastBookingTimestamp.timestamp);
      const bookedSlotDate = format(lastBookingTimestamp.bookedSlot, "dd/MM/yyyy 'at' hh:mm");
      const diff = differenceInMinutes(new Date(), lastBookingTimestampDate);

      if (
        diff < 15 &&
        !confirm(
          `You have already booked an appointment for ${bookedSlotDate} within the last 15 minutes. Would you like to book another appointment?`
        )
      ) {
        return;
      }
    }
    const { deadlineDate, ...bookingData } = data;
    const intlOptions = Intl.DateTimeFormat().resolvedOptions();
    const result = await postCalcomBooking(bookingData, deadlineDate?.toString(), {
      language: intlOptions.locale,
      timeZone: intlOptions.timeZone
    });

    if (result) {
      setLastBookingTimestamp({ timestamp: new Date().toISOString(), bookedSlot: bookingData.appointmentSlot });
      toastQueue.add(
        {
          kind: 'success',
          title: 'Booking successful',
          description: `Your booking for ${format(bookingData.appointmentSlot, "dd/MM/yyyy 'at' hh:mm")} has been created`
        },
        { timeout: 5000 }
      );
    } else {
      toastQueue.add(
        {
          kind: 'error',
          title: 'Booking failed',
          description: 'There was an error creating your booking, please try again'
        },
        { timeout: 5000 }
      );
    }
  };

  const onInvalid = (errors: FieldErrors<BookFormSchema>) => {
    console.log(errors);
    console.log(getValues());
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
    <Form
      onSubmit={handleSubmit(onValid, onInvalid)}
      className='xl:mr-0 flex flex-col pt-4 gap-4 w-full max-w-2xl mx-auto'
    >
      <div className='flex flex-col sm:grid sm:grid-cols-2 gap-4'>
        <FormTextField control={control} type='text' label='Full name' name='fullName' isRequired={true} />
        <FormTextField control={control} type='tel' label='Phone number' name='phoneNumber' isRequired={true} />
      </div>
      <FormTextField control={control} type='email' label='Email' name='email' isRequired={true} />
      <div className='flex flex-col sm:grid sm:grid-cols-2 gap-4'>
        <FormCalendarField
          control={control}
          isRequired={true}
          name='appointmentDate'
          label='Appointment Date'
          isDateUnavailable={handleIsDateUnavailable}
        />
        <FormSelectField control={control} name='appointmentSlot' label='Appointment slot' isRequired={true}>
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
      <FormTextField control={control} type='text' label='Company/Studio' name='companyStudio' isRequired={true} />
      <FormTextAreaField
        control={control}
        label='Whats the project about?'
        name='projectAbout'
        rows={4}
        isRequired={true}
      />
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
        <Button
          type='submit'
          className='min-w-2xs mt-10'
          size='large'
          variant='primary'
          surface='bg'
          isDisabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </div>
    </Form>
  );
};
