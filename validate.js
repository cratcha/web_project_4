enableValidation({
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  errorTextSelector: ".modal__error-text",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: ".modal__submit-button_disabled",
});

function enableValidation(settings) {
  const forms = document.querySelectorAll(settings.formSelector);
  forms.forEach((form) => {
    setEventListeners(form, settings);
  });
}

function setEventListeners(form, settings) {
  const inputs = form.querySelectorAll(settings.inputSelector);
  // const buttonElement = form.querySelector(settings.submitButtonSelector);
  // const disabledButton = form.querySelector(settings.inactiveButtonClass)
  inputs.forEach((input) => {
    input.addEventListener("input", (event) => {
      checkInputValidity(input, form);
      //toggleButtonState(input, buttonElement, disabledButton);
    });
  });
}

function checkInputValidity(input, form) {
  if (input.validity.valid) {
    removeErrorStyles(input);
    removeErrorMessage(input, form);
  } else {
    addErrorStyles(input);
    addErrorMessage(input, form);
  }
}

const addErrorMessage = (input, form) => {
  const formError = form.querySelector(`#${input.id}-error`);
  //Replace the content of the error
  input.validationMessage;
  formError.textContent = input.validationMessage;
  formError.classList.add("modal__error-text_visible");
};

const removeErrorMessage = (input, form) => {
  const formError = form.querySelector(`#${input.id}-error`);
  formError.classList.remove("modal__error-text_visible");
  //Reset the error
  formError.textContent = " ";
};

/* const toggleButtonState = (input, buttonElement, disabledButton) => {
    if (!input.validity.valid) {
        buttonElement.classList.add(disabledButton);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(disabledButton);
        buttonElement.disabled = false;
    }
} */

function removeErrorStyles(input) {
  input.classList.remove("modal__input_has-error");
}

function addErrorStyles(input) {
  input.classList.add("modal__input_has-error");
}
