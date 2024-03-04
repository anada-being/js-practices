#!/usr/bin/env node

import sqlite3 from "sqlite3";
const db = new sqlite3.Database(":memory:");

db.run(
  `CREATE TABLE books (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL UNIQUE
)`,
  () => {
    db.get("INSERT INTO books (title) VALUES (null)", (err) => {
      console.log(err.message);
      db.all("select * from book", (err) => {
        console.log(err.message);
        db.run("drop table if exists books");
      });
    });
  },
);
