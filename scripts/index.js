// @todo: Темплейт карточки

// клонируем содержимое тега template

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardTemplate = document.querySelector('#card-template').content; // забрали шаблон
const cards = document.querySelector('.places__list'); // забрали контейнер, в который будем класть карточки

// функция добавления карточки
function addCard(removeCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true); // склонировали содержимое темплейта карточки

  cardElement.querySelector('.card__image').src = 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'; // положили урл картинки
  cardElement.querySelector('.card__title').textContent = 'Архыз'; // положили тайтл
  
  cards.append(cardElement); // показали карточку на странице

  const deleteButton = cardElement.querySelector('.card__delete-button'); // нашли кнопку удаления

  deleteButton.addEventListener('click', removeCard); // добавили обработчик события для кнопки удаления

};

function removeCard() {
  const card = cards.querySelector('.card');
  const deleteButton = card.querySelector('.card__delete-button');
  const cardItem = deleteButton.closest('.card');
  cardItem.remove();
}; // добавили функцию удаления ближайшей карточки-родителя по отношению к нажатой кнопке

addCard(removeCard); // вызвали функцию добавления карточки и передали ей функцию удаления карточки в качестве аргумента