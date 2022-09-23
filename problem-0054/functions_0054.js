const { createDecipheriv } = require('crypto');
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

  let p1x1;
  let p1x2;
  let p1x3;
  let p2x1;
  let p2x2;
  let p2x3;

  if (round.p1Cards.c1.val === round.p1Cards.c2.val) {
    p1_pair_val = round.p1Cards.c1.val;
    p1_pair = true;
    p1x1 = round.p1Cards.c3;
    p1x2 = round.p1Cards.c4;
    p1x3 = round.p1Cards.c5;
  }
  if (round.p1Cards.c1.val === round.p1Cards.c3.val) {
    p1_pair_val = round.p1Cards.c1.val;
    p1_pair = true;
    p1x1 = round.p1Cards.c2;
    p1x2 = round.p1Cards.c4;
    p1x3 = round.p1Cards.c5;
  }
  if (round.p1Cards.c1.val === round.p1Cards.c4.val) {
    p1_pair_val = round.p1Cards.c1.val;
    p1_pair = true;
    p1x1 = round.p1Cards.c2;
    p1x2 = round.p1Cards.c3;
    p1x3 = round.p1Cards.c5;
  }
  if (round.p1Cards.c1.val === round.p1Cards.c5.val) {
    p1_pair_val = round.p1Cards.c1.val;
    p1_pair = true;
    p1x1 = round.p1Cards.c2;
    p1x2 = round.p1Cards.c3;
    p1x3 = round.p1Cards.c4;
  }
  if (round.p1Cards.c2.val === round.p1Cards.c3.val) {
    p1_pair_val = round.p1Cards.c2.val;
    p1_pair = true;
    p1x1 = round.p1Cards.c1;
    p1x2 = round.p1Cards.c4;
    p1x3 = round.p1Cards.c5;
  }
  if (round.p1Cards.c2.val === round.p1Cards.c4.val) {
    p1_pair_val = round.p1Cards.c2.val;
    p1_pair = true;
    p1x1 = round.p1Cards.c1;
    p1x2 = round.p1Cards.c3;
    p1x3 = round.p1Cards.c5;
  }
  if (round.p1Cards.c2.val === round.p1Cards.c5.val) {
    p1_pair_val = round.p1Cards.c2.val;
    p1_pair = true;
    p1x1 = round.p1Cards.c1;
    p1x2 = round.p1Cards.c3;
    p1x3 = round.p1Cards.c4;
  }
  if (round.p1Cards.c3.val === round.p1Cards.c4.val) {
    p1_pair_val = round.p1Cards.c3.val;
    p1_pair = true;
    p1x1 = round.p1Cards.c1;
    p1x2 = round.p1Cards.c2;
    p1x3 = round.p1Cards.c5;
  }
  if (round.p1Cards.c3.val === round.p1Cards.c5.val) {
    p1_pair_val = round.p1Cards.c3.val;
    p1_pair = true;
    p1x1 = round.p1Cards.c1;
    p1x2 = round.p1Cards.c2;
    p1x3 = round.p1Cards.c4;
  }
  if (round.p1Cards.c4.val === round.p1Cards.c5.val) {
    p1_pair_val = round.p1Cards.c4.val;
    p1_pair = true;
    p1x1 = round.p1Cards.c1;
    p1x2 = round.p1Cards.c2;
    p1x3 = round.p1Cards.c3;
  }

  if (round.p2Cards.c1.val === round.p2Cards.c2.val) {
    p2_pair_val = round.p2Cards.c1.val;
    p2_pair = true;
    p2x1 = round.p2Cards.c3;
    p2x2 = round.p2Cards.c4;
    p2x3 = round.p2Cards.c5;
  }
  if (round.p2Cards.c1.val === round.p2Cards.c3.val) {
    p2_pair_val = round.p2Cards.c1.val;
    p2_pair = true;
    p2x1 = round.p2Cards.c2;
    p2x2 = round.p2Cards.c4;
    p2x3 = round.p2Cards.c5;
  }
  if (round.p2Cards.c1.val === round.p2Cards.c4.val) {
    p2_pair_val = round.p2Cards.c1.val;
    p2_pair = true;
    p2x1 = round.p2Cards.c2;
    p2x2 = round.p2Cards.c3;
    p2x3 = round.p2Cards.c5;
  }
  if (round.p2Cards.c1.val === round.p2Cards.c5.val) {
    p2_pair_val = round.p2Cards.c1.val;
    p2_pair = true;
    p2x1 = round.p2Cards.c2;
    p2x2 = round.p2Cards.c3;
    p2x3 = round.p2Cards.c4;
  }
  if (round.p2Cards.c2.val === round.p2Cards.c3.val) {
    p2_pair_val = round.p2Cards.c2.val;
    p2_pair = true;
    p2x1 = round.p2Cards.c1;
    p2x2 = round.p2Cards.c4;
    p2x3 = round.p2Cards.c5;
  }
  if (round.p2Cards.c2.val === round.p2Cards.c4.val) {
    p2_pair_val = round.p2Cards.c2.val;
    p2_pair = true;
    p2x1 = round.p2Cards.c1;
    p2x2 = round.p2Cards.c3;
    p2x3 = round.p2Cards.c5;
  }
  if (round.p2Cards.c2.val === round.p2Cards.c5.val) {
    p2_pair_val = round.p2Cards.c2.val;
    p2_pair = true;
    p2x1 = round.p2Cards.c1;
    p2x2 = round.p2Cards.c3;
    p2x3 = round.p2Cards.c4;
  }
  if (round.p2Cards.c3.val === round.p2Cards.c4.val) {
    p2_pair_val = round.p2Cards.c3.val;
    p2_pair = true;
    p2x1 = round.p2Cards.c1;
    p2x2 = round.p2Cards.c2;
    p2x3 = round.p2Cards.c5;
  }
  if (round.p2Cards.c3.val === round.p2Cards.c5.val) {
    p2_pair_val = round.p2Cards.c3.val;
    p2_pair = true;
    p2x1 = round.p2Cards.c1;
    p2x2 = round.p2Cards.c2;
    p2x3 = round.p2Cards.c4;
  }
  if (round.p2Cards.c4.val === round.p2Cards.c5.val) {
    p2_pair_val = round.p2Cards.c4.val;
    p2_pair = true;
    p2x1 = round.p2Cards.c1;
    p2x2 = round.p2Cards.c2;
    p2x3 = round.p2Cards.c3;
  }

  if (p1_pair || p2_pair) {
    if (p1_pair_val > p2_pair_val) return 'p1';
    if (p2_pair_val > p1_pair_val) return 'p2';
    if (p1_pair_val === p2_pair_val) {
      let p1xCards = [p1x1.val, p1x2.val, p1x3.val];
      p1xCards.sort((a, b) => {
        return a - b;
      });
      console.log(p1xCards);
      let p2xCards = [p2x1.val, p2x2.val, p2x3.val];
      p2xCards.sort((a, b) => {
        return a - b;
      });
      console.log(p2xCards);
      if (p1xCards[2] > p2xCards[2]) return 'p1';
      if (p2xCards[2] > p1xCards[2]) return 'p2';
      if (p1xCards[1] > p2xCards[1]) return 'p1';
      if (p2xCards[1] > p1xCards[1]) return 'p2';
      if (p1xCards[0] > p2xCards[0]) return 'p1';
      if (p2xCards[0] > p1xCards[0]) return 'p2';
    }
  }

  return 'next';
};

const checkTwoPairs = (round) => {
  let p1_pair = 0;
  let p2_pair = 0;
  let p1_pair_high = 0; // should remove
  let p2_pair_high = 0; // should remove
  let p1_kicker;
  let p2_kicker;

  let p1_pair_found_1; // i.e. {c1, c2} <-- Ace
  let p1_pair_found_2; // i.e. {c1, c2} <-- Ace
  let p1_pair_found_3; // i.e. {c1, c2} <-- Ace
  let p1_pair_found_4; // i.e. {c1, c2} <-- Ace
  let p2_pair_found_1; // i.e. {c1, c2} <-- Ace
  let p2_pair_found_2; // i.e. {c1, c2} <-- Ace
  let p2_pair_found_3; // i.e. {c1, c2} <-- Ace
  let p2_pair_found_4; // i.e. {c1, c2} <-- Ace

  if (round.p1Cards.c1.val === round.p1Cards.c2.val) {
    p1_pair++;
    if (round.p1Cards.c1.val > p1_pair_high) {
      p1_pair_high = round.p1Cards.c1.val;
    }
    if (!p1_pair_found_1 && !p1_pair_found_2) {
      p1_pair_found_1 = round.p1Cards.c1;
      p1_pair_found_2 = round.p1Cards.c2;
    } else {
      p1_pair_found_3 = round.p1Cards.c1;
      p1_pair_found_4 = round.p1Cards.c2;
    }
    if (p1_pair_found_4) {
      let kickerMaybe = round.p1Cards.c3;
      if (
        kickerMaybe !== p1_pair_found_1 &&
        kickerMaybe !== p1_pair_found_2 &&
        kickerMaybe !== p1_pair_found_3 &&
        kickerMaybe !== p1_pair_found_4
      ) {
        p1_kicker = kickerMaybe;
      }
      kickerMaybe = round.p1Cards.c4;
      if (
        kickerMaybe !== p1_pair_found_1 &&
        kickerMaybe !== p1_pair_found_2 &&
        kickerMaybe !== p1_pair_found_3 &&
        kickerMaybe !== p1_pair_found_4
      ) {
        p1_kicker = kickerMaybe;
      }
      kickerMaybe = round.p1Cards.c5;
      if (
        kickerMaybe !== p1_pair_found_1 &&
        kickerMaybe !== p1_pair_found_2 &&
        kickerMaybe !== p1_pair_found_3 &&
        kickerMaybe !== p1_pair_found_4
      ) {
        p1_kicker = kickerMaybe;
      }
    }
  }
  if (round.p1Cards.c1.val === round.p1Cards.c3.val) {
    p1_pair++;
    if (round.p1Cards.c1.val > p1_pair_high) {
      p1_pair_high = round.p1Cards.c1.val;
    }
    if (!p1_pair_found_1 && !p1_pair_found_2) {
      p1_pair_found_1 = round.p1Cards.c1;
      p1_pair_found_2 = round.p1Cards.c3;
    } else {
      p1_pair_found_3 = round.p1Cards.c1;
      p1_pair_found_4 = round.p1Cards.c3;
    }
    if (p1_pair_found_4) {
      let kickerMaybe = round.p1Cards.c2;
      if (
        kickerMaybe !== p1_pair_found_1 &&
        kickerMaybe !== p1_pair_found_2 &&
        kickerMaybe !== p1_pair_found_3 &&
        kickerMaybe !== p1_pair_found_4
      ) {
        p1_kicker = kickerMaybe;
      }
      kickerMaybe = round.p1Cards.c4;
      if (
        kickerMaybe !== p1_pair_found_1 &&
        kickerMaybe !== p1_pair_found_2 &&
        kickerMaybe !== p1_pair_found_3 &&
        kickerMaybe !== p1_pair_found_4
      ) {
        p1_kicker = kickerMaybe;
      }
      kickerMaybe = round.p1Cards.c5;
      if (
        kickerMaybe !== p1_pair_found_1 &&
        kickerMaybe !== p1_pair_found_2 &&
        kickerMaybe !== p1_pair_found_3 &&
        kickerMaybe !== p1_pair_found_4
      ) {
        p1_kicker = kickerMaybe;
      }
    }
  }
  if (round.p1Cards.c1.val === round.p1Cards.c4.val) {
    p1_pair++;
    if (round.p1Cards.c1.val > p1_pair_high) {
      p1_pair_high = round.p1Cards.c1.val;
    }
    if (!p1_pair_found_1 && !p1_pair_found_2) {
      p1_pair_found_1 = round.p1Cards.c1;
      p1_pair_found_2 = round.p1Cards.c4;
    } else {
      p1_pair_found_3 = round.p1Cards.c1;
      p1_pair_found_4 = round.p1Cards.c4;
    }
    if (p1_pair_found_4) {
      let kickerMaybe = round.p1Cards.c2;
      if (
        kickerMaybe !== p1_pair_found_1 &&
        kickerMaybe !== p1_pair_found_2 &&
        kickerMaybe !== p1_pair_found_3 &&
        kickerMaybe !== p1_pair_found_4
      ) {
        p1_kicker = kickerMaybe;
      }
      kickerMaybe = round.p1Cards.c3;
      if (
        kickerMaybe !== p1_pair_found_1 &&
        kickerMaybe !== p1_pair_found_2 &&
        kickerMaybe !== p1_pair_found_3 &&
        kickerMaybe !== p1_pair_found_4
      ) {
        p1_kicker = kickerMaybe;
      }
      kickerMaybe = round.p1Cards.c5;
      if (
        kickerMaybe !== p1_pair_found_1 &&
        kickerMaybe !== p1_pair_found_2 &&
        kickerMaybe !== p1_pair_found_3 &&
        kickerMaybe !== p1_pair_found_4
      ) {
        p1_kicker = kickerMaybe;
      }
    }
  }
  if (round.p1Cards.c1.val === round.p1Cards.c5.val) {
    p1_pair++;
    if (round.p1Cards.c1.val > p1_pair_high) {
      p1_pair_high = round.p1Cards.c1.val;
    }
    if (!p1_pair_found_1 && !p1_pair_found_2) {
      p1_pair_found_1 = round.p1Cards.c1;
      p1_pair_found_2 = round.p1Cards.c5;
    } else {
      p1_pair_found_3 = round.p1Cards.c1;
      p1_pair_found_4 = round.p1Cards.c5;
    }
    if (p1_pair_found_4) {
      let kickerMaybe = round.p1Cards.c2;
      if (
        kickerMaybe !== p1_pair_found_1 &&
        kickerMaybe !== p1_pair_found_2 &&
        kickerMaybe !== p1_pair_found_3 &&
        kickerMaybe !== p1_pair_found_4
      ) {
        p1_kicker = kickerMaybe;
      }
      kickerMaybe = round.p1Cards.c3;
      if (
        kickerMaybe !== p1_pair_found_1 &&
        kickerMaybe !== p1_pair_found_2 &&
        kickerMaybe !== p1_pair_found_3 &&
        kickerMaybe !== p1_pair_found_4
      ) {
        p1_kicker = kickerMaybe;
      }
      kickerMaybe = round.p1Cards.c4;
      if (
        kickerMaybe !== p1_pair_found_1 &&
        kickerMaybe !== p1_pair_found_2 &&
        kickerMaybe !== p1_pair_found_3 &&
        kickerMaybe !== p1_pair_found_4
      ) {
        p1_kicker = kickerMaybe;
      }
    }
  }
  if (round.p1Cards.c2.val === round.p1Cards.c3.val) {
    p1_pair++;
    if (round.p1Cards.c2.val > p1_pair_high) {
      p1_pair_high = round.p1Cards.c2.val;
    }
    if (!p1_pair_found_1 && !p1_pair_found_2) {
      p1_pair_found_1 = round.p1Cards.c2;
      p1_pair_found_2 = round.p1Cards.c3;
    } else {
      p1_pair_found_3 = round.p1Cards.c2;
      p1_pair_found_4 = round.p1Cards.c3;
    }
    if (p1_pair_found_4) {
      let kickerMaybe = round.p1Cards.c1;
      if (
        kickerMaybe !== p1_pair_found_1 &&
        kickerMaybe !== p1_pair_found_2 &&
        kickerMaybe !== p1_pair_found_3 &&
        kickerMaybe !== p1_pair_found_4
      ) {
        p1_kicker = kickerMaybe;
      }
      kickerMaybe = round.p1Cards.c4;
      if (
        kickerMaybe !== p1_pair_found_1 &&
        kickerMaybe !== p1_pair_found_2 &&
        kickerMaybe !== p1_pair_found_3 &&
        kickerMaybe !== p1_pair_found_4
      ) {
        p1_kicker = kickerMaybe;
      }
      kickerMaybe = round.p1Cards.c5;
      if (
        kickerMaybe !== p1_pair_found_1 &&
        kickerMaybe !== p1_pair_found_2 &&
        kickerMaybe !== p1_pair_found_3 &&
        kickerMaybe !== p1_pair_found_4
      ) {
        p1_kicker = kickerMaybe;
      }
    }
  }
  if (round.p1Cards.c2.val === round.p1Cards.c4.val) {
    p1_pair++;
    if (round.p1Cards.c2.val > p1_pair_high) {
      p1_pair_high = round.p1Cards.c2.val;
    }
    if (!p1_pair_found_1 && !p1_pair_found_2) {
      p1_pair_found_1 = round.p1Cards.c2;
      p1_pair_found_2 = round.p1Cards.c4;
    } else {
      p1_pair_found_3 = round.p1Cards.c2;
      p1_pair_found_4 = round.p1Cards.c4;
    }
    if (p1_pair_found_4) {
      let kickerMaybe = round.p1Cards.c1;
      if (
        kickerMaybe !== p1_pair_found_1 &&
        kickerMaybe !== p1_pair_found_2 &&
        kickerMaybe !== p1_pair_found_3 &&
        kickerMaybe !== p1_pair_found_4
      ) {
        p1_kicker = kickerMaybe;
      }
      kickerMaybe = round.p1Cards.c3;
      if (
        kickerMaybe !== p1_pair_found_1 &&
        kickerMaybe !== p1_pair_found_2 &&
        kickerMaybe !== p1_pair_found_3 &&
        kickerMaybe !== p1_pair_found_4
      ) {
        p1_kicker = kickerMaybe;
      }
      kickerMaybe = round.p1Cards.c5;
      if (
        kickerMaybe !== p1_pair_found_1 &&
        kickerMaybe !== p1_pair_found_2 &&
        kickerMaybe !== p1_pair_found_3 &&
        kickerMaybe !== p1_pair_found_4
      ) {
        p1_kicker = kickerMaybe;
      }
    }
  }
  if (round.p1Cards.c2.val === round.p1Cards.c5.val) {
    p1_pair++;
    if (round.p1Cards.c2.val > p1_pair_high) {
      p1_pair_high = round.p1Cards.c2.val;
    }
    if (!p1_pair_found_1 && !p1_pair_found_2) {
      p1_pair_found_1 = round.p1Cards.c2;
      p1_pair_found_2 = round.p1Cards.c5;
    } else {
      p1_pair_found_3 = round.p1Cards.c2;
      p1_pair_found_4 = round.p1Cards.c5;
    }
    if (p1_pair_found_4) {
      let kickerMaybe = round.p1Cards.c1;
      if (
        kickerMaybe !== p1_pair_found_1 &&
        kickerMaybe !== p1_pair_found_2 &&
        kickerMaybe !== p1_pair_found_3 &&
        kickerMaybe !== p1_pair_found_4
      ) {
        p1_kicker = kickerMaybe;
      }
      kickerMaybe = round.p1Cards.c3;
      if (
        kickerMaybe !== p1_pair_found_1 &&
        kickerMaybe !== p1_pair_found_2 &&
        kickerMaybe !== p1_pair_found_3 &&
        kickerMaybe !== p1_pair_found_4
      ) {
        p1_kicker = kickerMaybe;
      }
      kickerMaybe = round.p1Cards.c4;
      if (
        kickerMaybe !== p1_pair_found_1 &&
        kickerMaybe !== p1_pair_found_2 &&
        kickerMaybe !== p1_pair_found_3 &&
        kickerMaybe !== p1_pair_found_4
      ) {
        p1_kicker = kickerMaybe;
      }
    }
  }
  if (round.p1Cards.c3.val === round.p1Cards.c4.val) {
    p1_pair++;
    if (round.p1Cards.c3.val > p1_pair_high) {
      p1_pair_high = round.p1Cards.c3.val;
    }
    if (!p1_pair_found_1 && !p1_pair_found_2) {
      p1_pair_found_1 = round.p1Cards.c3;
      p1_pair_found_2 = round.p1Cards.c4;
    } else {
      p1_pair_found_3 = round.p1Cards.c3;
      p1_pair_found_4 = round.p1Cards.c4;
    }
    if (p1_pair_found_4) {
      let kickerMaybe = round.p1Cards.c1;
      if (
        kickerMaybe !== p1_pair_found_1 &&
        kickerMaybe !== p1_pair_found_2 &&
        kickerMaybe !== p1_pair_found_3 &&
        kickerMaybe !== p1_pair_found_4
      ) {
        p1_kicker = kickerMaybe;
      }
      kickerMaybe = round.p1Cards.c2;
      if (
        kickerMaybe !== p1_pair_found_1 &&
        kickerMaybe !== p1_pair_found_2 &&
        kickerMaybe !== p1_pair_found_3 &&
        kickerMaybe !== p1_pair_found_4
      ) {
        p1_kicker = kickerMaybe;
      }
      kickerMaybe = round.p1Cards.c5;
      if (
        kickerMaybe !== p1_pair_found_1 &&
        kickerMaybe !== p1_pair_found_2 &&
        kickerMaybe !== p1_pair_found_3 &&
        kickerMaybe !== p1_pair_found_4
      ) {
        p1_kicker = kickerMaybe;
      }
    }
  }
  if (round.p1Cards.c3.val === round.p1Cards.c5.val) {
    p1_pair++;
    if (round.p1Cards.c3.val > p1_pair_high) {
      p1_pair_high = round.p1Cards.c3.val;
    }
    if (!p1_pair_found_1 && !p1_pair_found_2) {
      p1_pair_found_1 = round.p1Cards.c3;
      p1_pair_found_2 = round.p1Cards.c5;
    } else {
      p1_pair_found_3 = round.p1Cards.c3;
      p1_pair_found_4 = round.p1Cards.c5;
    }
    if (p1_pair_found_4) {
      let kickerMaybe = round.p1Cards.c1;
      if (
        kickerMaybe !== p1_pair_found_1 &&
        kickerMaybe !== p1_pair_found_2 &&
        kickerMaybe !== p1_pair_found_3 &&
        kickerMaybe !== p1_pair_found_4
      ) {
        p1_kicker = kickerMaybe;
      }
      kickerMaybe = round.p1Cards.c2;
      if (
        kickerMaybe !== p1_pair_found_1 &&
        kickerMaybe !== p1_pair_found_2 &&
        kickerMaybe !== p1_pair_found_3 &&
        kickerMaybe !== p1_pair_found_4
      ) {
        p1_kicker = kickerMaybe;
      }
      kickerMaybe = round.p1Cards.c4;
      if (
        kickerMaybe !== p1_pair_found_1 &&
        kickerMaybe !== p1_pair_found_2 &&
        kickerMaybe !== p1_pair_found_3 &&
        kickerMaybe !== p1_pair_found_4
      ) {
        p1_kicker = kickerMaybe;
      }
    }
  }
  if (round.p1Cards.c4.val === round.p1Cards.c5.val) {
    p1_pair++;
    if (round.p1Cards.c4.val > p1_pair_high) {
      p1_pair_high = round.p1Cards.c4.val;
    }
    if (!p1_pair_found_1 && !p1_pair_found_2) {
      p1_pair_found_1 = round.p1Cards.c4;
      p1_pair_found_2 = round.p1Cards.c5;
    } else {
      p1_pair_found_3 = round.p1Cards.c4;
      p1_pair_found_4 = round.p1Cards.c5;
    }
    if (p1_pair_found_4) {
      let kickerMaybe = round.p1Cards.c1;
      if (
        kickerMaybe !== p1_pair_found_1 &&
        kickerMaybe !== p1_pair_found_2 &&
        kickerMaybe !== p1_pair_found_3 &&
        kickerMaybe !== p1_pair_found_4
      ) {
        p1_kicker = kickerMaybe;
      }
      kickerMaybe = round.p1Cards.c2;
      if (
        kickerMaybe !== p1_pair_found_1 &&
        kickerMaybe !== p1_pair_found_2 &&
        kickerMaybe !== p1_pair_found_3 &&
        kickerMaybe !== p1_pair_found_4
      ) {
        p1_kicker = kickerMaybe;
      }
      kickerMaybe = round.p1Cards.c3;
      if (
        kickerMaybe !== p1_pair_found_1 &&
        kickerMaybe !== p1_pair_found_2 &&
        kickerMaybe !== p1_pair_found_3 &&
        kickerMaybe !== p1_pair_found_4
      ) {
        p1_kicker = kickerMaybe;
      }
    }
  }

  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  if (round.p2Cards.c1.val === round.p2Cards.c2.val) {
    p2_pair++;
    if (round.p2Cards.c1.val > p2_pair_high) {
      p2_pair_high = round.p2Cards.c1.val;
    }
    if (!p2_pair_found_1 && !p2_pair_found_2) {
      p2_pair_found_1 = round.p2Cards.c1;
      p2_pair_found_2 = round.p2Cards.c2;
    } else {
      p2_pair_found_3 = round.p2Cards.c1;
      p2_pair_found_4 = round.p2Cards.c2;
    }
    if (p2_pair_found_4) {
      let kickerMaybe = round.p2Cards.c3;
      if (
        kickerMaybe !== p2_pair_found_1 &&
        kickerMaybe !== p2_pair_found_2 &&
        kickerMaybe !== p2_pair_found_3 &&
        kickerMaybe !== p2_pair_found_4
      ) {
        p2_kicker = kickerMaybe;
      }
      kickerMaybe = round.p2Cards.c4;
      if (
        kickerMaybe !== p2_pair_found_1 &&
        kickerMaybe !== p2_pair_found_2 &&
        kickerMaybe !== p2_pair_found_3 &&
        kickerMaybe !== p2_pair_found_4
      ) {
        p2_kicker = kickerMaybe;
      }
      kickerMaybe = round.p2Cards.c5;
      if (
        kickerMaybe !== p2_pair_found_1 &&
        kickerMaybe !== p2_pair_found_2 &&
        kickerMaybe !== p2_pair_found_3 &&
        kickerMaybe !== p2_pair_found_4
      ) {
        p2_kicker = kickerMaybe;
      }
    }
  }
  if (round.p2Cards.c1.val === round.p2Cards.c3.val) {
    p2_pair++;
    if (round.p2Cards.c1.val > p2_pair_high) {
      p2_pair_high = round.p2Cards.c1.val;
    }
    if (!p2_pair_found_1 && !p2_pair_found_2) {
      p2_pair_found_1 = round.p2Cards.c1;
      p2_pair_found_2 = round.p2Cards.c3;
    } else {
      p2_pair_found_3 = round.p2Cards.c1;
      p2_pair_found_4 = round.p2Cards.c3;
    }
    if (p2_pair_found_4) {
      let kickerMaybe = round.p2Cards.c2;
      if (
        kickerMaybe !== p2_pair_found_1 &&
        kickerMaybe !== p2_pair_found_2 &&
        kickerMaybe !== p2_pair_found_3 &&
        kickerMaybe !== p2_pair_found_4
      ) {
        p2_kicker = kickerMaybe;
      }
      kickerMaybe = round.p2Cards.c4;
      if (
        kickerMaybe !== p2_pair_found_1 &&
        kickerMaybe !== p2_pair_found_2 &&
        kickerMaybe !== p2_pair_found_3 &&
        kickerMaybe !== p2_pair_found_4
      ) {
        p2_kicker = kickerMaybe;
      }
      kickerMaybe = round.p2Cards.c5;
      if (
        kickerMaybe !== p2_pair_found_1 &&
        kickerMaybe !== p2_pair_found_2 &&
        kickerMaybe !== p2_pair_found_3 &&
        kickerMaybe !== p2_pair_found_4
      ) {
        p2_kicker = kickerMaybe;
      }
    }
  }
  if (round.p2Cards.c1.val === round.p2Cards.c4.val) {
    p2_pair++;
    if (round.p2Cards.c1.val > p2_pair_high) {
      p2_pair_high = round.p2Cards.c1.val;
    }
    if (!p2_pair_found_1 && !p2_pair_found_2) {
      p2_pair_found_1 = round.p2Cards.c1;
      p2_pair_found_2 = round.p2Cards.c4;
    } else {
      p2_pair_found_3 = round.p2Cards.c1;
      p2_pair_found_4 = round.p2Cards.c4;
    }
    if (p2_pair_found_4) {
      let kickerMaybe = round.p2Cards.c2;
      if (
        kickerMaybe !== p2_pair_found_1 &&
        kickerMaybe !== p2_pair_found_2 &&
        kickerMaybe !== p2_pair_found_3 &&
        kickerMaybe !== p2_pair_found_4
      ) {
        p2_kicker = kickerMaybe;
      }
      kickerMaybe = round.p2Cards.c3;
      if (
        kickerMaybe !== p2_pair_found_1 &&
        kickerMaybe !== p2_pair_found_2 &&
        kickerMaybe !== p2_pair_found_3 &&
        kickerMaybe !== p2_pair_found_4
      ) {
        p2_kicker = kickerMaybe;
      }
      kickerMaybe = round.p2Cards.c5;
      if (
        kickerMaybe !== p2_pair_found_1 &&
        kickerMaybe !== p2_pair_found_2 &&
        kickerMaybe !== p2_pair_found_3 &&
        kickerMaybe !== p2_pair_found_4
      ) {
        p2_kicker = kickerMaybe;
      }
    }
  }
  if (round.p2Cards.c1.val === round.p2Cards.c5.val) {
    p2_pair++;
    if (round.p2Cards.c1.val > p2_pair_high) {
      p2_pair_high = round.p2Cards.c1.val;
    }
    if (!p2_pair_found_1 && !p2_pair_found_2) {
      p2_pair_found_1 = round.p2Cards.c1;
      p2_pair_found_2 = round.p2Cards.c5;
    } else {
      p2_pair_found_3 = round.p2Cards.c1;
      p2_pair_found_4 = round.p2Cards.c5;
    }
    if (p2_pair_found_4) {
      let kickerMaybe = round.p2Cards.c2;
      if (
        kickerMaybe !== p2_pair_found_1 &&
        kickerMaybe !== p2_pair_found_2 &&
        kickerMaybe !== p2_pair_found_3 &&
        kickerMaybe !== p2_pair_found_4
      ) {
        p2_kicker = kickerMaybe;
      }
      kickerMaybe = round.p2Cards.c3;
      if (
        kickerMaybe !== p2_pair_found_1 &&
        kickerMaybe !== p2_pair_found_2 &&
        kickerMaybe !== p2_pair_found_3 &&
        kickerMaybe !== p2_pair_found_4
      ) {
        p2_kicker = kickerMaybe;
      }
      kickerMaybe = round.p2Cards.c4;
      if (
        kickerMaybe !== p2_pair_found_1 &&
        kickerMaybe !== p2_pair_found_2 &&
        kickerMaybe !== p2_pair_found_3 &&
        kickerMaybe !== p2_pair_found_4
      ) {
        p2_kicker = kickerMaybe;
      }
    }
  }
  if (round.p2Cards.c2.val === round.p2Cards.c3.val) {
    p2_pair++;
    if (round.p2Cards.c2.val > p2_pair_high) {
      p2_pair_high = round.p2Cards.c2.val;
    }
    if (!p2_pair_found_1 && !p2_pair_found_2) {
      p2_pair_found_1 = round.p2Cards.c2;
      p2_pair_found_2 = round.p2Cards.c3;
    } else {
      p2_pair_found_3 = round.p2Cards.c2;
      p2_pair_found_4 = round.p2Cards.c3;
    }
    if (p2_pair_found_4) {
      let kickerMaybe = round.p2Cards.c1;
      if (
        kickerMaybe !== p2_pair_found_1 &&
        kickerMaybe !== p2_pair_found_2 &&
        kickerMaybe !== p2_pair_found_3 &&
        kickerMaybe !== p2_pair_found_4
      ) {
        p2_kicker = kickerMaybe;
      }
      kickerMaybe = round.p2Cards.c4;
      if (
        kickerMaybe !== p2_pair_found_1 &&
        kickerMaybe !== p2_pair_found_2 &&
        kickerMaybe !== p2_pair_found_3 &&
        kickerMaybe !== p2_pair_found_4
      ) {
        p2_kicker = kickerMaybe;
      }
      kickerMaybe = round.p2Cards.c5;
      if (
        kickerMaybe !== p2_pair_found_1 &&
        kickerMaybe !== p2_pair_found_2 &&
        kickerMaybe !== p2_pair_found_3 &&
        kickerMaybe !== p2_pair_found_4
      ) {
        p2_kicker = kickerMaybe;
      }
    }
  }
  if (round.p2Cards.c2.val === round.p2Cards.c4.val) {
    p2_pair++;
    if (round.p2Cards.c2.val > p2_pair_high) {
      p2_pair_high = round.p2Cards.c2.val;
    }
    if (!p2_pair_found_1 && !p2_pair_found_2) {
      p2_pair_found_1 = round.p2Cards.c2;
      p2_pair_found_2 = round.p2Cards.c4;
    } else {
      p2_pair_found_3 = round.p2Cards.c2;
      p2_pair_found_4 = round.p2Cards.c4;
    }
    if (p2_pair_found_4) {
      let kickerMaybe = round.p2Cards.c1;
      if (
        kickerMaybe !== p2_pair_found_1 &&
        kickerMaybe !== p2_pair_found_2 &&
        kickerMaybe !== p2_pair_found_3 &&
        kickerMaybe !== p2_pair_found_4
      ) {
        p2_kicker = kickerMaybe;
      }
      kickerMaybe = round.p2Cards.c3;
      if (
        kickerMaybe !== p2_pair_found_1 &&
        kickerMaybe !== p2_pair_found_2 &&
        kickerMaybe !== p2_pair_found_3 &&
        kickerMaybe !== p2_pair_found_4
      ) {
        p2_kicker = kickerMaybe;
      }
      kickerMaybe = round.p2Cards.c5;
      if (
        kickerMaybe !== p2_pair_found_1 &&
        kickerMaybe !== p2_pair_found_2 &&
        kickerMaybe !== p2_pair_found_3 &&
        kickerMaybe !== p2_pair_found_4
      ) {
        p2_kicker = kickerMaybe;
      }
    }
  }
  if (round.p2Cards.c2.val === round.p2Cards.c5.val) {
    p2_pair++;
    if (round.p2Cards.c2.val > p2_pair_high) {
      p2_pair_high = round.p2Cards.c2.val;
    }
    if (!p2_pair_found_1 && !p2_pair_found_2) {
      p2_pair_found_1 = round.p2Cards.c2;
      p2_pair_found_2 = round.p2Cards.c5;
    } else {
      p2_pair_found_3 = round.p2Cards.c2;
      p2_pair_found_4 = round.p2Cards.c5;
    }
    if (p2_pair_found_4) {
      let kickerMaybe = round.p2Cards.c1;
      if (
        kickerMaybe !== p2_pair_found_1 &&
        kickerMaybe !== p2_pair_found_2 &&
        kickerMaybe !== p2_pair_found_3 &&
        kickerMaybe !== p2_pair_found_4
      ) {
        p2_kicker = kickerMaybe;
      }
      kickerMaybe = round.p2Cards.c3;
      if (
        kickerMaybe !== p2_pair_found_1 &&
        kickerMaybe !== p2_pair_found_2 &&
        kickerMaybe !== p2_pair_found_3 &&
        kickerMaybe !== p2_pair_found_4
      ) {
        p2_kicker = kickerMaybe;
      }
      kickerMaybe = round.p2Cards.c4;
      if (
        kickerMaybe !== p2_pair_found_1 &&
        kickerMaybe !== p2_pair_found_2 &&
        kickerMaybe !== p2_pair_found_3 &&
        kickerMaybe !== p2_pair_found_4
      ) {
        p2_kicker = kickerMaybe;
      }
    }
  }
  if (round.p2Cards.c3.val === round.p2Cards.c4.val) {
    p2_pair++;
    if (round.p2Cards.c3.val > p2_pair_high) {
      p2_pair_high = round.p2Cards.c3.val;
    }
    if (!p2_pair_found_1 && !p2_pair_found_2) {
      p2_pair_found_1 = round.p2Cards.c3;
      p2_pair_found_2 = round.p2Cards.c4;
    } else {
      p2_pair_found_3 = round.p2Cards.c3;
      p2_pair_found_4 = round.p2Cards.c4;
    }
    if (p2_pair_found_4) {
      let kickerMaybe = round.p2Cards.c1;
      if (
        kickerMaybe !== p2_pair_found_1 &&
        kickerMaybe !== p2_pair_found_2 &&
        kickerMaybe !== p2_pair_found_3 &&
        kickerMaybe !== p2_pair_found_4
      ) {
        p2_kicker = kickerMaybe;
      }
      kickerMaybe = round.p2Cards.c2;
      if (
        kickerMaybe !== p2_pair_found_1 &&
        kickerMaybe !== p2_pair_found_2 &&
        kickerMaybe !== p2_pair_found_3 &&
        kickerMaybe !== p2_pair_found_4
      ) {
        p2_kicker = kickerMaybe;
      }
      kickerMaybe = round.p2Cards.c5;
      if (
        kickerMaybe !== p2_pair_found_1 &&
        kickerMaybe !== p2_pair_found_2 &&
        kickerMaybe !== p2_pair_found_3 &&
        kickerMaybe !== p2_pair_found_4
      ) {
        p2_kicker = kickerMaybe;
      }
    }
  }
  if (round.p2Cards.c3.val === round.p2Cards.c5.val) {
    p2_pair++;
    if (round.p2Cards.c3.val > p2_pair_high) {
      p2_pair_high = round.p2Cards.c3.val;
    }
    if (!p2_pair_found_1 && !p2_pair_found_2) {
      p2_pair_found_1 = round.p2Cards.c3;
      p2_pair_found_2 = round.p2Cards.c5;
    } else {
      p2_pair_found_3 = round.p2Cards.c3;
      p2_pair_found_4 = round.p2Cards.c5;
    }
    if (p2_pair_found_4) {
      let kickerMaybe = round.p2Cards.c1;
      if (
        kickerMaybe !== p2_pair_found_1 &&
        kickerMaybe !== p2_pair_found_2 &&
        kickerMaybe !== p2_pair_found_3 &&
        kickerMaybe !== p2_pair_found_4
      ) {
        p2_kicker = kickerMaybe;
      }
      kickerMaybe = round.p2Cards.c2;
      if (
        kickerMaybe !== p2_pair_found_1 &&
        kickerMaybe !== p2_pair_found_2 &&
        kickerMaybe !== p2_pair_found_3 &&
        kickerMaybe !== p2_pair_found_4
      ) {
        p2_kicker = kickerMaybe;
      }
      kickerMaybe = round.p2Cards.c4;
      if (
        kickerMaybe !== p2_pair_found_1 &&
        kickerMaybe !== p2_pair_found_2 &&
        kickerMaybe !== p2_pair_found_3 &&
        kickerMaybe !== p2_pair_found_4
      ) {
        p2_kicker = kickerMaybe;
      }
    }
  }
  if (round.p2Cards.c4.val === round.p2Cards.c5.val) {
    p2_pair++;
    if (round.p2Cards.c4.val > p2_pair_high) {
      p2_pair_high = round.p2Cards.c4.val;
    }
    if (!p2_pair_found_1 && !p2_pair_found_2) {
      p2_pair_found_1 = round.p2Cards.c4;
      p2_pair_found_2 = round.p2Cards.c5;
    } else {
      p2_pair_found_3 = round.p2Cards.c4;
      p2_pair_found_4 = round.p2Cards.c5;
    }
    if (p2_pair_found_4) {
      let kickerMaybe = round.p2Cards.c1;
      if (
        kickerMaybe !== p2_pair_found_1 &&
        kickerMaybe !== p2_pair_found_2 &&
        kickerMaybe !== p2_pair_found_3 &&
        kickerMaybe !== p2_pair_found_4
      ) {
        p2_kicker = kickerMaybe;
      }
      kickerMaybe = round.p2Cards.c2;
      if (
        kickerMaybe !== p2_pair_found_1 &&
        kickerMaybe !== p2_pair_found_2 &&
        kickerMaybe !== p2_pair_found_3 &&
        kickerMaybe !== p2_pair_found_4
      ) {
        p2_kicker = kickerMaybe;
      }
      kickerMaybe = round.p2Cards.c3;
      if (
        kickerMaybe !== p2_pair_found_1 &&
        kickerMaybe !== p2_pair_found_2 &&
        kickerMaybe !== p2_pair_found_3 &&
        kickerMaybe !== p2_pair_found_4
      ) {
        p2_kicker = kickerMaybe;
      }
    }
  }

  if (p1_pair === 2 && p2_pair < 2) return 'p1';
  if (p2_pair === 2 && p1_pair < 2) return 'p2';
  if (p1_pair === 2 && p2_pair === 2) {
    let p1CardArray = [
      p1_pair_found_1.val,
      p1_pair_found_2.val,
      p1_pair_found_3.val,
      p1_pair_found_4.val,
    ];
    p1CardArray.sort((a, b) => {
      return a - b;
    });

    let p2CardArray = [
      p2_pair_found_1.val,
      p2_pair_found_2.val,
      p2_pair_found_3.val,
      p2_pair_found_4.val,
    ];
    p2CardArray.sort((a, b) => {
      return a - b;
    });

    if (p1CardArray[3] > p2CardArray[3]) return 'p1';
    if (p2CardArray[3] > p1CardArray[3]) return 'p2';
    if (p1CardArray[1] > p2CardArray[1]) return 'p1';
    if (p2CardArray[1] > p1CardArray[1]) return 'p2';

    if (
      p1CardArray[3] === p2CardArray[3] &&
      p1CardArray[1] === p2CardArray[1]
    ) {
      if (p1_kicker.val > p2_kicker.val) return 'p1';
      if (p2_kicker.val > p1_kicker.val) return 'p2';
    }
  }

  return 'next';
};

const checkThreeOfAKind = (round) => {
  let p1CardValues = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // 2,3,4....Q,K,A
  let p2CardValues = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // 2,3,4....Q,K,A
  let p1_3KindVal = 0;
  let p2_3KindVal = 0;
  let p1k1 = 0;
  let p1k2 = 0;
  let p2k1 = 0;
  let p2k2 = 0;

  // do algorithm
  p1CardValues[round.p1Cards.c1.val - 2]++;
  p1CardValues[round.p1Cards.c2.val - 2]++;
  p1CardValues[round.p1Cards.c3.val - 2]++;
  p1CardValues[round.p1Cards.c4.val - 2]++;
  p1CardValues[round.p1Cards.c5.val - 2]++;

  p2CardValues[round.p2Cards.c1.val - 2]++;
  p2CardValues[round.p2Cards.c2.val - 2]++;
  p2CardValues[round.p2Cards.c3.val - 2]++;
  p2CardValues[round.p2Cards.c4.val - 2]++;
  p2CardValues[round.p2Cards.c5.val - 2]++;

  //console.log(p1CardValues);
  //console.log(p2CardValues);

  for (let i = 0; i <= 12; i++) {
    if (p1CardValues[i] === 3) {
      p1_3KindVal = i + 2;
    }
    if (p2CardValues[i] === 3) {
      p2_3KindVal = i + 2;
    }
    if (p1CardValues[i] === 2) {
      p1k1 = i + 2;
      p1k2 = i + 2;
    }
    if (p2CardValues[i] === 2) {
      p2k1 = i + 2;
      p2k2 = i + 2;
    }
    if (p1CardValues[i] === 1) {
      if (p1k1 === 0) p1k1 = i + 2;
      else p1k2 = i + 2;
    }
    if (p2CardValues[i] === 1) {
      if (p2k1 === 0) p2k1 = i + 2;
      else p2k2 = i + 2;
    }
  }

  if (p1_3KindVal > p2_3KindVal) return 'p1';
  if (p2_3KindVal > p1_3KindVal) return 'p2';
  if (p1_3KindVal === p2_3KindVal && p1_3KindVal !== 0) {
    p1kHigh = Math.max(p1k1, p1k2);
    p1kLow = Math.min(p1k1, p1k2);
    p2kHigh = Math.max(p2k1, p2k2);
    p2kLow = Math.min(p2k1, p2k2);
    if (p1kHigh > p2kHigh) return 'p1';
    if (p2kHigh > p1kHigh) return 'p2';
    if (p1kLow > p2kLow) return 'p1';
    if (p2kLow > p1kLow) return 'p2';
  }

  return 'next';
};

const checkFourOfAKind = (round) => {
  let p1CardValues = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // 2,3,4....Q,K,A
  let p2CardValues = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // 2,3,4....Q,K,A
  let p1_4KindVal = 0;
  let p2_4KindVal = 0;
  let p1kicker = 0;
  let p2kicker = 0;

  // do algorithm
  p1CardValues[round.p1Cards.c1.val - 2]++;
  p1CardValues[round.p1Cards.c2.val - 2]++;
  p1CardValues[round.p1Cards.c3.val - 2]++;
  p1CardValues[round.p1Cards.c4.val - 2]++;
  p1CardValues[round.p1Cards.c5.val - 2]++;

  p2CardValues[round.p2Cards.c1.val - 2]++;
  p2CardValues[round.p2Cards.c2.val - 2]++;
  p2CardValues[round.p2Cards.c3.val - 2]++;
  p2CardValues[round.p2Cards.c4.val - 2]++;
  p2CardValues[round.p2Cards.c5.val - 2]++;

  //console.log(p1CardValues);
  //console.log(p2CardValues);

  for (let i = 0; i <= 12; i++) {
    if (p1CardValues[i] === 4) {
      p1_4KindVal = i + 2;
    }
    if (p2CardValues[i] === 4) {
      p2_4KindVal = i + 2;
    }

    if (p1CardValues[i] === 1) {
      p1kicker = i + 2;
    }
    if (p2CardValues[i] === 1) {
      p2kicker = i + 2;
    }
  }

  if (p1_4KindVal > p2_4KindVal) return 'p1';
  if (p2_4KindVal > p1_4KindVal) return 'p2';
  if (p1_4KindVal === p2_4KindVal && p1_4KindVal !== 0) {
    if (p1kicker > p2kicker) return 'p1';
    if (p2kicker > p1kicker) return 'p2';
  }

  return 'next';
};

const checkWinType = (winType, round) => {
  let winner = 'next';

  //if (winType === 'royalFlush') winner = checkRoyalFlush(round);
  //if (winType === 'straightFlush') winner = checkStraightFlush(round);
  if (winType === 'fourOfAKind') winner = checkFourOfAKind(round);
  //if (winType === 'fullHouse') winner = checkFullHouse(round);
  //if (winType === 'flush') winner = checkFlush(round);
  //if (winType === 'straight') winner = checkStraight(round);
  if (winType === 'threeOfAKind') winner = checkThreeOfAKind(round);
  if (winType === 'twoPairs') winner = checkTwoPairs(round);
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
exports.checkOnePair = checkOnePair;
exports.checkTwoPairs = checkTwoPairs;
exports.checkHighCard = checkHighCard;
exports.checkThreeOfAKind = checkThreeOfAKind;
exports.checkFourOfAKind = checkFourOfAKind;
