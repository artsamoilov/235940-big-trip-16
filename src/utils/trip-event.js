import dayjs from 'dayjs';
import {TripEventType} from './const.js';

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

export const formatChartTime = (time) => {
  const minutesDifference = `${addPaddingZero(time % 60)}M`;
  const hoursDifference = Math.floor(time / 60) % 24 > 0 ? `${addPaddingZero(Math.floor(time / 60) % 24)}H ` : '';
  const daysDifference = Math.floor((time / 60) / 24) > 0 ? `${addPaddingZero(Math.floor((time / 60) / 24))}D ` : '';

  return daysDifference + hoursDifference + minutesDifference;
};
