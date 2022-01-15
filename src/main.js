import {getTripEvent} from './mock/trip-event.js';
import TripEventsModel from './model/trip-events-model.js';
import FilterModel from './model/filter-model.js';
import AppPresenter from './presenter/app-presenter.js';
import ApiService from './api-service.js';

const TRIP_EVENTS_COUNTER = 20;
const AUTHORIZATION = 'Basic sld9823u4hf34wef';
const END_POINT = 'https://16.ecmascript.pages.academy/big-trip';

const tripEvents = Array.from({length: TRIP_EVENTS_COUNTER}, getTripEvent);

const tripEventsModel = new TripEventsModel(new ApiService(END_POINT, AUTHORIZATION));
tripEventsModel.tripEvents = tripEvents;

const filterModel = new FilterModel();

const appPresenter = new AppPresenter(tripEventsModel, filterModel);
appPresenter.init();
