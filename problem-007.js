//By listing the first six prime numbers: 2, 3, 5, 7, 11, and 13, we can see that the 6th prime is 13.

//What is the 10,001st prime number?

const isPrime = (num) => {
  if (num === 2 || num === 3) return true;
  if (num < 2) return false;
  const highestToCheck = Math.ceil(Math.sqrt(num));
  for (let i = 2; i <= highestToCheck; i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}

let primesFound = 0;
let i = 0;
let currentPrime = -1;

do {
  i++;
  if (isPrime(i)) {
    primesFound++;
    console.log(`${primesFound}: ${i}`);
    currentPrime = i;
  }
} while (primesFound < 10002);

console.log(`answer: ${i}`);