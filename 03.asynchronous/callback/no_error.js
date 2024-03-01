#!/usr/bin/env node

import sqlite3 from "sqlite3";
const db = new sqlite3.Database(":memory:");

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL UNIQUE
  )
`;

db.run("drop table if exists books", (err) => {
  if (err) throw err;
  db.run(createTableQuery, (err) => {
    if (err) throw err;
    db.run("INSERT INTO books(title) values(?)", "test", (err) => {
      if (err) throw err;
      db.get(
        "select * from books where rowid = last_insert_rowid()",
        (err, row) => {
          if (err) throw err;
          console.log(row["id"]);
          db.all("select * from books", (err, data) => {
            if (err) throw err;
            console.log(data);
            db.run("drop table if exists books");
          });
        },
      );
    });
  });
});
