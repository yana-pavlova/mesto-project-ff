// функция открытия модального окна
export function openModal(evt, popup) {
  const trigger = evt.target.classList.value;
  // проверка на триггер, чтобы попап открывался только при клике на изображение или кнопки редактирования
  if (trigger === "card__image") {
    // перед открытием попапа очистить его данные, чтобы картинки не мелькали
    cleanImageModalData(popup);
    // в попап записываются данные карточки и он открывается
    popup.childNodes[1].childNodes[3].src = evt.target.src;
    popup.childNodes[1].childNodes[5].textContent = evt.target.alt;
    popup.classList.add('popup_is-opened');
  } else if (trigger === "profile__add-button" | trigger === "profile__edit-button") {
    popup.classList.add('popup_is-opened');
}
  // слушатель по клавише
  window.addEventListener('keydown', (event) => closeModalByEsc(event, popup));
}

// функция закрытия модального окна + вызов функции очистки форм
export function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  cleanFormsAfterClose(popup);
}

// функция закрытия модального окна на нажатию клавиши Escape
function closeModalByEsc(evt, popup) {
  if(evt.key.toLowerCase() === "escape") {
    popup.classList.remove('popup_is-opened');
    cleanFormsAfterClose(popup);
    window.removeEventListener('keydown', closeModal);
  }
}

// функция закрытия модального окна при клике на оверлей
export function closeModalByClickOnOverlay(evt, popup) {
  if(evt.target.classList.contains('popup')) {
    popup.classList.remove('popup_is-opened');
    cleanFormsAfterClose(popup);
  };
}

// функция очистки модального окна с картинкой
function cleanImageModalData(popup) {
  const image = popup.childNodes[1].childNodes[3];
  const modalParagraph = popup.childNodes[1].childNodes[5];
  image.src = "";
  modalParagraph.textContent = "";
}

// функция очистки модальных окон с инпутами
function cleanFormsAfterClose(popup) {
  if (popup.classList.contains('popup_type_new-card') | popup.classList.contains('popup_type_edit')) {
    popup.querySelector('form').reset();
  }
}