// @todo: Темплейт карточки

// клонируем содержимое тега template

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardTemplate = document.querySelector('#card-template').content; // забрали шаблон
const cards = document.querySelector('.places__list'); // забрали контейнер, в который будем класть карточки

cards.addEventListener('click', checkTarget); // добавили обработчик события для контейнера карточек (event delegation (если карточек будет 1000, вешать обработчик на каждую кнопку будет дорого))


// функция создания карточки
function createCard(cardsData, checkTarget) {
  // map перебрал массив и сделал новый массив с готовыми карточками
  const cardsElements = cardsData.map(card => {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true); // склонировали содержимое темплейта карточки
    cardElement.querySelector('.card__image').src = card['link']; // положили урл картинки
    cardElement.querySelector('.card__image').alt = card['alt']; // положили alt в картинку
    cardElement.querySelector('.card__title').textContent = card['name']; // положили тайтл
  
    return cardElement; // одна свёрстанная карточка
  });

  return cardsElements; // массив с готовыми карточками
}

// функция добавления карточки на страницу
function addCard(cardsElements) {  
  const fragment = new DocumentFragment(); // сделали объект фрагмента DOM через конструктор, чтобы облегчить рендер DOM

  // forEach прошёлся по готовому массиву
  cardsElements.forEach(cardElement => {
    fragment.append(cardElement); // положили карточку во фрагмент DOM, чтобы не рендерить на каждой итерации
  });
  cards.append(fragment); // положили свёрстанный список карточек из фрагмента в контейнер (один рендер вместо 6)
};

// добавили функцию удаления ближайшей карточки-родителя по отношению к нажатой кнопке; нажатую кнопку получили через дефолтный аргумент event, который есть у каждого addEventListener
function removeCard(event) {
  event.target.closest('.card').remove();
};

// проверили, что таргет - кнопка удаления; если да, вызвали функцию удаления карточки
function checkTarget(event) {
  if (event.target.classList.value === 'card__delete-button') {
    removeCard(event);
  }
};

addCard(createCard(initialCards, checkTarget));