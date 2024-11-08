import { getGameSessionById } from '../../sessions/game.session.js';
import { getUserBySocket } from '../../sessions/user.session.js';
import { createEnemyTowerAttackNotification } from '../../utils/notification/tower.notification.js';

export const towerAttackHandler = async ({ data, socket }) => {
  try {
    console.log('towerAttackHandler data: ', data);
    const { towerId, monsterId } = data;

    const currentUser = getUserBySocket(socket);

    const tower = currentUser.getTower(towerId);
    if (!tower) {
      // 타워가 없음
      console.log('타워를 찾을 수 없습니다.'); // 이게 뜨면 생각한게 맞는건데
    }

    console.log('currentUser monsters: ', currentUser.monsters);

    const monster = currentUser.getMonster(monsterId);
    if (!monster) {
      // 몬스터가 없음
      console.log('몬스터를 찾을 수 없습니다.');
    }

    const gameSession = getGameSessionById(currentUser.getGameSession().id);
    console.log('----------gameSession----------', gameSession);

    const otherUser = gameSession.users.filter((user) => user.id !== currentUser.id);

    console.log('opponentUser monsters: ', otherUser[0].monsters);

    createEnemyTowerAttackNotification(data, otherUser);
  } catch (e) {
    console.error(e);
  }
};

/**
 * message C2STowerAttackRequest {
    int32 towerId = 1;
    int32 monsterId = 2;
}
 */