import {MenuItem} from '../utils/const.js';
import {remove, render, RenderPosition} from '../utils/render.js';
import TripModel from '../model/trip-model.js';
import FilterModel from '../model/filter-model.js';
import TripTabsView from '../view/trip-tabs-view.js';
import TripStatisticsView from '../view/trip-statistics-view.js';
import TripPresenter from './trip-presenter.js';
import FilterPresenter from './filter-presenter.js';
import TripInfoPresenter from './trip-info-presenter.js';

const tripMainContainer = document.querySelector('.trip-main');
const newEventButton = document.querySelector('.trip-main__event-add-btn');
const tripControlsContainer = document.querySelector('.trip-controls');
const tripEventsContainer = document.querySelector('.trip-events');

export default class AppPresenter {
  #tripModel = null;
  #filterModel = new FilterModel();

  #tripTabsComponent = new TripTabsView();
  #statisticsComponent = null;

  #tripPresenter = null;
  #tripInfoPresenter = null;
  #filterPresenter = null;

  constructor(apiService) {
    this.#tripModel = new TripModel(apiService);
  }

  init = () => {
    this.#filterPresenter = new FilterPresenter(tripControlsContainer, this.#tripModel, this.#filterModel);
    this.#tripInfoPresenter = new TripInfoPresenter(tripMainContainer, this.#tripModel);
    this.#tripPresenter = new TripPresenter(tripMainContainer, tripEventsContainer, this.#tripModel, this.#filterModel, this.#filterPresenter, this.#tripInfoPresenter);

    newEventButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      this.#handleTabsClick(MenuItem.NEW_EVENT);
    });

    this.#tripTabsComponent.setTabClickHandler(this.#handleTabsClick);

    this.#tripPresenter.init();

    this.#tripModel.init().finally(() => {
      render(tripControlsContainer, this.#tripTabsComponent, RenderPosition.AFTERBEGIN);
      this.#filterPresenter.init();
      this.#tripInfoPresenter.init();
    });
  }

  #handleNewEventEditorClose = () => {
    newEventButton.disabled = false;
    this.#tripTabsComponent.setMenuItem(MenuItem.TABLE);
  }

  #handleTabsClick = (tabItem) => {
    const tableTabElement = tripControlsContainer.querySelector(`[data-menu-item="${MenuItem.TABLE}"]`);
    const statsTabElement = tripControlsContainer.querySelector(`[data-menu-item="${MenuItem.STATS}"]`);

    switch (tabItem) {
      case MenuItem.NEW_EVENT:
        remove(this.#statisticsComponent);
        this.#filterPresenter.destroy();
        this.#filterPresenter.init();
        this.#tripPresenter.destroy();
        this.#tripPresenter.init();
        this.#tripInfoPresenter.destroy();
        this.#tripInfoPresenter.init();
        statsTabElement.classList.remove('trip-tabs__btn--active');
        tableTabElement.classList.add('trip-tabs__btn--active');
        tripEventsContainer.classList.remove('trip-events--hidden');
        this.#tripPresenter.createTripEvent(this.#handleNewEventEditorClose);
        newEventButton.disabled = true;
        break;
      case MenuItem.TABLE:
        if (!tableTabElement.classList.contains('trip-tabs__btn--active')) {
          remove(this.#statisticsComponent);
          this.#filterPresenter.init();
          this.#tripPresenter.init();
          statsTabElement.classList.remove('trip-tabs__btn--active');
          tableTabElement.classList.add('trip-tabs__btn--active');
          tripEventsContainer.classList.remove('trip-events--hidden');
        }
        break;
      case MenuItem.STATS:
        if (!statsTabElement.classList.contains('trip-tabs__btn--active')) {
          this.#filterPresenter.destroy();
          this.#tripPresenter.destroy();
          this.#statisticsComponent = new TripStatisticsView(this.#tripModel.tripEvents);
          tripEventsContainer.classList.add('trip-events--hidden');
          tableTabElement.classList.remove('trip-tabs__btn--active');
          statsTabElement.classList.add('trip-tabs__btn--active');
          render(tripEventsContainer, this.#statisticsComponent, RenderPosition.AFTEREND);
        }
        break;
    }
  }
}
