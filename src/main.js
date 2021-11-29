import {getTripEvent} from './mock/trip-event.js';
import {renderElement, RenderPosition} from './utils/render.js';
import {createTripTabs} from './view/trip-tabs-view.js';
import {createTripFilters} from './view/trip-filters-view.js';
import {createTripSort} from './view/trip-sort-view.js';
import {createTripMessage} from './view/trip-message-view.js';
import {createTripInfo} from './view/trip-info-view.js';
import {createTripEventsList} from './view/trip-events-list-view.js';
import {createTripEvent} from './view/trip-event-view.js';
import {createTripEventEditor} from './view/trip-event-editor-view.js';

const TRIP_EVENTS_COUNTER = 20;

const tripEvents = Array.from({length: TRIP_EVENTS_COUNTER}, getTripEvent);

const tripMainContainer = document.querySelector('.trip-main');
const tripTabsContainer = document.querySelector('.trip-controls__navigation');
const tripFiltersContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

renderElement(tripMainContainer, createTripInfo(), RenderPosition.AFTERBEGIN);
renderElement(tripTabsContainer, createTripTabs(), RenderPosition.BEFOREEND);
renderElement(tripFiltersContainer, createTripFilters(), RenderPosition.BEFOREEND);
renderElement(tripEventsContainer, createTripSort(), RenderPosition.BEFOREEND);
renderElement(tripEventsContainer, createTripEventsList(), RenderPosition.BEFOREEND);

const tripEventsList = tripEventsContainer.querySelector('.trip-events__list');

for (let i = 1; i < TRIP_EVENTS_COUNTER; i++) {
  renderElement(tripEventsList, createTripEvent(tripEvents[i]), RenderPosition.BEFOREEND);
}

renderElement(tripEventsList, createTripEventEditor(tripEvents[0]), RenderPosition.AFTERBEGIN);
renderElement(tripEventsContainer, createTripMessage(), RenderPosition.BEFOREEND);
