import '../pages/index.css';

import Avatar from '../images/avatar.jpg';
import Logo from '../images/logo.svg';
import LikeInactive from '../images/like-inactive.svg';
import LikeActive from '../images/like-active.svg';
import EditIcon from '../images/edit-icon.svg';
import DeleteIcon from '../images/delete-icon.svg';
import Close from '../images/close.svg';
import AddIcon from '../images/add-icon.svg';

import { initialCards } from './cards.js'; // импортировали массив с данными карточек
import { createCard, removeCard } from './card.js'; // импортировали функции создания и удаления карточки
import { likeCard } from './card.js';
import { openModal, closeModal, closeModalByClickOnOverlay } from './modal.js'; // функции для работы с попапами

const cards = document.querySelector('.places__list'); // забрали контейнер, в который будем класть карточки

/* попапы */
const profileEditPopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image"); // попап с картинкой
const popupImage = imagePopup.querySelector("#popup-image");
const popupDescription = imagePopup.querySelector("#popup-description");

/* кнопки и каринки для открытия попапов */
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

// кнопки закрытия
const closeButtons = document.querySelectorAll('.popup__close');

// закрытие попапа при клике на оверлее
const popups = document.querySelectorAll('.popup');

/* форма редактирования профайла */
const editProfileForm = document.forms['edit-profile'];

/* форма добавления карточки */
const addCardForm = document.forms['new-place'];

/* поля формы редактирования профайла */
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// функция добавления карточки на страницу
function addCard(cardElement) {
  cards.prepend(cardElement);
};

// функция, обрабатывающая сабмит редактирования профайла
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  
  const inputName = editProfileForm.elements.name.value;
  const inputDescription = editProfileForm.elements.description.value;

  // сохранение данные из формы в разметке
  profileName.textContent = inputName;
  profileDescription.textContent = inputDescription;

  // смена дефолтных значений в инпутах при каждом сохранении формы
  editProfileForm.elements.name.defaultValue = profileName.textContent;
  editProfileForm.elements.description.defaultValue = profileDescription.textContent;

  closeModal(profileEditPopup);
}

// функция, обрабатывающая сабмит добавления карточки
function handleAddPlaceSubmit(evt, createCard, addCard) {
  evt.preventDefault();
  const cardTitle = addCardForm.elements['place-name'].value;
  const cardUrl = addCardForm.elements['link'].value;
  const cardAlt = cardTitle;
  const cardsData = {
    name: cardTitle,
    link: cardUrl,
    alt: cardAlt
  };
  addCard(createCard(cardsData, removeCard, likeCard, openImageModal));

  closeModal(newCardPopup);
  cleanForm(addCardForm);
}

function cleanForm(form) {
  form.reset();
}

// функция открытия попапа с изображением
function openImageModal (image, cardTitle) {
  cleanImageModalData();
  popupImage.src = image.src;
  popupImage.alt = cardTitle.textContent;
  popupDescription.textContent = cardTitle.textContent;
  openModal(imagePopup);
}

function cleanImageModalData () {
  popupImage.src = "";
  popupImage.alt = "";
  popupDescription.textContent = "";
}

// слушатели
editButton.addEventListener('click', () => cleanForm(editProfileForm));
editButton.addEventListener('click', () => openModal(profileEditPopup));

addButton.addEventListener('click', () => cleanForm(addCardForm));
addButton.addEventListener('click', () => openModal(newCardPopup));

closeButtons.forEach(item => {
  const popup = item.closest('.popup');
  item.addEventListener('click', () => closeModal(popup));
});
popups.forEach(item => {
  item.addEventListener('click', (event) => closeModalByClickOnOverlay(event, item));
});
addCardForm.addEventListener('submit', (event) => handleAddPlaceSubmit (event, createCard, addCard));

// смена значений в инпутах при первой загрузке страницы и навешивание события сабмит
editProfileForm.elements.name.value = document.querySelector(".profile__title").textContent;
editProfileForm.elements.description.value = document.querySelector(".profile__description").textContent;
editProfileForm.addEventListener('submit', handleProfileFormSubmit);

initialCards.forEach((item) => addCard(createCard(item, removeCard, likeCard, openImageModal))); // добавили 6 карточек на страницу