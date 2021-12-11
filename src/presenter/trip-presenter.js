import {render, replace, RenderPosition} from '../utils/render.js';
import TripSortView from '../view/trip-sort-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import TripEventView from '../view/trip-event-view.js';
import TripEventEditorView from '../view/trip-event-editor-view.js';
import TripMessageView from '../view/trip-message-view.js';
import TripEventPresenter from './trip-event-presenter.js';

export default class TripPresenter {
  #tripEventsContainer = null;

  #tripSortComponent = new TripSortView();
  #tripMessageComponent = new TripMessageView();
  #tripEventsListComponent = new TripEventsListView();

  #tripEvents = [];

  constructor(tripEventsContainer) {
    this.#tripEventsContainer = tripEventsContainer;
  }

  init = (tripEvents) => {
    this.#tripEvents = [...tripEvents];
    this.#renderTrip();
  }

  #renderTripSort = () => {
    render(this.#tripEventsContainer, this.#tripSortComponent, RenderPosition.BEFOREEND);
  }

  #renderTripEvent = (tripEvent) => {
    const tripEventPresenter = new TripEventPresenter(this.#tripEventsListComponent);
    tripEventPresenter.init(tripEvent);
  }

  #renderTripEventsList = () => {
    render(this.#tripEventsContainer, this.#tripEventsListComponent, RenderPosition.BEFOREEND);
    this.#tripEvents.forEach((tripEvent) => this.#renderTripEvent(tripEvent));
  }

  #renderTripMessage = () => {
    render(this.#tripEventsContainer, this.#tripMessageComponent, RenderPosition.BEFOREEND);
  }

  #renderTrip = () => {
    if (this.#tripEvents.length === 0) {
      this.#renderTripMessage();
    } else {
      this.#renderTripSort();
      this.#renderTripEventsList();
    }
  }
}
