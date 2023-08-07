const MESSAGE_INVALID_CAPACITY_FIELD = '1,2,3 комнаты — 1,2,3 гостей соответственно. 100 комнат не для гостей';
const MESSAGE_INVALID_PRICE_FIELD = 'Цена ниже минимальной';

const guestsInRooms = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0']
};

const adForm = document.querySelector('.ad-form');
const priceField = adForm.querySelector('#price');
const roomsField = adForm.querySelector('#room_number');
const capacityField = adForm.querySelector('#capacity');

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error-massage'
});

const validatePrice = (price) => Number(price) >= priceField.min;

const validateCapacity = (capacity) => guestsInRooms[roomsField.value].includes(capacity);

const initAddFormValidator = () => {
  pristine.addValidator(priceField, validatePrice, MESSAGE_INVALID_PRICE_FIELD);
  pristine.addValidator(capacityField, validateCapacity, MESSAGE_INVALID_CAPACITY_FIELD);
};

const validateAddForm = () => pristine.validate();
const resetAddFormValidator = () => pristine.reset();

export { initAddFormValidator, validateAddForm, resetAddFormValidator };
