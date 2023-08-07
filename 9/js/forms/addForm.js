import { initAddFormValidator, validateAddForm, resetAddFormValidator } from './validate-form.js';
import { setFormElementsState } from '../utils/utils.js';

const minPriceSettings = {
  palace: 10000,
  flat: 1000,
  house: 5000,
  bungalow: 0,
  hotel: 3000,
};

const adForm = document.querySelector('.ad-form');
const adFormElements = adForm.querySelectorAll('fieldset');
const propertyTypeField = adForm.querySelector('#type');
const priceField = adForm.querySelector('#price');
const timeInField = adForm.querySelector('#timein');
const timeOutField = adForm.querySelector('#timeout');
const priceSlider = adForm.querySelector('.ad-form__slider');

const disableAdForm = () => {
  adForm.classList.add('ad-form--disabled');
  priceSlider.classList.add('hidden');
  setFormElementsState(adFormElements, true);
};

const enableAdForm = () => {
  adForm.classList.remove('ad-form--disabled');
  priceSlider.classList.remove('hidden');
  setFormElementsState(adFormElements, false);
};

const onTimeInFieldChange = () => {
  timeOutField.value = timeInField.value;
};

const onTimeOutFieldChange = () => {
  timeInField.value = timeOutField.value;
};

const onPropertyTypeFieldChange = () => {
  const minValue = minPriceSettings[propertyTypeField.value];
  priceField.min = minValue;
  priceField.placeholder = minValue;
  resetAddFormValidator();
};

const onAddFormSubmit = (event) => {
  event.preventDefault();
  if (validateAddForm()) {
    adForm.submit();
  }
};

const onAddFormReset = () => resetAddFormValidator();

const initAddFrom = () => {
  initAddFormValidator();
  priceField.min = minPriceSettings[propertyTypeField.value];
  priceField.placeholder = minPriceSettings[propertyTypeField.value];
  timeInField.addEventListener('change', onTimeInFieldChange);
  timeOutField.addEventListener('change', onTimeOutFieldChange);
  propertyTypeField.addEventListener('change', onPropertyTypeFieldChange);
  adForm.addEventListener('submit', onAddFormSubmit);
  adForm.addEventListener('reset', onAddFormReset);
};

export { initAddFrom, disableAdForm, enableAdForm };
