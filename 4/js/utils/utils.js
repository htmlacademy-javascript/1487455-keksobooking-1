const getRandomNumber = (min, max, digits) => +(Math.random() * (max - min) + min).toFixed(digits);

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const getRandomArraySlice = (elements) => elements.filter(() => Math.random() > 0.5);

export { getRandomNumber, getRandomArrayElement, getRandomArraySlice };
