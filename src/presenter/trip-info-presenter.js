import TripInfoView from '../view/trip-info-view.js';
import {remove, render, RenderPosition} from '../utils/render.js';

export default class TripInfoPresenter {
  #tripMainContainer = null;

  #tripModel = null;
  #tripInfoComponent = null;

  constructor(tripMainContainer, tripModel) {
    this.#tripMainContainer = tripMainContainer;
    this.#tripModel = tripModel;
  }

  init = () => {
    this.#tripInfoComponent = new TripInfoView(this.#tripModel.tripEvents);
    render(this.#tripMainContainer, this.#tripInfoComponent, RenderPosition.AFTERBEGIN);
  };

  destroy = () => remove(this.#tripInfoComponent);
}
