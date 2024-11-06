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
}

export default Game;

// message S2CSpawnEnemyMonsterNotification {
//   int32 monsterId = 1;
//   int32 monsterNumber = 2;
// }
