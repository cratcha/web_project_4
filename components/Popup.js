export class Popup {
  constructor(popupSelector) {
    this._modal = document.querySelector(`#${popupSelector}`);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _handleEscClose(evt) {
    evt.preventDefault();

    if (evt.key === "Escape") {
      this.closeModal();
    }
  }

  setEventListeners() {
    this.modalCloseButton = document.querySelectorAll(".modal__close-button");
    this.modalCloseButton.addEventListener("click", (event) => {
      this.modalButton = this.modalCloseButton.closest(".modal");
      this.closeModal();
    });
    /*this._modal.addEventListener("mousedown", (evt) => {
      if (
        evt.target.class.contains("modal") ||
        evt.target.classList.comtains("modal_close-button")
      ) {
        this.closeModal();
      }
    });*/
  }

  openModal() {
    this._modal.classList.add("modal_open");
    document.addEventListener("keydown", this._handleEscClose(e));
  }

  closeModal() {
    this._modal.classList.remove("modal_open");
    document.removeEventListener("keydown", this._handleEscClose(e));
  }
}
