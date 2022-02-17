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
