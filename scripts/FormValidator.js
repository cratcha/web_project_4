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
    this.toggleButtonState(inputs, buttonElement);
    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this.toggleButtonState(inputs, buttonElement);
      });
    });
  }

  toggleButtonState(inputs, buttonElement) {
    if (this.hasInvalidInput(inputs)) {
      buttonElement.classList.add(this._config.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._config.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  _checkInputValidity(input) {
    if (input.validity.valid) {
      this.removeErrorStyles(input, this._config);
      this.removeErrorMessage(input, this._formElement, this._config);
    } else {
      this.addErrorStyles(input, this._config);
      this.addErrorMessage(input, this._formElement, this._config);
    }
  }

  hasInvalidInput(inputs) {
    return inputs.some((input) => {
      return !input.validity.valid;
    });
  }

  addErrorMessage(input) {
    const formError = this._formElement.querySelector(`#${input.id}-error`);
    //Replace the content of the error
    input.validationMessage;
    formError.textContent = input.validationMessage;
    formError.classList.add(this._config.errorTextVisible);
  }

  removeErrorMessage(input) {
    const formError = this._formElement.querySelector(`#${input.id}-error`);
    formError.classList.remove(this._config.errorTextVisible);
    //Reset the error
    formError.textContent = " ";
  }

  removeErrorStyles(input) {
    input.classList.remove(this._config.inputWithError);
  }

  addErrorStyles(input) {
    input.classList.add(this._config.inputWithError);
  }
}

//enableValidation(validationConfig);
