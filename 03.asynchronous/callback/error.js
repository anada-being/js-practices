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
      try {
        if (err["errno"] == 19) {
          throw err;
        }
        console.log(err);
      } catch (err) {
        console.log(err.message);
      }
      db.all("SELECT * FROM book", (err) => {
        try {
          if (err["errno"] == 1) {
            throw err;
          }
          console.log(err);
        } catch (err) {
          console.log(err.message);
        }
        db.run("DROP TABLE books");
      });
    });
  },
);
