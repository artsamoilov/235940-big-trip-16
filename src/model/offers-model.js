export default class OffersModel {
  #offers = [];
  #apiService = null;

  constructor(apiService) {
    this.#apiService = apiService;
  }

  get offers() {
    return this.#offers;
  }

  getOffersByType = (tripEventType) => this.#offers.find((offer) => offer.type === tripEventType).offers;

  init = async () => {
    try {
      this.#offers = await this.#apiService.offers;
    } catch (err) {
      this.#offers = [];
    }
  }
}
