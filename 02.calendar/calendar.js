#!/usr/bin/env node

import minimist from "minimist";

const args = minimist(process.argv.slice(2));
const firstDate = new Date();
const lastDate = new Date();

const month = args["m"];
const year = args["y"];

try{
  if (month != undefined && (!(month > 0 && month < 13)) ){
    throw new Error(`cal: ${month} is not a month number (1..12)`);
  }
  if (year != undefined && (!(year > 1969 && year < 2101 || year === true))){
    throw new Error(`cal: not a valid year ${year}`);
  }

  if(month){
    setMonth(month);
  }
  if (year){
    setYear(year);
  }

  firstDate.setDate(1);
  lastDate.setMonth(firstDate.getMonth() + 1);
  lastDate.setDate(0);
  const firstDay = firstDate.getDay();

  console.log(`   ${Intl.DateTimeFormat("en-US", { month: "long" }).format(firstDate)} ${firstDate.getFullYear()}`);
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
} catch (e) {
  console.log(e.message);
}

function setMonth(month){
  if(month == firstDate.getMonth()){
    return true;
  }
  const monthForSet = args["m"] - 1;
  firstDate.setMonth(monthForSet);
  lastDate.setMonth(monthForSet);
}
function setYear(year){
  if (year === true || year == firstDate.getFullYear()){
    return true;
  }
  firstDate.setFullYear(year);
  lastDate.setFullYear(year);
}
