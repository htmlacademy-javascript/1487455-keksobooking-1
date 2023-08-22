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
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error-massage'
});

const validatePrice = (price) => Number(price) >= priceField.min;

const getPriceMessage = () => `От ${priceField.min} до ${priceField.max}`;

const validateCapacity = (capacity) => guestsInRooms[roomsField.value].includes(capacity);

const getCapacityMessage = () => {
  const maxGuests = Math.max(...guestsInRooms[roomsField.value]);
  return `Если комнат ${roomsField.value}, максимум гостей - ${maxGuests}`;
};

const initAddFormValidator = () => {
  pristine.addValidator(priceField, validatePrice, getPriceMessage);
  pristine.addValidator(capacityField, validateCapacity, getCapacityMessage);
};

const validateAddForm = () => pristine.validate();
const resetAddFormValidator = () => pristine.reset();

export { initAddFormValidator, validateAddForm, resetAddFormValidator };
