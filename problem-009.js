/*A Pythagorean triplet is a set of three natural numbers, a < b < c, for which,

a2 + b2 = c2
For example, 32 + 42 = 9 + 16 = 25 = 52.

There exists exactly one Pythagorean triplet for which a + b + c = 1000.
Find the product abc.*/


for (let a = 0; a <= 1000; a++) {
  for (let b = a + 1; b <= 1000; b++) {
    for (let c = b + 1; c <= 1000; c++) {
      if (a * a + b * b === c * c && a + b + c === 1000) {
        console.log(`${a} -- ${b} -- ${c}`);
        console.log(`${a * a} + ${b * b} = ${c * c}`);
        console.log(a * b * c);
      }
    }
  }
}
