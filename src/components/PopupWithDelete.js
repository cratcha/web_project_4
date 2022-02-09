import Popup from "./Popup.js";
export default class PopupWithDelete extends Popup {
  handleSubmitAction(action) {
    this._handleSubmitAction = action;
  }

  setEventListeners() {
    this._modal.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmitAction();
    });
    super.setEventListeners();
  }
}
