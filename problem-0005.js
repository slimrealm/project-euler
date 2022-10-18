//2520 is the smallest number that can be divided by each of the numbers from 1 to 10 without any remainder.

//What is the smallest positive number that is evenly divisible by all of the numbers from 1 to 20?

let answerFound = false;
let answer = -1;
let testNum = 9;

do {
  testNum++;
  currDivideBy = 2;
  do {
    if (testNum % currDivideBy !== 0) {
      break;
    }
    if (currDivideBy === 20) {
      //console.log(`currDivideBy = ${currDivideBy}.  testNum = ${testNum}`);
      answerFound = true;
      answer = testNum;
      break;
    }
    currDivideBy++;
  } while (!answerFound)

} while (!answerFound);

console.log(answer);