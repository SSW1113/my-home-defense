class User {
  constructor(socket, id) {
    this.socket = socket;
    this.id = id;
    this.sequence = 0;
  }

  getNextSequence() {
    return ++this.sequence;
  }
}
