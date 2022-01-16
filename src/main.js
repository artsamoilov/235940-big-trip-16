import TripEventsModel from './model/trip-events-model.js';
import FilterModel from './model/filter-model.js';
import AppPresenter from './presenter/app-presenter.js';
import ApiService from './api-service.js';

const AUTHORIZATION = 'Basic sld9823u4hf34wef2';
const END_POINT = 'https://16.ecmascript.pages.academy/big-trip';

const tripEventsModel = new TripEventsModel(new ApiService(END_POINT, AUTHORIZATION));
tripEventsModel.init();

const filterModel = new FilterModel();

const appPresenter = new AppPresenter(tripEventsModel, filterModel);
appPresenter.init();
