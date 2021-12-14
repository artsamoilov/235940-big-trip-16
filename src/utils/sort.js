import dayjs from 'dayjs';

export const sortTripEventsByDay = (tripEventA, tripEventB) => dayjs(tripEventA.dateFrom).diff(dayjs(tripEventB.dateFrom));

export const sortTripEventsByTime = (tripEventA, tripEventB) =>
  dayjs(tripEventA.dateFrom).diff(dayjs(tripEventA.dateTo)) - dayjs(tripEventB.dateFrom).diff(dayjs(tripEventB.dateTo));

export const sortTripEventsByPrice = (tripEventA, tripEventB) => tripEventB.basePrice - tripEventA.basePrice;
