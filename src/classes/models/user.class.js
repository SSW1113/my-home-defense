class User {
  constructor(socket, id) {
    this.socket = socket;
    this.id = id;
    this.sequence = 0;
    this.towers = [];
  }

  getNextSequence() {
    return ++this.sequence;
  }

  addTower(tower) {
    this.towers.push(tower);
  }

  getTower(id) {
    return this.towers.find((tower) => tower.id === id);
  }

  removeTower(id) {
    const index = this.towers.findIndex((tower) => tower.id === id);
    this.towers.splice(index, 1);
  }
}

export default User;
