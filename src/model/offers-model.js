export default class OffersModel {
  #offers = [];
  #apiService = null;

  constructor(apiService) {
    this.#apiService = apiService;
  }

  get offersList() {
    return this.#offers;
  }

  init = async () => {
    try {
      this.#offers = await this.#apiService.offers;
    } catch (err) {
      this.#offers = [];
    }
  }
}
