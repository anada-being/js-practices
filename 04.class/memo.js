export default class Memo {
  constructor(id, content) {
    this.id = id;
    this.title = this.#makeTitle(content);
    this.content = content;
  }

  #makeTitle(content) {
    const firstRow = this.#makeFirstRow(content);
    if (!firstRow) {
      return "NoTitle";
    } else {
      return firstRow;
    }
  }

  #makeFirstRow(content) {
    if (content.match(/\n/)) {
      return content.slice(0, content.indexOf("\n"));
    } else if (content.match(/\S/)) {
      return content;
    }
  }
}
