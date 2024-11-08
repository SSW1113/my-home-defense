import Base from './base.class.js';

class User {
  constructor(socket, id) {
    this.socket = socket;
    this.id = id;
    this.sequence = 0;
    this.towers = [];
    this.monsters = [];
    this.gameSession;

    // 게임 데이터
    this.gold = 500;
    this.base = new Base(100);
    this.towers = [];
    this.monsters = [];
    this.monsterLevel = 1;
    this.score = 0;
    this.highscore = 0; // db 연결 필요
    this.monsterPath = this.generateRandomMonsterPath();
    this.basePosition = {
      x: this.monsterPath[this.monsterPath.length - 1].x,
      y: this.monsterPath[this.monsterPath.length - 1].y,
    };
  }

  setGameSession(gameSession) {
    this.gameSession = gameSession;
  }

  getGameSession() {
    return this.gameSession;
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

  generateRandomMonsterPath() {
    const path = [];
    let currentX = 0;
    let currentY = Math.floor(Math.random() * 21) + 500; // 500 ~ 520 범위의 y 시작 (캔버스 y축 중간쯤에서 시작할 수 있도록 유도)

    path.push({ x: currentX, y: currentY });

    while (currentX < 1000) {
      currentX += Math.floor(Math.random() * 100) + 50; // 50 ~ 150 범위의 x 증가
      // x 좌표에 대한 clamp 처리
      if (currentX > 1000) {
        currentX = 1000;
      }

      currentY += Math.floor(Math.random() * 100) - 50; // -50 ~ 50 범위의 y 변경
      // y 좌표에 대한 clamp 처리
      if (currentY < 0) {
        currentY = 0;
      }
      if (currentY > 1000) {
        currentY = 1000;
      }

      path.push({ x: currentX, y: currentY });
    }

    return path;
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

  getTower(towerId) {
    const tower = this.towers.find((tower) => tower.id === towerId);
    return tower;
  }
}

export default User;
