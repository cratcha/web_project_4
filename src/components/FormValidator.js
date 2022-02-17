export class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
  }

  enableValidation() {
    this._setEventListeners();
  }

  _setEventListeners() {
    this._inputs = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );

    this._buttonElement = this._formElement.querySelector(
      this._config.submitButtonSelector
    );

    this.toggleButtonState();
    this._inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this.toggleButtonState();
      });
    });
  }

  _disableSubmitButton() {
    this._buttonElement.disabled = true;
    this._buttonElement.classList.add(this._config.inactiveButtonClass);
  }

  toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableSubmitButton();
    } else {
      this._buttonElement.classList.remove(this._config.inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  resetValidation() {
    this.toggleButtonState();

    this._inputs.forEach((input) => {
      this._removeErrorMessage(input);
    });
  }

  _checkInputValidity(input) {
    if (input.validity.valid) {
      this._removeErrorStyles(input, this._config);
      this._removeErrorMessage(input);
    } else {
      this._addErrorStyles(input, this._config);
      this._addErrorMessage(input);
    }
  }

  _hasInvalidInput() {
    console.log(this._inputs);
    return this._inputs.some((input) => {
      return !input.validity.valid;
    });
  }

  _addErrorMessage(input) {
    const formError = this._formElement.querySelector(`#${input.id}-error`);
    //Replace the content of the error
    formError.textContent = input.validationMessage;
    formError.classList.add(this._config.errorTextVisible);
  }

  _removeErrorMessage(input) {
    const formError = this._formElement.querySelector(`#${input.id}-error`);
    formError.classList.remove(this._config.errorTextVisible);
  }

  _removeErrorStyles(input) {
    input.classList.remove(this._config.inputWithError);
  }

  _addErrorStyles(input) {
    input.classList.add(this._config.inputWithError);
  }
}
