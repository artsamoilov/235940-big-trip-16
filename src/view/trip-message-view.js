import {createElement} from '../utils/render.js';

const createTripMessage = () => (
  '<p class="trip-events__msg">Click New Event to create your first point</p>'
);

export default class TripMessageView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  get template() {
    return createTripMessage();
  }

  removeElement() {
    this.#element = null;
  }
}
