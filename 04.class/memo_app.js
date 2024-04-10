#!/usr/bin/env node

import minimist from "minimist";
import select from "@inquirer/select";
import MemoDB from "./memo_db.js";
import Memo from "./memo.js";

async function main() {
  const db = await new MemoDB();
  await db.createTable();
  const argv = minimist(process.argv.slice(2));
  if (Object.values(argv).length === 1) {
    stdinOut(db);
  } else {
    command(db, argv);
  }
}

function stdinOut(db) {
  process.stdin.resume();
  process.stdin.setEncoding("utf8");

  let inputData = "";
  process.stdin.on("data", (data) => {
    inputData += data;
  });

  process.stdin.on("end", async () => {
    await db.createMemo(inputData);
  });
}

async function command(db, argv) {
  const memosDB = await db.getMemos();
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
    const selectedMemoID = await memoController(memos, message);
    const selectedMemo = memos.find((memo) => memo.id === selectedMemoID);
    console.log(selectedMemo.content);
  } else if (argv.d) {
    const message = "choose a memo you want to delete";
    const selectedMemoID = await memoController(memos, message);
    await db.deleteMemo(selectedMemoID);
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
  try {
    return await select({
      message: message,
      choices: memos.map((memo) => ({
        value: memo.id,
        name: memo.title,
        description: memo.content,
      })),
    });
  } catch(err) {
    console.error(err.message);
    process.exit();
  }
}

main();
