export default class Memo {
  constructor(id, content) {
    this.id = id;
    this.title = this.setitle(content);
    this.content = content;
  }

  setitle(content) {
    if (content.match(/\S/) && !content.match(/\n/)) {
      return content;
    } else {
      return content.slice(0, content.indexOf("\n"));
    }
  }
}
