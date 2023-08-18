import { createElement, isEscape } from './utils.js';

let notification = null;
let notificationStatus = '';

const createNotificationTemplate = (status, message, buttonText) =>
  `<div class="${status}">
    <p class="${status}__message">${message}</p>
    ${buttonText ? `<button type="button" class="${status}__button">${buttonText}</button>` : ''}
  </div>`;

const onButtonCloseClick = () => {
  removeNotification();
};

const onDocumentClick = (event) => {
  if (!event.target.closest(`.${notificationStatus}__message`)) {
    removeNotification();
  }
};

const onDocumentKeydown = (event) => {
  event.preventDefault();
  if (isEscape(event)) {
    removeNotification();
  }
};

/*
  Функции removeNotification и обработчики событий ссылаются друг на друга.
  Во избежании ошибок линтера removeNotification написана декларативным способом.
*/
function removeNotification () {
  notification.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onDocumentClick);
}

const showNotification = (status, message, buttonText) => {
  notification = createElement(createNotificationTemplate(status, message, buttonText));
  notificationStatus = status;

  if (buttonText) {
    notification.querySelector('button').addEventListener('click', onButtonCloseClick);
  }

  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onDocumentKeydown);

  document.body.append(notification);

};

export { showNotification };
