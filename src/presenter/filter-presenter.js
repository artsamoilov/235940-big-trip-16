import TripFiltersView from '../view/trip-filters-view.js';
import {remove, render, replace, RenderPosition} from '../utils/render.js';
import {FilterType, UpdateType} from '../utils/const.js';

export default class FilterPresenter {
  #controlsContainer = null;
  #tripModel = null;
  #filterModel = null;

  #filterComponent = null;

  constructor(controlsContainer, tripModel, filterModel) {
    this.#controlsContainer = controlsContainer;
    this.#tripModel = tripModel;
    this.#filterModel = filterModel;
  }

  get filters() {
    return [
      {
        type: FilterType.EVERYTHING,
        name: 'everything',
      },
      {
        type: FilterType.FUTURE,
        name: 'future',
      },
      {
        type: FilterType.PAST,
        name: 'past',
      },
    ];
  }

  init = () => {
    const filters = this.filters;
    const existingFilterComponent = this.#filterComponent;

    this.#filterComponent = new TripFiltersView(filters, this.#filterModel.filter, this.#tripModel.tripEvents);
    this.#filterComponent.setFilterTypeChangeHandler(this.#handleFilterTypeChange);

    this.#filterModel.addObserver(this.#handleModelEvent);

    if (existingFilterComponent === null) {
      render(this.#controlsContainer, this.#filterComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this.#filterComponent, existingFilterComponent);
    remove(existingFilterComponent);
  }

  destroy = () => {
    remove(this.#filterComponent);
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#filterComponent = null;
    this.#filterModel.removeObserver(this.#handleModelEvent);
  }

  #handleModelEvent = () => this.init();

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  }
}
