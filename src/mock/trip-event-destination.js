import {getRandomInteger, getRandomSignedFloat} from '../utils/common.js';
import {TRIP_CITIES, TRIP_EVENT_DESCRIPTIONS} from '../utils/const.js';

const MAX_DESCRIPTION_LENGTH = 5;
const MAX_PHOTOS_COUNT = 10;

const getDescription = () => TRIP_EVENT_DESCRIPTIONS.sort(getRandomSignedFloat).slice(0, getRandomInteger(0, MAX_DESCRIPTION_LENGTH - 1) + 1).join(' ');

export const getTripCity = () => TRIP_CITIES[getRandomInteger(0, TRIP_CITIES.length - 1)];

const getPhotoCount = () => getRandomInteger(0, MAX_PHOTOS_COUNT - 1) + 1;

const getPhotos = () => Array.from({length: getPhotoCount()}, (value, index) => ({
  src: `http://picsum.photos/300/200?r=${Math.random()}`,
  description: `Random photo №${index + 1}`,
}));

export const Destination = TRIP_CITIES.map((city) => ({
  name: city,
  description: getDescription(),
  pictures: getPhotos()
}));

export const getDestination = (city) => Destination.find((tripCity) => tripCity.name === city);
