#!/usr/bin/env node

import {
  createTableQuery,
  dropQuery,
  runPromise,
  getPromise,
  allPromise,
} from "../common_function_query.js";

runPromise(createTableQuery)
  .then(() => getPromise("INSERT INTO books (title) VALUES (null)"))
  .catch((err) => console.log(err.message))
  .then(() => allPromise("select * from book"))
  .catch((err) => console.log(err.message))
  .then(() => runPromise(dropQuery));
