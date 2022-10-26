const getDivisors = (num) => {
  let divisorArray = [];
  for (let i = 1; i < num; i++) {
    if (num % i === 0) {
      divisorArray.push(i);
    }
  }
  return divisorArray
}

const sumDivisors = (divisorArray) => {
  let sum = 0;
  for (let i = 0; i < divisorArray.length; i++) {
    sum += divisorArray[i];
  }
  return sum;
}

let amicableSum = 0;

for (let i = 0; i < 10000; i++) {
  let divArr = getDivisors(i);
  let divSum = sumDivisors(divArr);

  let reverseDivArr = getDivisors(divSum);
  let reverseDivSum = sumDivisors(reverseDivArr);

  if (reverseDivSum === i && divSum !== i) {
    console.log(`${i} is amicable.  Partner is ${divSum}.`);
    amicableSum += i;
  }
}

console.log(`amicable sum = ${amicableSum}`);