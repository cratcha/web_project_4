enableValidation({
formSelector: ".modal__form",
inputSelector: ".modal__input",
errorTextSelector: ".modal__error-text",
})


function enableValidation(settings) {
const forms = document.querySelectorAll(settings.formSelector);
forms.forEach((form) => {
setEventListeners(form, settings);
})
}

function setEventListeners(form, settings) {
const inputs = form.querySelectorAll(settings.inputSelector);
inputs.forEach((input) => {
    input.addEventListener('input', (event) => {
checkInputValidity(input)
    })
})
}

function checkInputValidity(input) {
    if (input.validity.valid) {
        removeErrorStyles(input)
    } else {
        addErrorStyles(input)
    } 
}

function removeErrorStyles(input) {
    input.classList.remove('.modal__input_has-error')
}

function addErrorStyles(input) {
    input.classList.add('.modal__input_has-error')
}
