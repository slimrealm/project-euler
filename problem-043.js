/*
The number, 1406357289, is a 0 to 9 pandigital number because it is made up of
each of the digits 0 to 9 in some order, but it also has a rather interesting
sub-string divisibility property.

Let d1 be the 1st digit, d2 be the 2nd digit, and so on. In this way, we note the following:

d2d3d4=406 is divisible by 2
d3d4d5=063 is divisible by 3
d4d5d6=635 is divisible by 5
d5d6d7=357 is divisible by 7
d6d7d8=572 is divisible by 11
d7d8d9=728 is divisible by 13
d8d9d10=289 is divisible by 17
Find the sum of all 0 to 9 pandigital numbers with this property.
*/

// Prints the array
function captureArr(a, n) {
  //console.log(a.join(''));

  if (INCLUDE_STARTING_ZERO) {
    allValidPermutationsStrings.push(a.join(''));
  } else if (a[0] !== 0) {
    allValidPermutationsStrings.push(a.join(''));
  }
}

// Generating permutation using Heap Algorithm
function heapPermutation(a, size, n) {
  // if size becomes 1 then prints the obtained
  // permutation
  if (size == 1) {
    captureArr(a, n);
  }

  for (let i = 0; i < size; i++) {
    heapPermutation(a, size - 1, n);
    // if size is odd, swap 0th i.e (first) and
    // (size-1)th i.e (last) element
    if (size % 2 == 1) {
      let temp = a[0];
      a[0] = a[size - 1];
      a[size - 1] = temp;
    }

    // If size is even, swap ith
    // and (size-1)th i.e last element
    else {
      let temp = a[i];
      a[i] = a[size - 1];
      a[size - 1] = temp;
    }
  }
}

const checkDivisibility = (str) => {
  let meetsCriteria = true;
  let subNumberToCheck = Number(str.substr(1, 3));
  if (subNumberToCheck % 2 !== 0) {
    meetsCriteria = false;
  }
  subNumberToCheck = Number(str.substr(2, 3));
  if (subNumberToCheck % 3 !== 0) {
    meetsCriteria = false;
  }
  subNumberToCheck = Number(str.substr(3, 3));
  //console.log(str); // TEMP
  //console.log(Number(str.substr(3, 3))); // TEMP
  if (subNumberToCheck % 5 !== 0) {
    meetsCriteria = false;
  }
  subNumberToCheck = Number(str.substr(4, 3));
  if (subNumberToCheck % 7 !== 0) {
    meetsCriteria = false;
  }
  subNumberToCheck = Number(str.substr(5, 3));
  if (subNumberToCheck % 11 !== 0) {
    meetsCriteria = false;
  }
  subNumberToCheck = Number(str.substr(6, 3));
  if (subNumberToCheck % 13 !== 0) {
    meetsCriteria = false;
  }
  subNumberToCheck = Number(str.substr(7, 3));
  if (subNumberToCheck % 17 !== 0) {
    meetsCriteria = false;
  }
  return meetsCriteria;
};

// Driver code
const INCLUDE_STARTING_ZERO = true;
let a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let allValidPermutationsStrings = [];
let finalStrings = [];
heapPermutation(a, a.length, a.length);
console.log(allValidPermutationsStrings);

// TODO: TRY ALGO WITH AND WITHOUT LEADING ZEROS

for (str of allValidPermutationsStrings) {
  const meetsCriteria = checkDivisibility(str);
  if (meetsCriteria) {
    finalStrings.push(str);
  }
}

console.log(finalStrings);

let finalSum = 0;
for (str of finalStrings) {
  finalSum += Number(str);
}
console.log(`Final sum: ${finalSum}`);

// isolate d2d3d4 -- check if divisible by 2
// if so, isolate d3d4d5 -- check if divisible by 3
// and so on......
// if meets all properties, push this permutation (as number) to master
// LOG MASTER TO SEE HOW MANY THERE ARE
// sum all numbers in master -- BOOM

//const allValidPermutations = convertToNumbers(allValidPermutationsStrings);
//console.log(allValidPermutations);
// const findSum = (validNumbers) => {
//   const sum = validNumbers.reduce((partialSum, a) => partialSum + a, 0);
//   return sum;
// };
