const {
  parseHandsForRound,
  syncReadFile,
  determineWin,
} = require('./problem-0054/functions_0054');

const checkRoyalFlush = (parsedHand) => {
  return true;
};

let p1_wins = 0;
let p2_wins = 0;

const allRawHands = syncReadFile('./problem-0054/p054_poker.txt');
for (let i = 0; i < 18; i++) {
  // for (rawHand of allRawHands) {
  const round = parseHandsForRound(allRawHands[i] /*rawHand*/);
  //console.log(round);

  const winner = determineWin(round); // can be 'p1', 'p2'
  if (winner === 'p1') p1_wins++;
  if (winner === 'p2') p2_wins++;
}

console.log('p1_wins: ', p1_wins);
console.log('p2_wins: ', p2_wins);
