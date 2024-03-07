#!/usr/bin/env node

import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

db.run(
  `CREATE TABLE books (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL UNIQUE
)`,
  () => {
    db.get("INSERT INTO books (title) VALUES (null)", function (err) {
      console.error(err.message);
      db.all("SELECT * FROM book", function (err) {
        console.error(err.message);
        db.run("DROP TABLE books");
      });
    });
  },
);
