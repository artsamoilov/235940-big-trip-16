export default class DestinationsModel {
  #destinations = [];
  #apiService = null;

  constructor(apiService) {
    this.#apiService = apiService;
  }

  get destinations() {
    return this.#destinations;
  }

  init = async () => {
    try {
      this.#destinations = await this.#apiService.destinations;
    } catch (err) {
      this.#destinations = [];
    }
  }
}
