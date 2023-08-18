import { initAddFormValidator, validateAddForm, resetAddFormValidator } from './validate-form.js';
import { initFormFieldSynchronizer } from './sync-form-fields.js';
import { showNotification } from '../utils/notifications.js';
import { initPriceSlider } from './price-slider.js';
import { resetMap } from '../map/render-map.js';
import { sendData } from '../utils/data.js';

const SEND_DATA_URL = 'https://28.javascript.pages.academy/keksobooking';

const NOTIFICATION_SUCCESS_STATUS = 'success';
const NOTIFICATION_SUCCESS_MESSAGE = 'Ваше объявление<br>успешно размещено!';

const NOTIFICATION_ERROR_STATUS = 'error';
const NOTIFICATION_ERROR_MESSAGE = 'Ошибка размещения объявления';
const NOTIFICATION_ERROR_BUTTON_TEXT = 'Попробовать снова';

const adForm = document.querySelector('.ad-form');

const onSendDataSuccess = () => {
  showNotification(NOTIFICATION_SUCCESS_STATUS, NOTIFICATION_SUCCESS_MESSAGE);
  adForm.reset();
};

const onSendDataError = () => {
  showNotification(NOTIFICATION_ERROR_STATUS, NOTIFICATION_ERROR_MESSAGE, NOTIFICATION_ERROR_BUTTON_TEXT);
};

const onAddFormSubmit = (event) => {
  event.preventDefault();
  if (validateAddForm()) {
    sendData(SEND_DATA_URL, onSendDataSuccess, onSendDataError, new FormData(event.target));
  }
};

const onAddFormReset = () => {
  resetAddFormValidator();
  setTimeout(() => resetMap());
};

const initAddFrom = () => {
  initAddFormValidator();
  initPriceSlider();
  initFormFieldSynchronizer();
  adForm.addEventListener('submit', onAddFormSubmit);
  adForm.addEventListener('reset', onAddFormReset);
};

export { initAddFrom };
