import AbstractObservable from '../utils/abstract-observable.js';
import {FilterType} from '../utils/const.js';

export default class FilterModel extends AbstractObservable {
  #filter = FilterType.EVERYTHING;

  setFilter(updateType, filter) {
    this.#filter = filter;
    this._notify(updateType, filter);
  }

  get filter() {
    return this.#filter;
  }
}
