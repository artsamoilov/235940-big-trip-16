import {render, replace, remove, RenderPosition} from '../utils/render.js';
import {UpdateType, UserAction} from '../utils/const.js';
import {isOnlyTypeChanged} from '../utils/trip-event.js';
import TripEventView from '../view/trip-event-view.js';
import TripEventEditorView from '../view/trip-event-editor-view.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class TripEventPresenter {
  #tripEventsListComponent = null;
  #changeData = null;
  #changeMode = null;

  #tripEventComponent = null;
  #tripEventEditorComponent = null;

  #tripEvent = null;
  #mode = Mode.DEFAULT;

  constructor(tripEventsListComponent, changeData, changeMode) {
    this.#tripEventsListComponent = tripEventsListComponent;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
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
    this.#tripEventEditorComponent.setDeleteFormHandler(this.#handleFormDelete);

    if (existingTripEventComponent === null || existingTripEventEditorComponent === null) {
      render (this.#tripEventsListComponent, this.#tripEventComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#tripEventComponent, existingTripEventComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#tripEventEditorComponent, existingTripEventEditorComponent);
    }

    remove(existingTripEventComponent);
    remove(existingTripEventEditorComponent);
  }

  destroy = () => {
    remove(this.#tripEventComponent);
    remove(this.#tripEventEditorComponent);
  }

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#tripEventEditorComponent.reset(this.#tripEvent);
      this.#switchEditorToEvent();
    }
  }

  #switchEventToEditor = () => {
    replace(this.#tripEventEditorComponent, this.#tripEventComponent);
    document.addEventListener('keydown', this.#escKeydownHandler);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  }

  #switchEditorToEvent = () => {
    replace(this.#tripEventComponent, this.#tripEventEditorComponent);
    document.removeEventListener('keydown', this.#escKeydownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #escKeydownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#tripEventEditorComponent.reset(this.#tripEvent);
      this.#switchEditorToEvent();
      document.removeEventListener('keydown', this.#escKeydownHandler);
    }
  };

  #handleFavoriteClick = () => this.#changeData(
    UserAction.UPDATE_TRIP_EVENT,
    UpdateType.PATCH,
    {...this.#tripEvent, isFavorite: !this.#tripEvent.isFavorite},
  );

  #handleExpandClick = () => this.#switchEventToEditor();

  #handleCollapseClick = () => {
    this.#tripEventEditorComponent.reset(this.#tripEvent);
    this.#switchEditorToEvent();
  }

  #handleFormSubmit = (update) => {
    const isPatchUpdate = isOnlyTypeChanged(this.#tripEvent, update);

    this.#changeData(
      UserAction.UPDATE_TRIP_EVENT,
      isPatchUpdate ? UpdateType.PATCH : UpdateType.MAJOR,
      update,
    );

    this.#switchEditorToEvent();
  }

  #handleFormDelete = (tripEvent) => {
    this.#changeData(
      UserAction.DELETE_TRIP_EVENT,
      UpdateType.MAJOR,
      tripEvent,
    );
  }
}
