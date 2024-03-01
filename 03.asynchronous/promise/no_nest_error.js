#!/usr/bin/env node

import sqlite3 from "sqlite3";
const db = new sqlite3.Database(":memory:");
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL UNIQUE
  )
`;




droptable()
  .then(() => createTable(createTableQuery))
  .then(() => insertRow("test"))
  .then(() => getLastRowId())
  .then(() => getRows());

function droptable() {
  return new Promise((resolve) => {
    db.run("DROP TABLE if exists books", () => resolve());
  });
}

function createTable(createTableQuery) {
  return new Promise((resolve) => {
  db.run(createTableQuery,() => resolve());
  });
}

function insertRow(title) {
  return new Promise((resolve, reject) => {
    db.run("INSERT INTO books(title) values(?)", title, (err) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
}

function getLastRowId(){
  return new Promise((resolve, reject) => {
    db.get("select * from books where rowid = last_insert_rowid()", (err, row) => {
      if (err) {
        () => reject(err);
      }
      console.log(row["id"]);
    },() => resolve());
  });
}

function getRows() {
  return new Promise((resolve, reject) => {
    db.all("select * from books", (err, rows) => {
      if (err) {
        () => reject(err);
      }
      console.log(rows);
      () => resolve()
    });
  });
}
export { droptable, createTable, insertRow, getLastRowId, getRows }
