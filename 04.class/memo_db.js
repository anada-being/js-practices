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
    const memorows = await this.db.allPromise(
      "SELECT * FROM memos ORDER BY id",
    );
    return memorows.map((memorow) => new Memo(memorow.id, memorow.content));
  }

  deleteMemo(id) {
    return this.db.runPromise("DELETE FROM memos WHERE id = ?", [id]);
  }
}
