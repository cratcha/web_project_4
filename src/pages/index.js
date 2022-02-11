import "./index.css";
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo";
import Api from "../components/Api.js";
import { renderLoading } from "../utils/utils.js";
import PopupWithDelete from "../components/PopupWithDelete";

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

/*const editProfilePopup = new PopupWithForm({
  popupSelector: "#edit-profile-modal",
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data);
  },
});*/
const editProfilePopup = new PopupWithForm({
  popupSelector: "#edit-profile-modal",
  handleFormSubmit: (data) => {
    renderLoading("#edit-profile-modal", true);
    api
      .editUserInfo({
        name: data.profileName,
        about: data.profileDescription,
      })
      .then((info) => {
        userInfo.setUserInfo({
          profileName: info.name,
          profileDescription: info.about,
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

openProfileModalButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  nameInput.value = currentUserInfo.profileName;
  descriptionInput.value = currentUserInfo.profileDescription;
  editProfilePopup.openModal(currentUserInfo);
});

const imagePopup = new PopupWithImage("#image-modal");
const deletePopup = new PopupWithDelete("#delete-popup");
deletePopup.setEventListeners();

/*const handleAddLike = (cardID) => {
  return api.likeCard(cardID);
};

const handleRemoveLike = (cardID) => {
  return api.unlikeCard(cardID);
};*/

const createCard = (cardData) => {
  const card = new Card(
    {
      data: { ...cardData },
      handlePictureClick: (cardData) => {
        imagePopup.openModal(cardData);
      },
      handleLikeClick: (card) => {
        debugger;
        api
          .changeLikeStatus(card.id(), !card.isLiked())
          .then((data) => {
            card.setLikesInfo({ ...data });
          })
          .catch((err) => console.log(`Unable to change like status: ${err}`));
      },
      handleTrashButtonClick: (card) => {
        deletePopup.openModal();
        deletePopup.handleSubmitAction(() => {
          api
            .deleteCard(card.id())
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
  return card.previewPicture();
};

/*const modalDelete = new PopupWithDelete(
  {
    handleSubmitAction: (evt) => {
      evt.preventDefault();
      api
        .deleteCard(modalDelete.id)
        .then(modalDelete.card.remove())
        .then(modalDelete.closeModal())
        .catch((err) => {
          `Unableto remove card: ${err}`;
        });
    },
  },
  ".modal_type_trash"
);*/

api
  .getAppInfo()
  .then(([initialCards, userInfo]) => {
    cardSection.items = initialCards;
    myInfo = userInfo;
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
let myInfo = null;

//Promise.all([api.getInitialCards(), api.getUserInfo()])

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
