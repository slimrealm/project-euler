let x = Math.pow(2, 1000);
bigX = BigInt(x);

console.log(x);
console.log(bigX);

strX = bigX.toString();
console.log(strX);

let sum = 0;
for (let i = 0; i < strX.length; i++) {
  let num = Number(strX[i]);
  sum += num;
}

console.log(sum);