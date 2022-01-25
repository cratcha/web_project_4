import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);

    this._popupForm = this._modal.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }
  _getInputValues() {
    this._inputList = this._modal.querySelectorAll(".modal__input");

    this._formValues = {};
    this._inputList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );
    return this._formValues;
  }

  setEventListeners() {
    this._modal.addEventListener("submit", () => {
      this._handleFormSubmit(this._getInputValues());
      this.closeModal();
    });
    super.setEventListeners();
  }

  closeModal() {
    this._popupForm.reset();
    super.closeModal();
  }
}

export default PopupWithForm;
