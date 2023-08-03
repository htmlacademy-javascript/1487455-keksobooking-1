import { createData } from './utils/data.js';
import { createElement } from './utils/utils.js';

const data = createData(10);

const propertyTypeTitles = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

const mapCanvas = document.querySelector('#map-canvas');

const createFeatureTemplate = (feature) => `<li class="popup__feature popup__feature--${feature}"></li>`;

const createPhotoTemplate = (url) => `<img src="${url}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`;

const createListTemplate = (list, createItem) => list.reduce((template, item) => template + createItem(item), '');

const createAdvertTemplate = ({author, offer}) => {
  const {avatar} = author;
  const {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos} = offer;

  const featuresTemplate = (features) ? `<ul class="popup__features">${createListTemplate(features, createFeatureTemplate)}</ul>` : '';
  const photosTemplate = (photos) ? `<div class="popup__photos">${createListTemplate(photos, createPhotoTemplate)}</div>` : '';

  return `<article class="popup">
    <img src="${avatar}" class="popup__avatar" width="70" height="70" alt="Аватар пользователя">
    <h3 class="popup__title">${title}</h3>
    <p class="popup__text popup__text--address">${address}</p>
    <p class="popup__text popup__text--price">${price} <span>₽/ночь</span></p>
    <h4 class="popup__type">${propertyTypeTitles[type]}</h4>
    <p class="popup__text popup__text--capacity">${rooms} комнаты для ${guests} гостей</p>
    <p class="popup__text popup__text--time">Заезд после ${checkin}, выезд до ${checkout}</p>
    ${featuresTemplate}
    <p class="popup__description">${description}</p>
    ${photosTemplate}
  </article>`;
};

const renderAdvertById = (id) => {
  mapCanvas.append(createElement(createAdvertTemplate(data[id])));
};

export { renderAdvertById };
