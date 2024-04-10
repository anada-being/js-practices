import DB from "./db.js"

class MemoDB {
  db = new DB();

  async createTable() {
    await this.db.runPromise(
      "CREATE TABLE IF NOT EXISTS memos (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT NOT NULL)",
    );
  }

  async createMemo(content) {
    await this.db.runPromise("INSERT INTO memos (content) VALUES (?)", [
      content,
    ]);
  }

  async getMemos() {
    return await this.db.allPromise("SELECT * FROM memos ORDER BY id");
  }

  async deleteMemo(id) {
    await this.db.runPromise("DELETE FROM memos WHERE id = ?", [id]);
  }
}

export default MemoDB;
