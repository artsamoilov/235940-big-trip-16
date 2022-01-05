import AbstractView from './abstract-view.js';
import {FilterType} from '../utils/const.js';

const tripMessageTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'You have no future events.<br>Click New Event to add one',
  [FilterType.PAST]: 'You have no past events.<br>Click New Event to add one',
};

const createTripMessage = (filterType) => `<p class="trip-events__msg">${tripMessageTextType[filterType]}</p>`;

export default class TripMessageView extends AbstractView {
  constructor(filterType) {
    super();
    this._filterType = filterType;
  }

  get template() {
    return createTripMessage(this._filterType);
  }
}
