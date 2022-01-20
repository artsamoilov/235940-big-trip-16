import dayjs from 'dayjs';
import AbstractView from './abstract-view.js';

const createTripInfo = (tripEvents) => {
  const getTotalPrice = () => tripEvents.reduce((totalPrice, tripEvent) =>
    totalPrice + tripEvent.basePrice + tripEvent.offers.reduce((totalOffersPrice, {price}) =>
      totalOffersPrice + price, 0), 0);

  const getSortedEventsFrom = () => tripEvents.slice().sort((firstEvent, secondEvent) => firstEvent.dateFrom - secondEvent.dateFrom);

  const getSortedEventsTo = () => tripEvents.slice().sort((firstEvent, secondEvent) => firstEvent.dateTo - secondEvent.dateTo);

  const getTripRouteString = (firstEventName, middleEventName, lastEventName) => {
    switch (tripEvents.length) {
      case 1:
        return firstEventName;
      case 2:
        return `${firstEventName} &mdash; ${lastEventName}`;
      case 3:
        return `${firstEventName} &mdash; ${middleEventName} &mdash; ${lastEventName}`;
      default:
        return `${firstEventName} &mdash; ... &mdash; ${lastEventName}`;
    }
  };

  const getTripRoute = () => {
    const firstTripEventName = getSortedEventsFrom()[0].destination.name;
    const lastTripEventName = getSortedEventsTo()[tripEvents.length - 1].destination.name;
    const middleTripEventName = getSortedEventsFrom()[Math.floor(tripEvents.length / 2)].destination.name;
    return getTripRouteString(firstTripEventName, middleTripEventName, lastTripEventName);
  };

  const getTripDuration = () => {
    const startDay = dayjs(getSortedEventsFrom()[0].dateFrom);
    const endDay = dayjs(getSortedEventsTo()[tripEvents.length - 1].dateTo);
    const longDateFormat = 'MMM DD';
    const shortDateFormat = 'DD';
    return `${startDay.format(longDateFormat)}&nbsp;&mdash;&nbsp;${endDay.format((startDay.month() === endDay.month()) ? shortDateFormat : longDateFormat)}`;
  };

  return tripEvents.length > 0 ?
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${getTripRoute()}</h1>
        <p class="trip-info__dates">${getTripDuration()}</p>
      </div>
      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${getTotalPrice()}</span>
      </p>
    </section>` :
    '';
};

export default class TripInfoView extends AbstractView {
  #tripEvents = null;

  constructor(tripEvents = null) {
    super();
    this.#tripEvents = tripEvents;
  }

  get template() {
    return createTripInfo(this.#tripEvents);
  }
}
