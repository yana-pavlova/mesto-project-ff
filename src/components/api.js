const token = 'aa9ec73b-b4d9-4065-8418-0cee1c64b5ef'; // код для авторизации на сервере
const baseUrl = 'https://mesto.nomoreparties.co/v1/wff-cohort-11/'; // путь до сервера
export let userId; // ID авторизованного пользователя

// забрать все карточки
export const fetchCards = () => {
  return request(`${baseUrl}cards`, {
    method: 'GET',
    headers: {
      authorization: token
    }
  })
};

// забрать данные пользователя
export const fetchUserData = () => {
  return request(`${baseUrl}users/me`, {
    method: 'GET',
    headers: {
      authorization: token
    }
  })
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

  return request(`${baseUrl}users/me`, {
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

  return request(`${baseUrl}users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: token,
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      avatar: url
    })
  })
}

// добавить карточку
export const saveCardData = (name, link) => {

  return request(`${baseUrl}cards`, {
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
    .then((card) => card)
};

// удалить карточку
export const removeCard = (cardId) => {
  return request(`${baseUrl}cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: token
    }
  })
};

// удалить лайк
export const removeLike = (cardId) => {
  return request(`${baseUrl}cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: token,
      'Content-type': 'application/json'
    }
  })
}

// добавить лайк
export const addLike = (cardId) => {
  return request(`${baseUrl}cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: token,
      'Content-type': 'application/json'
    }
  })
}

//проверить, что урл на изображение
export const checkIfUrlContainsImage = (url) => {
  return fetch(`${url}`, { method: 'HEAD' })
    .then((res) => {
      if(res.ok) return res;
      return Promise.reject(`Ошибка: ${res.status}`)
    })
}

// универcальная функция запроса на сервер
const request = (url, options) => {

  return fetch(url, options).then(checkResponse)
}

// обработчик ошибок
const checkResponse = (res) => {
  if(res.ok) return res.json()

  return Promise.reject(`Ошибка: ${res.status}`)
}