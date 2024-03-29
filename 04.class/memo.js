#!/usr/bin/env node

import minimist from "minimist";
import { DB } from "./db.js";
import { selectMemo } from "./selectMemo.js";

main();

async function main() {
  const isPipedInput = !process.stdin.isTTY;
  const argv = minimist(process.argv.slice(2));
  const db = new DB();

  if (isPipedInput) {
    process.stdin.setEncoding('utf8');
    let inputData = '';
    process.stdin.on('data', function (data) {
      inputData += data;
    });

    process.stdin.on('end', function () {
      console.log(inputData);
      db.createMemo(inputData).then(()=>{
        process.exit();  
      })
    });
  }

  if (argv.l || argv.r || argv.d) {
    let memos = await db.getMemo();
    memos.forEach((memo, index) => {
      memos[index] = new Memo(memo.id, memo.content);
    });
    if(argv.l){
      memos.forEach((memo)=> {
        console.log(memo.name);
      });
    }
    if (argv.r) {
      const answer = await selectMemo(memos);
      memos.forEach((memo) => {
        if (answer === memo.value){
          console.log(memo.description);
        }
      })
    }
    if (argv.d) {
    const answer = await selectMemo(memos);
    db.deleteMemo(answer);
    }
  }
}

class Memo {
  constructor(id, content){
    this.value = id;
    this.name = content.slice(0, content.indexOf('\n'));
    this.description = content;
  }
}
