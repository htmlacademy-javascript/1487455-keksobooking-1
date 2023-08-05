const isPalindrome = (string = '') => {
  string = string.replaceAll(' ', '').toLowerCase();
  let stringReversed = '';

  for (let i = string.length - 1; i >= 0; i--) {
    stringReversed += string[i];
  }

  return string === stringReversed;
};

const extractNumbers = (string) => {
  string = String(string);
  let result = '';

  for (let i = 0; i < string.length; i++) {
    const number = parseInt(string[i], 10);
    result += (!Number.isNaN(number)) ? number : '';
  }

  return parseInt(result, 10);
};

const fillString = (string, minLength, extraSymbols) => {
  while (string.length < minLength) {
    string = extraSymbols.slice(0, minLength - string.length) + string;
  }

  return string;
};

const getRandomNumber = (min, max, digits) => +(Math.random() * (max - min) + min).toFixed(digits);

isPalindrome();
extractNumbers();
fillString(0,0,0);
getRandomNumber();
