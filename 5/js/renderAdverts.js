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
const popupTemplate = document.querySelector('#card').content.querySelector('.popup');

const createFeaturesFragment = (features) => {
  const featuresFragment = document.createDocumentFragment();
  const featureTemplate = '<li class="popup__feature"></li>';

  features.forEach((feature) => {
    const newElement = createElement(featureTemplate);
    newElement.classList.add(`popup__feature--${feature}`);
    featuresFragment.append(newElement);
  });

  return featuresFragment;
};

const createPhotosFragment = (photos) => {
  const photosFragment = document.createDocumentFragment();
  const photoTemplate = '<img class="popup__photo" width="45" height="40" alt="Фотография жилья">';

  photos.forEach((photo) => {
    const newElement = createElement(photoTemplate);
    newElement.src = photo;
    photosFragment.append(newElement);
  });

  return photosFragment;
};

const createAdvertTemplate = ({author, offer}) => {
  const {avatar} = author;
  const {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos} = offer;

  const popup = popupTemplate.cloneNode(true);
  const avatarElement = popup.querySelector('.popup__avatar');
  const titleElement = popup.querySelector('.popup__title');
  const addressElement = popup.querySelector('.popup__text--address');
  const priceElement = popup.querySelector('.popup__text--price');
  const typeElement = popup.querySelector('.popup__type');
  const capacityElement = popup.querySelector('.popup__text--capacity');
  const timeElement = popup.querySelector('.popup__text--time');
  const featuresElement = popup.querySelector('.popup__features');
  const descriptionElement = popup.querySelector('.popup__description');
  const photosElement = popup.querySelector('.popup__photos');

  avatarElement.src = avatar;

  if (avatar) {
    avatarElement.src = avatar;
  } else {
    avatarElement.remove();
  }

  if (title) {
    titleElement.textContent = title;
  } else {
    titleElement.remove();
  }

  if (address) {
    addressElement.textContent = address;
  } else {
    addressElement.remove();
  }

  if (price) {
    priceElement.firstChild.textContent = `${price} `;
  } else {
    priceElement.remove();
  }

  if (type) {
    typeElement.textContent = propertyTypeTitles[type];
  } else {
    typeElement.remove();
  }

  if (rooms || guests) {
    capacityElement.textContent = `${rooms ? rooms : 0} комнаты для ${guests ? guests : 0} гостей`;
  } else {
    capacityElement.remove();
  }

  if (checkin || checkout) {
    const checkinText = checkin ? `после ${checkin}` : 'в любое время';
    const checkoutText = checkout ? `до ${checkout}` : 'в любое время';
    timeElement.textContent = `Заезд ${checkinText}, выезд ${checkoutText}`;
  } else {
    timeElement.remove();
  }

  if (features && features.length) {
    featuresElement.replaceChildren(createFeaturesFragment(features));
  } else {
    featuresElement.remove();
  }

  if (description) {
    descriptionElement.textContent = description;
  } else {
    descriptionElement.remove();
  }

  if (photos && photos.length) {
    photosElement.replaceChildren(createPhotosFragment(photos));
  } else {
    photosElement.remove();
  }

  return popup;
};

const renderAdvertById = (id) => {
  mapCanvas.append(createAdvertTemplate(data[id]));
};

export { renderAdvertById };
