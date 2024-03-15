const cardTemplate = document.querySelector('#card-template').content; // забрали шаблон

// функция создания карточки
export function createCard(cardsData, removeCard, likeCard) {
  // map перебрал массив и сделал новый массив с готовыми карточками
  const cardsElements = cardsData.map(card => {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true); // склонировали содержимое темплейта карточки
    cardElement.querySelector('.card__image').src = card['link']; // положили урл картинки
    cardElement.querySelector('.card__image').alt = card['alt']; // положили alt в картинку
    cardElement.querySelector('.card__title').textContent = card['name']; // положили тайтл
    const deleteButton = cardElement.querySelector('.card__delete-button'); // нашли кнопку удаления
    deleteButton.addEventListener('click', removeCard); // добавили обработчик события для кнопки удаления
    const likeButton = cardElement.querySelector('.card__like-button');
    likeButton.addEventListener('click', likeCard); // добавили обработчик события для кнопки лайка

    return cardElement; // одна свёрстанная карточка
  });

  return cardsElements; // массив с готовыми карточками
}

// функция удаления ближайшей карточки-родителя по отношению к нажатой кнопке
export function removeCard(event) {
  event.target.closest('.card').remove();
};

// функция лайка карточки
export function likeCard(event) {
  event.target.classList.toggle('card__like-button_is-active');
}