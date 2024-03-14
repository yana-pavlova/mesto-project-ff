/*
описаны функции для работы с модальными окнами: функция открытия модального окна, функция закрытия модального окна, функция-обработчик события нажатия Esc и функция-обработчик события клика по оверлею;
*/

// функция открытия модального окна
export function openModal(evt, popup) {
  const trigger = evt.target.classList.value;
  // проверка на card__image, чтобы по клику на кнопку удаления не открывался поп-ап
  if (trigger === "card__image") {
    // перед открытием попапа очистить его данные, чтобы картинки не мелькали
    cleanImageModalData(popup);
    popup.classList.add('popup_is-opened');
    // в src image в попапе записывается src image из тартег event
    popup.childNodes[1].childNodes[3].src = evt.target.src;
    // в параграф попапа записывается название карточки
    popup.childNodes[1].childNodes[5].textContent = evt.target.parentElement.childNodes[5].childNodes[1].textContent;
  } else if (trigger === "profile__add-button" | trigger === "profile__edit-button") {
    popup.classList.add('popup_is-opened');
  }

  // слушатель по клавише
  window.addEventListener('keydown', (event) => closeModalByEsc(event, popup));
}

// функция закрытия модального окна
export function closeModal(evt, popup) {
  // если клик по оверлею, кнопке с крестиком или кнопке сохранить, закрываем попап
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup__button')) {
    popup.classList.remove('popup_is-opened');
  };
}

// функция закрытия модального окна на нажатию клавиши Escape
function closeModalByEsc(evt, popup) {
  if(evt.key.toLowerCase() === "escape") {
    // закрыли попап
    popup.classList.remove('popup_is-opened');
    // удалили слушатель по клавише, чтобы Escape не триггерил, когда модалка закрыта
    window.removeEventListener('keydown', closeModal);
  }
}

// функция очистки модального окна
// если не чистить, то при последующем открытии картинки мелькает предыдущая
function cleanImageModalData(popup) {
  const image = popup.childNodes[1].childNodes[3];
  const modalParagraph = popup.childNodes[1].childNodes[5];
  image.src = "";
  modalParagraph.textContent = "";
}