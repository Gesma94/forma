'use server';

import type { BookFormSchema } from 'data/book-form-schema';
import { addDays, format } from 'date-fns';
import { isNotNil } from 'es-toolkit';
import ky, { isHTTPError, isKyError, isTimeoutError } from 'ky';
import type { TCalComBookingClientOptions, TCalComBookingResponse, TCalComSlotsResponse } from 'types/cal-com';
import type { TCalendarAvailabilities } from 'types/calendar';
import { postDiscord } from './discord';

const kyCalCom = ky.create({
  prefixUrl: 'https://api.cal.com/v2/',
  hooks: {
    beforeRequest: [
      request => {
        request.headers.set('authorization', `Bearer ${process.env.CAL_COM_API_KEY}`);
      }
    ]
  }
});

export async function getCalComAvailableSlots(days: number): Promise<TCalendarAvailabilities> {
  const startTime = new Date();
  const endTime = addDays(startTime, days);
  const searchParams = new URLSearchParams({
    end: endTime.toISOString(),
    start: startTime.toISOString(),
    eventTypeId: process.env.CAL_COM_EVENT_TYPE
  });

  const calComData = await kyCalCom
    .get<TCalComSlotsResponse>('slots', {
      headers: {
        'cal-api-version': '2024-09-04'
      },
      searchParams
    })
    .json();

  const result: TCalendarAvailabilities = {
    daysWithAvailability: Object.keys(calComData.data).reduce((acc, curr) => {
      acc[curr] = true;
      return acc;
    }, {}),
    availableSlots: Object.keys(calComData.data).reduce((acc, curr) => {
      acc[curr] = calComData.data[curr].map(x => new Date(x.start));
      return acc;
    }, {})
  };

  return result;
}

export async function postCalcomBooking(
  data: Omit<BookFormSchema, 'deadlineDate'>,
  deadlineDateIso: string,
  clientOptions: TCalComBookingClientOptions
): Promise<boolean> {
  // Early return when honeypot input is filled. We pretend the booking was successful
  if (data.reason !== '') {
    return true;
  }

  const calcomJson = {
    attendee: {
      language: clientOptions.language,
      timeZone: clientOptions.timeZone,
      name: data.fullName,
      email: data.email,
      phoneNumber: data.phoneNumber
    },
    start: data.appointmentSlot,
    eventTypeId: Number(process.env.CAL_COM_EVENT_TYPE),
    bookingFieldsResponses: {
      projectPhase: data.projectPhase ?? undefined,
      deadlineDate: isNotNil(deadlineDateIso) ? format(deadlineDateIso, 'yyyy-MM-dd') : undefined,
      companyStudioName: data.companyStudio,
      projectAbout: data.projectAbout ?? 'FAKE'
    }
  };

  try {
    const result = await kyCalCom
      .post<TCalComBookingResponse>('bookings', {
        headers: {
          'cal-api-version': '2024-08-13'
        },
        json: calcomJson
      })
      .json();

    return result.status === 'success';
  } catch (error) {
    if (isHTTPError(error)) {
      console.log(await error.response.json());
    } else if (isKyError(error)) {
      console.log(error);
    } else if (isTimeoutError(error)) {
      console.log('Timeout error during cal.com booking');
    }

    await postDiscord('⚠️ Cal.com booking failed! ⚠️', calcomJson);

    return false;
  }
}
