/*
If the numbers 1 to 5 are written out in words: one, two, three, four, five,
then there are 3 + 3 + 5 + 4 + 4 = 19 letters used in total.

If all the numbers from 1 to 1000 (one thousand) inclusive were written out in
words, how many letters would be used?

NOTE: Do not count spaces or hyphens. For example, 342 (three hundred and
forty-two) contains 23 letters and 115 (one hundred and fifteen) contains 20
letters. The use of "and" when writing out numbers is in compliance with
British usage.
*/

const numbersAndWords = [
  '',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'ten',
  'eleven',
  'twelve',
  'thirteen',
  'fourteen',
  'fifteen',
  'sixteen',
  'seventeen',
  'eighteen',
  'nineteen',
];

const tensBaseWords = [
  '',
  '',
  'twenty',
  'thirty',
  'forty',
  'fifty',
  'sixty',
  'seventy',
  'eighty',
  'ninety',
];

const getNumMinusHundreds = (num: number): number => {
  if (num >= 100 && num <= 999) {
    const hundreds = Math.floor(num / 100);
    const numToSubtract = hundreds * 100;
    const numMinusHundreds = num - numToSubtract;
    return numMinusHundreds;
  }
  return num;
};

const getHundredsBaseString = (num: number): string => {
  if (num >= 100 && num <= 999) {
    const hundredsNumber = Math.floor(num / 100);
    const hundredsNumberString = numbersAndWords[hundredsNumber];
    if (num % 100 === 0) {
      //console.log(hundredsNumberString);
      return hundredsNumberString + 'hundred';
    }
    return hundredsNumberString + 'hundredand';
  }

  return '';
};

const getTensBaseString = (num: number): string => {
  const numMinusHundreds = getNumMinusHundreds(num);
  const tensBase = Math.floor(numMinusHundreds / 10);
  const tensBaseString = tensBaseWords[tensBase];

  return tensBaseString;
};

const getOnesBaseString = (num: number): string => {
  if (num <= 19) {
    console.log(
      "getOnesBaseString() cannot be called on numbers between 'X00' and 'X19'."
    );
    return '';
  }

  let numMinusHundreds: number = getNumMinusHundreds(num);

  const onesBase = numMinusHundreds % 10;
  if (onesBase > 0) {
    return numbersAndWords[onesBase];
  }
  return '';
};

const convertToWords = (num: number): string => {
  let stringToAdd = '';
  if (num === 1000) {
    return 'onethousand';
  }

  if (num >= 100 && num <= 999) {
    const hundredsBaseString = getHundredsBaseString(num);

    const numMinusHundreds = getNumMinusHundreds(num);
    if (numMinusHundreds < 20) {
      return hundredsBaseString + numbersAndWords[numMinusHundreds];
    }

    const tensBaseString = getTensBaseString(num);
    const onesBaseString = getOnesBaseString(num);
    return hundredsBaseString + tensBaseString + onesBaseString;
  }

  if (num >= 20 && num <= 99) {
    const tensBaseString = getTensBaseString(num);
    const onesBaseString = getOnesBaseString(num);
    return tensBaseString + onesBaseString;
  }

  // num is < 20
  return numbersAndWords[num];
};

const getFullString = (maxNum: number): string => {
  let finalString = '';

  for (let i = 1; i <= maxNum; i++) {
    const stringToAdd: string = convertToWords(i);
    //console.log(stringToAdd); // TEMP
    finalString += stringToAdd;
  }

  return finalString;
};

//getFullString(1000);
const fullString = getFullString(1000);
console.log(fullString);
console.log(`\n${fullString.length}`);
