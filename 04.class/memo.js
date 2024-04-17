export default class Memo {
  constructor(id, content) {
    this.id = id;
    this.title = this.firstRow(content) || this.onlyRow(content);
    this.content = content;
  }

  firstRow(content) {
    content.slice(0, content.indexOf("\n"));
  }

  onlyRow(content) {
    if (content.match(/\S/) && !content.match(/\n/)) {
      return content;
    }
  }
}
