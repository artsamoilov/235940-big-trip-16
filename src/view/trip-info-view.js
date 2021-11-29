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
    if (tripEvents.length > 0) {
      const firstTripEventName = getSortedEventsFrom()[0].destination.name;
      const lastTripEventName = getSortedEventsTo()[tripEvents.length - 1].destination.name;
      const middleTripEventName = getSortedEventsFrom()[Math.round(tripEvents.length / 2)].destination.name;
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
    }
    return '';
  };

  const getTripDuration = () => {
    if (tripEvents.length > 0) {
      const startDay = dayjs(getSortedEventsFrom()[0].dateFrom);
      const endDay = dayjs(getSortedEventsTo()[tripEvents.length - 1].dateTo);
      if (startDay.month() === endDay.month()) {
        return `${startDay.format('MMM DD')}&nbsp;&mdash;&nbsp;${endDay.format('DD')}`;
      }
      return `${startDay.format('MMM DD')}&nbsp;&mdash;&nbsp;${endDay.format('MMM DD')}`;
    }
  };

  return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${getTripRoute()}</h1>

      <p class="trip-info__dates">${getTripDuration()}</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${getTotalPrice()}</span>
    </p>
  </section>`;
};
