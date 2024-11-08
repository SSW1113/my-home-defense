let towerCounter = 2;

class Tower {
  constructor(x, y) {
    this.id = this.getTowerId;
    this.x = x;
    this.y = y;
  }

  getTowerId() {
    return towerCounter++;
  }
}

export default Tower;
