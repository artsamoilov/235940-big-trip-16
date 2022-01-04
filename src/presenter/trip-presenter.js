import {remove, render, RenderPosition} from '../utils/render.js';
import {SortType, UpdateType, UserAction} from '../utils/const.js';
import {sortTripEventsByDay, sortTripEventsByTime, sortTripEventsByPrice} from '../utils/sort.js';
import TripSortView from '../view/trip-sort-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import TripMessageView from '../view/trip-message-view.js';
import TripEventPresenter from './trip-event-presenter.js';

export default class TripPresenter {
  #tripEventsContainer = null;
  #tripEventsModel = null;

  #tripSortComponent = null;
  #tripMessageComponent = new TripMessageView();
  #tripEventsListComponent = new TripEventsListView();

  #tripEventPresenter = new Map();
  #currentSortType = SortType.DAY;

  constructor(tripEventsContainer, tripEventsModel) {
    this.#tripEventsContainer = tripEventsContainer;
    this.#tripEventsModel = tripEventsModel;

    this.#tripEventsModel.addObserver(this.#handleModelEvent);
  }

  get tripEvents() {
    switch (this.#currentSortType) {
      case SortType.TIME:
        return [...this.#tripEventsModel.tripEvents].sort(sortTripEventsByTime);
      case SortType.PRICE:
        return [...this.#tripEventsModel.tripEvents].sort(sortTripEventsByPrice);
      default:
        return [...this.#tripEventsModel.tripEvents].sort(sortTripEventsByDay);
    }
  }

  init = () => this.#renderTrip();

  #handleSortTypeChange = (sortType) => {
    this.#currentSortType = sortType;
    this.#clearTrip();
    this.#renderTrip();
  }

  #renderTripSort = () => {
    this.#tripSortComponent = new TripSortView(this.#currentSortType);
    this.#tripSortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#tripEventsContainer, this.#tripSortComponent, RenderPosition.BEFOREEND);
  }

  #handleModeChange = () => this.#tripEventPresenter.forEach((presenter) => presenter.resetView());

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_TRIP_EVENT:
        this.#tripEventsModel.updateTripEvent(updateType, update);
        break;
      case UserAction.ADD_TRIP_EVENT:
        this.#tripEventsModel.addTripEvent(updateType, update);
        break;
      case UserAction.DELETE_TRIP_EVENT:
        this.#tripEventsModel.deleteTripEvent(updateType, update);
        break;
    }
  }

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.MAJOR:
        this.#clearTrip(true);
        this.#renderTrip();
        break;
      case UpdateType.MINOR:
        this.#clearTrip();
        this.#renderTrip();
        break;
      case UpdateType.PATCH:
        this.#tripEventPresenter.get(data.id).init(data);
        break;
    }
  }

  #renderTripEvent = (tripEvent) => {
    const tripEventPresenter = new TripEventPresenter(this.#tripEventsListComponent, this.#handleViewAction, this.#handleModeChange);
    tripEventPresenter.init(tripEvent);
    this.#tripEventPresenter.set(tripEvent.id, tripEventPresenter);
  }

  #renderTripEventsList = () => {
    render(this.#tripEventsContainer, this.#tripEventsListComponent, RenderPosition.BEFOREEND);
    this.tripEvents.forEach((tripEvent) => this.#renderTripEvent(tripEvent));
  }

  #renderTripMessage = () => render(this.#tripEventsContainer, this.#tripMessageComponent, RenderPosition.BEFOREEND);

  #renderTrip = () => {
    if (this.tripEvents.length === 0) {
      this.#renderTripMessage();
      return;
    }

    this.#renderTripSort();
    this.#renderTripEventsList();
  }

  #clearTrip = (resetSortType = false) => {
    this.#tripEventPresenter.forEach((presenter) => presenter.destroy());
    this.#tripEventPresenter.clear();

    remove(this.#tripSortComponent);
    remove(this.#tripMessageComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }
}
