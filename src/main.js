import {getTripEvent} from './mock/trip-event.js';
import {render, replace, RenderPosition} from './utils/render.js';
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

const renderTripEvent = (tripEventsList, tripEvent) => {
  const tripEventComponent = new TripEventView(tripEvent);
  const tripEventEditorComponent = new TripEventEditorView(tripEvent);

  const switchEventToEditor = () => replace(tripEventEditorComponent, tripEventComponent);

  const switchEditorToEvent = () => replace(tripEventComponent, tripEventEditorComponent);

  const onEscKeydown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      switchEditorToEvent();
      document.removeEventListener('keydown', onEscKeydown);
    }
  };

  tripEventComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
    switchEventToEditor();
    document.addEventListener('keydown', onEscKeydown);
  });

  tripEventEditorComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
    switchEditorToEvent();
    document.removeEventListener('keydown', onEscKeydown);
  });

  tripEventEditorComponent.element.querySelector('form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    switchEditorToEvent();
    document.removeEventListener('keydown', onEscKeydown);
  });

  render (tripEventsList, tripEventComponent, RenderPosition.BEFOREEND);
};

render(tripTabsContainer, new TripTabsView(), RenderPosition.BEFOREEND);
render(tripFiltersContainer, new TripFiltersView(), RenderPosition.BEFOREEND);

if (TRIP_EVENTS_COUNTER === 0) {
  render(tripEventsContainer, new TripMessageView(), RenderPosition.BEFOREEND);
} else {
  const tripEventsList = new TripEventsListView();

  render(tripMainContainer, new TripInfoView(tripEvents), RenderPosition.AFTERBEGIN);
  render(tripEventsContainer, new TripSortView(), RenderPosition.BEFOREEND);
  render(tripEventsContainer, tripEventsList, RenderPosition.BEFOREEND);
  tripEvents.forEach((tripEvent) => renderTripEvent(tripEventsList, tripEvent));
}
