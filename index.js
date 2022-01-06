import { FormValidator } from "./FormValidator.js";

const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseButton =
  editProfileModal.querySelector("#edit-close-button");
const openProfileModalButton = document.querySelector("#open-modal-button");

const editProfileForm = document.forms["edit-profile-form"];
const nameInput = editProfileForm.name;
const descriptionInput = editProfileForm.description;
const editProfileSubmit = editProfileForm.querySelector("button[type=submit]");

const profileName = document.querySelector("#profile-name");
const profileDescription = document.querySelector("#profile-description");

const modalCloseButtons = document.querySelectorAll(".modal__close-button");
const imageModal = document.querySelector("#image-modal");
const newCardForm = document.querySelector("#add-card-form");
const cardSubmitButton = newCardForm.querySelector(".modal__submit-button");
const inputLink = newCardForm.url;
const inputTitle = newCardForm.title;

const addCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#add-card-modal");
const cardTemplate = document.querySelector("#element-template");
const cardList = document.querySelector(".elements");

const validationConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  errorTextSelector: ".modal__error-text",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__submit-button_disabled",
  inputWithError: "modal__input_has-error",
  errorTextVisible: "modal__error-text_visible",
};

const editProfileValidator = new FormValidator(
  validationConfig,
  document.querySelector("#edit-profile-modal")
);
editProfileValidator.enableValidation();

const initialCards = [
  {
    title: "Yosemite Valley",
    url: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    title: "Lake Louise",
    url: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    title: "Bald Mountains",
    url: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    title: "Latemar",
    url: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    title: "Vanoise National Park",
    url: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    title: "Lago di Braies",
    url: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

function closeModal(modal) {
  modal.classList.remove("modal_open");
  document.removeEventListener("keydown", closeByEscape);
}

function openModal(modal) {
  modal.classList.add("modal_open");
  document.addEventListener("keydown", closeByEscape);
}

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_open");
    closeModal(openedModal);
  }
}

openProfileModalButton.addEventListener("click", () => {
  openModal(editProfileModal);
  nameInput.value = profileName.innerText;
  descriptionInput.value = profileDescription.innerText;
});

editProfileModal.addEventListener("mousedown", (e) => {
  if (e.target === editProfileModal) {
    closeModal(editProfileModal);
  }
});

addCardModal.addEventListener("mousedown", (e) => {
  if (e.target === addCardModal) {
    closeModal(addCardModal);
  }
});

imageModal.addEventListener("mousedown", (e) => {
  if (e.target === imageModal) {
    closeModal(imageModal);
  }
});

editProfileForm.addEventListener("submit", (e) => {
  e.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal(editProfileModal);
});

function createCard(data) {
  const card = cardTemplate.content.querySelector(".element").cloneNode(true);
  const imageElement = card.querySelector(".element__photo");
  const titleElement = card.querySelector(".element__title");

  const trashButton = card.querySelector(".element__trash");
  const likeButton = card.querySelector(".element__like-button");

  imageElement.src = data.url;
  titleElement.textContent = data.title;
  imageElement.alt = data.title;

  imageElement.addEventListener("click", () => {
    const modalImageElement = imageModal.querySelector(".modal__image");
    const modalCaption = imageModal.querySelector(".modal__caption");
    modalImageElement.src = data.url;
    modalCaption.textContent = data.title;
    modalImageElement.alt = data.title;
    openModal(imageModal);
  });

  trashButton.addEventListener("click", () => {
    const cardToDelete = trashButton.closest(".element");
    cardToDelete.remove();
  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("element__like-button_activated");
  });

  return card;
}

function addCardToPage(element) {
  cardList.prepend(element);
}

function renderCard(data) {
  addCardToPage(createCard(data));
}

initialCards.forEach((cardData) => {
  renderCard(cardData);
});

modalCloseButtons.forEach((modalCloseButton) => {
  modalCloseButton.addEventListener("click", (event) => {
    const modal = modalCloseButton.closest(".modal");
    closeModal(modal);
  });
});

addCardButton.addEventListener("click", () => {
  openModal(addCardModal);
});

newCardForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = { url: inputLink.value, title: inputTitle.value };
  renderCard(data);
  newCardForm.reset();
  cardSubmitButton.disabled = true;
  closeModal(addCardModal);
});
