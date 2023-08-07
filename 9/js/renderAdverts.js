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

const createPhotoFragment = (photos) => {
  const photosFragment = document.createDocumentFragment();
  const photoTemplate = '<img class="popup__photo" width="45" height="40" alt="Фотография жилья">';

  photos.forEach((photo) => {
    const newElement = createElement(photoTemplate);
    newElement.src = photo;
    photosFragment.append(newElement);
  });

  return photosFragment;
};

const editImageSource = (element, url) => {
  if (!url) {
    element.remove();
    return;
  }

  element.src = url;
};

const editTextContent = (element, content) => {
  if (!content) {
    element.remove();
    return;
  }

  element.textContent = content;
};

const editFirstChildTextContent = (parent, content) => {
  if (!content) {
    parent.remove();
    return;
  }

  parent.firstChild.textContent = `${content} `;
};

const editListElement = (parent, content, handler) => {
  if (!content && !content.length) {
    parent.remove();
    return;
  }

  parent.replaceChildren(handler(content));
};

const editCapacityElement = (element, rooms, guests) => {
  if (!rooms && !guests) {
    element.remove();
    return;
  }

  element.textContent = `${rooms ? rooms : 0} комнаты для ${guests ? guests : 0} гостей`;
};

const editTimingElement = (element, checkin, checkout) => {
  if (!checkin && !checkout) {
    element.remove();
    return;
  }

  const checkinText = checkin ? `после ${checkin}` : 'в любое время';
  const checkoutText = checkout ? `до ${checkout}` : 'в любое время';
  element.textContent = `Заезд ${checkinText}, выезд ${checkoutText}`;
};

const createAdvertTemplate = ({author, offer}) => {
  const {avatar} = author;
  const {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos} = offer;

  const popup = popupTemplate.cloneNode(true);
  editImageSource(popup.querySelector('.popup__avatar'), avatar);
  editTextContent(popup.querySelector('.popup__title'), title);
  editTextContent(popup.querySelector('.popup__text--address'), address);
  editFirstChildTextContent(popup.querySelector('.popup__text--price'), price);
  editTextContent(popup.querySelector('.popup__type'), propertyTypeTitles[type]);
  editCapacityElement(popup.querySelector('.popup__text--capacity'), rooms, guests);
  editTimingElement(popup.querySelector('.popup__text--time'), checkin, checkout);
  editListElement(popup.querySelector('.popup__features'), features, createFeaturesFragment);
  editTextContent(popup.querySelector('.popup__description'), description);
  editListElement(popup.querySelector('.popup__photos'), photos, createPhotoFragment);

  return popup;
};

const renderAdvertById = (id) => {
  mapCanvas.append(createAdvertTemplate(data[id]));
};

export { renderAdvertById };
