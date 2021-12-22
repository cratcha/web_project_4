enableValidation({
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  errorTextSelector: ".modal__error-text",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__submit-button_disabled",
  inputWithError: "modal__input_has-error",
  errorTextVisible: "modal__error-text_visible",
});

function enableValidation(settings) {
  const forms = Array.from(document.querySelectorAll(settings.formSelector));
  forms.forEach((form) => {
    setEventListeners(form, settings);
  });
}

function setEventListeners(form, settings) {
  const inputs = Array.from(form.querySelectorAll(settings.inputSelector));
  const buttonElement = form.querySelector(settings.submitButtonSelector);
  toggleButtonState(inputs, buttonElement, settings);
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(input, form, settings);
      toggleButtonState(inputs, buttonElement, settings);
    });
  });
}

const toggleButtonState = (inputs, buttonElement, settings) => {
  if (hasInvalidInput(inputs)) {
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

function checkInputValidity(input, form, settings) {
  if (input.validity.valid) {
    removeErrorStyles(input, settings);
    removeErrorMessage(input, form, settings);
  } else {
    addErrorStyles(input, settings);
    addErrorMessage(input, form, settings);
  }
}

const hasInvalidInput = (inputs) => {
  return inputs.some((input) => {
    return !input.validity.valid;
  });
};

const addErrorMessage = (input, form, settings) => {
  const formError = form.querySelector(`#${input.id}-error`);
  //Replace the content of the error
  input.validationMessage;
  formError.textContent = input.validationMessage;
  formError.classList.add(settings.errorTextVisible);
};

const removeErrorMessage = (input, form, settings) => {
  const formError = form.querySelector(`#${input.id}-error`);
  formError.classList.remove(settings.errorTextVisible);
  //Reset the error
  formError.textContent = " ";
};

function removeErrorStyles(input, settings) {
  input.classList.remove(settings.inputWithError);
}

function addErrorStyles(input, settings) {
  input.classList.add(settings.inputWithError);
}
