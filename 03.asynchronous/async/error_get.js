#!/usr/bin/env node

import { createTableQuery, droptable, createTable, insertRow, getLastRowId, getRows } from "./no_error.js";

errorGet();

async function errorGet(){
  await droptable();
  await createTable(createTableQuery);
  await insertRow("errorGet");
  await getLastRowId();
  await droptable();
  try {
    await getRows();
  }catch (err) {
    console.log(err.message);
  }
}
