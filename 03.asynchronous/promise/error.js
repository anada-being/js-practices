#!/usr/bin/env node

import sqlite3 from "sqlite3";
import { runPromise, allPromise } from "../run_all_promise.js";

const db = new sqlite3.Database(":memory:");

runPromise(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
)
  .then(() => runPromise(db, "INSERT INTO books (title) VALUES (NULL)"))
  .catch((err) => {
    if (err?.message && err.message.includes("SQLITE_CONSTRAINT")) {
      console.error(err.message);
    } else {
      throw err;
    }
  })
  .then(() => allPromise(db, "SELECT * FROM book"))
  .catch((err) => {
    if (err?.message && err.message.includes("SQLITE_ERROR")) {
      console.error(err.message);
    } else {
      throw err;
    }
  })
  .then(() => runPromise(db, "DROP TABLE books"));
