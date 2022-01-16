import AbstractView from './abstract-view.js';

const createLoadingMessage = () => '<p class="trip-events__msg">Loading...</p>';

export default class TripLoadingView extends AbstractView {
  get template() {
    return createLoadingMessage();
  }
}
