import {render, remove, RenderPosition} from '../utils/render.js';
import {UpdateType, UserAction} from '../utils/const.js';
import {nanoid} from 'nanoid';
import TripEventEditorView from '../view/trip-event-editor-view.js';

export default class NewTripEventPresenter {
  #tripEventsListComponent = null;
  #changeData = null;
  #tripEventEditorComponent = null;

  constructor(tripEventsListComponent, changeData) {
    this.#tripEventsListComponent = tripEventsListComponent;
    this.#changeData = changeData;
  }

  init = () => {
    if (this.#tripEventEditorComponent !== null) {
      return;
    }

    this.#tripEventEditorComponent = new TripEventEditorView({type: 'flight'}, true);
    this.#tripEventEditorComponent.setSubmitFormHandler(this.#handleFormSubmit);
    this.#tripEventEditorComponent.setDeleteFormHandler(this.#handleFormDelete);

    render (this.#tripEventsListComponent, this.#tripEventEditorComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeydownHandler);
  }

  destroy = () => {
    if (this.#tripEventEditorComponent === null) {
      return;
    }

    remove(this.#tripEventEditorComponent);
    this.#tripEventEditorComponent = null;

    document.removeEventListener('keydown', this.#escKeydownHandler);
  }

  #escKeydownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };

  #handleFormSubmit = (newTripEvent) => {
    this.#changeData(
      UserAction.ADD_TRIP_EVENT,
      UpdateType.MAJOR,
      {id: nanoid(), ...newTripEvent},
    );
    this.destroy();
  }

  #handleFormDelete = () => this.destroy();
}
