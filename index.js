// Assume credit card number numeric
const isValid = (creditCardNumber) => {
  if (isNullish(creditCardNumber))
    throw Error("Credit card number cannot be null or undefined.");
  if(!isString(creditCardNumber))
    throw Error("Credit card number must be a string.");

  const potentialCheckDigit = parseInt(creditCardNumber[creditCardNumber.length - 1]);
  const payload = [...creditCardNumber.slice(0, -1)];
  const checkDigit = calculateCheckDigit(payload);

  return potentialCheckDigit === checkDigit;
}

const isNullish = (value) => value === null || value === undefined;

const isString = (value) => typeof(value) === "string";

const calculateCheckDigit = (payload) => {
  let totalSum = 0;

  let isDigitSupposedToBeMultiplied = true;
  for (let i = payload.length - 1; i >= 0; i--) {
    let digit = parseInt(payload[i], 10);

    let sum = digit;

    if (isDigitSupposedToBeMultiplied)
      sum = sumDigits(digit * 2);

    totalSum += sum;
    isDigitSupposedToBeMultiplied = !isDigitSupposedToBeMultiplied;
  }

  return 10 - (totalSum % 10);
}

const sumDigits = (number) => Math.floor(number / 10) + (number % 10);

console.log(isValid("4003600000000014"));