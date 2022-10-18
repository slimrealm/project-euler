
let MAX = 100;

const sumOfSquares = () => {
  let sum = 0;
  for (let i = 1; i <= MAX; i++) {
    console.log(i);
    sum += i * i;
  }
  return sum;
}

const squareOfSums = () => {
  let sum = 0;
  for (i = 1; i <= MAX; i++) {
    console.log(i);
    sum += i;
  }
  let square = sum * sum;
  return square;
}

let diff = squareOfSums() - sumOfSquares();
console.log(diff);