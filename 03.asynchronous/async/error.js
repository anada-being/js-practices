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
    console.log(err.message);
  } else {
    console.log(err);
  }
}
try {
  await allPromise("SELECT * FROM book");
} catch (err) {
  if (err["errno"] == 1) {
    console.log(err.message);
  } else {
    console.log(err);
  }
}
await runPromise(dropQuery);
