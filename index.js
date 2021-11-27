const editProfileModal = document.querySelector('#edit-profile-modal');
const editProfileCloseButton = editProfileModal.querySelector('.modal__close-button');
const openModalButton = document.querySelector('#open-modal-button');

const editProfileForm = document.forms['edit-profile-form']
const nameInput = editProfileForm.name;
const descriptionInput = editProfileForm.description;
const editProfileSubmit = editProfileForm.querySelector('button[type=submit]')

const profileName = document.querySelector('#profile-name');
const profileDescription = document.querySelector('#profile-description');

editProfileCloseButton.addEventListener("click", () => {
    editProfileModal.classList.remove("modal_open");
})

openModalButton.addEventListener("click", () => {
    editProfileModal.classList.add("modal_open");
    nameInput.value = profileName.innerText;
    descriptionInput.value = profileDescription.innerText;
})

editProfileModal.addEventListener("mousedown", (e) => {
    if (e.target === editProfileModal) {
    editProfileModal.classList.remove("modal_open");
    }
})

editProfileForm.addEventListener("submit", (e) => {
    e.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    editProfileModal.classList.remove("modal_open");
})

const cardTemplate = document.querySelector("#element-template");
const cardList = document.querySelector(".elements");

function createCard(data) { 
    const card = cardTemplate.content.querySelector(".element").cloneNode(true);
    const imageElement = card.querySelector(".element__photo");
    const titleElement = card.querySelector(".element__title");

    imageElement.src = data.url;
    titleElement.textContent = data.title;

    return card;
    
}

function addCardToPage(element) {
    cardList.prepend(element);

}

createCard({
    url: "https://code.s3.yandex.net/web-code/yosemite.jpg",
    title: "Yosemite Valley",
});



