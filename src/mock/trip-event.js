import dayjs from 'dayjs';
import {nanoid} from 'nanoid';
import {TRIP_CITIES, TRIP_EVENT_TYPES} from '../utils/const.js';
import {getRandomInteger} from '../utils/common.js';

const TRIP_EVENT_DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];

const OFFER_TITLES = [
  'Add luggage',
  'Upgrade to business class',
  'Add meal',
  'Choose seats',
  'Choose the radio station',
];

const MAX_DESCRIPTION_LENGTH = 5;
const MAX_PHOTOS_COUNT = 10;
const MAX_BASE_PRICE = 50;
const MAX_OFFERS_COUNT = 5;
const MAX_OFFER_PRICE = 10;
const MAX_MINUTES_GAP = 2880;

export const getDescription = () => TRIP_EVENT_DESCRIPTIONS.sort(() => 0.5 - Math.random()).slice(0, getRandomInteger(0, MAX_DESCRIPTION_LENGTH - 1) + 1).join(' ');

const getTripCity = () => TRIP_CITIES[getRandomInteger(0, TRIP_CITIES.length - 1)];

const getTripEventType = () => TRIP_EVENT_TYPES[getRandomInteger(0, TRIP_EVENT_TYPES.length - 1)];

const getBasePrice = () => getRandomInteger(0, MAX_BASE_PRICE);

const getOfferPrice = () => getRandomInteger(0, MAX_OFFER_PRICE);

const getOffersCount = () => getRandomInteger(0, MAX_OFFERS_COUNT);

const getPhotoCount = () => getRandomInteger(0, MAX_PHOTOS_COUNT - 1) + 1;

const getDate = () => dayjs().add(getRandomInteger(-MAX_MINUTES_GAP, MAX_MINUTES_GAP), 'minute');

export const getPhotos = () => Array.from({length: getPhotoCount()}, (value, index) => ({
  src: `http://picsum.photos/300/200?r=${Math.random()}`,
  description: `Random photo №${index + 1}`,
}));

const getDestination = () => ({
  description: getDescription(),
  name: getTripCity(),
  pictures: getPhotos(),
});

export const getOffers = (type) => {
  const offersCount = getOffersCount();
  const offersTitles = OFFER_TITLES.sort(() => getRandomInteger(-1, 1)).slice(0, offersCount);
  const offers = Array.from({length: offersCount}, (value, index) => ({id: index, title: offersTitles[index], price: getOfferPrice()}));
  return {type, offers};
};

export const getTripEvent = () => {
  const type = getTripEventType();
  const firstDate = getDate();
  const secondDate = getDate();
  return {
    id: nanoid(),
    basePrice: getBasePrice(),
    dateFrom: dayjs(Math.min(firstDate, secondDate)).toDate(),
    dateTo: dayjs(Math.max(firstDate, secondDate)).toDate(),
    destination: getDestination(),
    isFavorite: Boolean(getRandomInteger()),
    offers: getOffers(type),
    type,
  };
};
