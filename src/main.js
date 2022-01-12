import {getTripEvent} from './mock/trip-event.js';
import {render, RenderPosition, remove} from './utils/render.js';
import {MenuItem} from './utils/const.js';
import TripTabsView from './view/trip-tabs-view.js';
import TripInfoView from './view/trip-info-view.js';
import TripStatisticsView from './view/trip-statistics-view.js';
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
const tripTabs = new TripTabsView();

render(tripTabsContainer, tripTabs, RenderPosition.BEFOREEND);

const tripPresenter = new TripPresenter(tripEventsContainer, tripEventsModel, filterModel);
const filterPresenter = new FilterPresenter(tripFiltersContainer, filterModel);

if (TRIP_EVENTS_COUNTER > 0) {
  render(tripMainContainer, new TripInfoView(tripEvents), RenderPosition.AFTERBEGIN);
}

const handleNewEventEditorClose = () => {
  document.querySelector('.trip-main__event-add-btn').disabled = false;
  tripTabs.setMenuItem(MenuItem.TABLE);
};

const tableTabElement = tripTabsContainer.querySelector(`[data-menu-item="${MenuItem.TABLE}"]`);
const statsTabElement = tripTabsContainer.querySelector(`[data-menu-item="${MenuItem.STATS}"]`);
let statisticsComponent = null;

const handleTabsClick = (tabItem) => {
  switch (tabItem) {
    case MenuItem.NEW_EVENT:
      remove(statisticsComponent);
      filterPresenter.destroy();
      filterPresenter.init();
      tripPresenter.destroy();
      tripPresenter.init();
      statsTabElement.classList.remove('trip-tabs__btn--active');
      tableTabElement.classList.add('trip-tabs__btn--active');
      tripEventsContainer.classList.remove('trip-events--hidden');
      tripPresenter.createTripEvent(handleNewEventEditorClose);
      document.querySelector('.trip-main__event-add-btn').disabled = true;
      break;
    case MenuItem.TABLE:
      if (!tableTabElement.classList.contains('trip-tabs__btn--active')) {
        remove(statisticsComponent);
        filterPresenter.init();
        tripPresenter.init();
        statsTabElement.classList.remove('trip-tabs__btn--active');
        tableTabElement.classList.add('trip-tabs__btn--active');
        tripEventsContainer.classList.remove('trip-events--hidden');
      }
      break;
    case MenuItem.STATS:
      if (!statsTabElement.classList.contains('trip-tabs__btn--active')) {
        filterPresenter.destroy();
        tripPresenter.destroy();
        statisticsComponent = new TripStatisticsView(tripEventsModel.tripEvents);
        tripEventsContainer.classList.add('trip-events--hidden');
        tableTabElement.classList.remove('trip-tabs__btn--active');
        statsTabElement.classList.add('trip-tabs__btn--active');
        render(tripEventsContainer, statisticsComponent, RenderPosition.AFTEREND);
      }
      break;
  }
};

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  handleTabsClick(MenuItem.NEW_EVENT);
});

tripTabs.setTabClickHandler(handleTabsClick);

filterPresenter.init();
tripPresenter.init();

