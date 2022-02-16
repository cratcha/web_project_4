import Popup from "./Popup.js";
export default class PopupWithDelete extends Popup {
  handleSubmitAction(action) {
    this._handleSubmitAction = action;
  }

  setEventListeners() {
    this._modal
      .querySelector(".modal__delete-button")
      .addEventListener("click", (evt) => {
        evt.preventDefault();
        this._handleSubmitAction();
      });
    super.setEventListeners();
  }
}

/*export default class PopupWithDelete extends Popup {
  constructor({ handleSubmitAction }, popupSelector) {
    super(popupSelector);
    this._handleSubmitAction = handleSubmitAction;
  }
  openModal(card, id) {
    this.card = card;
    this.id = id;
    super.openModal();
  }

  setEventListeners() {
    this._modal.addEventListener("submit", (evt) => {
      //evt.preventDefault();
      this._handleSubmitAction();
    });
    super.setEventListeners();
  }
}*/
