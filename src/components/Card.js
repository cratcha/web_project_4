export class Card {
  constructor(
    {
      data,
      currentUserId,
      handlePictureClick,
      handleLikeClick,
      handleTrashButtonClick,
    },
    cardSelector
  ) {
    this._text = data.name;
    this._link = data.link;
    this._cardID = data._id;
    this._userId = currentUserId;
    this._ownerID = data.owner._id;
    this._likes = data.likes;

    this._handlePictureClick = handlePictureClick;
    this._cardSelector = cardSelector;
    this._handleTrashButtonClick = handleTrashButtonClick;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    const card = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return card;
  }

  setLikesInfo(data) {
    this._likes = data.likes;
    this.updateLikes();
  }

  _setEventListeners() {
    this.likeButton = this._element.querySelector(".element__like-button");
    this.cardImage = this._element.querySelector(".element__photo");

    this.cardImage.addEventListener("click", () =>
      this._handlePictureClick({
        url: this._link,
        title: this._text,
      })
    );

    this.likeButton.addEventListener("click", () =>
      this._handleLikeClick(this)
    );

    this._element
      .querySelector(".element__trash")
      .addEventListener("click", () => this._handleTrashButtonClick(this));
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this.cardImage.src = this._link;
    this._element.querySelector(".element__title").textContent = this._text;
    this._element.querySelector(".element__photo").alt = this._text;

    return this._element;
  }

  updateLikes() {
    this._element.querySelector(".element__like-button__counter").textContent =
      this._likes.length;

    if (this.checkIfLiked())
      this.likeButton.classList.add("element__like-button_activated");
    else this.likeButton.classList.remove("element__like-button_activated");
  }

  /* _handleLike() {
    this._element
      .querySelector(".element__like-button")
      .classList.toggle("element__like-button_activated");
  }*/

  checkIfLiked() {
    debugger;
    return Boolean(this._likes.find((item) => item._id === this._userId));
  }

  getId() {
    return this._cardID;
  }

  removeElement() {
    this._element.remove();
  }
}
