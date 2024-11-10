import { getUserBySocket } from '../../sessions/user.session.js';
import Tower from '../../classes/models/tower.class.js';
import { createResponse } from '../../utils/response/createRespose.js';
import { PacketType } from '../../constants/header.js';
import { createAddEnemyTowerNotification } from '../../utils/notification/tower.notification.js';
import { getGameSessionById } from '../../sessions/game.session.js';

export const towerPurchaseHandler = async ({ data, socket }) => {
  try {
    const { x, y } = data;
    const currentUser = getUserBySocket(socket);

    if (!currentUser) {
      throw Error(); // 유저가 존재하지 않음
    }

    const tower = currentUser.createTower(x, y); // 타워 추가
    const towerId = tower.id;

    console.log('타워 구매됨 tower: ', tower);

    const gameSession = getGameSessionById(currentUser.getGameSession().id);
    // 골드 차감 동기화    
    currentUser.gold -= 3000;
    gameSession.getAllState(currentUser.id);

    const responseData = {
      towerId: towerId,
    };

    const towerPurchaseResponse = createResponse(
      PacketType.TOWER_PURCHASE_RESPONSE,
      responseData,
      socket,
    );
    socket.write(towerPurchaseResponse);

    const otherUsers = gameSession.users.filter((user) => user.id !== currentUser.id);

    const towerData = { towerId, x, y };
    createAddEnemyTowerNotification(towerData, otherUsers);
  } catch (e) {
    console.error('Tower purchase handler error: ', e);
  }
};
