import { setFormElementsState } from '../utils/utils.js';

const mapFilters = document.querySelector('.map__filters');
const mapFiltersElements = mapFilters.querySelectorAll('fieldset, select');

const disableMapFilters = () => {
  mapFilters.classList.add('map__filters--disabled');
  setFormElementsState(mapFiltersElements, true);
};

const enableMapFilters = () => {
  mapFilters.classList.remove('map__filters--disabled');
  setFormElementsState(mapFiltersElements, false);
};

export { disableMapFilters, enableMapFilters };
