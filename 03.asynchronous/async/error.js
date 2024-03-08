#!/usr/bin/env node

import sqlite3 from "sqlite3";
import { runPromise, allPromise } from "../common_function.js";

const db = new sqlite3.Database(":memory:");

await runPromise(
  db,
  `CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT,title TEXT NOT NULL UNIQUE)`,
);
try {
  const insertResult = await runPromise(
    db,
    `INSERT INTO books (title) VALUES (null)`,
    true,
  );
  console.log(insertResult);
} catch (err) {
  if (err["code"] == "SQLITE_CONSTRAINT") {
    console.error(err.message);
  } else {
    throw err;
  }
}
try {
  const allResult = await allPromise(db, "SELECT * FROM book");
  console.log(allResult);
} catch (err) {
  if (err["code"] == "SQLITE_ERROR") {
    console.error(err.message);
  } else {
    throw err;
  }
}
await runPromise(db, "DROP TABLE books");
