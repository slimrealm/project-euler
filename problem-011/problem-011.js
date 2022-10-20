//const { createDecipheriv } = require('crypto');
const { readFileSync, promises: fsPromises } = require('fs');

const syncReadFile = (filename) => {
  const contents = readFileSync(filename, 'utf-8');
  let allNums = contents.replace(/\r\n/g, " ").split(' ');
  //console.log(allHands); // 👉️ ['One', 'Two', 'Three', 'Four']
  return allNums;
};

const allNums = syncReadFile('./problem-011/numbers.txt');

/*
possibilities
1,2,3 after
20,40,60 after
21,42,63 after
19, 38, 57 after
*/
let maxProduct = 0;
for (let i = 0; i < allNums.length; i++) {
  if (allNums[i + 1] && allNums[i + 2] && allNums[i + 3]) {
    product = allNums[i] * allNums[i + 1] * allNums[i + 2] * allNums[i + 3];
    if (product > maxProduct) {
      maxProduct = product;
    }
  }
  if (allNums[i + 20] && allNums[i + 40] && allNums[i + 60]) {
    product = allNums[i] * allNums[i + 20] * allNums[i + 40] * allNums[i + 60];
    if (product > maxProduct) {
      maxProduct = product;
    }
  }
  if (allNums[i + 21] && allNums[i + 42] && allNums[i + 63]) {
    product = allNums[i] * allNums[i + 21] * allNums[i + 42] * allNums[i + 63];
    if (product > maxProduct) {
      maxProduct = product;
    }
  }
  if (allNums[i + 19] && allNums[i + 38] && allNums[i + 57]) {
    product = allNums[i] * allNums[i + 19] * allNums[i + 38] * allNums[i + 57];
    if (product > maxProduct) {
      maxProduct = product;
    }
  }
}
console.log(maxProduct);