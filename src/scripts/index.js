// описана инициализация приложения и основная логика страницы: поиск DOM-элементов на странице и навешивание на них обработчиков событий; обработчики отправки форм, функция-обработчик события открытия модального окна для редактирования профиля; функция открытия модального окна изображения карточки. Также в index.js находится код, который отвечает за отображение шести карточек при открытии страницы.

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

const cards = document.querySelector('.places__list'); // забрали контейнер, в который будем класть карточки

// функция добавления карточки на страницу
function addCard(cardsElements) {  
  const fragment = new DocumentFragment(); // сделали объект фрагмента DOM через конструктор, чтобы облегчить рендер DOM

  // forEach прошёлся по готовому массиву
  cardsElements.forEach(cardElement => {
    fragment.append(cardElement); // положили карточку во фрагмент DOM, чтобы не рендерить на каждой итерации
  });
  cards.prepend(fragment); // положили свёрстанный список карточек из фрагмента в контейнер (один рендер вместо 6)
};

addCard(createCard(initialCards, removeCard, likeCard));

// вызов модалки по клику
import { openModal, closeModal } from '../components/modal.js';

// забрали все модалки и каждому навесили свой клик
const editButton = document.querySelector('.profile__edit-button');

editButton.addEventListener('click', (event) => {
  let popup = document.querySelector(".popup_type_edit");
  openModal(event, popup);
});

const addButton = document.querySelector('.profile__add-button');
addButton.addEventListener('click', (event) => {
  let popup = document.querySelector(".popup_type_new-card");
  openModal(event, popup);
});

// event delegation (клики по картинкам)
const images = document.querySelector('.places__list');
images.addEventListener('click', (event) => {
  let popup = document.querySelector(".popup_type_image");
  openModal(event, popup);
});

// слушатель вешается на все кнопки закрытия модалок
const closeButtons = document.querySelectorAll('.popup__close');
closeButtons.forEach(item => {
  if(item.nodeName.toLowerCase() === "button") {
    const popup = item.parentElement.parentElement;
    item.addEventListener('click', (event) => closeModal(event, popup));
  }
});

// слушатель вешается на оверлей (закрытие модалки при клике вне её)
const overlays = document.querySelectorAll('.popup');
overlays.forEach(item => {
  item.addEventListener('click', (event) => closeModal(event, item));
});

/* УНЕСТИ В FORM.JS */

/* форма редактирования профайла */
const editProfileForm = document.forms['edit-profile'];
// смена дефолтных значений
editProfileForm.elements.name.defaultValue = document.querySelector(".profile__title").textContent;
editProfileForm.elements.description.defaultValue = document.querySelector(".profile__description").textContent;

const closeProfileFormButton = editProfileForm.parentElement.childNodes[1];
closeProfileFormButton.addEventListener('click', () => editProfileForm.reset());

editProfileForm.addEventListener('submit', handleProfileFormSubmit);

/* форма добавления карточки */
const addCardForm = document.forms['new-place'];
addCardForm.addEventListener('submit', (event) => handleAddPlaceSubmit (event, createCard, addCard));

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const inputName = editProfileForm.elements.name.value;
  const inputDescription = editProfileForm.elements.description.value;

  const profileName = document.querySelector(".profile__title");
  const profileODescription = document.querySelector(".profile__description")

  profileName.textContent = inputName;
  profileODescription.textContent = inputDescription;

  let popup = document.querySelector(".popup_type_edit");
  closeModal(evt, popup); // надо вызывать не тут
}

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
  addCardForm.reset();
}