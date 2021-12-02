import {createElement} from '../utils/render.js';

const createTripEventsList = () => (
  `<ul class="trip-events__list">
  </ul>`
);

export default class TripEventsListView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  get template() {
    return createTripEventsList();
  }

  removeElement() {
    this.#element = null;
  }
}
