import {getRandomInteger, getRandomSignedFloat} from '../utils/common.js';
import {TRIP_CITIES, TRIP_EVENT_DESCRIPTIONS} from '../utils/const.js';

const MAX_DESCRIPTION_LENGTH = 5;
const MAX_PHOTOS_COUNT = 10;

export const Destination = [];

const getDescription = () => TRIP_EVENT_DESCRIPTIONS.sort(getRandomSignedFloat).slice(0, getRandomInteger(0, MAX_DESCRIPTION_LENGTH - 1) + 1).join(' ');

const getTripCity = () => TRIP_CITIES[getRandomInteger(0, TRIP_CITIES.length - 1)];

const getPhotoCount = () => getRandomInteger(0, MAX_PHOTOS_COUNT - 1) + 1;

const getPhotos = () => Array.from({length: getPhotoCount()}, (value, index) => ({
  src: `http://picsum.photos/300/200?r=${Math.random()}`,
  description: `Random photo №${index + 1}`,
}));

const getDestinationList = () => TRIP_CITIES.forEach((tripCity) => Destination.push({
  name: tripCity,
  description: getDescription(),
  pictures: getPhotos(),
}));

export const getDestination = () => {
  getDestinationList();
  return Destination.find((destinationObject) => destinationObject.name === getTripCity());
};
