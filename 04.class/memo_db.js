import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./memo.db");

await runPromise(
  db,
  "CREATE TABLE IF NOT EXISTS memos (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT NOT NULL)",
);

export class MemoDB {
  async createMemo(content) {
    await runPromise(db, "INSERT INTO memos (content) VALUES (?)", [content]);
  }
  async getMemo() {
    return await allPromise(db, "SELECT * FROM memos");
  }
  async deleteMemo(id) {
    await runPromise(db, "DELETE FROM memos WHERE id = ?", [id]);
  }
}

function runPromise(db, query, params) {
  return new Promise((resolve, reject) => {
    db.run(query, params, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this);
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

