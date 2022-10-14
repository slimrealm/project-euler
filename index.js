// A palindromic number reads the same both ways. The largest palindrome made
// from the product of two 2-digit numbers is 9009 = 91 × 99.

// Find the largest palindrome made from the product of two 3-digit numbers.

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
    }
    while (leftPos !== rightPos);

    return true;
}

console.log(isPalindrome(505));