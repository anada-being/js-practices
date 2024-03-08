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
    console.error(err.message);
  })
  .then((runResult) => {
    if (runResult) {
      console.log(runResult.lastID);
    }
    return allPromise(db, "SELECT * FROM book");
  })
  .catch((err) => {
    if (err["code"] === "SQLITE_ERROR") {
      console.error(err.message);
    } else {
      throw err;
    }
  })
  .then(
    (rows) => {
      if (rows) {
        console.log(rows);
      }
      return runPromise(db, "DROP TABLE books");
    },
    (err) => {
      if (err["code"] === "SQLITE_ERROR") {
        console.error(err.message);
      } else {
        throw err;
      }
    },
  );
