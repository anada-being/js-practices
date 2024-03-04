#!/usr/bin/env node

import sqlite3 from "sqlite3";
const db = new sqlite3.Database(":memory:");

db.run(
  `CREATE TABLE books (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL UNIQUE
)`,
  () => {
    db.get(
      "INSERT INTO books (title) VALUES ('test') RETURNING id",
      (err, rowId) => {
        console.log(rowId);
        db.all("select * from books", (err, rows) => {
          console.log(rows);
          db.run("drop table if exists books");
        });
      },
    );
  },
);
