// @todo: Темплейт карточки

// клонируем содержимое тега template

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardTemplate = document.querySelector('#card-template').content; // забрали шаблон
const cards = document.querySelector('.places__list'); // забрали контейнер, в который будем класть карточки

// функция создания карточки
function createCard(cardsData, removeCard) {
  // cardsData это данные ОДНОЙ карточки
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true); // склонировали содержимое темплейта карточки

  cardElement.querySelector('.card__image').src = cardsData['link']; // положили урл картинки
  cardElement.querySelector('.card__image').alt = cardsData['alt']; // положили alt в картинку
  cardElement.querySelector('.card__title').textContent = cardsData['name']; // положили тайтл
  const deleteButton = cardElement.querySelector('.card__delete-button'); // нашли кнопку удаления

  deleteButton.addEventListener('click', removeCard); // добавили обработчик события для кнопки удаления

  return cardElement;
}

// функция добавления карточки на странице
function addCard(cardElement) {  
  cards.append(cardElement); // положили карточку как последний элемент в контейнер карточек
};

// добавили функцию удаления ближайшей карточки-родителя по отношению к нажатой кнопке; нажатую кнопку получили через дефолтный аргумент event, который есть у каждого addEventListener
function removeCard(event) {
  event.target.closest('.card').remove();
};

// foreach перебрал массив и для каждой карточки вызвал функцию  добавления карточки и передал ей функцию создания карточки в качестве аргумента
initialCards.forEach(card => {
  addCard(createCard(card, removeCard));
});