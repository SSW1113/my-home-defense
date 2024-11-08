import {
  createMatchStartNotification,
  makeNotification,
} from '../../utils/notification/game.notification.js';
import { PacketType } from '../../constants/header.js';

class Game {
  constructor(id) {
    this.id = id;
    this.users = [];

    this.initialGameState = {
      baseHp: 1,
      towerCost: 2,
      initialGold: 3,
      monsterSpawnInterval: 4,
    };
  }

  addUser(user) {
    this.users.push(user);

    // 게임 세션에 유저가 모두 모였으면 게임 시작
    if (this.users.length >= 2) {
      this.gameStart();
    }
  }

  getUserById(userId) {
    return this.users.find((user) => user.id === userId);
  }

  getUserBySocket(socket) {
    return this.users.find((user) => user.socket === socket);
  }

  // 게임의 users에서 입력받은 유저가 아닌 상대 유저를 받아옴
  getOpponentUser(userId) {
    return this.users.filter((user) => user.id !== userId);
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
    const user1 = this.users[0];
    const user2 = this.users[1];

    user1.towers.push({ id: 1, x: 500, y: 320 }, { id: 2, x: 600, y: 300 });
    user2.towers.push({ id: 1, x: 500, y: 320 }, { id: 2, x: 600, y: 300 });

    console.log('------------------------user1 towers: ', user1.towers);
    console.log('------------------------user2 towers: ', user2.towers);
  }

  // 현재 생성한 몬스터 정보를 다른유저에게 알리는 함수
  getAllSpawnEnemyMonster(userId, monster) {
    this.users
      .filter((user) => user.id !== userId)
      .forEach((otherUser) => {
        const monsterData = {
          monsterId: monster.id,
          monsterNumber: monster.monsterNumber,
        };

        const notification = makeNotification(
          PacketType.SPAWN_ENEMY_MONSTER_NOTIFICATION,
          monsterData,
        );

        otherUser.socket.write(notification); // 다른 유저에게 새 몬스터 정보 알림 // 제발
      });
  }

  // 이거는 자기 몬스터 상황을 다른 유저들에게 알리는 함수
  notifyEnemyMonsterDeath(userId, monsterId) {
    const notification = makeNotification(PacketType.ENEMY_MONSTER_DEATH_NOTIFICATION, {
      monsterId,
    });

    this.users
      .filter((user) => user.id !== userId)
      .forEach((otherUser) => otherUser.socket.write(notification)); // 여기서 다른 유저들(다른 클라이언트)에게 상황을 전달
  }

  //  message S2CStateSyncNotification {
  //   int32 userGold = 1;
  //   int32 baseHp = 2;
  //   int32 monsterLevel = 3;
  //   int32 score = 4;
  //   repeated TowerData towers = 5;
  //   repeated MonsterData monsters = 6;
  // }

  // 상태동기화 (?)
  getAllState(userId) {
    const stateData = this.users
      .filter((user) => user.id === userId)
      .map((user) => {
        return {
          userGold: user.gold,
          baseHp: user.base.hp,
          monsterLevel: user.monsterLevel,
          score: user.score,
          towers: user.towers,
          monsters: user.monsters,
        };
      });
    console.log(' id : ', userId, stateData);
    const protoType = PacketType.STATE_SYNC_NOTIFICATION;
    return makeNotification(protoType, stateData);
  }
}

export default Game;
