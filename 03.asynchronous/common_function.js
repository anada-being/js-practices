#!/usr/bin/env node

function runPromise(db, query, bool) {
  return new Promise((resolve, reject) => {
    db.run(query, function (err) {
      if (err) {
        reject(err);
      } else if (bool) {
        resolve(this.lastID);
      } else {
        resolve();
      }
    });
  });
}

function allPromise(db, query) {
  return new Promise((resolve, reject) => {
    db.all(query, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

export { runPromise, allPromise };
