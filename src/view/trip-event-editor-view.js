import dayjs from 'dayjs';
import flatpickr from 'flatpickr';
import he from 'he';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';
import {TripEventType} from '../utils/const.js';
import SmartView from './smart-view.js';

const createTripEventEditor = (destinations = [], offersList = [], {basePrice, dateFrom, dateTo, destination = {}, offers = [], type} = {}, isEventNew) => {
  const startTime = dayjs(dateFrom);
  const endTime = dayjs(dateTo);

  const checkEventType = (eventType) => type === eventType ? 'checked' : '';

  const getEventsList = () => Object.values(TripEventType).map((tripEvent) =>
    `<div class="event__type-item">
      <input id="event-type-${tripEvent}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${tripEvent}" ${checkEventType(tripEvent)}>
      <label class="event__type-label  event__type-label--${tripEvent}" for="event-type-${tripEvent}-1">${tripEvent}</label>
    </div>`).join('');

  const getDestinationList = () => destinations.map((city) => city ? `<option value="${city.name}"></option>` : '').join('');

  const getEditorCloseButtons = () => isEventNew ?
    '<button class="event__reset-btn" type="reset">Cancel</button>' :
    `<button class="event__reset-btn" type="reset">Delete</button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>`;

  const getOfferCheckedStatus = (id) => offers.some((offer) => offer.id === id) ? 'checked' : '';

  const getOffers = () => `${offersList.find((offer) => offer.type === type).offers.map(({id, title, price}) =>
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}" type="checkbox" name="event-offer-${id}" ${getOfferCheckedStatus(id)}>
      <label class="event__offer-label" for="event-offer-${id}">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>`)
    .join('')}`;

  const getOffersList = () =>
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
          ${getOffers()}
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
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name ? he.encode(destination.name) : ''}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${getDestinationList()}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFrom ? startTime.format('DD/MM/YY HH:mm') : ''}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateTo ? endTime.format('DD/MM/YY HH:mm') : ''}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" min="0" value="${basePrice ? basePrice : 0}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        ${getEditorCloseButtons()}
      </header>
      <section class="event__details">
        ${getOffersList()}
        ${destination.description ? getDestinationDescription() : ''}
      </section>
    </form>
  </li>`;
};

export default class TripEventEditorView extends SmartView {
  #isEventNew = null;
  #startDatePicker = null;
  #endDatePicker = null;
  #destinations = null;
  #offersList = null;

  constructor(destinations = [], offersList = [], tripEvent = {}, isEventNew = false) {
    super();
    this.#destinations = destinations;
    this.#offersList = offersList;
    this._data = tripEvent;
    this.#isEventNew = isEventNew;
    this.#setInnerHandlers();
    this.#setDatePickers();
  }

  get template() {
    return createTripEventEditor(this.#destinations, this.#offersList, this._data, this.#isEventNew);
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
    this._callback.submitForm(this._data);
  }

  setSubmitFormHandler = (callback) => {
    this._callback.submitForm = callback;
    this.element.querySelector('form').addEventListener('submit', this.#submitFormHandler);
  }

  #deleteFormHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteForm(this._data);
  }

  setDeleteFormHandler = (callback) => {
    this._callback.deleteForm = callback;
    this.element.querySelector('form').addEventListener('reset', this.#deleteFormHandler);
  }

  #changeEventTypeHandler = (evt) => this.updateData({
    type: evt.target.value,
    offers: [],
  });

  #changeEventCityHandler = (evt) => {
    const newDestination = this.#destinations.find((destination) => destination.name === evt.target.value) || {name: evt.target.value};
    this.updateData({destination: newDestination});
  };

  #changeEventPriceHandler = (evt) => {
    this.updateData({basePrice: Number(evt.target.value)}, true);
  }

  #changeEventOffersHandler = (evt) => {
    const checkedOfferTitle = evt.target.nextElementSibling.querySelector('span').textContent;
    const checkedOffer = this.#offersList.find((offers) => offers.type === this._data.type).offers.find((offer) => offer.title === checkedOfferTitle);

    if (evt.target.checked) {
      this.updateData({offers: [checkedOffer, ...this._data.offers]}, true);
      return;
    }

    const checkedOfferIndex = this._data.offers.findIndex(({id}) => id === checkedOffer.id);
    this.updateData({offers: [...this._data.offers.slice(0, checkedOfferIndex), ...this._data.offers.slice(checkedOfferIndex + 1)]}, true);
  }

  #setInnerHandlers = () => {
    this.element.querySelector('.event__available-offers').addEventListener('change', this.#changeEventOffersHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#changeEventPriceHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#changeEventTypeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#changeEventCityHandler);
  }

  restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setSubmitFormHandler(this._callback.submitForm);
    this.setDeleteFormHandler(this._callback.deleteForm);
    this.#setDatePickers();

    if (!this.#isEventNew) {
      this.setCollapseClickHandler(this._callback.collapseClick);
    }
  }

  reset = (tripEvent) => this.updateData(tripEvent);

  removeElement = () => {
    super.removeElement();
    this.#startDatePicker.destroy();
    this.#startDatePicker = null;
    this.#endDatePicker.destroy();
    this.#endDatePicker = null;
  }

  #startDateChangeHandler = (newStartDate) => {
    this.updateData({dateFrom: newStartDate}, true);
    this.#endDatePicker.destroy();
    this.#endDatePicker = null;
    this.#setEndDatePicker();
  }

  #endDateChangeHandler = (newEndDate) => this.updateData({dateTo: newEndDate}, true);

  #setStartDatePicker = () => {
    this.#startDatePicker = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        onChange: this.#startDateChangeHandler,
      }
    );
  }

  #setEndDatePicker = () => {
    this.#endDatePicker = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        minDate: dayjs(this._data.dateFrom).toISOString(),
        onChange: this.#endDateChangeHandler,
      }
    );
  }

  #setDatePickers = () => {
    this.#setStartDatePicker();
    this.#setEndDatePicker();
  }
}
