import AbstractView from './abstract-view.js';

export default class SmartView extends AbstractView {
  _data = {};

  restoreHandlers = () => {
    throw new Error('Abstract method \'restoreHandlers\' is not implemented');
  }

  updateElement = () => {
    const oldTripEventElement = this.element;
    const parentElement = oldTripEventElement.parentElement;
    this.removeElement();

    const newTripEventElement = this.element;
    parentElement.replaceChild(newTripEventElement, oldTripEventElement);

    this.restoreHandlers();
  }

  updateData = (update) => {
    if (!update) {
      return;
    }

    this._data = {...this._data, ...update};
    this.updateElement();
  }
}
