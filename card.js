import { imageModal } from "./index.js";
import { openModal } from "./utils.js";
export class Card {
  constructor(template, data) {
    this._template = template;
    this._data = data;
  }
  createCard() {
    const card = this._template.content
      .querySelector(".element")
      .cloneNode(true);
    const imageElement = card.querySelector(".element__photo");
    const titleElement = card.querySelector(".element__title");

    const trashButton = card.querySelector(".element__trash");
    const likeButton = card.querySelector(".element__like-button");

    imageElement.src = this._data.url;
    titleElement.textContent = this._data.title;
    imageElement.alt = this._data.title;

    imageElement.addEventListener("click", () => {
      const modalImageElement = imageModal.querySelector(".modal__image");
      const modalCaption = imageModal.querySelector(".modal__caption");
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

    return card;
  }
}
