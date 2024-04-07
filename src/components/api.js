const token = 'aa9ec73b-b4d9-4065-8418-0cee1c64b5ef'; // код для авторизации на сервере
const baseUrl = 'https://mesto.nomoreparties.co/v1/wff-cohort-11/'; // путь до сервера
export let userId; // ID авторизованного пользователя

// забрать все карточки
export const fetchCards = () => {
  return fetch(`${baseUrl}cards`, {
    method: 'GET',
    headers: {
      authorization: token
    }
  })
    .then((res) => handleError(res))
};

// забрать данные пользователя
export const fetchUserData = () => {
  return fetch(`${baseUrl}users/me`, {
    method: 'GET',
    headers: {
      authorization: token
    }
  })
    .then((res) => handleError(res))
    .then((res) => {
      fetchUserId(res["_id"]);
      return res
    })
};

// получить ID авторизованного пользователя
const fetchUserId = (id) => {
  userId = id;
}

// обновить данные пользователя
export const updateUserData = (name, about) => {

  return fetch(`${baseUrl}users/me`, {
    method: 'PATCH',
    headers: {
      authorization: token,
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      about: about
    })
  });
}

// обновить аватар пользователя
export const updateUserAvatar = (url) => {

  return fetch(`${baseUrl}users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: token,
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      avatar: url
    })
  })
    .then((res) => handleError(res))
    // выбрасываем ошибку, чтобы прокинуть её вызвавшей функции
    .catch((err) => {
      throw err;
    });
}

// добавить карточку
export const saveCardData = (name, link) => {

  return fetch(`${baseUrl}cards`, {
    method: 'POST',
    headers: {
      authorization: token,
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
    .then((res) => handleError(res))
    .then((card) => card)
};

// удалить карточку
export const removeCard = (cardId) => {

  return fetch(`${baseUrl}cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: token
    }
  })
};

// удалить лайк
export const removeLike = (cardId) => {

  return fetch(`${baseUrl}cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: token,
      'Content-type': 'application/json'
    }
  })
    .then((res) => handleError(res))
}

// добавить лайк
export const addLike = (cardId) => {

  return fetch(`${baseUrl}cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: token,
        'Content-type': 'application/json'
      }
    })
      .then((res) => handleError(res))
}

//проверить, что урл на изображение
export const checkIfUrlContainsImage = (url) => {

  return fetch(`${url}`, { method: 'HEAD' })
    .then((res) => {
      if(res.ok) return res;
      return Promise.reject(`Ошибка: ${res.status}`)
    })
}

// обработчик ошибок
const handleError = (res) => {
  if(res.ok) return res.json()

  return Promise.reject(`Ошибка: ${res.status}`)
}