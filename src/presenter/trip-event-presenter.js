import {render, replace, remove, RenderPosition} from '../utils/render.js';
import {UpdateType, UserAction} from '../utils/const.js';
import {isOnlyTypeChanged} from '../utils/trip-event.js';
import TripEventView from '../view/trip-event-view.js';
import TripEventEditorView from '../view/trip-event-editor-view.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export const State = {
  SAVING: 'SAVING',
  DELETING: 'DELETING',
  ABORTING: 'ABORTING',
};

export default class TripEventPresenter {
  #tripModel = null;

  #tripEventsListComponent = null;
  #tripEventComponent = null;
  #tripEventEditorComponent = null;

  #changeData = null;
  #changeMode = null;

  #tripEvent = null;
  #mode = Mode.DEFAULT;

  constructor(tripModel, tripEventsListComponent, changeData, changeMode) {
    this.#tripModel = tripModel;
    this.#tripEventsListComponent = tripEventsListComponent;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (tripEvent = {}) => {
    this.#tripEvent = tripEvent;

    const existingTripEventComponent = this.#tripEventComponent;
    const existingTripEventEditorComponent = this.#tripEventEditorComponent;

    this.#tripEventComponent = new TripEventView(tripEvent);
    this.#tripEventEditorComponent = new TripEventEditorView(this.#tripModel.destinations, this.#tripModel.offersList, tripEvent);

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
      replace(this.#tripEventComponent, existingTripEventEditorComponent);
      this.#mode = Mode.DEFAULT;
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

  setViewState = (state) => {
    if (this.#mode === Mode.DEFAULT) {
      return;
    }

    const resetFormState = () => this.#tripEventEditorComponent.updateData({
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    });

    switch (state) {
      case State.SAVING:
        this.#tripEventEditorComponent.updateData({
          isDisabled: true,
          isSaving: true,
        });
        break;
      case State.DELETING:
        this.#tripEventEditorComponent.updateData({
          isDisabled: true,
          isDeleting: true,
        });
        break;
      case State.ABORTING:
        this.#tripEventComponent.shake(resetFormState);
        this.#tripEventEditorComponent.shake(resetFormState);
        break;
    }
  }

  #switchEventToEditor = () => {
    replace(this.#tripEventEditorComponent, this.#tripEventComponent);
    this.#tripEventEditorComponent.setDatePickers();
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
  }

  #handleFormDelete = (tripEvent) => {
    this.#changeData(
      UserAction.DELETE_TRIP_EVENT,
      UpdateType.MAJOR,
      tripEvent,
    );
  }
}
