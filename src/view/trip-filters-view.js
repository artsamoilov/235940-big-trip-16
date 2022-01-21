import AbstractView from './abstract-view.js';
import {FilterType} from '../utils/const.js';
import dayjs from 'dayjs';

const isFilterDisabled = (tripEvents, filterType) => {
  switch (filterType) {
    case FilterType.FUTURE:
      return !tripEvents.some(({dateFrom}) => dayjs().isBefore(dateFrom));
    case FilterType.PAST:
      return !tripEvents.some(({dateTo}) => dayjs().isAfter(dateTo));
    default:
      return false;
  }
};

const createTripFilterItem = (tripEvents, filter, currentFilterType) => (
  `<div class="trip-filters__filter">
    <input id="filter-${filter.name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter"
      value="${filter.name}" ${filter.type === currentFilterType ? 'checked' : ''}
        ${isFilterDisabled(tripEvents, filter.type) ? 'disabled' : ''}>
    <label class="trip-filters__filter-label" for="filter-${filter.name}">${filter.name}</label>
  </div>`
);

const createTripFilters = (tripEvents, filterItems, currentFilterType) => (
  `<form class="trip-filters" action="#" method="get">

    ${filterItems.map((filter) => createTripFilterItem(tripEvents, filter, currentFilterType)).join('')}

    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`
);

export default class TripFiltersView extends AbstractView {
  #filters = null;
  #currentFilter = null;
  #tripEvents = null;

  constructor(filters, currentFilter, tripEvents) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilter;
    this.#tripEvents = tripEvents;
  }

  get template() {
    return createTripFilters(this.#tripEvents, this.#filters, this.#currentFilter);
  }

  setFilterTypeChangeHandler = (callback) => {
    this._callback.filterTypeChange = callback;
    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value.toUpperCase());
  }
}
