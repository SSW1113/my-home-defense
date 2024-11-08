import { getUserBySocket } from '../../sessions/user.session.js';
import { createEnemyTowerAttackNotification } from '../../utils/notification/tower.notification.js';

export const towerAttackHandler = async ({ data, socket }) => {
  try {
    console.log('towerAttackHandler data: ', data);
    const { towerId, monsterId } = data;

    const user = getUserBySocket(socket);

    const tower = user.getTower(towerId);
    if (!tower) {
      // 타워가 없음
    }

    const monster = user.getMonster(monsterId);
    if (!monster) {
      // 몬스터가 없음
    }

    createEnemyTowerAttackNotification(data, socket);
  } catch (e) {
    console.error(e);
  }
};
