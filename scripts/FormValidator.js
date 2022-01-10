export class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
  }

  enableValidation() {
    this.setEventListeners();
  }

  setEventListeners() {
    const inputs = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );
    const buttonElement = this._formElement.querySelector(
      this._config.submitButtonSelector
    );
    this._toggleButtonState(inputs, buttonElement);
    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButtonState(inputs, buttonElement);
      });
    });
  }

  _toggleButtonState(inputs, buttonElement) {
    if (this._hasInvalidInput(inputs)) {
      buttonElement.classList.add(this._config.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._config.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  _checkInputValidity(input) {
    if (input.validity.valid) {
      this._removeErrorStyles(input, this._config);
      this._removeErrorMessage(input, this._formElement, this._config);
    } else {
      this._addErrorStyles(input, this._config);
      this._addErrorMessage(input, this._formElement, this._config);
    }
  }

  _hasInvalidInput(inputs) {
    return inputs.some((input) => {
      return !input.validity.valid;
    });
  }

  _addErrorMessage(input) {
    const formError = this._formElement.querySelector(`#${input.id}-error`);
    //Replace the content of the error
    input.validationMessage;
    formError.textContent = input.validationMessage;
    formError.classList.add(this._config.errorTextVisible);
  }

  _removeErrorMessage(input) {
    const formError = this._formElement.querySelector(`#${input.id}-error`);
    formError.classList.remove(this._config.errorTextVisible);
    //Reset the error
    formError.textContent = " ";
  }

  _removeErrorStyles(input) {
    input.classList.remove(this._config.inputWithError);
  }

  _addErrorStyles(input) {
    input.classList.add(this._config.inputWithError);
  }
}

//enableValidation(validationConfig);
