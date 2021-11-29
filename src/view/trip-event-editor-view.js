import dayjs from 'dayjs';
import {TRIP_CITIES, TRIP_EVENT_TYPES} from '../const';

export const createTripEventEditor = ({basePrice, dateFrom, dateTo, destination, offers, type}, isEventNew = false) => {
  const startTime = dayjs(dateFrom);
  const endTime = dayjs(dateTo);

  const checkEventType = (eventType) => type === eventType ? 'checked' : '';

  const getEventsList = () => {
    const tripEventsList = [];
    for (const tripEvent of TRIP_EVENT_TYPES) {
      tripEventsList.push(`
        <div class="event__type-item">
          <input id="event-type-${tripEvent}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${tripEvent}" ${checkEventType(tripEvent)}>
          <label class="event__type-label  event__type-label--${tripEvent}" for="event-type-${tripEvent}-1">${tripEvent}</label>
        </div>`);
    }
    return tripEventsList.join('');
  };

  const getDestinationList = () => {
    const destinationList = [];
    for (const city of TRIP_CITIES) {
      destinationList.push(`<option value="${city}"></option>`);
    }
    return destinationList.join('');
  };

  const getEditorCloseButtons = () => isEventNew ?
    '<button class="event__reset-btn" type="reset">Close</button>' :
    `<button class="event__reset-btn" type="reset">Delete</button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>`;

  const getOffersList = () => {
    if (offers.offers.length > 0) {
      const offersList = [];
      for (const offer of offers.offers) {
        offersList.push(`
        <div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.id}" type="checkbox" name="event-offer-${offer.id}">
          <label class="event__offer-label" for="event-offer-${offer.id}">
            <span class="event__offer-title">${offer.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${offer.price}</span>
          </label>
        </div>`);
      }
      return `<section class="event__section  event__section--offers">
                <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                  <div class="event__available-offers">
                    ${offersList.join('')}
                  </div>
              </section>`;
    }
    return '';
  };

  const getDestinationPictures = () => {
    if (destination.pictures.length > 0) {
      const picturesList = [];
      for (const picture of destination.pictures) {
        picturesList.push(`<img class="event__photo" src="${picture.src}" alt="${picture.description}">`);
      }
      return `<div class="event__photos-container">
                <div class="event__photos-tape">
                  ${picturesList.join('')}
                </div>
              </div>`;
    }
    return '';
  };

  const getDestinationDescription = () => destination.description.length > 0 ?
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${destination.description}</p>
      ${getDestinationPictures()}
    </section>` :
    '';

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
        ${getOffersList()}
        ${getDestinationDescription()}
      </section>
    </form>
  </li>`;
};
