import {Offer, TripEventType} from '../utils/const.js';
import {getRandomInteger, getRandomSignedFloat} from '../utils/common.js';

export const getTripEventType = () => TripEventType[Object.keys(TripEventType).sort(getRandomSignedFloat).slice(0, 1)];

export const getOffers = (type) => {
  const offersList = Offer.find((offer) => offer.type === type).offers;
  return offersList.sort(getRandomSignedFloat).slice(0, getRandomInteger(0, offersList.length));
};
