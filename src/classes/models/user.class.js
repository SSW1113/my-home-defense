import Base from "./base.class.js";

class User {
  constructor(socket, id) {
    this.socket = socket;
    this.id = id;
    this.sequence = 0;

    // 게임 데이터
    this.gold = 500;
    this.base = new Base(100);
    this.towers = [];
    this.monsters = [];
    this.monsterLevel = 1;
    this.score = 0;
    this.highscore = 0; // db 연결 필요
    this.monsterPath = this.generateRandomMonsterPath();
    this.basePosition = { x: this.monsterPath[this.monsterPath.length - 1].x, y: this.monsterPath[this.monsterPath.length - 1].y }
  }

  /*
  message GameState {
    int32 gold = 1;
    BaseData base = 2;
    int32 highScore = 3;
    repeated TowerData towers = 4;
    repeated MonsterData monsters = 5;
    int32 monsterLevel = 6;
    int32 score = 7;
    repeated Position monsterPath = 8;
    Position basePosition = 9;
  }
  */

  getNextSequence() {
    return ++this.sequence;
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
}

export default User;
