function closeModal(modal) {
  modal.classList.remove("modal_open");
  document.removeEventListener("keydown", closeByEscape);
}

function openModal(modal) {
  modal.classList.add("modal_open");
  document.addEventListener("keydown", closeByEscape);
}

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_open");
    closeModal(openedModal);
  }
}

export { closeModal, openModal };
