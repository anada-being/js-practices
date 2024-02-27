#!/usr/bin/env node

import minimist from "minimist";

const today = new Date();
const args = minimist(process.argv.slice(2), {
  default: {
    y: today.getFullYear(),
    m: today.getMonth() + 1,
  },
});

const firstDate = new Date();

firstDate.setFullYear(args["y"]);
firstDate.setMonth(args["m"] - 1);
firstDate.setDate(1);

const firstDay = firstDate.getDay();

const lastDate = new Date();
lastDate.setMonth(args["m"]);
lastDate.setDate(0);

console.log(`   ${Intl.DateTimeFormat("en-US", { month: "long" }).format(firstDate)} ${args["y"]}`);
console.log("Su Mo Tu We Th Fr Sa");

for (let i = 0; i < firstDay; i++) {
  process.stdout.write("   ");
}

let countNumber = 1;

for (let i = firstDay; i < 7; i++) {
  process.stdout.write(` ${countNumber}`);
  process.stdout.write(" ");
  countNumber++;
}
process.stdout.write("\n");

const saturday = (7 - firstDay) % 7;

for (countNumber; countNumber <= lastDate.getDate(); countNumber++) {
  if (countNumber < 10) {
    process.stdout.write(" ");
  }
  process.stdout.write(`${countNumber}`);
  process.stdout.write(" ");
  if (countNumber % 7 == saturday) {
    process.stdout.write("\n");
  }
}
process.stdout.write("\n");
