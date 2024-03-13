#!/usr/bin/env node

import sqlite3 from "sqlite3";
import { runPromise, allPromise } from "../run_all_promise.js";

const db = new sqlite3.Database(":memory:");

runPromise(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
)
  .then(() => runPromise(db, `INSERT INTO books (title) VALUES ("Ruby入門")`))
  .then((result) => {
    console.log(result.lastID);
    return allPromise(db, "SELECT * FROM books");
  })
  .then((rows) => {
    console.log(rows);
    return runPromise(db, "DROP TABLE books");
  });
