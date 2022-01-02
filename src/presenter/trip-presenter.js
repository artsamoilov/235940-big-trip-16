import {render, RenderPosition} from '../utils/render.js';
import {updateItem} from '../utils/common.js';
import {SortType} from '../utils/const.js';
import {sortTripEventsByDay, sortTripEventsByTime, sortTripEventsByPrice} from '../utils/sort.js';
import TripSortView from '../view/trip-sort-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import TripMessageView from '../view/trip-message-view.js';
import TripEventPresenter from './trip-event-presenter.js';

export default class TripPresenter {
  #tripEventsContainer = null;
  #tripEventsModel = null;

  #tripSortComponent = new TripSortView();
  #tripMessageComponent = new TripMessageView();
  #tripEventsListComponent = new TripEventsListView();

  #tripEvents = [];
  #tripEventPresenter = new Map();
  #currentSortType = SortType.DAY;

  constructor(tripEventsContainer, tripEventsModel) {
    this.#tripEventsContainer = tripEventsContainer;
    this.#tripEventsModel = tripEventsModel;
  }

  get tripEvents() {
    return this.#tripEventsModel.tripEvents;
  }

  init = (tripEvents) => {
    this.#tripEvents = [...tripEvents].sort(sortTripEventsByDay);
    this.#renderTrip();
  }

  #sortTripEvents = (sortType) => {
    switch(sortType) {
      case SortType.TIME:
        this.#tripEvents.sort(sortTripEventsByTime);
        break;
      case SortType.PRICE:
        this.#tripEvents.sort(sortTripEventsByPrice);
        break;
      default:
        this.#tripEvents.sort(sortTripEventsByDay);
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    this.#sortTripEvents(sortType);
    this.#clearTrip();
    this.#renderTripEventsList();
  }

  #renderTripSort = () => {
    render(this.#tripEventsContainer, this.#tripSortComponent, RenderPosition.BEFOREEND);
    this.#tripSortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  }

  #renderTripEvent = (tripEvent) => {
    const tripEventPresenter = new TripEventPresenter(this.#tripEventsListComponent, this.#handleTripEventChange, this.#handleModeChange);
    tripEventPresenter.init(tripEvent);
    this.#tripEventPresenter.set(tripEvent.id, tripEventPresenter);
  }

  #handleModeChange = () => this.#tripEventPresenter.forEach((presenter) => presenter.resetView());

  #handleTripEventChange = (updatedTripEvent) => {
    this.#tripEvents = updateItem(this.#tripEvents, updatedTripEvent);
    this.#tripEventPresenter.get(updatedTripEvent.id).init(updatedTripEvent);
  }

  #renderTripEventsList = () => {
    render(this.#tripEventsContainer, this.#tripEventsListComponent, RenderPosition.BEFOREEND);
    this.#tripEvents.forEach((tripEvent) => this.#renderTripEvent(tripEvent));
  }

  #renderTripMessage = () => render(this.#tripEventsContainer, this.#tripMessageComponent, RenderPosition.BEFOREEND);

  #renderTrip = () => {
    if (this.#tripEvents.length === 0) {
      this.#renderTripMessage();
      return;
    }

    this.#renderTripSort();
    this.#renderTripEventsList();
  }

  #clearTrip = () => {
    this.#tripEventPresenter.forEach((presenter) => presenter.destroy());
    this.#tripEventPresenter.clear();
  }
}
