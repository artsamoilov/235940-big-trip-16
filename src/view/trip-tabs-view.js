import AbstractView from './abstract-view.js';
import {MenuItem} from '../utils/const.js';

const createTripTabs = () => (
  `<div class="trip-controls__navigation">
    <h2 class="visually-hidden">Switch trip view</h2>
    <nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn  trip-tabs__btn--active" href="#" data-menu-item="${MenuItem.TABLE}">Table</a>
      <a class="trip-tabs__btn" href="#" data-menu-item="${MenuItem.STATS}">Stats</a>
    </nav>
  </div>`
);

export default class TripTabsView extends AbstractView {
  get template() {
    return createTripTabs();
  }

  setTabClickHandler = (callback) => {
    this._callback.tabClick = callback;
    this.element.addEventListener('click', this.#tabClickHandler);
  }

  setMenuItem = (menuItem) => {
    const item = this.element.querySelector(`[data-menu-item="${menuItem}"]`);

    if (item !== null) {
      item.classList.add('trip-tabs__btn--active');
    }
  }

  #tabClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.tabClick(evt.target.dataset.menuItem);
  }
}
