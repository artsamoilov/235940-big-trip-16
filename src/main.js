import TripEventsModel from './model/trip-events-model.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model';
import FilterModel from './model/filter-model.js';
import AppPresenter from './presenter/app-presenter.js';
import ApiService from './api-service.js';

const AUTHORIZATION = 'Basic sld9823u4hf34wef2d';
const END_POINT = 'https://16.ecmascript.pages.academy/big-trip';

const apiService = new ApiService(END_POINT, AUTHORIZATION);

const tripEventsModel = new TripEventsModel(apiService);
// tripEventsModel.init();

const destinationsModel = new DestinationsModel(apiService);
// destinationsModel.init();

const offersModel = new OffersModel(apiService);
// offersModel.init();

const filterModel = new FilterModel();

const appPresenter = new AppPresenter(tripEventsModel, destinationsModel, offersModel, filterModel);
// appPresenter.init();

tripEventsModel.init()
  .then(() => destinationsModel.init())
  .then(() => offersModel.init())
  .finally(() => appPresenter.init());

// TODO разобраться, почему не работает блокировка до загрузки данных
// TODO добавить создание и удаление задач на сервере
// TODO добавить функционал выбора офферов
// TODO выделить презентер для общей информации
