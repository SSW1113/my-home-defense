import Base from './base.class.js';
import Monster from './monster.class.js';
import Tower from './tower.class.js';

class User {
  constructor(socket, id) {
    this.socket = socket;
    this.id = id;
    this.sequence = 0;
    this.gameSession;

    this.isWin = false;

    // 게임 데이터
    this.gameSession;
    this.gold = 5000;
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

  // 게임 데이터 초기화
  initUser() {
    this.gameSession = null;
    this.gold = 5000;
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

  // 몬스터 경로생성 함수
  generateRandomMonsterPath() {
    // 게임 화면 특정 크기
    const minX = 0;
    const maxX = 1400;
    const minY = 250;
    const maxY = 400;

    const pathSize = 60; // 60 x 60 사이즈로 되어있음

    const path = [];
    let currentX = minX;
    let currentY = Math.floor(Math.random() * 21) + 300; // 300 ~ 320 범위의 y 시작 (캔버스 y축 중간쯤에서 시작할 수 있도록 유도)

    path.push({ x: currentX, y: currentY }); // 처음 경로 지정

    while (currentX < maxX) {
      currentX += Math.floor(Math.random()) + pathSize; // 0 ~ 60 범위의 x 증가
      // x 좌표에 대한 clamp 처리
      if (currentX > maxX) {
        currentX = maxX;
      }

      currentY += Math.floor(Math.random() * (pathSize * 2)) - pathSize; // -60 ~ 60 범위의 y 변경
      // y 좌표에 대한 clamp 처리
      if (currentY < minY) {
        currentY = minY;
      }
      if (currentY > maxY) {
        currentY = maxY;
      }

      path.push({ x: currentX, y: currentY });
    }

    return path;
  }

  addMonster(monster) {
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

  // 유저의 base에 데미지
  getBaseDamage(dmg) {
    this.base.hp -= dmg;
    return this.base.hp;
  }

  getAllState() {
    const stateData = {
      userGold: this.gold,
      baseHp: this.base.hp,
      monsterLevel: this.monsterLevel,
      score: this.score,
      towers: this.towers,
      monsters: this.monsters,
    };

    const protoType = PacketType.STATE_SYNC_NOTIFICATION;
    const packet = makeNotification(protoType, stateData);
    this.socket.write(packet);
  }
  getTower(towerId) {
    const tower = this.towers.find((tower) => tower.id === towerId);
    return tower;
  }
}
export default User;
