let monsterCounter = 1; // 고유한 몬스터 ID 관리

class Monster {
  constructor(level) {
    this.id = this.getMonsterId();
    this.monsterNumber = this.getMonsterNumber(); // 이게 아마 몬스터 타입? (1~5 : 검/파/초/빨/노)
    this.level = level || 1; // 일단 없으면 1로 설정
  }

  getMonsterId() {
    return monsterCounter++;
  }

  getMonsterNumber() {
    const munsterNum = Math.floor(Math.random() * 5) + 1; // 몬스터 5마리네요
    return munsterNum;
  }
}

export default Monster;
