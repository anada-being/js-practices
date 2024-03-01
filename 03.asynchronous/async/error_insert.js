#!/usr/bin/env node

import { createTableQuery, droptable, createTable, insertRow, getLastRowId, getRows } from "./no_error.js";

errorInsert();

async function errorInsert(){
  await droptable();
  await createTable(createTableQuery);
  try {
    await insertRow();
  }catch (err) {
    console.log(err.message);
  }
  await getLastRowId();
  await getRows();
}
