let monsterCounter = 1; // 고유한 몬스터 ID 관리

class Monster {
  constructor() {
    this.id = this.getMonsterId();
    this.monsterNumber = this.getMonsterNumber(); // 이게 아마 몬스터 타입? 빨간 슬라임, 노랑 슬라임, 검은 슬라임
    // this.level = level;
  }

  getMonsterId() {
    return monsterCounter++;
  }

  getMonsterNumber() {
    const munsterNum = Math.floor(Math.random() * 4) + 1;
    return munsterNum;
  }
}

export default Monster;
