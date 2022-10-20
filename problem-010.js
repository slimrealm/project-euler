//The sum of the primes below 10 is 2 + 3 + 5 + 7 = 17.

//Find the sum of all the primes below two million.

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

let highest = 1999999;
let sum = 0;

for (let i = 2; i <= highest; i++) {
  if (i % 100000 === 0) { console.log(i) }
  if (isPrime(i))
    sum += i;
}

console.log(sum);