#!/usr/bin/env node

import { createTableQuery, droptable, createTable, insertRow, getRows } from "../common.js";

droptable()
.then(() => createTable(createTableQuery))
.then(() => insertRow())
.catch((err) => console.log(err.message))
.then(() => droptable())
.then(() => getRows())
.catch((err) => console.log(err.message));
