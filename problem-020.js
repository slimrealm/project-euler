

const factorial = (num) => {
  let product = 1n;
  for (let i = 1n; i <= num; i++) {
    product *= i;
  }
  return product;
}

const num = factorial(100n);
console.log(num);
const str = num.toString();
let sum = 0n;
for (let i = 0; i < str.length; i++) {
  sum += BigInt(Number(str[i]));
  console.log(`${Number(str[i])}, ${sum}`);
}
console.log(sum);