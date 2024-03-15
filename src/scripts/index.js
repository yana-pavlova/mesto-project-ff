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
import { createCard, removeCard } from '../components/card.js'; // импортировали функции создания и удаления карточки
import { likeCard } from '../components/card.js';
import { openModal, closeModal, closeModalByClickOnOverlay } from '../components/modal.js'; // функции для работы с попапами

const cards = document.querySelector('.places__list'); // забрали контейнер, в который будем класть карточки

/* попапы */
const imagePopup = document.querySelector(".popup_type_image");
const profileEditPopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");

/* открытие попапов по кнопкам и нажатию на картинки */
const editButton = document.querySelector('.profile__edit-button');
editButton.addEventListener('click', (event) => openModal(event, profileEditPopup));
const addButton = document.querySelector('.profile__add-button');
addButton.addEventListener('click', (event) => openModal(event, newCardPopup));
// event delegation (клики по картинкам; слушатель на родителе)
const images = document.querySelector('.places__list');
images.addEventListener('click', (event) => openModal(event, imagePopup));

// закрытие попапов при клике на кнопки закрытия
const closeButtons = document.querySelectorAll('.popup__close');
closeButtons.forEach(item => {
    const popup = item.parentElement.parentElement;
    item.addEventListener('click', () => closeModal(popup));
});
// закрытие попапа при клике на оверлее
const overlays = document.querySelectorAll('.popup');
overlays.forEach(item => {
  item.addEventListener('click', (event) => closeModalByClickOnOverlay(event, item));
});

/* форма редактирования профайла */
const editProfileForm = document.forms['edit-profile'];
// смена значений в инпутах при первой загрузке страницы и навешивание события сабмит
editProfileForm.elements.name.value = document.querySelector(".profile__title").textContent;
editProfileForm.elements.description.value = document.querySelector(".profile__description").textContent;
editProfileForm.addEventListener('submit', handleProfileFormSubmit);

/* форма добавления карточки */
const addCardForm = document.forms['new-place'];
addCardForm.addEventListener('submit', (event) => handleAddPlaceSubmit (event, createCard, addCard));

// функция добавления карточки на страницу
function addCard(cardsElements) {  
  const fragment = new DocumentFragment();
  cardsElements.forEach(cardElement => {
    fragment.append(cardElement);
  });
  cards.prepend(fragment);
};

// функция, обрабатывающая сабмит редактирования профайла
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  
  const inputName = editProfileForm.elements.name.value;
  const inputDescription = editProfileForm.elements.description.value;
  const profileName = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");

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
  const cardsData = [{
    name: cardTitle,
    link: cardUrl,
    alt: cardAlt
  }];
  addCard(createCard(cardsData, removeCard, likeCard));

  closeModal(newCardPopup);
}

addCard(createCard(initialCards, removeCard, likeCard)); // добавили 6 карточек на страницу