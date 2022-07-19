// Assume credit card number numeric
const isValid = (creditCardNumber) => {
	if (isNullish(creditCardNumber))
		throw Error("Credit card number cannot be null or undefined.");

	const potentialCheckDigit = parseInt(creditCardNumber[creditCardNumber.length - 1]);
	const payload = [...creditCardNumber.slice(0, -1)];
	const checkDigit = calculateCheckDigit(payload);

	return potentialCheckDigit === checkDigit;
}

const isNullish = (value) => value === null || value === undefined;

const calculateCheckDigit = (payload) => {
	let sumOfDigits = 0;

	let isDigitSupposedToBeMultiplied = true;
	for (let i = payload.length - 1; i >= 0; i--) {
		let digit = parseInt(payload[i], 10);


		if (isDigitSupposedToBeMultiplied) {
			digit *= 2;

			// Or foreach over digit string
			if (digit > 10) {
				const digitString = digit.toString();
				const firstDigit = parseInt(digitString.charAt(0));
				const secondDigit = parseInt(digitString.charAt(1));

				sumOfDigits += (firstDigit + secondDigit);
			} else {
				sumOfDigits += digit;
			}
		} else {
			sumOfDigits += digit;
		}

		isDigitSupposedToBeMultiplied = !isDigitSupposedToBeMultiplied;
	}

	return 10 - (sumOfDigits % 10);
}

console.log(isValid("4003600000000014"));