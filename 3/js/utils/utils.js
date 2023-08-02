const fillString = (string, minLength, extraSymbols) => {
  while (string.length < minLength) {
    string = extraSymbols.slice(0, minLength - string.length) + string;
  }

  return string;
};

const getRandomNumber = (min, max, digits) => +(Math.random() * (max - min) + min).toFixed(digits);

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const getRandomArraySlice = (elements) => elements.slice().sort(() => Math.random() - 0.5).slice(0, getRandomNumber(0, elements.length - 1));

export { fillString, getRandomNumber, getRandomArrayElement, getRandomArraySlice };
