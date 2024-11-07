import { createMatchStartNotification } from '../../utils/notification/game.notification.js';

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

  // 현재 생성한 몬스터 정보를 다른유저에게 알리는 함수
  getAllSpawnEnemyMonster(userId, monster) {
    this.users
      .filter((user) => user.id !== userId)
      .forEach((otherUser) => {
        const monsterData = {
          monsterId: monster.id,
          monsterNumber: monster.monsterNumber,
        };

        const notification = createResponse(
          PacketType.SPAWN_ENEMY_MONSTER_NOTIFICATION,
          monsterData,
        );

        otherUser.socket.write(notification); // 다른 유저에게 새 몬스터 정보 알림 // 제발
      });
  }

  // 이거는 자기 몬스터 상황을 다른 유저들에게 알리는 함수
  notifyEnemyMonsterDeath(userId, monsterId) {
    const notification = createResponse(PacketType.ENEMY_MONSTER_DEATH_NOTIFICATION, { monsterId });

    this.users
      .filter((user) => user.id !== userId)
      .forEach((otherUser) => otherUser.socket.write(notification)); // 여기서 다른 유저들(다른 클라이언트)에게 상황을 전달
  }
}

export default Game;
