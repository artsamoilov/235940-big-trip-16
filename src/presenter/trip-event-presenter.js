import {render, replace, RenderPosition} from '../utils/render.js';
import TripEventView from '../view/trip-event-view.js';
import TripEventEditorView from '../view/trip-event-editor-view.js';

export default class TripEventPresenter {
  #tripEventsListComponent = null;

  #tripEventComponent = null;
  #tripEventEditorComponent = null;

  #tripEvent = null;

  constructor(tripEventsListComponent) {
    this.#tripEventsListComponent = tripEventsListComponent;
  }

  init = (tripEvent = {}) => {
    this.#tripEvent = tripEvent;

    this.#tripEventComponent = new TripEventView(tripEvent);
    this.#tripEventEditorComponent = new TripEventEditorView(tripEvent);

    this.#tripEventComponent.setExpandClickHandler(this.#handleExpandClick);
    this.#tripEventEditorComponent.setCollapseClickHandler(this.#handleCollapseClick);
    this.#tripEventEditorComponent.setSubmitFormHandler(this.#handleFormSubmit);

    render (this.#tripEventsListComponent, this.#tripEventComponent, RenderPosition.BEFOREEND);
  }

  #switchEventToEditor = () => {
    replace(this.#tripEventEditorComponent, this.#tripEventComponent);
  }

  #switchEditorToEvent = () => {
    replace(this.#tripEventComponent, this.#tripEventEditorComponent);
  }

  #escKeydownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#switchEditorToEvent();
      document.removeEventListener('keydown', this.#escKeydownHandler);
    }
  };

  #handleExpandClick = () => {
    this.#switchEventToEditor();
    document.addEventListener('keydown', this.#escKeydownHandler);
  }

  #handleCollapseClick = () => {
    this.#switchEditorToEvent();
    document.removeEventListener('keydown', this.#escKeydownHandler);
  }

  #handleFormSubmit = () => {
    this.#switchEditorToEvent();
    document.removeEventListener('keydown', this.#escKeydownHandler);
  }
}
