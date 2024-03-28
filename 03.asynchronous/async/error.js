#!/usr/bin/env node

import sqlite3 from "sqlite3";
import { runPromise, allPromise } from "../db_promise.js";

const db = new sqlite3.Database(":memory:");

await runPromise(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
);
try {
  const result = await runPromise(
    db,
    "INSERT INTO books (title) VALUES (NULL)",
  );
  console.log(result.lastID);
} catch (err) {
  if (err instanceof Error && err.code === "SQLITE_CONSTRAINT") {
    console.error(err.message);
  } else {
    throw err;
  }
}
try {
  const rows = await allPromise(db, "SELECT * FROM book");
  console.log(rows);
} catch (err) {
  if (err instanceof Error && err.code === "SQLITE_ERROR") {
    console.error(err.message);
  } else {
    throw err;
  }
}
await runPromise(db, "DROP TABLE books");
