import { initAdFormValidator, validateAdForm, resetAdFormValidator } from './validate-form.js';
import { initFormFieldSynchronizer } from './sync-form-fields.js';
import { showNotification } from '../utils/notifications.js';
import { initPriceSlider } from './price-slider.js';
import { resetMap } from '../map/render-map.js';
import { sendData } from '../utils/data.js';
import { createElement } from '../utils/utils.js';

const SEND_DATA_URL = 'https://28.javascript.pages.academy/keksobooking';

const NOTIFICATION_SUCCESS_STATUS = 'success';
const NOTIFICATION_SUCCESS_MESSAGE = 'Ваше объявление<br>успешно размещено!';

const NOTIFICATION_ERROR_STATUS = 'error';
const NOTIFICATION_ERROR_MESSAGE = 'Ошибка размещения объявления';
const NOTIFICATION_ERROR_BUTTON_TEXT = 'Попробовать снова';

const NOTIFICATION_FILE_INVALID_STATUS = 'error';
const NOTIFICATION_FILE_INVALID_MESSAGE = 'Некорректный формат файла';
const NOTIFICATION_FILE_INVALID_BUTTON_TEXT = 'Закрыть';

const AVATAR_URL_DEFAULT = 'img/muffin-grey.svg';
const FILE_TYPES = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

const adForm = document.querySelector('.ad-form');
const avatarField = document.querySelector('#avatar');
const avatarPreviewElement = document.querySelector('.ad-form-header__preview img');
const imagesField = document.querySelector('#images');
const imagesPreviewElement = document.querySelector('.ad-form__photo');

const onSendDataSuccess = () => {
  showNotification(NOTIFICATION_SUCCESS_STATUS, NOTIFICATION_SUCCESS_MESSAGE);
  adForm.reset();
};

const onSendDataError = () => {
  showNotification(NOTIFICATION_ERROR_STATUS, NOTIFICATION_ERROR_MESSAGE, NOTIFICATION_ERROR_BUTTON_TEXT);
};

const createFileUrl = (target) => {
  const file = target.files[0];
  const fileName = file.name.toLowerCase();
  const isFileValid = FILE_TYPES.some((type) => fileName.endsWith(type));

  if (!isFileValid) {
    showNotification(NOTIFICATION_FILE_INVALID_STATUS, NOTIFICATION_FILE_INVALID_MESSAGE, NOTIFICATION_FILE_INVALID_BUTTON_TEXT);
    return;
  }

  return URL.createObjectURL(file);
};

const resetAvatarPreview = () => {
  avatarPreviewElement.src = AVATAR_URL_DEFAULT;
};

const setAvatarPreview = ({target}) => {
  resetAvatarPreview();
  const fileUrl = createFileUrl(target);

  if (!fileUrl) {
    avatarField.value = '';
    return;
  }

  avatarPreviewElement.src = fileUrl;
};

const onAvatarFieldChange = (event) => setAvatarPreview(event);

const resetImagesPreview = () => {
  imagesPreviewElement.innerHTML = '';
};

const setImagesPreview = ({target}) => {
  resetImagesPreview();
  const fileUrl = createFileUrl(target);

  if (!fileUrl) {
    imagesField.value = '';
    return;
  }

  imagesPreviewElement.append(createElement(`<img src="${createFileUrl(target)}">`));
};

const onImagesFieldChange = (event) => setImagesPreview(event);

const onAdFormSubmit = (event) => {
  event.preventDefault();
  if (validateAdForm()) {
    sendData(SEND_DATA_URL, onSendDataSuccess, onSendDataError, new FormData(event.target));
  }
};

const onAdFormReset = () => {
  resetAvatarPreview();
  resetImagesPreview();
  resetAdFormValidator();
  setTimeout(() => resetMap());
};

const initAdForm = () => {
  initAdFormValidator();
  initPriceSlider();
  initFormFieldSynchronizer();
  avatarField.addEventListener('change', onAvatarFieldChange);
  imagesField.addEventListener('change', onImagesFieldChange);
  adForm.addEventListener('submit', onAdFormSubmit);
  adForm.addEventListener('reset', onAdFormReset);
};

export { initAdForm };
