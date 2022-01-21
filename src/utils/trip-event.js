import dayjs from 'dayjs';
import {TripEventType} from './const.js';

const Time = {
  HOURS_IN_DAY: 24,
  MINUTES_IN_HOUR: 60,
  MINUTES_IN_DAY: 1440,
};

const isCitiesEqual = (cityA, cityB) => cityA === cityB;

const isTimeEquals = (timeA, timeB) => dayjs(timeA).isSame(dayjs(timeB));

const isPriceEquals = (priceA, priceB) => priceA === priceB;

const isOffersEquals = (offersA, offersB) => JSON.stringify(offersA) === JSON.stringify(offersB);

export const isOnlyTypeChanged = (tripEventA, tripEventB) =>
  isCitiesEqual(tripEventA.destination.name, tripEventB.destination.name) &&
  isTimeEquals(tripEventA.dateFrom, tripEventB.dateFrom) &&
  isTimeEquals(tripEventA.dateTo, tripEventB.dateTo) &&
  isPriceEquals(tripEventA.basePrice, tripEventB.basePrice) &&
  isOffersEquals(tripEventA.offers, tripEventB.offers);

export const countTripEventsQuantityByType = (tripEvents, type) => {
  const filteredTripEvents = tripEvents.filter((tripEvent) => tripEvent.type === TripEventType[type]);
  return {
    totalQuantity: filteredTripEvents.length,
    eventType: type,
  };
};

export const countTripEventsMoney = (tripEvents, type) => {
  const filteredTripEvents = tripEvents.filter((tripEvent) => tripEvent.type === TripEventType[type]);
  return {
    totalMoney: filteredTripEvents.reduce((totalMoney, tripEvent) => totalMoney + tripEvent.basePrice, 0),
    eventType: type,
  };
};

export const countTripEventsTimeByType = (tripEvents, type) => {
  const filteredTripEvents = tripEvents.filter((tripEvent) => tripEvent.type === TripEventType[type]);
  return {
    totalTime: filteredTripEvents.reduce((totalTime, tripEvent) => totalTime + dayjs(tripEvent.dateTo).diff(dayjs(tripEvent.dateFrom), 'minutes'), 0),
    eventType: type,
  };
};

const addPaddingZero = (number) => number < 10 ? `0${number}` : number;

export const formatTimeDifference = (time) => {
  const minutesDifference = `${addPaddingZero(time % Time.MINUTES_IN_HOUR)}M`;
  const hoursDifference = Math.floor(time / Time.MINUTES_IN_HOUR) > 0 ? `${addPaddingZero(Math.floor(time / Time.MINUTES_IN_HOUR) % Time.HOURS_IN_DAY)}H ` : '';
  const daysDifference = Math.floor(time / Time.MINUTES_IN_DAY) > 0 ? `${addPaddingZero(Math.floor(time / Time.MINUTES_IN_DAY))}D ` : '';

  return daysDifference + hoursDifference + minutesDifference;
};
