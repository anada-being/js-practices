#!/usr/bin/env node

import sqlite3 from "sqlite3";
import { runPromise, allPromise } from "../common_function.js";

const db = new sqlite3.Database(":memory:");

runPromise(
  db,
  `CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT,title TEXT NOT NULL UNIQUE)`,
)
  .then(() => runPromise(db, `INSERT INTO books (title) VALUES (null)`, true))
  .catch((err) => {
    if (err["code"] == "SQLITE_CONSTRAINT") {
      console.error(err.message);
    } else {
      throw err;
    }
  })
  .then((lastID) => {
    if (lastID) {
      console.log(lastID);
    }
    return allPromise(db, "SELECT * FROM book");
  })
  .catch((err) => {
    if (err["code"] == "SQLITE_ERROR") {
      console.error(err.message);
    } else {
      throw err;
    }
  })
  .then((rows) => {
    if (rows) {
      console.log(rows);
    }
    runPromise(db, "DROP TABLE books");
  });
