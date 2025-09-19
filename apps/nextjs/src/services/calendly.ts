import { addDays, addMinutes } from 'date-fns';
import ky from 'ky';
import type { TCalendlyAvailableSlot, TCalendlyEventTypeAvailableTimesGetResponse } from 'types/calendly';

const kyCalendly = ky.create({
  hooks: {
    beforeRequest: [
      request => {
        request.headers.set('Authorization', `Bearer ${process.env.CALENDLY_ACCESS_TOKEN}`);
      }
    ]
  }
});

export async function getCalendlyDaysAvailableSlots(days: number): Promise<TCalendlyAvailableSlot[]> {
  const weeks = Math.ceil(days / 7);
  const startTime = addMinutes(new Date(), 5);

  const calendlyAvailableSlots = await Promise.all(
    Array.from({ length: weeks }).map(async (_, i) => {
      const requestStartTime = addDays(startTime, i * 7);
      const requestEndTime = addDays(requestStartTime, 7);
      const searchParams = new URLSearchParams({
        event_type: process.env.CALENDLY_EVENT_TYPE,
        start_time: requestStartTime.toISOString(),
        end_time: requestEndTime.toISOString()
      });

      const calendlyData = await kyCalendly
        .get<TCalendlyEventTypeAvailableTimesGetResponse>('https://api.calendly.com/event_type_available_times', {
          searchParams
        })
        .json();

      return calendlyData.collection.map<TCalendlyAvailableSlot>(x => ({
        date: new Date(x.start_time),
        inviteesRemaining: x.invitees_remaining,
        schedulingUrl: x.scheduling_url,
        startTime: x.start_time,
        status: x.status
      }));
    })
  );

  return calendlyAvailableSlots.flat();
}
