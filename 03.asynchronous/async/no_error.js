#!/usr/bin/env node

import { createTableQuery, droptable, createTable, insertRow, getLastRowId, getRows } from "../common.js";

main();

async function main(){
  await droptable();
  await createTable(createTableQuery);
  await insertRow("async");
  await getLastRowId();
  await getRows();
}
