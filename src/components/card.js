const cardTemplate = document.querySelector('#card-template').content; // забрали шаблон
const imagePopup = document.querySelector(".popup_type_image"); // попап с картинкой

// функция создания карточки
export function createCard(card, removeCard, likeCard, openImageModal) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true); // склонировали содержимое темплейта карточки
  const image = cardElement.querySelector('.card__image')
  image.src = card['link']; // положили урл картинки
  image.alt = card['alt']; // положили alt в картинку
  const cardTitle = cardElement.querySelector('.card__title');
  cardTitle.textContent = card['name']; // положили тайтл
  const deleteButton = cardElement.querySelector('.card__delete-button'); // нашли кнопку удаления
  deleteButton.addEventListener('click', removeCard); // добавили обработчик события для кнопки удаления
  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', likeCard); // добавили обработчик события для кнопки лайка

  // слушатель на картинку
  image.addEventListener('click', () => openImageModal(image, cardTitle, imagePopup));
  return cardElement; // одна свёрстанная карточка
}

// функция удаления ближайшей карточки-родителя по отношению к нажатой кнопке
export function removeCard(event) {
  event.target.closest('.card').remove();
};

// функция лайка карточки
export function likeCard(event) {
  event.target.classList.toggle('card__like-button_is-active');
}