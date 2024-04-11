#!/usr/bin/env node

import minimist from "minimist";
import * as inquirer from "@inquirer/prompts";
import MemoDB from "./memo_db.js";

async function main() {
  const db = await new MemoDB();
  await db.createTable();
  const argv = minimist(process.argv.slice(2));
  if (Object.values(argv).length === 1) {
    receiveStdin(db);
  } else {
    dispatchArgv(db, argv);
  }
}

function receiveStdin(db) {
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

async function dispatchArgv(db, argv) {
  const memos = await db.getMemos();
  if (argv.l) {
    memos.forEach((memo) => {
      console.log(memo.title);
    });
  } else if (argv.r) {
    const message = "choose a memo you want to see";
    const selectedMemoID = await selectMemo(memos, message);
    const selectedMemo = memos.find((memo) => memo.id === selectedMemoID);
    console.log(selectedMemo.content);
  } else if (argv.d) {
    const message = "choose a memo you want to delete";
    const selectedMemoID = await selectMemo(memos, message);
    await db.deleteMemo(selectedMemoID);
  }
}

async function selectMemo(memos, message) {
  if (memos.length === 0) {
    console.log("メモはまだありません");
    process.exit();
  }
  try {
    return await inquirer.select({
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
