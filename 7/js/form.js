const formElements = document.querySelectorAll('.js-form-element');

const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const priceSlider = document.querySelector('.ad-form__slider');

const disableForms = () => {
  adForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('map__filters--disabled');
  priceSlider.classList.add('hidden');

  formElements.forEach((element) => {
    element.disabled = true;
  });
};

export { disableForms };
