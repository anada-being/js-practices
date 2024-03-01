#!/usr/bin/env node

import {
  createTableQuery,
  droptable,
  createTable,
  insertRow,
  getRows,
} from "../common.js";

errorGet();

async function errorGet() {
  await droptable();
  await createTable(createTableQuery);
  try {
    await insertRow();
  } catch (err) {
    console.log(err.message);
  }
  await droptable();
  try {
    await getRows();
  } catch (err) {
    console.log(err.message);
  }
  await droptable();
}
