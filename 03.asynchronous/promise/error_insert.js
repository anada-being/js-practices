#!/usr/bin/env node

import { droptable, createTable, insertRow, getLastRowId, getRows } from "./no_nest_error.js";
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL UNIQUE
  )
`;

droptable()
  .then(() => createTable(createTableQuery))
  .then(() => insertRow())
  .then(() => getLastRowId())
  .then(() => getRows())
  .catch((err) => console.log(err.message));
