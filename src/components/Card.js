export class Card {
  constructor(
    { data, handlePictureClick, handleLikeClick, handleTrashButtonClick },
    cardSelector
  ) {
    this._text = data.name;
    this._link = data.link;
    this._cardID = data._id;
    this._userID = data.currentUserID;
    this._ownerID = data.owner._id;

    this._handlePictureClick = handlePictureClick;
    this._cardSelector = cardSelector;
    this._handleTrashButtonClick = handleTrashButtonClick;
    this._handleLikeClick = handleLikeClick;
    //this._handleAddLike = handleAddLike;
    //this._handleRemoveLike = handleRemoveLike;
  }

  _getTemplate() {
    const card = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return card;
  }

  updateLikes;
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
      .addEventListener("click", () => this._handleLikeClick(this));

    this._element
      .querySelector(".element__trash")
      .addEventListener("click", () => this._handleTrashButtonClick(this));
  }

  previewPicture() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(".element__photo").src = this._link;
    this._element.querySelector(".element__title").textContent = this._text;
    this._element.querySelector(".element__photo").alt = this._text;

    return this._element;
  }

  _handleLike() {
    this._element
      .querySelector(".element__like-button")
      .classList.toggle("element__like-button_activated");
  }

  id() {
    return this._cardID;
  }

  removeElement() {
    this._element.remove();
  }
}
