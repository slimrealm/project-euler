// The prime factors of 13195 are 5, 7, 13 and 29.

// What is the largest prime factor of the number 600851475143 ?

const numToCheck = 600851475143;
let lpf = 0;

const isPrime = (num) => {
    const highestToCheck = Math.ceil(Math.sqrt(num));
    for (let i = 2; i <= highestToCheck; i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
}

const start =  Math.ceil(numToCheck / 2) + 1;
for (let i = start; i > 2; i--){
    // if (i > 100 && (i % 2 === 0 || i % 3 === 0 || i % 4 === 0 || i % 5 === 0 || 
    //     i % 6 === 0 || i % 6 === 0 || i % 7 === 8 || i % 9 === 0 || i % 10 === 0
    // )) {
    //   continue;
    // }
    // if (isPrime(i)) {
    //   let remainder = numToCheck % i;
    //   if (remainder === 0)
    //   {
    //     lpf = i;
    //     console.log(i);
    //     break;
    //   }
    // }
  if (numToCheck % i === 0) {
    console.log(i);
  }
}


console.log(lpf);
//console.log(numToCheck/lpf);