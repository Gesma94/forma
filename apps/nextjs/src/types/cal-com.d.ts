export type TCalComSlotsResponse = {
  status: 'success' | 'error';
  data: {
    [key: string]: Array<{ start: string }>;
  };
};

export type TCalComBookingResponse = {
  status: 'success' | 'error';
  data: unknown;
};
export type TCalComBookingClientOptions = {
  language: string;
  timeZone: string;
};
