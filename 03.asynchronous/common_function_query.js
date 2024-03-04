#!/usr/bin/env node

import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");
const createTableQuery = `
  CREATE TABLE books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL UNIQUE
  )
`;
const insertRowQuery =
  "INSERT INTO books (title) VALUES ('Ruby入門') RETURNING id";
const selectQuery = "SELECT * FROM books";
const dropQuery = "DROP TABLE books";

function runPromise(query) {
  return new Promise((resolve) => {
    db.run(query, () => resolve());
  });
}

function getPromise(query) {
  return new Promise((resolve, reject) => {
    db.get(query, (err, rowId) => {
      if (err) {
        reject(err);
      } else {
        console.log(rowId);
        resolve();
      }
    });
  });
}

function allPromise(query) {
  return new Promise((resolve, reject) => {
    db.all(query, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        console.log(rows);
        resolve();
      }
    });
  });
}

export {
  createTableQuery,
  insertRowQuery,
  selectQuery,
  dropQuery,
  runPromise,
  getPromise,
  allPromise,
};
