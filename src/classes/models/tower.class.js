let towerCounter = 2;

class Tower {
  constructor(x, y) {
    this.id = this.getTowerId();
    this.x = x;
    this.y = y;
  }

  getTowerId() {
    return towerCounter++;
  }
}

export default Tower;

// class Tower {
//   constructor(towerId, x, y) {
//     this.id = towerId;
//     this.x = x;
//     this.y = y;
//   }
// }

// export default Tower;
