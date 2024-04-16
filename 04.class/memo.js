export default class Memo {
  constructor(id, content) {
    this.id = id;
    this.title = content.slice(0, content.indexOf("\n")) || this.onlyRow(content);
    this.content = content;
  }

  onlyRow(content) {
    if (content.match(/\S/) && !content.match(/\n/)) {
      return content;
    }
  }
}
