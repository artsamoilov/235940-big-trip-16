const TRIP_POINT_TYPES = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant',
];

const TRIP_CITIES = [
  'Amsterdam',
  'Berlin',
  'Chamonix',
  'Dresden',
  'Edinburgh',
];

const TRIP_POINT_DESCRIPTIONS = [
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
const MAX_BASE_PRICE = 200;
const MAX_OFFERS_COUNT = 5;
const MAX_OFFER_PRICE = 100;

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getDescription = () => TRIP_POINT_DESCRIPTIONS.sort(() => 0.5 - Math.random()).slice(0, getRandomInteger(0, MAX_DESCRIPTION_LENGTH - 1) + 1).join(' ');

const getTripCity = () => TRIP_CITIES[getRandomInteger(0, TRIP_CITIES.length - 1)];

const getTripPointType = () => TRIP_POINT_TYPES[getRandomInteger(0, TRIP_POINT_TYPES.length - 1)];

const getOfferTitle = () => OFFER_TITLES[getRandomInteger(0, OFFER_TITLES.length - 1)];

const getBasePrice = () => getRandomInteger(0, MAX_BASE_PRICE);

const getOfferPrice = () => getRandomInteger(0, MAX_OFFER_PRICE);

const getOffersCount = () => getRandomInteger(0, MAX_OFFERS_COUNT);

const getPhotoCount = () => getRandomInteger(0, MAX_PHOTOS_COUNT - 1) + 1;

const getPhotos = () => {
  const photoObjectsList = [];
  const photoCount = getPhotoCount();
  for (let i = 0; i < photoCount; i++) {
    photoObjectsList.push({
      src: `http://picsum.photos/300/200?r=${Math.random()}`,
      description: `Random photo №${i + 1}`,
    });
  }
  return photoObjectsList;
};

const getDestination = () => ({
  description: getDescription(),
  name: getTripCity(),
  pictures: getPhotos(),
});

const getSingleOffer = (id) => ({
  id,
  title: getOfferTitle(),
  price: getOfferPrice(),
});

const getOffers = (type) => {
  const offers = [];
  const offersCount = getOffersCount();
  for (let i = 0; i < offersCount; i++) {
    offers.push(getSingleOffer(i));
  }
  return {type, offers};
};

const getTripPoint = () => {
  const type = getTripPointType();
  return {
    basePrice: getBasePrice(),
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: getDestination(),
    isFavorite: Boolean(getRandomInteger()),
    offers: getOffers(type),
    type,
  };
};

export {getTripPoint};
