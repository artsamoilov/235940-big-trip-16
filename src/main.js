import AppPresenter from './presenter/app-presenter.js';
import ApiService from './api-service.js';

const AUTHORIZATION = 'Basic sld9823u4hf34wef2d';
const END_POINT = 'https://16.ecmascript.pages.academy/big-trip';

const apiService = new ApiService(END_POINT, AUTHORIZATION);

const appPresenter = new AppPresenter(apiService);
appPresenter.init();

// TODO в точке маршрута время должно отображаться в формате 01D 00H 00M, 01H 00M или 00M
// TODO в статистике формат времени должен совпадать с форматом на главной

// TODO в форме создания/редактирования при отсутствии офферов (Sightseeing) нужно убрать заголовок и контейнер

// TODO скрывать фильтры при переключении на статистику

// TODO убрать возможность вводить текст в поле выбора города? (сейчас кидает ошибку)
// TODO формат даты в поле исправить на «25/12/2019 16:00» (год целиком ?)
