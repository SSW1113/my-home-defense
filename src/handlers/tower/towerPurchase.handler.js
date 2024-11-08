import { getUserBySocket } from '../../sessions/user.session.js';
import Tower from '../../classes/models/tower.class.js';
import { createResponse } from '../../utils/response/createRespose.js';
import { PacketType } from '../../constants/header.js';
import { createAddEnemyTowerNotification } from '../../utils/notification/tower.notification.js';
import { getGameSessionById } from '../../sessions/game.session.js';

export const towerPurchaseHandler = async ({ data, socket }) => {
  try {
    const { x, y } = data;
    const user = getUserBySocket(socket);

    if (!user) {
      throw Error(); // 유저가 존재하지 않음
    }

    const tower = new Tower(x, y);
    const towerId = tower.id;

    console.log('타워 구매됨 tower: ', tower);

    user.towers.push(tower);

    let responseData;

    // 돈 검증
    const gameSession = getGameSessionById(user.getGameSession().id);
    if (user.gold < gameSession.initialGameState.towerCost) {
      responseData = {
        towerId: undefined, // 이게 맞나
      };
    } else {
      responseData = {
        towerId: towerId,
      };
      const towerData = { towerId, x, y };
      createAddEnemyTowerNotification(towerData, socket);
    }

    const towerPurchaseResponse = createResponse(PacketType.TOWER_PURCHASE_RESPONSE, responseData);
    socket.write(towerPurchaseResponse);
  } catch (e) {
    console.error('Tower purchase handler error: ', e);
  }
};
