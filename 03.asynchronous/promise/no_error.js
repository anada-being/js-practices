#!/usr/bin/env node

import {
  createTableQuery,
  droptable,
  createTable,
  insertRow,
  getLastRowId,
  getRows,
} from "../common.js";

droptable()
  .then(() => createTable(createTableQuery))
  .then(() => insertRow("test"))
  .then(() => getLastRowId())
  .then(() => getRows())
  .then(() => droptable());
