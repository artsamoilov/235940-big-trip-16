import {getTripEvent} from './mock/trip-event.js';
import {render, RenderPosition} from './utils/render.js';
import TripTabsView from './view/trip-tabs-view.js';
import TripInfoView from './view/trip-info-view.js';
import TripPresenter from './presenter/trip-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import TripEventsModel from './model/trip-events-model.js';
import FilterModel from './model/filter-model.js';

const TRIP_EVENTS_COUNTER = 20;

const tripEvents = Array.from({length: TRIP_EVENTS_COUNTER}, getTripEvent);

const tripEventsModel = new TripEventsModel();
tripEventsModel.tripEvents = tripEvents;

const filterModel = new FilterModel();

const tripMainContainer = document.querySelector('.trip-main');
const tripTabsContainer = document.querySelector('.trip-controls__navigation');
const tripFiltersContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

render(tripTabsContainer, new TripTabsView(), RenderPosition.BEFOREEND);

const tripPresenter = new TripPresenter(tripEventsContainer, tripEventsModel, filterModel);
const filterPresenter = new FilterPresenter(tripFiltersContainer, filterModel);

if (TRIP_EVENTS_COUNTER > 0) {
  render(tripMainContainer, new TripInfoView(tripEvents), RenderPosition.AFTERBEGIN);
}

filterPresenter.init();
tripPresenter.init();
