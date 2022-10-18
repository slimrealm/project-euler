// A palindromic number reads the same both ways. The largest palindrome made
// from the product of two 2-digit numbers is 9009 = 91 × 99.

// Find the largest palindrome made from the product of two 3-digit numbers.

const getLargestPalindrome = (xDigitNum) => {
    let min, max;

    if (xDigitNum === 2) {
        min = 10;
        max = 99;
    }
    else if (xDigitNum === 3) {
        min = 100;
        max = 999;
    }

    let highestPalindrome = 0;
    for (let left = min; left <= max; left++) {
        for (let right = min; right <= max; right++) {
            let testProduct = left * right;
            if (testProduct > highestPalindrome && isPalindrome(testProduct)) {
                highestPalindrome = testProduct;
            }
        }
    }

    console.log(`Highest palindrome is ${highestPalindrome}!!`);
}

const isPalindrome = (numToCheck) => {
    numString = numToCheck.toString();
    length = numString.length;
    if (length === 1) {
        return true;
    }
    if (length === 2 && numString[0] === numString[1]) {
        return true;
    }

    let leftPos = 0;
    let rightPos = length - 1;

    do {
        if (numString[leftPos] !== numString[rightPos]) {
            return false;
        }
        leftPos++;
        rightPos--;
    }
    while (leftPos < rightPos);

    return true;
}

getLargestPalindrome(3);