const getRandomNumber = (min, max, digits) => +(Math.random() * (max - min) + min).toFixed(digits);

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const getRandomArraySlice = (elements) => elements.filter(() => Math.random() > 0.5);

const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;
  return newElement.firstChild;
};

const setFormElementsState = (formElements, state) => {
  formElements.forEach((element) => {
    element.disabled = state;
  });
};

export { getRandomNumber, getRandomArrayElement, getRandomArraySlice, createElement, setFormElementsState };