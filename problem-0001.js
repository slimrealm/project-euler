// If we list all the natural numbers below 10 that are multiples of 3 or 5,
// we get 3, 5, 6 and 9. The sum of these multiples is 23.
// Find the sum of all the multiples of 3 or 5 below 1000.

const isMultipleOf = (numberToTest, multipleOf) => {
  if (numberToTest % multipleOf === 0) {
    return true;
  }
  return false;
};

const getAllMatchingNaturalNumbersLessThan = (lessThanThis) => {
  let validNumbers = [];
  for (let i = 1; i < lessThanThis; i++) {
    if (isMultipleOf(i, 3) || isMultipleOf(i, 5)) {
      validNumbers.push(i);
    }
  }

  return validNumbers;
};

const sumNumbers = (numbers) => {
  const sum = numbers.reduce((accumulator, value) => {
    return accumulator + value;
  }, 0);
  return sum;
};

const numbers = getAllMatchingNaturalNumbersLessThan(1000);
const sum = sumNumbers(numbers);
console.log('Sum of numbers less than 20: ', sum);

// CORRECT ANSWER OF 233168 !
