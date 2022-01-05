import dayjs from 'dayjs';

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
