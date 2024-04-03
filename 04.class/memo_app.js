#!/usr/bin/env node

import minimist from "minimist";
import { select } from "@inquirer/prompts";
import { MemoDB } from "./memo_db.js";
import { Memo } from "./memo.js";

async function main() {
  const argv = minimist(process.argv.slice(2));
  const db = new MemoDB();

  process.stdin.resume();
  process.stdin.setEncoding("utf8");

  let inputData = "";
  process.stdin.on("data", (data) => {
    inputData += data;
  });

  process.stdin.on("end", async () => {
    await db.createMemo(inputData)
    process.exit();
  });

  if (argv.l || argv.r || argv.d) {
    process.stdin.pause();
    let memos = await db.getMemo();
    memos.forEach((memo, index) => {
      memos[index] = new Memo(memo.id, memo.content);
    });
    if (argv.l) {
      memos.forEach((memo) => {
        console.log(memo.title);
      });
    }
    if (argv.r) {
      if (memos.length === 0){
        return console.log("メモはまだありません")
      }
      const answer = await selectMemo(memos);
      const found = memos.find((memo) => memo.id === answer);
      console.log(found.content);
    }
    if (argv.d) {
      if (memos.length === 0){
        return console.log("メモはまだありません")
      }
      const answer = await selectMemo(memos);
      await db.deleteMemo(answer);
    }
    process.exit();
  }
}

async function selectMemo(memos) {
  return await select({
    message: "Choose a memo:",
    choices: memos.map((memo) => ({
      value: memo.id,
      name: memo.title,
      description: memo.content,
    })),
  });
}

main();
