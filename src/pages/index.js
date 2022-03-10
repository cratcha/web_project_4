import "./index.css";
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo";
import Api from "../utils/Api.js";
import { renderLoading } from "../utils/utils.js";
import PopupWithDelete from "../components/PopupWithDelete";
import { validationConfig, elements, selectors } from "../utils/constants";

const openProfileModalButton = document.querySelector("#open-modal-button");

const editProfileForm = document.forms["edit-profile-form"];
const nameInput = editProfileForm.name;
const descriptionInput = editProfileForm.description;

const addCardButton = document.querySelector(".profile__add-button");

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-11",
  headers: {
    authorization: "31f62eb8-38ec-46e4-a611-45b4f4685de4",
    "Content-Type": "application/json",
  },
});

const editProfileValidator = new FormValidator(
  validationConfig,
  elements.editProfilePopup
);
editProfileValidator.enableValidation();

const addCardValidator = new FormValidator(
  validationConfig,
  elements.addCardModal
);
addCardValidator.enableValidation();

const userData = new UserInfo({
  profileNameSelector: "#profile-name",
  profileDescriptionSelector: "#profile-description",
  userAvatarSelector: ".profile__avatar-image",
});

const editProfilePopup = new PopupWithForm({
  popupSelector: "#edit-profile-modal",
  handleFormSubmit: (data) => {
    renderLoading("#edit-profile-modal", true);
    api
      .editUserInfo({
        name: data.name,
        about: data.about,
      })
      .then((info) => {
        userData.setUserInfo({
          name: info.name,
          about: info.about,
        });
        editProfilePopup.closeModal();
      })
      .catch((err) =>
        console.log(`Unable to update profile information: ${err}`)
      )
      .finally(() => {
        renderLoading("#edit-profile-modal");
      });
  },
});

const editAvatar = new FormValidator(validationConfig, elements.addAvatarModal);
editAvatar.enableValidation();

const updateAvatarPopup = new PopupWithForm({
  popupSelector: "#change-avatar-modal",
  handleFormSubmit: (data) => {
    renderLoading("#change-avatar-modal", true);
    api
      .updateAvatar({ avatar: data.link })
      .then((info) => {
        userData.setAvatar({ link: info.avatar });
        updateAvatarPopup.closeModal();
      })
      .catch((err) => console.log(`Unable change the user avatar: ${res}`))
      .finally(() => {
        renderLoading("#change-avatar-modal");
      });
  },
});

updateAvatarPopup.setEventListeners();

const openAvatarModalButton = document.querySelector("#edit-avatar-button");

openAvatarModalButton.addEventListener("click", () => {
  updateAvatarPopup.openModal();
  editAvatar.resetValidation();
  //editAvatar.toggleButtonState();
});

openProfileModalButton.addEventListener("click", () => {
  const currentUserInfo = userData.getUserInfo();
  nameInput.value = currentUserInfo.profileName;
  descriptionInput.value = currentUserInfo.profileDescription;
  editProfilePopup.openModal();
});

const imagePopup = new PopupWithImage("#image-modal");
const deletePopup = new PopupWithDelete("#delete-popup");
deletePopup.setEventListeners();

const createCard = (cardData) => {
  const card = new Card(
    {
      data: { ...cardData },
      currentUserId: userData.getUserId(),
      handlePictureClick: (cardData) => {
        imagePopup.openModal(cardData);
      },
      handleLikeClick: (card) => {
        api
          .changeLikeStatus(card.getId(), !card.checkIfLiked())
          .then((data) => {
            card.setLikesInfo({ ...data });
          })
          .catch((err) => console.log(`Unable to change like status: ${err}`));
      },
      handleTrashButtonClick: (card) => {
        deletePopup.openModal();
        deletePopup.handleSubmitAction(() => {
          api
            .deleteCard(card.getId())
            .then(() => {
              card.removeElement();
              deletePopup.closeModal();
            })
            .catch((err) => console.log(`Unable to delete a card: ${err}`));
        });
      },
    },
    "#element-template"
  );
  return card.generateCard();
};

api
  .getAppInfo()
  .then(([initialCards, userInfo]) => {
    cardSection.items = initialCards;
    userData.setUserInfo(userInfo);

    cardSection.renderItems();
  })
  .catch((err) => `Unable to load data: ${err}`);

const cardSection = new Section(
  {
    items: null,
    renderer: (data) => {
      cardSection.addItem(createCard(data));
    },
  },
  ".elements"
);

const addCardPopup = new PopupWithForm({
  popupSelector: "#add-card-modal",
  handleFormSubmit: (data) => {
    renderLoading("#add-card-modal", true);

    api
      .addNewCard(data)
      .then((cardData) => {
        cardSection.addItem(createCard(cardData));
        addCardPopup.closeModal();
      })
      .catch((err) => console.log(`Unable to add a card: ${err}`))
      .finally(() => {
        renderLoading("#add-card-modal");
      });
  },
});

addCardButton.addEventListener("click", () => {
  addCardPopup.openModal();
  addCardValidator.toggleButtonState();
});

imagePopup.setEventListeners();
editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();
