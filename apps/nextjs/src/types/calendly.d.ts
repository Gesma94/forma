export type TRawCalendlyAvailableSlot = {
  invitees_remaining: number;
  scheduling_url: string;
  start_time: string;
  status: 'available' | 'unavailable';
};

export type TCalendlyEventTypeAvailableTimesGetResponse = {
  collection: TRawCalendlyAvailableSlot[];
};

export type TCalendlyAvailableSlot = {
  inviteesRemaining: number;
  schedulingUrl: string;
  startTime: string;
  status: 'available' | 'unavailable';
  date: Date;
};
