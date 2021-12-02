const editProfileModal = document.querySelector('#edit-profile-modal');
const editProfileCloseButton = editProfileModal.querySelector('#edit-close-button');
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

    const trashButton = card.querySelector(".element__trash");
    const likeButton = card.querySelector(".element__like-button");
     
    imageElement.src = data.url;
    titleElement.textContent = data.title;

    imageElement.addEventListener('click', () => {
        const modalImageElement = imageModal.querySelector('.modal__image');
        const modalCaption = imageModal.querySelector(".modal__caption");
        modalImageElement.src = data.url;
        modalCaption.textContent = data.title;
        openModal(imageModal);
    });

    trashButton.addEventListener('click', () => {
        const deleteCard = trashButton.closest(".element");
        deleteCard.remove();
    });

    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('element__like-button_activated');
    });


    return card;
    
}




function addCardToPage(element) {
    cardList.prepend(element);
}

function renderCard(data) {
    addCardToPage(createCard(data));
}

const initialCards = [
    {
      title: "Yosemite Valley",
      url: "https://code.s3.yandex.net/web-code/yosemite.jpg"
    },
    {
      title: "Lake Louise",
      url: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
    },
    {
      title: "Bald Mountains",
      url: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
    },
    {
      title: "Latemar",
      url: "https://code.s3.yandex.net/web-code/latemar.jpg"
    },
    {
      title: "Vanoise National Park",
      url: "https://code.s3.yandex.net/web-code/vanoise.jpg"
    },
    {
      title: "Lago di Braies",
      url: "https://code.s3.yandex.net/web-code/lago.jpg"
    }
  ];

initialCards.forEach((cardData) => {
   renderCard(cardData); 
})


const modalCloseButtons = document.querySelectorAll(".modal__close-button");

modalCloseButtons.forEach((modalCloseButton) => {
   modalCloseButton.addEventListener("click", (event) => {
    const modal = modalCloseButton.closest(".modal");
    closeModal(modal)
   });
});

const addCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#add-card-modal");

function openModal(modal) {
    modal.classList.add("modal_open");
}

addCardButton.addEventListener("click", () => {
    openModal(addCardModal)
});

function closeModal(modal) {
    modal.classList.remove("modal_open");
}

const imageModal = document.querySelector("#image-modal");


const newCardForm = document.querySelector("#add-card-form");
const inputLink = newCardForm.url;
const inputTitle = newCardForm.title;

newCardForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = { url: inputLink.value, title: inputTitle.value };
    renderCard(data);
    closeModal(addCardModal);
});