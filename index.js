const isValid = (creditCardNumber) => { // 2N -> O(N)
  if (isNullish(creditCardNumber)) // 1
    throw Error("Credit card number cannot be null or undefined."); // 1
  if(!isString(creditCardNumber)) // 1
    throw Error("Credit card number must be a string."); // 1

  const potentialCheckDigit = toNumber(creditCardNumber[creditCardNumber.length - 1]); // 1
  const payload = [...creditCardNumber.slice(0, -1)]; // N + (1)
  const checkDigit = calculateCheckDigit(payload); // N

  return potentialCheckDigit === checkDigit; // 1
}

const isNullish = (value) => value === null || value === undefined;  // 1

const isString = (value) => typeof(value) === "string"; // 1

const calculateCheckDigit = (payload) => { // N
  let totalSum = 0;

  let isDigitSupposedToBeMultiplied = true;
  for (let i = payload.length - 1; i >= 0; i--) {
    let digit = toNumber(payload[i]);

    let sum = digit;

    if (isDigitSupposedToBeMultiplied)
      sum = sumDigits(digit * 2);

    totalSum += sum;
    isDigitSupposedToBeMultiplied = !isDigitSupposedToBeMultiplied;
  }

  return 10 - (totalSum % 10);
}

const toNumber = (value) => { // 1
  let number = Number(value);
  if(Number.isNaN(number))
    throw Error("Credit card number cannot contain non-numerical characters.");

  return number;
}

const sumDigits = (number) => Math.floor(number / 10) + (number % 10); // 1

console.log(isValid("4003600000000014"));