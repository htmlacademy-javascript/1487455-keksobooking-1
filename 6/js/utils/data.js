import { getRandomNumber, getRandomArrayElement, getRandomArraySlice } from './utils.js';

const TITLE_DEFAULT = 'lorem ipsum dolor sit amet';

const PRICE_MIN = 1000;
const PRICE_MAX = 100000;

const PROPERTY_TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];

const ROOMS_MIN = 1;
const ROOMS_MAX = 10;

const GUESTS_MIN = 0;
const GUESTS_MAX = 100;

const CHECKINS = ['12:00', '13:00', '14:00'];
const CHECKOUTS = ['12:00', '13:00', '14:00'];

const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

const DESCRIPTION_DEFAULT = 'Супер крутое место! Нет слов чтобы описать =)';

const PHOTO_URLS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const LAT_MIN = 35.65000;
const LAT_MAX = 35.70000;
const LNG_MIN = 139.70000;
const LNG_MAX = 139.80000;
const LAT_LNG_PRECISION = 5;

const createDataUnitById = (id) => {
  const lat = getRandomNumber(LAT_MIN, LAT_MAX, LAT_LNG_PRECISION);
  const lng = getRandomNumber(LNG_MIN, LNG_MAX, LAT_LNG_PRECISION);

  return {
    author: {
      avatar: `img/avatars/user${id.toString().padStart(2, '0')}.png`
    },
    offer: {
      title: TITLE_DEFAULT,
      address: `${lat}, ${lng}`,
      price: getRandomNumber(PRICE_MIN, PRICE_MAX),
      type: getRandomArrayElement(PROPERTY_TYPES),
      rooms: getRandomNumber(ROOMS_MIN, ROOMS_MAX),
      guests: getRandomNumber(GUESTS_MIN, GUESTS_MAX),
      checkin: getRandomArrayElement(CHECKINS),
      checkout: getRandomArrayElement(CHECKOUTS),
      features: getRandomArraySlice(FEATURES),
      description: DESCRIPTION_DEFAULT,
      photos: getRandomArraySlice(PHOTO_URLS)
    },
    location: {
      lat: lat,
      lng: lng
    }
  };
};

const createData = (quantity) => Array.from({length: quantity}, (_, id) => createDataUnitById(id + 1));

export { createData };
