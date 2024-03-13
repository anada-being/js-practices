#!/usr/bin/env node

import sqlite3 from "sqlite3";
import { runPromise, allPromise } from "../run_all_promise.js";

const db = new sqlite3.Database(":memory:");

await runPromise(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
);
const result = await runPromise(
  db,
  "INSERT INTO books (title) VALUES ('Ruby入門')",
);
console.log(result.lastID);
const rows = await allPromise(db, "SELECT * FROM books");
console.log(rows);
await runPromise(db, "DROP TABLE books");
