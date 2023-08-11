import { initAddFormValidator, validateAddForm, resetAddFormValidator } from './validate-form.js';
import { initFormFieldSyncronizer } from './sync-form-fields.js';
import { resetMap } from '../map/render-map.js';
import { initPriceSlider } from './price-slider.js';

const adForm = document.querySelector('.ad-form');

const onAddFormReset = () => {
  resetAddFormValidator();
  resetMap();
};

const onAddFormSubmit = (event) => {
  event.preventDefault();
  if (validateAddForm()) {
    adForm.submit();
  }
};

const initAddFrom = () => {
  initAddFormValidator();
  initPriceSlider();
  initFormFieldSyncronizer();
  adForm.addEventListener('submit', onAddFormSubmit);
  adForm.addEventListener('reset', onAddFormReset);
};

export { initAddFrom };
