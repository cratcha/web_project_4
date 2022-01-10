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
    const imageElement = this._card.querySelector(".element__photo");
    const titleElement = this._card.querySelector(".element__title");

    const trashButton = this._card.querySelector(".element__trash");
    const likeButton = this._card.querySelector(".element__like-button");

    imageElement.src = this._data.url;
    titleElement.textContent = this._data.title;
    imageElement.alt = this._data.title;

    imageElement.addEventListener("click", () => {
      modalImageElement.src = this._data.url;
      modalCaption.textContent = this._data.title;
      modalImageElement.alt = this._data.title;
      openModal(imageModal);
    });

    trashButton.addEventListener("click", () => {
      const cardToDelete = trashButton.closest(".element");
      cardToDelete.remove();
    });

    likeButton.addEventListener("click", () => {
      likeButton.classList.toggle("element__like-button_activated");
    });

    return this._card;
  }
}
