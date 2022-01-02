import AbstractObservable from '../utils/abstract-observable.js';

export default class TripEventsModel extends AbstractObservable {
  #tripEvents = [];

  set tripEvents(tripEvents) {
    this.#tripEvents = tripEvents;
  }

  get tripEvents() {
    return this.#tripEvents;
  }
}
