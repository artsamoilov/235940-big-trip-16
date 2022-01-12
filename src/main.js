import {getTripEvent} from './mock/trip-event.js';
import TripEventsModel from './model/trip-events-model.js';
import FilterModel from './model/filter-model.js';
import AppPresenter from './presenter/app-presenter.js';

const TRIP_EVENTS_COUNTER = 20;

const tripEvents = Array.from({length: TRIP_EVENTS_COUNTER}, getTripEvent);

const tripEventsModel = new TripEventsModel();
tripEventsModel.tripEvents = tripEvents;

const filterModel = new FilterModel();

const appPresenter = new AppPresenter(tripEventsModel, filterModel);
appPresenter.init();
