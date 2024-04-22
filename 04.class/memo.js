export default class Memo {
  constructor(id, content) {
    this.id = id;
    this.title = this.#setTitle(content);
    this.content = content;
  }

  #setTitle(content) {
    if (content.match(/\S/) && !content.match(/\n/)) {
      return content;
    } else {
      return content.slice(0, content.indexOf("\n"));
    }
  }

  showTitle() {
    if (this.title) {
      return this.title;
    } else {
      return "NoTitle";
    }
  }
}
