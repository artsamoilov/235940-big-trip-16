import dayjs from 'dayjs';
import {TRIP_CITIES, TRIP_EVENT_TYPES} from '../utils/const.js';
import AbstractView from './abstract-view.js';

const createTripEventEditor = ({basePrice, dateFrom, dateTo, destination, offers, type}, isEventNew) => {
  const startTime = dayjs(dateFrom);
  const endTime = dayjs(dateTo);

  const checkEventType = (eventType) => type === eventType ? 'checked' : '';

  const getEventsList = () => TRIP_EVENT_TYPES.map((tripEvent) =>
    `<div class="event__type-item">
      <input id="event-type-${tripEvent}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${tripEvent}" ${checkEventType(tripEvent)}>
      <label class="event__type-label  event__type-label--${tripEvent}" for="event-type-${tripEvent}-1">${tripEvent}</label>
    </div>`).join('');

  const getDestinationList = () => TRIP_CITIES.map((city) => `<option value="${city}"></option>`).join('');

  const getEditorCloseButtons = () => isEventNew ?
    '<button class="event__reset-btn" type="reset">Close</button>' :
    `<button class="event__reset-btn" type="reset">Delete</button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>`;

  const getOffersList = () =>
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
          ${offers.offers.map(({id, title, price}) => `<div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}" type="checkbox" name="event-offer-${id}" checked>
            <label class="event__offer-label" for="event-offer-${id}">
              <span class="event__offer-title">${title}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${price}</span>
            </label>
          </div>`).join('')}
        </div>
    </section>`;

  const getDestinationPictures = () =>
    `<div class="event__photos-container">
      <div class="event__photos-tape">
        ${destination.pictures.map(({src, description}) =>`<img class="event__photo" src="${src}" alt="${description}">`).join('')}
      </div>
    </div>`;

  const getDestinationDescription = () =>
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${destination.description}</p>
      ${destination.pictures.length > 0 ? getDestinationPictures() : ''}
    </section>`;

  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
                ${getEventsList()}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${getDestinationList()}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startTime.format('DD/MM/YY HH:mm')}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endTime.format('DD/MM/YY HH:mm')}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        ${getEditorCloseButtons()}
      </header>
      <section class="event__details">
        ${offers.offers.length > 0 ? getOffersList() : ''}
        ${destination.description.length > 0 ? getDestinationDescription() : ''}
      </section>
    </form>
  </li>`;
};

export default class TripEventEditorView extends AbstractView {
  #tripEvent = {};
  #isEventNew = null;

  constructor(tripEvent = {}, isEventNew = false) {
    super();
    this.#tripEvent = tripEvent;
    this.#isEventNew = isEventNew;
  }

  get template() {
    return createTripEventEditor(this.#tripEvent, this.#isEventNew);
  }

  #collapseClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.collapseClick();
  }

  setCollapseClickHandler = (callback) => {
    this._callback.collapseClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#collapseClickHandler);
  }

  #submitFormHandler = (evt) => {
    evt.preventDefault();
    this._callback.submitForm(this.#tripEvent);
  }

  setSubmitFormHandler = (callback) => {
    this._callback.submitForm = callback;
    this.element.querySelector('form').addEventListener('submit', this.#submitFormHandler);
  }
}
