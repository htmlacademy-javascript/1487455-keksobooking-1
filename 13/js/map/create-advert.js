const propertyTypeTitles = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

const popupTemplate = document.querySelector('#card').content.querySelector('.popup');

const editFeaturesList = (element, features) => {
  if (!features || !features.length) {
    element.remove();
    return;
  }

  const featureTemplate = element.firstElementChild;
  element.innerHTML = '';

  features.forEach((feature) => {
    const newFeature = featureTemplate.cloneNode(true);
    newFeature.classList.add(`popup__feature--${feature}`);
    element.append(newFeature);
  });
};

const editPhotosList = (element, photos) => {
  if (!photos || !photos.length) {
    element.remove();
    return;
  }

  const photoTemplate = element.firstElementChild;
  element.innerHTML = '';

  photos.forEach((photo) => {
    const newPhoto = photoTemplate.cloneNode(true);
    newPhoto.src = photo;
    element.append(newPhoto);
  });
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

const createAdvert = ({author, offer}) => {
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
  editFeaturesList(popup.querySelector('.popup__features'), features);
  editTextContent(popup.querySelector('.popup__description'), description);
  editPhotosList(popup.querySelector('.popup__photos'), photos);

  return popup;
};

export { createAdvert };
