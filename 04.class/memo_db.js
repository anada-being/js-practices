import DB from "./db.js";
import Memo from "./memo.js";

export default class MemoDB {
  constructor() {
    this.db = new DB();
  }

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

  async getMemos() {
    const memoDB = await this.db.allPromise("SELECT * FROM memos ORDER BY id");
    return memoDB.map((memo) => new Memo(memo.id, memo.content));
  }

  deleteMemo(id) {
    return this.db.runPromise("DELETE FROM memos WHERE id = ?", [id]);
  }
}

export default MemoDB;
