#!/usr/bin/env node

var minimist = require('minimist');

const today = new Date();
today.setMonth(today.getMonth() + 1);
var args = minimist(process.argv.slice(2),{
  default: {
    y: today.getFullYear(),
    m: today.getMonth()
  }
});

var firstDate = new Date();
var lastDate = new Date();
var dates = { first: firstDate, last: lastDate};

var datesValues = Object.values(dates);
datesValues.forEach(function (value){
  value.setFullYear(args['y']);
});

firstDate.setMonth(args['m'] - 1);
firstDate.setDate(1);
const firstDay = firstDate.getDay();

lastDate.setMonth(args['m']);
lastDate.setDate(0);

console.log(`   ${Intl.DateTimeFormat("en-US",{ month: "long"}).format(firstDate)} ${args['y']}`)
console.log('Su Mo Tu We Th Fr Sa')

for (let i = 0; i < firstDay; i++) {
  process.stdout.write('   ');
}

var countN = 1;

for (let i = firstDay; i < 7; i++) {
  process.stdout.write(` ${countN}`);
  process.stdout.write(' ');
  countN++;
}
process.stdout.write("\n");

var pointSa = 7 - firstDay;

for (countN; countN <= lastDate.getDate(); countN++) {
  if (countN < 10) {
    process.stdout.write(' ');
  }
  process.stdout.write(`${countN}`);
  process.stdout.write(' ');
  if (countN%7 == pointSa){
    process.stdout.write("\n");
  }
}
process.stdout.write("\n");
