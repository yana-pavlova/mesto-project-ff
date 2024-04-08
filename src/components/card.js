import { userId } from './api.js';
import { cardRemovePopup } from './index.js';

const cardTemplate = document.querySelector('#card-template').content; // забрали шаблон

// функция создания карточки
export function createCard(card, openImageModal, openCardRemovalConfirmationModal, removeLike, addLike) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const image = cardElement.querySelector('.card__image');
  const title = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeCount = cardElement.querySelector('.card__like');
  const likeButton = cardElement.querySelector('.card__like-button');
  // серверный ID карточки
  const cardId = card['_id']

  // у каждой карточки есть ID для удаления
  cardElement.setAttribute('id', cardId);

  // подставляем данные картинки в разметку
  image.src = card.link;
  image.alt = card.alt;
  title.textContent = card['name'];
  likeCount.textContent = card.likes.length; // ставим количество лайков в разметке

  // если уже был лайк, отображаем его на странице
  if(hasBeenLiked(card.likes, userId)) likeButton.classList.add('card__like-button_is-active');

  // если карточки юзера, вешаем слушатель на кнопку удаления; для чужих карточек удаляем кнопку удаления
  if(card.owner['_id'] === userId) deleteButton.addEventListener('click', () => openCardRemovalConfirmationModal(cardRemovePopup, cardId))
  else deleteButton.remove();
  
  // слушатель для обработки лайка; вилка в зависимости от того, стоит сейчас лайк или нет
  likeButton.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('card__like-button_is-active')) {
      removeLike(card['_id'])
        .then((res) => {
          likeCount.textContent = res.likes.length;
          evt.target.classList.remove('card__like-button_is-active')
        })
    } else {
      addLike(card['_id'])
        .then((res) => {
          evt.target.classList.add('card__like-button_is-active');
          likeCount.textContent = res.likes.length;
        })
    }
  })

  // слушатель на картинку
  image.addEventListener('click', () => openImageModal(image, title));

  return cardElement; // одна свёрстанная карточка
}

// проверить, был ли уже поставлен лайк
function hasBeenLiked(likes, userId) {
  return likes.some(like => like['_id'] === userId);
}