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
  .catch((err) => {
    if (err["errno"] == 19) {
      console.error(err.message);
    } else {
      console.error(err);
    }
  })
  .then(() => allPromise("SELECT * FROM book"))
  .catch((err) => {
    if (err["errno"] == 1) {
      console.error(err.message);
    } else {
      console.error(err);
    }
  })
  .then(() => runPromise(dropQuery));
