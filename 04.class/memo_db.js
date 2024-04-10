import DB from "./db.js"

class MemoDB {
  db = new DB();

  createTable() {
    return this.db.runPromise(
      "CREATE TABLE IF NOT EXISTS memos (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT NOT NULL)",
    );
  }

  createMemo(content) {
    return this.db.runPromise("INSERT INTO memos (content) VALUES (?)", [
      content,
    ]);
  }

  getMemos() {
    return this.db.allPromise("SELECT * FROM memos ORDER BY id");
  }

  deleteMemo(id) {
    return this.db.runPromise("DELETE FROM memos WHERE id = ?", [id]);
  }
}

export default MemoDB;
