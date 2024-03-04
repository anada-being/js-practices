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

await runPromise(createTableQuery);
await getPromise(insertRowQuery);
await allPromise(selectQuery);
await runPromise(dropQuery);
