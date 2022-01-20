import AbstractObservable from '../utils/abstract-observable.js';
import {UpdateType} from '../utils/const.js';
import dayjs from 'dayjs';

export default class TripModel extends AbstractObservable {
  #tripEvents = [];
  #destinations = [];
  #offers = [];
  #apiService = null;

  constructor(apiService) {
    super();
    this.#apiService = apiService;
  }

  get tripEvents() {
    return this.#tripEvents;
  }

  set tripEvents(tripEvents) {
    this.#tripEvents = [...tripEvents];
  }

  get destinations() {
    return this.#destinations;
  }

  get offersList() {
    return this.#offers;
  }

  init = async () => {
    try {
      const tripEvents = await this.#apiService.tripEvents;
      this.#destinations = await this.#apiService.destinations;
      this.#offers = await this.#apiService.offers;
      this.#tripEvents = tripEvents.map(this.#adaptToClient);
    } catch (err) {
      this.#destinations = [];
      this.#offers = [];
      this.#tripEvents = [];
    }

    this._notify(UpdateType.INIT);
  }

  updateTripEvent = async (updateType, update) => {
    const index = this.#tripEvents.findIndex((tripEvent) => tripEvent.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update a nonexistent trip event');
    }

    if (!dayjs(update.dateFrom).isBefore(update.dateTo)) {
      throw new Error('The end time can\'t be less than the start time');
    }

    try {
      const response = await this.#apiService.updateTripEvent(this.#adaptToServer(update));
      const updatedTripEvent = this.#adaptToClient(response);
      this.#tripEvents = [
        ...this.#tripEvents.slice(0, index),
        updatedTripEvent,
        ...this.#tripEvents.slice(index + 1),
      ];
      this._notify(updateType, update);
    } catch (err) {
      throw new Error('Can\'t update trip event');
    }
  }

  addTripEvent = async (updateType, update) => {
    try {
      const response = await this.#apiService.addTripEvent(this.#adaptToServer(update));
      const newTripEvent = this.#adaptToClient(response);
      this.#tripEvents = [...this.#tripEvents, newTripEvent];
      this._notify(updateType, newTripEvent);
    } catch (err) {
      throw new Error('Can\'t add new trip event');
    }
  }

  deleteTripEvent = async (updateType, update) => {
    const index = this.#tripEvents.findIndex((tripEvent) => tripEvent.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete a nonexistent trip event');
    }

    try {
      await this.#apiService.deleteTripEvent(update);
      this.#tripEvents = [
        ...this.#tripEvents.slice(0, index),
        ...this.#tripEvents.slice(index + 1),
      ];
      this._notify(updateType);
    } catch (err) {
      throw new Error('Can\'t delete this trip event');
    }
  }

  #adaptToClient = (tripEvent) => {
    const adaptedTripEvent = {...tripEvent,
      basePrice: tripEvent['base_price'],
      dateFrom: tripEvent['date_from'],
      dateTo: tripEvent['date_to'],
      isFavorite: tripEvent['is_favorite'],
    };

    delete adaptedTripEvent['base_price'];
    delete adaptedTripEvent['date_from'];
    delete adaptedTripEvent['date_to'];
    delete adaptedTripEvent['is_favorite'];

    return adaptedTripEvent;
  }

  #adaptToServer = (tripEvent) => {
    const adaptedTripEvent = {...tripEvent,
      'base_price': tripEvent.basePrice,
      'date_from': tripEvent.dateFrom,
      'date_to': tripEvent.dateTo,
      'is_favorite': tripEvent.isFavorite,
    };

    delete adaptedTripEvent.basePrice;
    delete adaptedTripEvent.dateFrom;
    delete adaptedTripEvent.dateTo;
    delete adaptedTripEvent.isFavorite;

    return adaptedTripEvent;
  }
}
