#!/usr/bin/env node

import sqlite3 from "sqlite3";
const db = new sqlite3.Database(":memory:");
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL UNIQUE
  )
`;

const droptable = new Promise((resolve) => {
  db.run("drop table if exists books", () => resolve());
});



droptable
  .then(() => createTable(createTableQuery))
  .then(() => insertRow("test"))
  .then(() => getRows());

function createTable(createTableQuery) {
  return new Promise((resolve) => {
  db.run(createTableQuery,() => resolve());
  });
}

function insertRow(title) {
  return new Promise((resolve) => {
    db.run("INSERT INTO books(title) values(?)", title, () => resolve());
  });
}

function getRows() {
  db.all("select * from books", (err, data) => {
    if (err) throw err;
    console.log(data);
  });
}
