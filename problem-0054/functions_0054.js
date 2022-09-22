const { readFileSync, promises: fsPromises } = require('fs');

const mapVal = (char) => {
  if (char === '2') return 2;
  if (char === '3') return 3;
  if (char === '4') return 4;
  if (char === '5') return 5;
  if (char === '6') return 6;
  if (char === '7') return 7;
  if (char === '8') return 8;
  if (char === '9') return 9;
  if (char === 'T') return 10;
  if (char === 'J') return 11;
  if (char === 'Q') return 12;
  if (char === 'K') return 13;
  if (char === 'A') return 14;
};

const syncReadFile = (filename) => {
  const contents = readFileSync(filename, 'utf-8');
  const allHands = contents.split(/\r?\n/);
  //console.log(allHands); // 👉️ ['One', 'Two', 'Three', 'Four']
  return allHands;
};

const parseHandsForRound = (unparsedHand) => {
  let round = {
    p1Cards: {
      c1: {
        val: mapVal(unparsedHand.charAt(0)),
        suit: unparsedHand.charAt(1),
      },
      c2: {
        val: mapVal(unparsedHand.charAt(3)),
        suit: unparsedHand.charAt(4),
      },
      c3: {
        val: mapVal(unparsedHand.charAt(6)),
        suit: unparsedHand.charAt(7),
      },
      c4: {
        val: mapVal(unparsedHand.charAt(9)),
        suit: unparsedHand.charAt(10),
      },
      c5: {
        val: mapVal(unparsedHand.charAt(12)),
        suit: unparsedHand.charAt(13),
      },
    },
    p2Cards: {
      c1: {
        val: mapVal(unparsedHand.charAt(15)),
        suit: unparsedHand.charAt(16),
      },
      c2: {
        val: mapVal(unparsedHand.charAt(18)),
        suit: unparsedHand.charAt(19),
      },
      c3: {
        val: mapVal(unparsedHand.charAt(21)),
        suit: unparsedHand.charAt(22),
      },
      c4: {
        val: mapVal(unparsedHand.charAt(24)),
        suit: unparsedHand.charAt(25),
      },
      c5: {
        val: mapVal(unparsedHand.charAt(27)),
        suit: unparsedHand.charAt(28),
      },
    },
  };
  return round;
};

const checkHighCard = (round) => {
  let p1_highest = 0;
  let p2_highest = 0;

  if (round.p1Cards.c1.val > p1_highest) p1_highest = round.p1Cards.c1.val;
  if (round.p1Cards.c2.val > p1_highest) p1_highest = round.p1Cards.c2.val;
  if (round.p1Cards.c3.val > p1_highest) p1_highest = round.p1Cards.c3.val;
  if (round.p1Cards.c4.val > p1_highest) p1_highest = round.p1Cards.c4.val;
  if (round.p1Cards.c5.val > p1_highest) p1_highest = round.p1Cards.c5.val;

  if (round.p2Cards.c1.val > p2_highest) p2_highest = round.p2Cards.c1.val;
  if (round.p2Cards.c2.val > p2_highest) p2_highest = round.p2Cards.c2.val;
  if (round.p2Cards.c3.val > p2_highest) p2_highest = round.p2Cards.c3.val;
  if (round.p2Cards.c4.val > p2_highest) p2_highest = round.p2Cards.c4.val;
  if (round.p2Cards.c5.val > p2_highest) p2_highest = round.p2Cards.c5.val;

  if (p1_highest > p2_highest) return 'p1';
  if (p2_highest > p1_highest) return 'p2';
  return 'next';
};

const checkOnePair = (round) => {
  let p1_pair = false;
  let p2_pair = false;
  let p1_pair_val = 0;
  let p2_pair_val = 0;

  if (round.p1Cards.c1.val == round.p1Cards.c2.val)
    p1_pair_val = round.p1Cards.c1.val;
  if (round.p1Cards.c1.val == round.p1Cards.c3.val)
    p1_pair_val = round.p1Cards.c1.val;
  if (round.p1Cards.c1.val == round.p1Cards.c4.val)
    p1_pair_val = round.p1Cards.c1.val;
  if (round.p1Cards.c1.val == round.p1Cards.c5.val)
    p1_pair_val = round.p1Cards.c1.val;
  if (round.p1Cards.c2.val == round.p1Cards.c3.val)
    p1_pair_val = round.p1Cards.c2.val;
  if (round.p1Cards.c2.val == round.p1Cards.c4.val)
    p1_pair_val = round.p1Cards.c2.val;
  if (round.p1Cards.c2.val == round.p1Cards.c5.val)
    p1_pair_val = round.p1Cards.c2.val;
  if (round.p1Cards.c3.val == round.p1Cards.c4.val)
    p1_pair_val = round.p1Cards.c3.val;
  if (round.p1Cards.c3.val == round.p1Cards.c5.val)
    p1_pair_val = round.p1Cards.c3.val;
  if (round.p1Cards.c4.val == round.p1Cards.c5.val)
    p1_pair_val = round.p1Cards.c4.val;

  if (round.p2Cards.c1.val == round.p2Cards.c2.val)
    p2_pair_val = round.p2Cards.c1.val;
  if (round.p2Cards.c1.val == round.p2Cards.c3.val)
    p2_pair_val = round.p2Cards.c1.val;
  if (round.p2Cards.c1.val == round.p2Cards.c4.val)
    p2_pair_val = round.p2Cards.c1.val;
  if (round.p2Cards.c1.val == round.p2Cards.c5.val)
    p2_pair_val = round.p2Cards.c1.val;
  if (round.p2Cards.c2.val == round.p2Cards.c3.val)
    p2_pair_val = round.p2Cards.c2.val;
  if (round.p2Cards.c2.val == round.p2Cards.c4.val)
    p2_pair_val = round.p2Cards.c2.val;
  if (round.p2Cards.c2.val == round.p2Cards.c5.val)
    p2_pair_val = round.p2Cards.c2.val;
  if (round.p2Cards.c3.val == round.p2Cards.c4.val)
    p2_pair_val = round.p2Cards.c3.val;
  if (round.p2Cards.c3.val == round.p2Cards.c5.val)
    p2_pair_val = round.p2Cards.c3.val;
  if (round.p2Cards.c4.val == round.p2Cards.c5.val)
    p2_pair_val = round.p2Cards.c4.val;

  if (p1_pair_val > p2_pair_val) return 'p1';
  if (p2_pair_val > p1_pair_val) return 'p2';

  return 'next';
};

const checkWinType = (winType, round) => {
  let winner = 'next';

  //if (winType === 'royalFlush') winner = checkRoyalFlush(round);
  //if (winType === 'straightFlush') winner = checkStraightFlush(round);
  //if (winType === 'fourOfAKind') winner = checkFourOfAKind(round);
  //if (winType === 'fullHouse') winner = checkFullHouse(round);
  //if (winType === 'flush') winner = checkFlush(round);
  //if (winType === 'straight') winner = checkStraight(round);
  //if (winType === 'threeOfAKind') winner = checkThreeOfAKind(round);
  //if (winType === 'twoPairs') winner = checkTwoPairs(round);
  if (winType === 'onePair') winner = checkOnePair(round);
  if (winType === 'highCard') winner = checkHighCard(round);

  return winner; // or 'p2' or 'next'
};

const determineWin = (round) => {
  let determinedResult = false;
  let winner = 'next';

  winner = checkWinType('royalFlush');
  if (winner === 'next') winner = checkWinType('straightFlush', round);
  if (winner === 'next') winner = checkWinType('fourOfAKind', round);
  if (winner === 'next') winner = checkWinType('fullHouse', round);
  if (winner === 'next') winner = checkWinType('flush', round);
  if (winner === 'next') winner = checkWinType('straight', round);
  if (winner === 'next') winner = checkWinType('threeOfAKind', round);
  if (winner === 'next') winner = checkWinType('twoPairs', round);
  if (winner === 'next') winner = checkWinType('onePair', round);
  if (winner === 'next') winner = checkWinType('highCard', round);
  if (winner === 'next') console.log('ERROR: NO WINNER');

  return winner;
};

exports.syncReadFile = syncReadFile;
exports.parseHandsForRound = parseHandsForRound;
exports.determineWin = determineWin;
