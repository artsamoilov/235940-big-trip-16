import AbstractView from './abstract-view.js';

const createTripMessage = () => (
  '<p class="trip-events__msg">Click New Event to create your first point</p>'
);

export default class TripMessageView extends AbstractView {
  get template() {
    return createTripMessage();
  }
}
