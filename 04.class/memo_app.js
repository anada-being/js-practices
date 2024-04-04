#!/usr/bin/env node

import minimist from "minimist";
import { select } from "@inquirer/prompts";
import { MemoDB } from "./memo_db.js";
import { Memo } from "./memo.js";

const db = new MemoDB();
await db.createTable();
const argv = minimist(process.argv.slice(2));

function main() {
  Object.values(argv).length === 1 ? stdinOut() : command();
}

function stdinOut() {
  process.stdin.resume();
  process.stdin.setEncoding("utf8");

  let inputData = "";
  process.stdin.on("data", (data) => {
    inputData += data;
  });

  process.stdin.on("end", async () => {
    await db.createMemo(inputData);
    process.exit();
  });
}

async function command() {
  const memosDB = await db.getMemo();
  const memos = [];
  memosDB.forEach((memo) => {
    memos.push(new Memo(memo.id, memo.content));
  });
  if (argv.l) {
    memos.forEach((memo) => {
      console.log(memo.title);
    });
  } else if (argv.r) {
    const message = "choose a memo you want to see";
    const answer = await memoController(memos, message);
    const selectedMemo = memos.find((memo) => memo.id === answer);
    console.log(selectedMemo.content);
  } else if (argv.d) {
    const message = "choose a memo you want to delete";
    const answer = await memoController(memos, message);
    await db.deleteMemo(answer);
  }
}

function memoController(memos, message) {
  if (memos.length === 0) {
    console.log("メモはまだありません");
    process.exit();
  }
  return selectMemo(message, memos);
}

async function selectMemo(message, memos) {
  return await select({
    message: message,
    choices: memos.map((memo) => ({
      value: memo.id,
      name: memo.title,
      description: memo.content,
    })),
  });
}

main();
