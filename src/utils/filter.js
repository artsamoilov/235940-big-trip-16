import {FilterType} from './const.js';
import dayjs from 'dayjs';

const isPastTripEvent = (tripEvent) => dayjs().isAfter(tripEvent.dateTo);

const isFutureTripEvent = (tripEvent) => dayjs().isBefore(tripEvent.dateFrom);

export const filter = {
  [FilterType.EVERYTHING]: (tripEvents) => tripEvents,
  [FilterType.PAST]: (tripEvents) => tripEvents.filter((tripEvent) => isPastTripEvent(tripEvent)),
  [FilterType.FUTURE]: (tripEvents) => tripEvents.filter((tripEvent) => isFutureTripEvent(tripEvent)),
};
