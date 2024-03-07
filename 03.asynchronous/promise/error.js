#!/usr/bin/env node

import sqlite3 from "sqlite3";
import { runPromise, allPromise } from "../common_function_query.js";

const db = new sqlite3.Database(":memory:");

runPromise(
  db,
  `CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT,title TEXT NOT NULL UNIQUE)`,
)
  .then(() => runPromise(db, `INSERT INTO books (title) VALUES (null)`, true))
  .catch((err) => console.error(err.message))
  .then((lastID) => {
    if (lastID) {
      console.log(lastID);
    }
    return allPromise(db, "SELECT * FROM book");
  })
  .catch((err) => console.error(err.message))
  .then((rows) => {
    if (rows) {
      console.log(rows);
    }
    runPromise(db, "DROP TABLE books");
  });
