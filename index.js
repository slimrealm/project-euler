const {
  parseHandsForRound,
  syncReadFile,
  determineWin,
  checkOnePair,
  checkTwoPairs,
  checkHighCard,
  checkThreeOfAKind,
  checkFourOfAKind,
  checkStraight,
  checkFlush,
  checkStraightFlush,
  checkRoyalFlush
} = require('./problem-0054/functions_0054');

let p1_wins = 0;
let p2_wins = 0;

const allRawHands = syncReadFile('./problem-0054/p054_poker.txt');
for (let i = 0; i <= 999; i++) {
  // for (rawHand of allRawHands) {
  const round = parseHandsForRound(allRawHands[i] /*rawHand*/);
  //console.log(round);

  const winner = determineWin(round); // can be 'p1', 'p2'
  if (winner === 'p1') p1_wins++;
  if (winner === 'p2') p2_wins++;
}

console.log('p1_wins: ', p1_wins);
console.log('p2_wins: ', p2_wins);

// TESTS
console.log('\n\nTESTS');

testRound = {
  p1Cards: {
    c1: { val: 14, suit: 'C' },
    c2: { val: 10, suit: 'C' },
    c3: { val: 11, suit: 'C' },
    c4: { val: 13, suit: 'C' },
    c5: { val: 12, suit: 'C' },
  },
  p2Cards: {
    c1: { val: 14, suit: 'H' },
    c2: { val: 13, suit: 'H' },
    c3: { val: 12, suit: 'H' },
    c4: { val: 11, suit: 'H' },
    c5: { val: 10, suit: 'H' },
  },
};

const testWinner = checkRoyalFlush(testRound);
console.log(testWinner);
