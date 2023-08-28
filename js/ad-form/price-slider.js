const PRICE_STEP = 1;

const priceField = document.querySelector('#price');
const slider = document.querySelector('.ad-form__slider');

const initPriceSlider = () => {
  if (slider.noUiSlider) {
    slider.noUiSlider.destroy();
  }

  noUiSlider.create(slider, {
    range: {
      min: Number(priceField.min),
      max: Number(priceField.max)
    },
    step: PRICE_STEP,
    start: priceField.min,
    connect: 'lower'
  });
  slider.noUiSlider.on('update', () => {
    const price = Number(slider.noUiSlider.get());
    priceField.value = price;
  });
};

const setPriceSliderValue = (value) => {
  slider.noUiSlider.set(value);
};

export { initPriceSlider, setPriceSliderValue };
