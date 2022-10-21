
let pyramid = [
  [1],
  [1, 2, 2, 1]
];

for (let j = 3; j <= 20; j++) {
  let leftRow = [];
  leftRow.push(1); // index 1
  leftRow.push(j); // index 2
  let index = 2;
  while (index !== j - 1) {
    // t3 = t2 + above t3
    let term = leftRow[index - 1] + pyramid[j - 2][index];
    leftRow.push(term);
    index++;
  }
  if (index === j - 1) {
    leftRow.push(leftRow[index - 1] * 2);
  }

  console.log(leftRow.length);
  let rightRow = [];
  for (let k = leftRow.length - 1; k >= 0; k--) {
    rightRow.push(leftRow[k]);
  }

  fullRow = leftRow.concat(rightRow);
  pyramid.push(fullRow);
}

for (let i = 0; i < pyramid.length; i++) {
  console.log(pyramid[i]);
  console.log('');
}

let finalSum = 0;
for (let l = 0; l < pyramid[19].length; l++) {
  finalSum += pyramid[19][l];
  console.log(finalSum);
}

console.log('');
console.log(finalSum);

