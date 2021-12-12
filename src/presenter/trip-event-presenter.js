import {render, replace, remove, RenderPosition} from '../utils/render.js';
import TripEventView from '../view/trip-event-view.js';
import TripEventEditorView from '../view/trip-event-editor-view.js';

export default class TripEventPresenter {
  #tripEventsListComponent = null;
  #changeData = null;

  #tripEventComponent = null;
  #tripEventEditorComponent = null;

  #tripEvent = null;

  constructor(tripEventsListComponent, changeData) {
    this.#tripEventsListComponent = tripEventsListComponent;
    this.#changeData = changeData;
  }

  init = (tripEvent = {}) => {
    this.#tripEvent = tripEvent;

    const existingTripEventComponent = this.#tripEventComponent;
    const existingTripEventEditorComponent = this.#tripEventEditorComponent;

    this.#tripEventComponent = new TripEventView(tripEvent);
    this.#tripEventEditorComponent = new TripEventEditorView(tripEvent);

    this.#tripEventComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#tripEventComponent.setExpandClickHandler(this.#handleExpandClick);
    this.#tripEventEditorComponent.setCollapseClickHandler(this.#handleCollapseClick);
    this.#tripEventEditorComponent.setSubmitFormHandler(this.#handleFormSubmit);

    if (existingTripEventComponent === null || existingTripEventEditorComponent === null) {
      render (this.#tripEventsListComponent, this.#tripEventComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this.#tripEventsListComponent.element.contains(existingTripEventComponent.element)) {
      replace(this.#tripEventComponent, existingTripEventComponent);
    }

    if (this.#tripEventsListComponent.element.contains(existingTripEventEditorComponent.element)) {
      replace(this.#tripEventEditorComponent, existingTripEventEditorComponent);
    }

    remove(existingTripEventComponent);
    remove(existingTripEventEditorComponent);
  }

  destroy = () => {
    remove(this.#tripEventComponent);
    remove(this.#tripEventEditorComponent);
  }

  #switchEventToEditor = () => {
    replace(this.#tripEventEditorComponent, this.#tripEventComponent);
    document.addEventListener('keydown', this.#escKeydownHandler);
  }

  #switchEditorToEvent = () => {
    replace(this.#tripEventComponent, this.#tripEventEditorComponent);
    document.removeEventListener('keydown', this.#escKeydownHandler);
  }

  #escKeydownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#switchEditorToEvent();
      document.removeEventListener('keydown', this.#escKeydownHandler);
    }
  };

  #handleFavoriteClick = () => this.#changeData({...this.#tripEvent, isFavorite: !this.#tripEvent.isFavorite});

  #handleExpandClick = () => this.#switchEventToEditor();

  #handleCollapseClick = () => this.#switchEditorToEvent();

  #handleFormSubmit = (tripEvent) => {
    this.#changeData(tripEvent);
    this.#switchEditorToEvent();
  }
}
