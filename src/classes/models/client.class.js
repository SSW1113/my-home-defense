let clientCounter = 1; // 고유한 몬스터 ID 관리

class Client {
  constructor(socket) {
    this.id = this.getClientId();
    this.socket = socket;
    this.sequence = 0;
  }

  getSequence() {
    return this.sequence;
  }

  updateSequence() {
    this.sequence++;
  }

  getClientId() {
    return clientCounter++;
  }
}

export default Client;
