import dayjs from 'dayjs';

export const createTripInfo = (tripEvents) => {
  const getTotalPrice = () => {
    let totalPrice = 0;
    tripEvents.forEach((tripEvent) => {
      totalPrice += tripEvent.basePrice;
      tripEvent.offers.offers.forEach((offer) => {
        totalPrice += offer.price;
      });
    });
    return totalPrice;
  };

  const getSortedEventsFrom = () => tripEvents.slice().sort((firstEvent, secondEvent) => firstEvent.dateFrom - secondEvent.dateFrom);

  const getSortedEventsTo = () => tripEvents.slice().sort((firstEvent, secondEvent) => firstEvent.dateTo - secondEvent.dateTo);

  const getTripRoute = () => {
    const firstTripEventName = getSortedEventsFrom()[0].destination.name;
    const lastTripEventName = getSortedEventsTo()[tripEvents.length - 1].destination.name;
    const middleTripEventName = getSortedEventsFrom()[Math.floor(tripEvents.length / 2)].destination.name;
    switch (tripEvents.length) {
      case 0:
        return '';
      case 1:
        return firstTripEventName;
      case 2:
        return `${firstTripEventName} &mdash; ${lastTripEventName}`;
      case 3:
        return `${firstTripEventName} &mdash; ${middleTripEventName} &mdash; ${lastTripEventName}`;
      default:
        return `${firstTripEventName} &mdash; ... &mdash; ${lastTripEventName}`;
    }
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
