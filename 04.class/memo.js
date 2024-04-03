#!/usr/bin/env node

import minimist from "minimist";
import { select } from "@inquirer/prompts";
import { MemoDB } from "./memo_db.js";

async function main() {
  const isPipedInput = !process.stdin.isTTY;
  const argv = minimist(process.argv.slice(2));
  const db = new MemoDB();

  if (isPipedInput) {
    process.stdin.setEncoding("utf8");
    let inputData = "";
    process.stdin.on("data", (data) => {
      inputData += data;
    });

    process.stdin.on("end", async () => {
      await db.createMemo(inputData)
      process.exit();
    });
  }

  if (argv.l || argv.r || argv.d) {
    let memos = await db.getMemo();
    memos.forEach((memo, index) => {
      memos[index] = new Memo(memo.id, memo.content);
    });
    if (argv.l) {
      memos.forEach((memo) => {
        console.log(memo.name);
      });
    }
    if (argv.r) {
      const answer = await selectMemo(memos);
      const found = memos.find((memo) => memo.id === answer);
      console.log(found.content);
    }
    if (argv.d) {
      const answer = await selectMemo(memos);
      db.deleteMemo(answer);
    }
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

class Memo {
  constructor(id, content) {
    this.id = id;
    this.title = content.slice(0, content.indexOf("\n"));
    this.content = content;
  }
}

main();
