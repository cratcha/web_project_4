/*import {
  imageModal,
  modalCaption,
  modalImageElement,
} from "../scripts/index.js";*/
//import Popup from "./Popup.js";
//import { openModal } from "../scripts/utils.js";

export class Card {
  /*constructor(template, data) {
    this._template = template;
    this._data = data;
    this.popup = new Popup("image-modal");
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
*/
  constructor({ data, handlePictureClick }, cardSelector) {
    this._text = data.title;
    this._link = data.url;
    this._handlePictureClick = handlePictureClick;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const card = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return card;
  }

  _setEventListeners() {
    this._element
      .querySelector(".element__photo")
      .addEventListener("click", () =>
        this._handlePictureClick({
          url: this._link,
          title: this._text,
        })
      );

    this._element
      .querySelector(".element__like-button")
      .addEventListener("click", () => this._handleLikeClick());

    this._element
      .querySelector(".element__trash")
      .addEventListener("click", () => this._handleTrashButtonClick());
  }

  previewPicture() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(".element__photo").src = this._link;
    this._element.querySelector(".element__title").textContent = this._text;
    this._element.querySelector(".element__photo").alt = this._text;

    return this._element;
    /*modalImageElement.src = this._data.url;
    modalCaption.textContent = this._data.title;
    modalImageElement.alt = this._data.title;
    this.popup.openModal();*/
  }

  _handleLikeClick() {
    this._element
      .querySelector(".element__like-button")
      .classList.toggle("element__like-button_activated");
  }

  _handleTrashButtonClick() {
    this._cardToDelete = this._element
      .querySelector(".element__trash")
      .closest(".element");
    this._cardToDelete.remove();
  }
}
