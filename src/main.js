import {getTripEvent} from './mock/trip-event.js';
import {renderTemplate, renderElement, RenderPosition} from './utils/render.js';
import TripTabsView from './view/trip-tabs-view.js';
import {createTripFilters} from './view/trip-filters-view.js';
import {createTripSort} from './view/trip-sort-view.js';
import {createTripInfo} from './view/trip-info-view.js';
import {createTripEventsList} from './view/trip-events-list-view.js';
import {createTripEvent} from './view/trip-event-view.js';
import {createTripEventEditor} from './view/trip-event-editor-view.js';
import {createTripMessage} from './view/trip-message-view.js';

const TRIP_EVENTS_COUNTER = 20;

const tripEvents = Array.from({length: TRIP_EVENTS_COUNTER}, getTripEvent);

const tripMainContainer = document.querySelector('.trip-main');
const tripTabsContainer = document.querySelector('.trip-controls__navigation');
const tripFiltersContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

renderElement(tripTabsContainer, new TripTabsView().element, RenderPosition.BEFOREEND);
renderTemplate(tripFiltersContainer, createTripFilters(), RenderPosition.BEFOREEND);
renderTemplate(tripEventsContainer, createTripSort(), RenderPosition.BEFOREEND);
renderTemplate(tripEventsContainer, createTripEventsList(), RenderPosition.BEFOREEND);

if (TRIP_EVENTS_COUNTER === 0) {
  renderTemplate(tripEventsContainer, createTripMessage(), RenderPosition.BEFOREEND);
}

const tripEventsList = tripEventsContainer.querySelector('.trip-events__list');

for (let i = 1; i < TRIP_EVENTS_COUNTER; i++) {
  renderTemplate(tripEventsList, createTripEvent(tripEvents[i]), RenderPosition.BEFOREEND);
}

renderTemplate(tripEventsList, createTripEventEditor(tripEvents[0]), RenderPosition.AFTERBEGIN);
renderTemplate(tripMainContainer, createTripInfo(tripEvents), RenderPosition.AFTERBEGIN);
