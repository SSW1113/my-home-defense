import { createMatchStartNotification, makeNotification } from '../../utils/notification/game.notification.js';

import { PacketType } from '../../constants/header.js';
import { createResponse } from '../../utils/response/createRespose.js';

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
  }

  // 아마 이게 맞을것 같은데
  getAllSpawnEnemyMonster(userId) {
    const user = this.users.find((user) => user.id === userId);

    // 다른 유저의 몬스터 정보를 찾고 전달해주기 // 그러면 일단 각 유저들이 몬스터를 생성한 후에 실행해 줘야 맞겠는데
    this.users
      .filter((user) => user.id !== userId)
      .forEach((otherUser) => {
        const lastIndex = otherUser.monsters.length - 1;
        const monsterData = {
          monsterId: otherUser.monsters[lastIndex].id,
          monsterNumber: otherUser.monsters[lastIndex].monsterNumber,
        };
        const notification = createResponse(
          PacketType.SPAWN_ENEMY_MONSTER_NOTIFICATION,
          monsterData,
        );
        user.socket.write(notification); // 자기 자신에게 정보 전달
      });
  }

  // 이거는 자기 몬스터 상황을 다른 유저들에게 알리는 함수
  notifyEnemyMonsterDeath(userId, monsterId) {
    const notification = createResponse(PacketType.ENEMY_MONSTER_DEATH_NOTIFICATION, { monsterId });

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
    const stateData = this.users.filter((user) => user.id === userId).map((user) => {
      opponent = user;
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
