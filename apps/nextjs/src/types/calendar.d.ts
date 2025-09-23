export type TCalendarAvailabilities = {
  daysWithAvailability: TDayWithAvailabilityMap;
  availableSlots: TAvailableSlotMap;
};

type TDayWithAvailabilityMap = {
  [key: string]: boolean; // key in format "yyyy-mm-dd"
};

type TAvailableSlotMap = {
  [key: string]: Date[]; // key in format "yyyy-mm-dd"
};
