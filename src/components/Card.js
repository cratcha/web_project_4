export class Card {
  constructor({ data, handlePictureClick }, cardSelector) {
    this._text = data.title;
    this._link = data.link;
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
  }

  _handleLikeClick() {
    this._element
      .querySelector(".element__like-button")
      .classList.toggle("element__like-button_activated");
  }

  _handleTrashButtonClick() {
    this._element.remove();
  }
}
