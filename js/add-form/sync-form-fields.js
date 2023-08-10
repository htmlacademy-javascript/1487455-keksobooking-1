const minPriceSettings = {
  palace: 10000,
  flat: 1000,
  house: 5000,
  bungalow: 0,
  hotel: 3000,
};

const propertyTypeField = document.querySelector('#type');
const priceField = document.querySelector('#price');
const roomsField = document.querySelector('#room_number');
const capacityField = document.querySelector('#capacity');
const timeInField = document.querySelector('#timein');
const timeOutField = document.querySelector('#timeout');

const inputEvent = new CustomEvent('input');

const onRoomsFieldChange = () => {
  capacityField.dispatchEvent(inputEvent);
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
  priceField.dispatchEvent(inputEvent);
};

const initFormFieldSyncronizer = () => {
  priceField.min = minPriceSettings[propertyTypeField.value];
  priceField.placeholder = minPriceSettings[propertyTypeField.value];
  roomsField.addEventListener('change', onRoomsFieldChange);
  timeInField.addEventListener('change', onTimeInFieldChange);
  timeOutField.addEventListener('change', onTimeOutFieldChange);
  propertyTypeField.addEventListener('change', onPropertyTypeFieldChange);
};

export { initFormFieldSyncronizer };
