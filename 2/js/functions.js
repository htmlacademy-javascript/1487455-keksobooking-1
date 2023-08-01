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
  if (string >= minLength) {
    return string;
  }

  const lengthGap = minLength - string.length;

  if (extraSymbols.length >= lengthGap) {
    return extraSymbols.slice(0, lengthGap) + string;
  }

  let result = extraSymbols.slice(0, lengthGap % extraSymbols.length);

  while (result.length < lengthGap) {
    result += extraSymbols;
  }

  return result + string;
};

const isNumberNonNegative = (number) => typeof(number) === 'number' || number >= 0;

/* написал декларативным способом чтобы иметь возможность использовать объект arguments */
function getRandomNumber (min, max, digits) {
  if (min >= max || !Array.from(arguments).every((argument) => isNumberNonNegative(argument))) {
    return NaN;
  }
  return Number((Math.random() * (max - min) + min).toFixed(digits));
}

isPalindrome();
extractNumbers();
fillString(0,0,0);
getRandomNumber();
