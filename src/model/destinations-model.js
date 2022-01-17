export default class DestinationsModel {
  #destinations = [];
  #apiService = null;

  constructor(apiService) {
    this.#apiService = apiService;
  }

  get destinations() {
    return this.#destinations;
  }

  get cities() {
    return this.#destinations.map((destination) => destination.name);
  }

  init = async () => {
    try {
      this.#destinations = await this.#apiService.destinations;
    } catch (err) {
      this.#destinations = [];
    }
  }
}
