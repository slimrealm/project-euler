
let janDays = 31;
let febDays = 28;
let febLeapDays = 29;
let marDays = 31;
let aprDays = 30;
let mayDays = 31;
let junDays = 30;
let julDays = 31;
let augDays = 31;
let sepDays = 30;
let octDays = 31;
let novDays = 30;
let decDays = 31;

// 1 = Sunday,... ..., 7 = Saturday 

let leap = false;
let firstSundays = 0;
let year = 1900;
let month = 1;
let currStartDay = 2;  // Mon, Jan 1, 1900

const processYear = () => {
  currStartDay += janDays % 7; currStartDay %= 7; if (currStartDay === 1 && year >= 1901) { firstSundays++; }
  leap = false;
  if (year % 400 === 0) {
    leap = true;
  }
  if (year % 4 === 0 && year % 100 !== 0) {
    leap = true;
  }
  leap ? currStartDay += febLeapDays % 7 : currStartDay += febDays % 7;
  currStartDay %= 7; if (currStartDay === 1 && year >= 1901) { firstSundays++; }
  currStartDay += marDays % 7; currStartDay %= 7; if (currStartDay === 1 && year >= 1901) { firstSundays++; }
  currStartDay += aprDays % 7; currStartDay %= 7; if (currStartDay === 1 && year >= 1901) { firstSundays++; }
  currStartDay += mayDays % 7; currStartDay %= 7; if (currStartDay === 1 && year >= 1901) { firstSundays++; }
  currStartDay += junDays % 7; currStartDay %= 7; if (currStartDay === 1 && year >= 1901) { firstSundays++; }
  currStartDay += julDays % 7; currStartDay %= 7; if (currStartDay === 1 && year >= 1901) { firstSundays++; }
  currStartDay += augDays % 7; currStartDay %= 7; if (currStartDay === 1 && year >= 1901) { firstSundays++; }
  currStartDay += sepDays % 7; currStartDay %= 7; if (currStartDay === 1 && year >= 1901) { firstSundays++; }
  currStartDay += octDays % 7; currStartDay %= 7; if (currStartDay === 1 && year >= 1901) { firstSundays++; }
  currStartDay += novDays % 7; currStartDay %= 7; if (currStartDay === 1 && year >= 1901) { firstSundays++; }
  currStartDay += decDays % 7; currStartDay %= 7; if (currStartDay === 1 && year >= 1901) { firstSundays++; }
  year++;
  // now sitting at Jan 1 of next year;
  console.log(`It's Jan 1, ${year}. First day is ${currStartDay}.`)
}

if (currStartDay === 1) {
  firstSundays++;
}

do {
  processYear();
} while (year <= 2000)

console.log(firstSundays);