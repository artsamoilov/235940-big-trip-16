import {MenuItem} from '../utils/const.js';
import {remove, render, RenderPosition} from '../utils/render.js';
import TripTabsView from '../view/trip-tabs-view.js';
import TripInfoView from '../view/trip-info-view.js';
import TripStatisticsView from '../view/trip-statistics-view.js';
import TripPresenter from './trip-presenter.js';
import FilterPresenter from './filter-presenter.js';

const tripMainContainer = document.querySelector('.trip-main');
const newEventButton = tripMainContainer.querySelector('.trip-main__event-add-btn');
const tripTabsContainer = document.querySelector('.trip-controls__navigation');
const tripFiltersContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

export default class AppPresenter {
  #tripEventsModel = null;
  #filterModel = null;

  #tripTabsView = new TripTabsView();

  #tripPresenter = null;
  #filterPresenter = null;

  #statisticsComponent = null;

  constructor(tripEventsModel, filterModel) {
    this.#tripEventsModel = tripEventsModel;
    this.#filterModel = filterModel;
  }

  init = () => {
    render(tripTabsContainer, this.#tripTabsView, RenderPosition.BEFOREEND);

    this.#tripPresenter = new TripPresenter(tripEventsContainer, this.#tripEventsModel, this.#filterModel);
    this.#filterPresenter = new FilterPresenter(tripFiltersContainer, this.#filterModel);

    if (this.#tripEventsModel.tripEvents.length > 0) {
      render(tripMainContainer, new TripInfoView(this.#tripEventsModel.tripEvents), RenderPosition.AFTERBEGIN);
    }

    newEventButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      this.#handleTabsClick(MenuItem.NEW_EVENT);
    });

    this.#tripTabsView.setTabClickHandler(this.#handleTabsClick);

    this.#filterPresenter.init();
    this.#tripPresenter.init();
  }

  #handleNewEventEditorClose = () => {
    newEventButton.disabled = false;
    this.#tripTabsView.setMenuItem(MenuItem.TABLE);
  }

  #handleTabsClick = (tabItem) => {
    const tableTabElement = tripTabsContainer.querySelector(`[data-menu-item="${MenuItem.TABLE}"]`);
    const statsTabElement = tripTabsContainer.querySelector(`[data-menu-item="${MenuItem.STATS}"]`);

    switch (tabItem) {
      case MenuItem.NEW_EVENT:
        remove(this.#statisticsComponent);
        this.#filterPresenter.destroy();
        this.#filterPresenter.init();
        this.#tripPresenter.destroy();
        this.#tripPresenter.init();
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
          this.#statisticsComponent = new TripStatisticsView(this.#tripEventsModel.tripEvents);
          tripEventsContainer.classList.add('trip-events--hidden');
          tableTabElement.classList.remove('trip-tabs__btn--active');
          statsTabElement.classList.add('trip-tabs__btn--active');
          render(tripEventsContainer, this.#statisticsComponent, RenderPosition.AFTEREND);
        }
        break;
    }
  }
}
