/*
By replacing the 1st digit of the 2-digit number *3, it turns out that six
of the nine possible values: 13, 23, 43, 53, 73, and 83, are all prime.

By replacing the 3rd and 4th digits of 56**3 with the same digit, this
5-digit number is the first example having seven primes among the ten
generated numbers, yielding the family: 56003, 56113, 56333, 56443, 56663,
56773, and 56993. Consequently 56003, being the first member of this family,
is the smallest prime with this property.

Find the smallest prime which, by replacing part of the number (not
necessarily adjacent digits) with the same digit, is part of an eight prime
value family.
*/

/*
ALGORITHM:
take in X-digit number
starting with 1st and only 1st digit as variable, go through all permutations,
checking primeness.  If prime, store all prime values in this family and see
if count gets to 8.  If yes, store the smallest of those primes or check against
another candidate if already found.

progress through permutations.  example with 1111:
*111, 1*11, 11*1, 111*, **11, *1*1, *11*, 1**1, 1*1*, 11**, ***1, **1*, *1**, 1***
*/

// i.e. 4-digit number
// cycle through 0-9 at each singular place, one at a time
// place 1&2, 1&3, 1&4, 2&3, 2&4, 3&4
// place 1-2-3, 1-2-4, 1-3-4, 2-3-4
// (5-digit): 1-2-3, 1-2-4, 1-2-5, 1-3-4, 1-3-5, 1-4-5,   2-3-4, 2-3-5, 2-4-5,   3-4-5
// (5-digit): 1-2-3-4, 1-2-3-5, 1-2-4-5, 1-3-4-5, 2-3-4-5

const findSmallestPrime = (PrimeValuesInFamily: number): number => {
  // passing 7 should yield 56003
  let startingValueToTest: number = 10;
  let smallestFamily: string = '';
  let smallestPrime: number = 0;

  const stringValue: string = startingValueToTest.toString();

  //start main loop
  do {
    let digitsInNumberToTest = stringValue.length;
    //console.log(`TESTING ${}-DIGIT NUMBERS.`);
  } while (smallestPrime === 0);
  //end main loop

  return 12345;
};

const isPrime = (num: number): boolean => {
  if (num < 2) {
    console.log('ERROR: number to check must be 2 or higher.');
    return false;
  }
  const highestToCheck: number = Math.ceil(Math.sqrt(num));

  for (let i: number = 2; i <= highestToCheck; i++) {
    if (num % i === 0) {
      return false;
    }
  }

  return true;
};

console.log(isPrime(7079));
