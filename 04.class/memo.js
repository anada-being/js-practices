export class Memo {
  constructor(id, content) {
    this.id = id;
    this.title = content.slice(0, content.indexOf("\n"));
    this.content = content;
  }
}
