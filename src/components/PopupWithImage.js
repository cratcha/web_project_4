import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._modal.querySelector(".modal__caption");
    this._imageCaption = this._modal.querySelector(".modal__image");
  }

  openModal(data) {
    this._imageElement.src = data.url;
    this._imageElement.alt = `Image ${data.title}`;
    this._imageCaption.textContent = data.title;
    super.openModal();
  }
}

export default PopupWithImage;
