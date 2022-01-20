import {remove, render, RenderPosition} from '../utils/render.js';
import {SortType, UpdateType, UserAction, FilterType} from '../utils/const.js';
import {sortTripEventsByDay, sortTripEventsByTime, sortTripEventsByPrice} from '../utils/sort.js';
import {filter} from '../utils/filter.js';
import TripSortView from '../view/trip-sort-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import TripMessageView from '../view/trip-message-view.js';
import TripLoadingView from '../view/trip-loading-view.js';
import TripInfoView from '../view/trip-info-view.js';
import TripEventPresenter, {State} from './trip-event-presenter.js';
import NewTripEventPresenter from './new-trip-event-presenter.js';

export default class TripPresenter {
  #tripMainContainer = null;
  #tripEventsContainer = null;

  #tripModel = null;
  #filterModel = null;

  #tripSortComponent = null;
  #tripMessageComponent = null;
  #tripInfoComponent = null;
  #tripLoadingComponent = new TripLoadingView();
  #tripEventsListComponent = new TripEventsListView();

  #tripEventPresenter = new Map();
  #newTripEventPresenter = null;
  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;
  #isLoading = true;

  constructor(tripMainContainer, tripEventsContainer, tripModel, filterModel) {
    this.#tripModel = tripModel;
    this.#filterModel = filterModel;

    this.#tripMainContainer = tripMainContainer;
    this.#tripEventsContainer = tripEventsContainer;

    this.#newTripEventPresenter = new NewTripEventPresenter(this.#tripModel, this.#tripEventsListComponent, this.#handleViewAction);
  }

  get tripEvents() {
    this.#filterType = this.#filterModel.filter;
    const tripEvents = this.#tripModel.tripEvents;
    const filteredTripEvents = filter[this.#filterType](tripEvents);

    switch (this.#currentSortType) {
      case SortType.TIME:
        return filteredTripEvents.sort(sortTripEventsByTime);
      case SortType.PRICE:
        return filteredTripEvents.sort(sortTripEventsByPrice);
      default:
        return filteredTripEvents.sort(sortTripEventsByDay);
    }
  }

  init = () => {
    this.#tripModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);

    this.#renderTrip();
  }

  destroy = () => {
    this.#clearTrip(true);

    remove(this.#tripEventsListComponent);

    this.#tripModel.removeObserver(this.#handleModelEvent);
    this.#filterModel.removeObserver(this.#handleModelEvent);
  }

  createTripEvent = (callback) => {
    this.#currentSortType = SortType.DAY;
    this.#newTripEventPresenter.init(callback);
  }

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

  #handleModeChange = () => {
    this.#newTripEventPresenter.destroy();
    this.#tripEventPresenter.forEach((presenter) => presenter.resetView());
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_TRIP_EVENT:
        this.#tripEventPresenter.get(update.id).setViewState(State.SAVING);
        this.#tripModel.updateTripEvent(updateType, update);
        break;
      case UserAction.ADD_TRIP_EVENT:
        this.#newTripEventPresenter.setSaving();
        this.#tripModel.addTripEvent(updateType, update);
        break;
      case UserAction.DELETE_TRIP_EVENT:
        this.#tripEventPresenter.get(update.id).setViewState(State.DELETING);
        this.#tripModel.deleteTripEvent(updateType, update);
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
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#tripLoadingComponent);
        this.#renderTrip();
        break;
    }
  }

  #renderTripInfo = () => {
    this.#tripInfoComponent = new TripInfoView(this.#tripModel.tripEvents);
    render(this.#tripMainContainer, this.#tripInfoComponent, RenderPosition.AFTERBEGIN);
  }

  #renderTripEvent = (tripEvent) => {
    const tripEventPresenter = new TripEventPresenter(this.#tripModel, this.#tripEventsListComponent, this.#handleViewAction, this.#handleModeChange);
    tripEventPresenter.init(tripEvent);
    this.#tripEventPresenter.set(tripEvent.id, tripEventPresenter);
  }

  #renderTripEventsList = () => {
    render(this.#tripEventsContainer, this.#tripEventsListComponent, RenderPosition.BEFOREEND);
    this.tripEvents.forEach((tripEvent) => this.#renderTripEvent(tripEvent));
  }

  #renderLoadingMessage = () => render(this.#tripEventsContainer, this.#tripLoadingComponent, RenderPosition.BEFOREEND)

  #renderTripMessage = () => {
    this.#tripMessageComponent = new TripMessageView(this.#filterType);
    render(this.#tripEventsContainer, this.#tripMessageComponent, RenderPosition.BEFOREEND);
  }

  #renderTrip = () => {
    if (this.#isLoading) {
      this.#renderLoadingMessage();
      return;
    }

    if (this.tripEvents.length === 0) {
      this.#renderTripMessage();
      return;
    }

    this.#renderTripInfo();
    this.#renderTripSort();
    this.#renderTripEventsList();
  }

  #clearTrip = (resetSortType = false) => {
    this.#newTripEventPresenter.destroy();
    this.#tripEventPresenter.forEach((presenter) => presenter.destroy());
    this.#tripEventPresenter.clear();

    remove(this.#tripInfoComponent);
    remove(this.#tripSortComponent);
    remove(this.#tripLoadingComponent);

    if (this.#tripMessageComponent) {
      remove(this.#tripMessageComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }
}
