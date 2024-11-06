import { PacketType } from '../../constants/header.js';
import { createResponse } from '../../utils/response/createRespose.js';

class Game {
  constructor(id) {
    this.id = id;
    this.users = [];
  }

  addUser(user) {
    this.users.push(user);
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

  getSpawnEnemyMonster(userId) {
    const monsterData = this.users
      .filter((user) => user.id !== userId)
      .map((otherUser) => {
        const lastIndex = otherUser.monsters.length - 1;
        return {
          monsterId: otherUser.monsters[lastIndex].id,
          monsterNumber: otherUser.monsters[lastIndex].monsterNumber,
        };
      });

    return createResponse(PacketType.SPAWN_ENEMY_MONSTER_NOTIFICATION, monsterData);
  }
}

export default Game;

// message S2CSpawnEnemyMonsterNotification {
//   int32 monsterId = 1;
//   int32 monsterNumber = 2;
// }
