import AbstractObservable from '../utils/abstract-observable.js';

export default class TripEventsModel extends AbstractObservable {
  #tripEvents = [];

  set tripEvents(tripEvents) {
    this.#tripEvents = tripEvents;
  }

  get tripEvents() {
    return this.#tripEvents;
  }

  updateTripEvent = (updateType, update) => {
    const index = this.#tripEvents.findIndex((tripEvent) => tripEvent.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update a nonexistent trip event');
    }

    this.#tripEvents = [
      ...this.#tripEvents.slice(0, index),
      update,
      ...this.#tripEvents.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addTripEvent = (updateType, update) => {
    this.#tripEvents = [
      update,
      ...this.#tripEvents,
    ];

    this._notify(updateType, update);
  }

  deleteTripEvent = (updateType, update) => {
    const index = this.#tripEvents.findIndex((tripEvent) => tripEvent.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete a nonexistent trip event');
    }

    this.#tripEvents = [
      ...this.#tripEvents.slice(0, index),
      ...this.#tripEvents.slice(index + 1),
    ];

    this._notify(updateType, update);
  }
}
