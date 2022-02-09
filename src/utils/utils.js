export const renderLoading = (popupSelector, isLoading = false) => {
  const activeButton = document
    .querySelector(popupSelector)
    .querySelector(".modal__submit-button");
  if (isLoading) {
    activeButton.textContent = "Saving...";
  } else {
    activeButton.textContent = "Save";
  }
};
