class Popup {
  constructor(popupSelector) {
    this._modal = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.closeModal();
    }
  }

  setEventListeners() {
    /*this.modalCloseButton = document.querySelectorAll(".modal__close-button");
    this.modalCloseButton.addEventListener("click", (event) => {
      this.modalButton = this.modalCloseButton.closest(".modal");
      this.closeModal();
    });*/
    this._modal.addEventListener("mousedown", (evt) => {
      if (
        evt.target.classList.contains("modal") ||
        evt.target.classList.contains("modal__close-button")
      ) {
        this.closeModal();
      }
    });
  }

  openModal() {
    this._modal.classList.add("modal_open");
    document.addEventListener("keydown", (evt) => {
      this._handleEscClose(evt);
    });
  }

  closeModal() {
    this._modal.classList.remove("modal_open");
    document.removeEventListener("keydown", this._handleEscClose);
  }
}

export default Popup;
