import "./index.css";
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo";
import Api from "../components/Api.js";

const openProfileModalButton = document.querySelector("#open-modal-button");

const editProfileForm = document.forms["edit-profile-form"];
const nameInput = editProfileForm.name;
const descriptionInput = editProfileForm.description;

const newCardForm = document.querySelector("#add-card-form");

const addCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#add-card-modal");

const validationConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  errorTextSelector: ".modal__error-text",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__submit-button_disabled",
  inputWithError: "modal__input_has-error",
  errorTextVisible: "modal__error-text_visible",
};

/*const initialCards = [
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
];*/

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "4921d172-e47d-477d-bceb-cfdae220d52e",
    "Content-Type": "application/json",
  },
});

const editProfileValidator = new FormValidator(
  validationConfig,
  document.querySelector("#edit-profile-modal")
);
editProfileValidator.enableValidation();

const addCardValidator = new FormValidator(validationConfig, addCardModal);
addCardValidator.enableValidation();

const userInfo = new UserInfo({
  profileNameSelector: "#profile-name",
  profileDescriptionSelector: "#profile-description",
});

const editProfilePopup = new PopupWithForm({
  popupSelector: "#edit-profile-modal",
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data);
  },
});

openProfileModalButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  nameInput.value = currentUserInfo.profileName;
  descriptionInput.value = currentUserInfo.profileDescription;
  editProfilePopup.openModal(currentUserInfo);
});

const imagePopup = new PopupWithImage("#image-modal");

const createCard = (data) => {
  const card = new Card(
    {
      data,
      handlePictureClick: (data) => {
        imagePopup.openModal(data);
      },
    },
    "#element-template"
  );
  return card.previewPicture();
};

const cardSection = new Section(
  {
    items: null,
    renderer: (data) => {
      cardSection.addItem(createCard(data));
    },
  },
  ".elements"
);
let myInfo = null;

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([initialCards, userInfo]) => {
    cardSection.items = initialCards;
    myInfo = userInfo;
    cardSection.renderItems();
  })
  .catch((err) => `Unable to load data: ${err}`);

/*api
  .getInitialCards()
  .then((cardsArray) => {
    cardsArray.forEach((data) => {
      cardSection.addItem(createCard(data));
    });
  })
  .catch((err) => {
    console.log(err);
  });*/

//cardSection.renderItems();

const addCardPopup = new PopupWithForm({
  popupSelector: "#add-card-modal",
  handleFormSubmit: (data) => {
    cardSection.addItem(createCard(data));
  },
});

addCardButton.addEventListener("click", () => {
  addCardPopup.openModal();
  addCardValidator.toggleButtonState();
});

imagePopup.setEventListeners();
editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();
