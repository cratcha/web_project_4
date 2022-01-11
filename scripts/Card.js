import { imageModal, modalCaption, modalImageElement } from "./index.js";
import { openModal } from "./utils.js";

export class Card {
  constructor(template, data) {
    this._template = template;
    this._data = data;
  }

  createCard() {
    this._card = this._template.content
      .querySelector(".element")
      .cloneNode(true);

    this._titleElement = this._card.querySelector(".element__title");

    this._trashButton = this._card.querySelector(".element__trash");

    this._likeButton = this._card.querySelector(".element__like-button");
    this._imageElement = this._card.querySelector(".element__photo");
    this._imageElement.src = this._data.url;
    this._imageElement.alt = this._data.title;
    this._titleElement.textContent = this._data.title;

    this._setEventListeners();

    return this._card;
  }

  _setEventListeners() {
    this._imageElement.addEventListener("click", (evt) => {
      this._handlePreviewPicture();
    });

    this._likeButton.addEventListener("click", (evt) => {
      this._handleLikeClick();
    });

    this._trashButton.addEventListener("click", (evt) => {
      this._handleTrashButtonClick();
    });
  }

  _handlePreviewPicture() {
    modalImageElement.src = this._data.url;
    modalCaption.textContent = this._data.title;
    modalImageElement.alt = this._data.title;
    openModal(imageModal);
  }

  _handleLikeClick() {
    this._likeButton.classList.toggle("element__like-button_activated");
  }

  _handleTrashButtonClick() {
    this._cardToDelete = this._trashButton.closest(".element");
    this._cardToDelete.remove();
  }
}
