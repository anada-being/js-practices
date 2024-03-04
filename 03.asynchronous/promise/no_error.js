#!/usr/bin/env node

import {
  createTableQuery,
  insertRowQuery,
  selectQuery,
  dropQuery,
  runPromise,
  getPromise,
  allPromise,
} from "../common_function_query.js";

runPromise(createTableQuery)
  .then(() => getPromise(insertRowQuery))
  .then(() => allPromise(selectQuery))
  .then(() => runPromise(dropQuery));
