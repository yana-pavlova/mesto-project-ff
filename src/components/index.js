import '../pages/index.css';

import Avatar from '../images/avatar.jpg';
import Logo from '../images/logo.svg';
import LikeInactive from '../images/like-inactive.svg';
import LikeActive from '../images/like-active.svg';
import EditIcon from '../images/edit-icon.svg';
import DeleteIcon from '../images/delete-icon.svg';
import Close from '../images/close.svg';
import AddIcon from '../images/add-icon.svg';
import ProfileEdit from '../images/profile-edit.svg'

import { createCard } from './card.js';
import { openModal, closeModal, closeModalByClickOnOverlay } from './modal.js';
import { setEnableValidation, validationConfig, clearValidation, toggleButtonState, showUrlImageError } from './validation.js';
import { saveCardData, removeCard, fetchCards, fetchUserData, updateUserData, updateUserAvatar, checkIfUrlContainsImage} from './api.js';

const cards = document.querySelector('.places__list'); // контейнер для карточек
/* попапы */
const profileEditPopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
const profileAvatarPopup = document.querySelector(".popup_type_profile_edit");
const popupImage = imagePopup.querySelector("#popup-image");
const popupDescription = imagePopup.querySelector("#popup-description");
const profileAvatar = document.querySelector(".profile__image");
export const cardRemovePopup = document.querySelector(".popup_type_card-remove");
/* кнопки и картинки для открытия попапов */
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
/* форма обновления аватара */
const editProfileAvatarForm = document.forms['edit-profile-avatar'];
/* поля формы редактирования профайла */
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
// форма подтверждения удаления карточки
const cardRemovalForm = document.forms['card-remove'];

// функция добавления карточки на страницу
function addCard(cardElement) {
  cards.prepend(cardElement);
};

// добавление прелоадера
function makePreloader(evt) {
  evt.submitter.textContent = "Сохранение...";
}

// удаление прелоадера
function removePreloader(evt) {
  evt.submitter.textContent = "Сохранить";
}

// функция, обрабатывающая сабмит редактирования профайла
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const inputName = editProfileForm.elements.name.value;
  const inputDescription = editProfileForm.elements.description.value;

  // добавить прелоадер
  makePreloader(evt);

  // обновить данные пользователя на сервере
  updateUserData(inputName, inputDescription)
    .then(() => {
      // сохранение данные из формы в разметке
      profileName.textContent = inputName;
      profileDescription.textContent = inputDescription;
      // смена дефолтных значений в инпутах при каждом сохранении формы
      editProfileForm.elements.name.defaultValue = profileName.textContent;
      editProfileForm.elements.description.defaultValue = profileDescription.textContent;
      // закрыли попап
      closeModal(profileEditPopup);
    })
    .finally(() => removePreloader(evt))
}

// функция, обрабатывающая сабмит добавления карточки
function handleAddPlaceSubmit(evt, createCard, addCard, saveCardData) {
  evt.preventDefault();
  
  const cardTitle = addCardForm.elements['place-name'].value;
  const cardUrl = addCardForm.elements['link'].value;
  const addPlaceButton = addCardForm.elements[2];

  makePreloader(evt);

  //отправить данные на сервер, получить данные карточки и передать её данные в createCard
  checkIfUrlContainsImage(cardUrl) // проверить, что по урлу изображение (не работает, если cors выключены у запрашиваемого ресурса)
    .then(() => saveCardData(cardTitle, cardUrl))
      .then(card => {
        const cardsData = {
          name: cardTitle,
          link: cardUrl,
          alt: cardTitle,
          "_id": card["_id"],
          owner: {
            ["_id"]: card.owner["_id"]
          },
          likes: card.likes || [] // если карточка не с сервера, а создаётся вновь, лайков нет -> пустой массив
        };
        addCard(createCard(cardsData, openImageModal));
        closeModal(newCardPopup);
        cleanForm(addCardForm);
      })
      .finally(() => removePreloader(evt))
    .catch(() => showUrlImageError(evt))
  
  // сделать кнопку неактивной
  toggleButtonState([addCardForm.elements['place-name'], addCardForm.elements['link']], addPlaceButton, validationConfig.inactiveButtonClass);
}

// функция, обрабатывающая сабмит обновления аватара
function handleProfileAvatarFormSubmit(evt) {
  evt.preventDefault();

  const profilePicUrl = editProfileAvatarForm.elements['profile-url'].value;

  makePreloader(evt);
  checkIfUrlContainsImage(profilePicUrl) // проверить, что по урлу изображение (не работает, если cors выключены у запрашиваемого ресурса)
  .then(() => {
        updateUserAvatar(profilePicUrl)
        .then(() => {
          profileAvatar.style['background-image'] = `url('${profilePicUrl}')`;
          closeModal(profileAvatarPopup);
          cleanForm(editProfileAvatarForm);
        })      
        .catch(() => showUrlImageError(evt)) // если content-type это не image
  })
  .catch((err) => console.log(err), showUrlImageError(evt))
  .finally(() => removePreloader(evt))
}

// функция, обрабатывающая сабмит подтверждения удаления карточки
function handleCardRemovePopupSubmit(evt) {
  evt.preventDefault();

  // забираем ID из формы и удаляем карточку
  const id = evt.target.id;
  const card = document.getElementById(id);

  removeCard(id)
  .then(() => {
    card.remove();
    closeModal(cardRemovePopup);
  })
}

// функция очистки формы
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

// функция очистки попапов
function cleanImageModalData () {
  popupImage.src = "";
  popupImage.alt = "";
  popupDescription.textContent = "";
}

// функция, отображающая данные пользователя на странице
function renderUserData() {
  fetchUserData()
  .then((res) => {
    profileName.textContent = res.name;
    profileDescription.textContent = res.about;
    profileAvatar.style['background-image'] = `url("${res.avatar}")`;
    // смена дефолтных значений в инпутах при первом открытии страницы
    editProfileForm.elements.name.defaultValue = res.name;
    editProfileForm.elements.description.defaultValue = res.about;
  })
}

// функция, забирающая карточки с сервера
function getInitialCards() {
  fetchCards()
    .then((res) => {
      res.reverse().forEach(item => addCard(createCard(item, openImageModal)))
    })
}

// слушатели
editButton.addEventListener('click', () => {
  cleanForm(editProfileForm);
  openModal(profileEditPopup);
  clearValidation(editProfileForm, validationConfig);
});

profileAvatar.addEventListener('click', () => {
  cleanForm(editProfileAvatarForm);
  openModal(profileAvatarPopup);
  clearValidation(editProfileAvatarForm, validationConfig);
});

addButton.addEventListener('click', () => {
  cleanForm(addCardForm);
  openModal(newCardPopup);
  clearValidation(addCardForm, validationConfig);
});

closeButtons.forEach(item => {
  const popup = item.closest('.popup');
  item.addEventListener('click', () => closeModal(popup));
});

popups.forEach(item => {
  item.addEventListener('click', (evt) => closeModalByClickOnOverlay(evt, item));
});

addCardForm.addEventListener('submit', (evt) => handleAddPlaceSubmit (evt, createCard, addCard, saveCardData));

editProfileForm.addEventListener('submit', handleProfileFormSubmit);

editProfileAvatarForm.addEventListener('submit', (evt) => handleProfileAvatarFormSubmit(evt));

cardRemovalForm.addEventListener('submit', (evt) => handleCardRemovePopupSubmit(evt))

// включение валидации форм
setEnableValidation(validationConfig);

//ждём массив карточек и данные пользователя и вызываем их, когда все готовы
const promises = [renderUserData, getInitialCards];
Promise.all(promises)
  .then((resArr) => resArr.forEach(res => res()))