import {FilterType} from './const.js';
import dayjs from 'dayjs';

const isPastTripEvent = ({dateFrom, dateTo}) => {
  const today = dayjs();
  const startDate = dayjs(dateFrom);
  const endDate = dayjs(dateTo);
  return endDate.isBefore(today) || startDate.isBefore(today) && endDate.isAfter(today);
};

const isFutureTripEvent = ({dateFrom, dateTo}) => {
  const today = dayjs();
  const startDate = dayjs(dateFrom);
  const endDate = dayjs(dateTo);
  return !startDate.isBefore(today) || startDate.isBefore(today) && endDate.isAfter(today);
};

export const filter = {
  [FilterType.EVERYTHING]: (tripEvents) => tripEvents,
  [FilterType.PAST]: (tripEvents) => tripEvents.filter((tripEvent) => isPastTripEvent(tripEvent)),
  [FilterType.FUTURE]: (tripEvents) => tripEvents.filter((tripEvent) => isFutureTripEvent(tripEvent)),
};
