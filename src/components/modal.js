// функция открытия модального окна
export function openModal(popup) {
  popup.classList.add('popup_is-opened');
  window.addEventListener('keydown', closeModalByEsc);
}

// функция закрытия модального окна + вызов функции очистки форм
export function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  window.removeEventListener('keydown', closeModalByEsc);
}

// функция закрытия модального окна на нажатию клавиши Escape
function closeModalByEsc(evt) {
  // проверка на нажатие клавиши (в винде тригеррится это событие, если при заполнении выбрать одно из прошлых значений)
  if(evt.key) {
    if(evt.key.toLowerCase() === "escape") {
      const popup = document.querySelector('.popup_is-opened');
      closeModal(popup);
    }  
  }
}

// функция закрытия модального окна при клике на оверлей
export function closeModalByClickOnOverlay(evt, popup) {
  if(evt.target.classList.contains('popup')) {
    closeModal(popup);
  };
}
