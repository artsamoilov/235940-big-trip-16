import AppPresenter from './presenter/app-presenter.js';
import ApiService from './api-service.js';

const AUTHORIZATION = 'Basic sld9823u4hf34wef2d';
const END_POINT = 'https://16.ecmascript.pages.academy/big-trip';

const apiService = new ApiService(END_POINT, AUTHORIZATION);

const appPresenter = new AppPresenter(apiService);
appPresenter.init();
