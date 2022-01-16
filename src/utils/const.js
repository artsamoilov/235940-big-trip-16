export const TRIP_CITIES = [
  'Amsterdam',
  'Berlin',
  'Chamonix',
  'Dresden',
  'Edinburgh'];

export const TRIP_EVENT_DESCRIPTIONS = [
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

export const SortType = {
  DAY: 'sort-day',
  TIME: 'sort-time',
  PRICE: 'sort-price',
};

export const TripEventType = {
  TAXI: 'taxi',
  BUS: 'bus',
  TRAIN: 'train',
  SHIP: 'ship',
  DRIVE: 'drive',
  FLIGHT: 'flight',
  CHECK_IN: 'check-in',
  SIGHTSEEING: 'sightseeing',
  RESTAURANT: 'restaurant',
};

export const Offer = [
  {
    type: TripEventType.TAXI,
    offers: [
      {
        id: 1,
        title: 'Upgrade to comfort class',
        price: 20,
      },
      {
        id: 2,
        title: 'Choose the radio',
        price: 2,
      },
      {
        id: 3,
        title: 'With pets',
        price: 15,
      },
      {
        id: 4,
        title: 'Child seat',
        price: 5,
      },
      {
        id: 5,
        title: 'Smoking allowed',
        price: 40,
      },
    ]
  },
  {
    type: TripEventType.BUS,
    offers: [
      {
        id: 1,
        title: 'Choose the seat',
        price: 5,
      },
      {
        id: 2,
        title: 'Add bus stop',
        price: 10,
      },
      {
        id: 3,
        title: 'Buy coffee',
        price: 2,
      },
      {
        id: 4,
        title: 'Travel pillow',
        price: 8,
      },
    ]
  },
  {
    type: TripEventType.TRAIN,
    offers: [
      {
        id: 1,
        title: 'Add meal',
        price: 5,
      },
      {
        id: 2,
        title: 'Choose the seat',
        price: 1,
      },
      {
        id: 3,
        title: 'Rent a bedding',
        price: 2,
      },
      {
        id: 4,
        title: 'Compartment',
        price: 25,
      },
      {
        id: 5,
        title: 'Rent a cup',
        price: 0,
      },
    ]
  },
  {
    type: TripEventType.SHIP,
    offers: [
      {
        id: 1,
        title: 'Choose the cabin',
        price: 3,
      },
      {
        id: 2,
        title: 'Add luggage',
        price: 9,
      },
      {
        id: 3,
        title: 'Add meal',
        price: 8,
      },
    ]
  },
  {
    type: TripEventType.DRIVE,
    offers: [
      {
        id: 1,
        title: 'Unlimited gas',
        price: 100,
      },
      {
        id: 2,
        title: 'Child seat',
        price: 5,
      },
      {
        id: 3,
        title: 'Automatic transmission',
        price: 20,
      },
      {
        id: 4,
        title: 'With navigator',
        price: 15,
      },
      {
        id: 5,
        title: '4x4 SUV',
        price: 50,
      },
    ]
  },
  {
    type: TripEventType.FLIGHT,
    offers: [
      {
        id: 1,
        title: 'Early check',
        price: 7,
      },
      {
        id: 2,
        title: 'Add luggage',
        price: 13,
      },
      {
        id: 3,
        title: 'Vegetarian meal',
        price: 2,
      },
      {
        id: 4,
        title: 'Upgrade to business class',
        price: 30,
      },
    ]
  },
  {
    type: TripEventType.CHECK_IN,
    offers: [
      {
        id: 1,
        title: 'Add +1 bed',
        price: 25,
      },
      {
        id: 2,
        title: 'Best city view',
        price: 10,
      },
      {
        id: 3,
        title: 'Minibar',
        price: 90,
      },
      {
        id: 4,
        title: 'With pets',
        price: 30,
      },
      {
        id: 5,
        title: 'Breakfast',
        price: 7,
      },
    ]
  },
  {
    type: TripEventType.SIGHTSEEING,
    offers: [
      {
        id: 1,
        title: 'Excursion',
        price: 12,
      },
      {
        id: 2,
        title: 'Tickets',
        price: 5,
      },
      {
        id: 3,
        title: 'Souvenirs',
        price: 8,
      },
      {
        id: 4,
        title: 'Photo session',
        price: 30,
      },
    ]
  },
  {
    type: TripEventType.RESTAURANT,
    offers: [
      {
        id: 1,
        title: 'Book a table',
        price: 2,
      },
      {
        id: 2,
        title: 'Add wine',
        price: 20,
      },
      {
        id: 3,
        title: 'Business lunch',
        price: 10,
      },
      {
        id: 4,
        title: 'Live music',
        price: 15,
      },
      {
        id: 5,
        title: 'Special menu',
        price: 100,
      },
    ]
  },
];

export const UserAction = {
  UPDATE_TRIP_EVENT: 'UPDATE_TRIP_EVENT',
  ADD_TRIP_EVENT: 'ADD_TRIP_EVENT',
  DELETE_TRIP_EVENT: 'DELETE_TRIP_EVENT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

export const FilterType = {
  EVERYTHING: 'EVERYTHING',
  FUTURE: 'FUTURE',
  PAST: 'PAST',
};

export const MenuItem = {
  NEW_EVENT: 'NEW_EVENT',
  TABLE: 'TABLE',
  STATS: 'STATS',
};
