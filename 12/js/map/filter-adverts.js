import { addAdverts } from './render-map.js';
import { debounce } from '../utils/utils.js';

const FILTER_VALUE_ALL = 'any';
const RENDER_DELAY = 500;

const priceSettings = {
  low: {
    min: 0,
    max: 10000
  },
  middle: {
    min: 10000,
    max: 50000
  },
  high: {
    min: 50000,
    max: 100000
  },
  any: {
    min: 0,
    max: 100000
  }
};

const mapFiltersFormElement = document.querySelector('.map__filters');
const housingTypeElement = document.querySelector('#housing-type');
const housingPriceElement = document.querySelector('#housing-price');
const housingRoomsElement = document.querySelector('#housing-rooms');
const housingGuestsElement = document.querySelector('#housing-guests');

const filterByHousingType = (advertHousingType) => housingTypeElement.value === FILTER_VALUE_ALL || advertHousingType === housingTypeElement.value;

const filterByPrice = (advertPrice) => {
  const {min, max} = priceSettings[housingPriceElement.value];
  return advertPrice >= min && advertPrice <= max;
};

const filterByRooms = (advertRooms) => housingRoomsElement.value === FILTER_VALUE_ALL || advertRooms.toString() === housingRoomsElement.value;

const filterByGuests = (advertGuests) => housingGuestsElement.value === FILTER_VALUE_ALL || advertGuests.toString() === housingGuestsElement.value;

const filterByFeatures = (advertFeatures) => {
  const mapCheckboxElements = document.querySelectorAll('.map__checkbox:checked');
  const choosenFeatures = Array.from(mapCheckboxElements, (element) => element.value);
  advertFeatures = (advertFeatures) ? advertFeatures : [];

  return choosenFeatures.every((choosenFeature) => advertFeatures.includes(choosenFeature));
};

const filterAdverts = (adverts) => adverts.slice().filter((advert) =>
  filterByHousingType(advert.offer.type) &&
  filterByPrice(advert.offer.price) &&
  filterByRooms(advert.offer.rooms) &&
  filterByGuests(advert.offer.guests) &&
  filterByFeatures(advert.offer.features));

const onMapFiltersFormElementChange = (adverts) => addAdverts(filterAdverts(adverts));

const initFilters = (adverts) => mapFiltersFormElement.addEventListener('change', debounce(() => onMapFiltersFormElementChange(adverts), RENDER_DELAY));

export { filterAdverts, initFilters };
