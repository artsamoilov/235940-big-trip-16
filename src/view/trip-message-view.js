import AbstractView from './abstract-view.js';
import {FilterType} from '../utils/const.js';

const tripMessageTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PAST]: 'There are no past events now',
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
