#!/usr/bin/env node

import sqlite3 from "sqlite3";
import { runPromise, allPromise } from "../common_function.js";

const db = new sqlite3.Database(":memory:");

runPromise(
  db,
  `CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)`,
)
  .then(() => runPromise(db, `INSERT INTO books (title) VALUES (null)`))
  .catch((err) => {
    if (err.message.includes("SQLITE_CONSTRAINT")) {
      console.error(err.message);
    } else {
      throw err;
    }
  })
  .then(() => {
    return allPromise(db, "SELECT * FROM book");
  })
  .catch((err) => {
    if (err.message.includes("SQLITE_ERROR")) {
      console.error(err.message);
    } else {
      throw err;
    }
  })
  .then(() => runPromise(db, "DROP TABLE books"));
