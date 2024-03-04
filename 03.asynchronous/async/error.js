#!/usr/bin/env node

import {
  createTableQuery,
  dropQuery,
  runPromise,
  getPromise,
  allPromise,
} from "../common_function_query.js";

await runPromise(createTableQuery);
try {
  await getPromise("INSERT INTO books (title) VALUES (null)");
} catch (err) {
  if (err["errno"] == 19) {
    console.error(err.message);
  } else {
    console.error(err);
  }
}
try {
  await allPromise("SELECT * FROM book");
} catch (err) {
  if (err["errno"] == 1) {
    console.error(err.message);
  } else {
    console.error(err);
  }
}
await runPromise(dropQuery);
