import AbstractView from './abstract-view.js';

const createTripFilterItem = (filter, currentFilterType) => (
  `<div class="trip-filters__filter">
    <input id="filter-${filter.name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter"
      value="${filter.name}" ${filter.type === currentFilterType ? 'checked' : ''}>
    <label class="trip-filters__filter-label" for="filter-${filter.name}">${filter.name}</label>
  </div>`
);

const createTripFilters = (filterItems, currentFilterType) => (
  `<form class="trip-filters" action="#" method="get">

    ${filterItems.map((filter) => createTripFilterItem(filter, currentFilterType)).join('')}

    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`
);

export default class TripFiltersView extends AbstractView {
  #filters = null;
  #currentFilter = null;

  constructor(filters, currentFilter) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilter;
  }

  get template() {
    return createTripFilters(this.#filters, this.#currentFilter);
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
