import { getGameSessionById } from '../../sessions/game.session.js';
import { getUserBySocket } from '../../sessions/user.session.js';
import { createEnemyTowerAttackNotification } from '../../utils/notification/tower.notification.js';

export const towerAttackHandler = async ({ packetType, data, socket }) => {
  try {
    const { towerId, monsterId } = data;
    console.log('towerId , monsterId', towerId, monsterId);

    const currentUser = getUserBySocket(socket);

    const tower = currentUser.getTower(towerId);
    if (!tower) {
      // 타워가 없음
      console.log(currentUser.towers);
      console.log(tower);
      console.error('타워를 찾을 수 없습니다.'); // 이게 뜨면 생각한게 맞는건데
    }

    const monster = currentUser.getMonster(monsterId);
    if (!monster) {
      // 몬스터가 없음
      console.log(currentUser.monsters);
      console.log(monster);
      console.error('몬스터를 찾을 수 없습니다.');
    }

    const gameSession = getGameSessionById(currentUser.getGameSession().id);

    const otherUser = gameSession.users.filter((user) => user.id !== currentUser.id);

    createEnemyTowerAttackNotification(data, otherUsers);
  } catch (e) {
    console.error(e);
  }
};
