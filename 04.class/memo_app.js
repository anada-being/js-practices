#!/usr/bin/env node

import minimist from "minimist";
import * as inquirer from "@inquirer/prompts";
import MemoDB from "./memo_db.js";

async function main() {
  const memoDb = new MemoDB();
  await memoDb.createTable();
  const argv = minimist(process.argv.slice(2));
  if (Object.values(argv).length === 1) {
    const inputData = await receiveFromStdin();
    await memoDb.createMemo(inputData);
  } else {
    showOrDeleteMemo(memoDb, argv);
  }
}

function receiveFromStdin() {
  return new Promise((resolve) => {
    process.stdin.resume();
    process.stdin.setEncoding("utf8");

    let inputData = "";
    process.stdin.on("data", (data) => {
      inputData += data;
    });

    process.stdin.on("end", () => {
      resolve(inputData);
    });
  });
}

async function showOrDeleteMemo(memoDb, argv) {
  const memos = await memoDb.getMemos();

  if (argv.l) {
    memos.forEach((memo) => {
      console.log(showTitle(memo));
    });
  } else if (argv.r) {
    const message = "choose a memo you want to see";
    const selectedMemo = await selectMemo(memos, message);
    if (!selectedMemo) {
      process.exit();
    }
    console.log(selectedMemo.content);
  } else if (argv.d) {
    const message = "choose a memo you want to delete";
    const selectedMemo = await selectMemo(memos, message);
    if (!selectedMemo) {
      process.exit();
    }
    await memoDb.deleteMemo(selectedMemo.id);
  }
}

async function selectMemo(memos, message) {
  if (memos.length === 0) {
    console.log("まだメモはありません");
  } else {
    try {
      return await inquirer.select({
        message: message,
        choices: memos.map((memo) => ({
          value: memo,
          name: showTitle(memo),
          description: memo.content,
        })),
      });  
    } catch (err) {
      console.error(err.message);
    }
  }
}

function showTitle(memo) {
  if (memo.title) {
    return memo.title;
  } else {
    return "NoTitle";
  }
}

main();
