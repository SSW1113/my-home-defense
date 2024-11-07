import { createMatchStartNotification } from "../../utils/notification/game.notification.js";

class Game {
  constructor(id) {
    this.id = id;
    this.users = [];

    this.initialGameState = {
      baseHp: 1,
      towerCost: 2,
      initialGold: 3,
      monsterSpawnInterval: 4,
    }
  }

  addUser(user) {
    this.users.push(user);

    // 게임 세션에 유저가 모두 모였으면 게임 시작
    if (this.users.length >= 2) {
      this.gameStart();
    }
  }

  getUser(userId) {
    return this.users.find((user) => user.id === userId);
  }

  removeUser(socket) {
    const index = this.users.findIndex((user) => user.socket === socket);
    if (index != -1) {
      return this.users.splice(index, 1)[0];
    }
  }
  // 유저들 반환
  getUsers() {
    return this.users;
  }
  // 대전 시작
  gameStart() {
    const gameStartPacket = createMatchStartNotification();
    const user1Socket = this.users[0].socket;
    const user2Socket = this.users[1].socket;
    user1Socket.write(gameStartPacket);
    user2Socket.write(gameStartPacket);
  }

}

export default Game;



// message GameState {
//   int32 gold = 1;
//   BaseData base = 2;
//   int32 highScore = 3;
//   repeated TowerData towers = 4;
//   repeated MonsterData monsters = 5;
//   int32 monsterLevel = 6;
//   int32 score = 7;
//   repeated Position monsterPath = 8;
//   Position basePosition = 9;
// }

// message InitialGameState {
//   int32 baseHp = 1;
//   int32 towerCost = 2;
//   int32 initialGold = 3;
//   int32 monsterSpawnInterval = 4;
// }

