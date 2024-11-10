import {
  createMatchStartNotification,
  makeNotification,
} from '../../utils/notification/game.notification.js';
import { PacketType } from '../../constants/header.js';

class Game {
  constructor(id) {
    this.id = id;
    this.users = [];
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
    const user1Socket = this.users[0].socket;
    const user2Socket = this.users[1].socket;

    const gameStartPacket1 = createMatchStartNotification(
      this.users[0],
      this.users[1],
      user1Socket,
    );
    const gameStartPacket2 = createMatchStartNotification(
      this.users[1],
      this.users[0],
      user2Socket,
    );

    user1Socket.write(gameStartPacket1);
    user2Socket.write(gameStartPacket2);
  }

  // 현재 생성한 몬스터 정보를 다른유저에게 알리는 함수
  getAllSpawnEnemyMonster(userId, monster) {
    const monsterData = {
      monsterId: monster.id,
      monsterNumber: monster.monsterNumber,
    };

    this.users
      .filter((user) => user.id !== userId)
      .forEach((otherUser) => {
        const notification = makeNotification(
          PacketType.SPAWN_ENEMY_MONSTER_NOTIFICATION,
          monsterData,
          otherUser.socket,
        );
        otherUser.socket.write(notification); // 다른 유저에게 새 몬스터 정보 알림 // 제발
      });
  }

  // 이거는 자기 몬스터 상황을 다른 유저들에게 알리는 함수
  notifyEnemyMonsterDeath(userId, monsterId) {
    this.users
      .filter((user) => user.id !== userId)
      .forEach((otherUser) => {
        const notification = makeNotification(
          PacketType.ENEMY_MONSTER_DEATH_NOTIFICATION,
          { monsterId },
          otherUser.socket,
        );
        otherUser.socket.write(notification);
      }); // 여기서 다른 유저들(다른 클라이언트)에게 상황을 전달
  }

  // 상태동기화
  getAllState(userId) {
    const user = this.getUserById(userId);
    const stateData = {
      userGold: user.gold,
      baseHp: user.base.hp,
      monsterLevel: user.monsterLevel,
      score: user.score,
      towers: user.towers,
      monsters: user.monsters,
    };
    //console.log('id: ', userId, 'state: ', stateData);
    const protoType = PacketType.STATE_SYNC_NOTIFICATION;
    const packet = makeNotification(protoType, stateData, user.socket);
    user.socket.write(packet);
  }
}

export default Game;
