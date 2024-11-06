class User {
  constructor(socket, id) {
    this.socket = socket;
    this.id = id;
    this.sequence = 0;
    this.monsters = [];
  }

  getNextSequence() {
    return ++this.sequence;
  }

  createMonster(monster) {
    this.monsters.push(monster);
  }

  getMonster(monsterId) {
    const monster = this.monsters.find((monster) => monster.id === monsterId);
    return monster;
  }

  /**
   * 몬스터 삭제
   * @param {int} monsterId 클라이언트에서 받은 monsterId 넣어주기
   * @returns
   */
  removeMonster(monsterId) {
    const index = this.monsters.findIndex((monster) => monster.id === monsterId);
    return this.monsters.splice(index, 1)[0];
  }

  /**
   * 게임 종료 및 여러 상황에서 전체 몬스터 정보 초기화
   */
  clearMonster() {
    this.monsters = [];
  }
}

export default User;
