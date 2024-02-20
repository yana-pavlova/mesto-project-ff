// @todo: Темплейт карточки

// клонируем содержимое тега template

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const fragment = new DocumentFragment(); // сделали объект фрагмента DOM через конструктор, чтобы облегчить рендер DOM
const cardTemplate = document.querySelector('#card-template').content; // забрали шаблон
const cards = document.querySelector('.places__list'); // забрали контейнер, в который будем класть карточки

// функция создания карточки
function createCard(cardsData, removeCard) {
  // map перебрал массив и сделал новый массив с готовыми карточками
  const cardsElements = cardsData.map(card => {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true); // склонировали содержимое темплейта карточки
    cardElement.querySelector('.card__image').src = card['link']; // положили урл картинки
    cardElement.querySelector('.card__image').alt = card['alt']; // положили alt в картинку
    cardElement.querySelector('.card__title').textContent = card['name']; // положили тайтл
    const deleteButton = cardElement.querySelector('.card__delete-button'); // нашли кнопку удаления
  
    deleteButton.addEventListener('click', removeCard); // добавили обработчик события для кнопки удаления

    return cardElement; // одна свёрстанная карточка
  });

  return cardsElements; // массив с готовыми карточками
}

// функция добавления карточки на страницу
function addCard(cardsElements) {  
  // forEach прошёлся по готовому массиву
  cardsElements.forEach(cardElement => {
    fragment.appendChild(cardElement); // положили карточку во фрагмент DOM, чтобы не рендерить на каждой итерации
  });
  cards.append(fragment); // положили свёрстанный фрасписок карточек из фрагмента в контейнер (один рендер вместо 6)
};

// добавили функцию удаления ближайшей карточки-родителя по отношению к нажатой кнопке; нажатую кнопку получили через дефолтный аргумент event, который есть у каждого addEventListener
function removeCard(event) {
  event.target.closest('.card').remove();
};

addCard(createCard(initialCards, removeCard));
