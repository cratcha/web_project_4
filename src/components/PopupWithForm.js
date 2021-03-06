import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);

    this._popupForm = this._modal.querySelector(".modal__form");
    this._inputList = this._modal.querySelectorAll(".modal__input");
    this._handleFormSubmit = handleFormSubmit;
  }
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    this._modal.addEventListener("submit", (e) => {
      this._handleFormSubmit(this._getInputValues());
      e.preventDefault();
    });
    super.setEventListeners();
  }

  closeModal() {
    this._popupForm.reset();
    super.closeModal();
  }
}

export default PopupWithForm;
