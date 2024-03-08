#!/usr/bin/env node

import sqlite3 from "sqlite3";
import { runPromise, allPromise } from "../common_function.js";

const db = new sqlite3.Database(":memory:");

await runPromise(
  db,
  `CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)`,
);
const runResult = await runPromise(
  db,
  `INSERT INTO books (title) VALUES ("Ruby入門")`,
);
console.log(runResult.lastID);
const allResult = await allPromise(db, "SELECT * FROM books");
console.log(allResult);
await runPromise(db, "DROP TABLE books");
