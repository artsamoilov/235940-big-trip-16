import {createElement} from '../utils/render.js';

export default class AbstractView {
  #element = null;

  constructor() {
    if (new.target === AbstractView) {
      throw new Error('Can\'t instantiate an AbstractView class');
    }
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  get template() {
    throw new Error('Abstract method \'get template\' is not implemented');
  }

  removeElement() {
    this.#element = null;
  }
}
