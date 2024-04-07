// объект настроек валидации
export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  spanErrorSelector: 'input-error'
}

// Функция, которая добавляет класс с ошибкой инпуту и спану с самой ошибкой
export function showInputError (formError, errorMessage, errorClass, input, inputErrorClass) {
  formError.classList.add(errorClass);
  formError.textContent = errorMessage;
  input.classList.add(inputErrorClass);
};

// Функция, которая удаляет класс с ошибкой инпуту и спану с самой ошибкой
function hideInputError (formError, errorClass, input, inputErrorClass) {
  formError.classList.remove(errorClass);
  formError.textContent = "";
  input.classList.remove(inputErrorClass);
};

// Функция, которая проверяет валидность поля
function isValid(form, input, errorClass, inputErrorClass,spanErrorSelector) {
  const formError = form.querySelector(`.${input.name}-${spanErrorSelector}`);

  if(input.validity.patternMismatch) input.setCustomValidity(input.dataset.errorMessage);
  else input.setCustomValidity("");

  if (!input.validity.valid) showInputError(formError, input.validationMessage, errorClass, input, inputErrorClass);
  else if(input.value == false) showInputError(formError, "Строка не может состоять из одних пробелов", errorClass, input, inputErrorClass);
  else hideInputError(formError, errorClass, input, inputErrorClass);
};

// включение валидации для всех форм
export function setEnableValidation(config) {
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  forms.forEach(form => setEventListeners(form, config))
};

// навешивание слушателей на инпуты каждой формы
function setEventListeners(form, config) {
  const submitButton = form.querySelector(config.submitButtonSelector);
  const errorClass = config.errorClass;
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));

  // кнопка сабмита заблокирована при самом первом открытии формы, если данные в ней невалидны
  toggleButtonState(inputList, submitButton, config.inactiveButtonClass);

  inputList.forEach(input => {
    input.addEventListener('input', () => {
      isValid(form, input, errorClass, config.inputErrorClass, config.spanErrorSelector);
      toggleButtonState(inputList, submitButton, config.inactiveButtonClass);
    })
  });
}

// проверка, что все инпуты формы валидны
function hasInvalidInput(inputArray) {
  return inputArray.some(input => !input.validity.valid)
}

// включить/выключить кнопку сабмита
export function toggleButtonState(inputArray, button, buttonClass) {
  if(hasInvalidInput(inputArray)) {
    button.disabled = true;
    button.classList.add(buttonClass);
  } else {
    button.disabled = false;
    button.classList.remove(buttonClass);
  }
}

// очистить ошибки валидации
export function clearValidation(form, config) {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  inputs.forEach(input => {
    const formError = form.querySelector(`.${input.name}-input-error`);
    hideInputError(formError, config.errorClass, input, config.inputErrorClass);
  })
}

// показать ошибку "по урлу нет ихображения"
export function showUrlImageError(evt) {
  let errorMessage = 'Вставьте ссылку на изображение';
  let formError;
  let input;
  if(evt.target.name === "new-place") {
    formError = evt.target.querySelector('.link-input-error');
    input = evt.target.querySelector('.popup__input_type_url');
  } else {
    formError = evt.target.querySelector('.profile-url-input-error');
    input = evt.target.querySelector('.popup__input_type_profile-url');
  }
  showInputError(formError, errorMessage, validationConfig.errorClass, input, validationConfig.inputErrorClass)
}