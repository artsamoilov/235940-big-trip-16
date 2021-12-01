import {getTripEvent} from './mock/trip-event.js';
import {render, RenderPosition} from './utils/render.js';
import TripTabsView from './view/trip-tabs-view.js';
import TripFiltersView from './view/trip-filters-view.js';
import TripSortView from './view/trip-sort-view.js';
import TripInfoView from './view/trip-info-view.js';
import TripEventsListView from './view/trip-events-list-view.js';
import TripEventView from './view/trip-event-view.js';
import TripEventEditorView from './view/trip-event-editor-view.js';
import TripMessageView from './view/trip-message-view.js';

const TRIP_EVENTS_COUNTER = 20;

const tripEvents = Array.from({length: TRIP_EVENTS_COUNTER}, getTripEvent);

const tripMainContainer = document.querySelector('.trip-main');
const tripTabsContainer = document.querySelector('.trip-controls__navigation');
const tripFiltersContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

render(tripTabsContainer, new TripTabsView().element, RenderPosition.BEFOREEND);
render(tripFiltersContainer, new TripFiltersView().element, RenderPosition.BEFOREEND);

if (TRIP_EVENTS_COUNTER === 0) {
  render(tripEventsContainer, new TripMessageView().element, RenderPosition.BEFOREEND);
} else {
  render(tripEventsContainer, new TripSortView().element, RenderPosition.BEFOREEND);
  render(tripEventsContainer, new TripEventsListView().element, RenderPosition.BEFOREEND);

  const tripEventsList = tripEventsContainer.querySelector('.trip-events__list');

  for (let i = 1; i < TRIP_EVENTS_COUNTER; i++) {
    render(tripEventsList, new TripEventView(tripEvents[i]).element, RenderPosition.BEFOREEND);
  }

  render(tripEventsList, new TripEventEditorView(tripEvents[0]).element, RenderPosition.AFTERBEGIN);
  render(tripMainContainer, new TripInfoView(tripEvents).element, RenderPosition.AFTERBEGIN);
}
