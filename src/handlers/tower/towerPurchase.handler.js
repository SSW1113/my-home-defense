import { getUserBySocket } from '../../sessions/user.session.js';
import Tower from '../../classes/models/tower.class.js';
import { createResponse } from '../../utils/response/createRespose.js';
import { PacketType } from '../../constants/header.js';
import { config } from '../../config/config.js';
import { v4 as uuidv4 } from 'uuid';
import { createAddEnemyTowerNotification } from '../../utils/notification/tower.notification.js';

export const towerPurchaseHandler = async ({ data, socket }) => {
  try {
    const { x, y } = data;
    const user = getUserBySocket(socket);
    const towerId = uuidv4();

    if (!user) {
      throw Error(); // 유저가 존재하지 않음
    }

    const tower = new Tower(towerId, x, y);

    console.log('tower: ', tower);

    user.towers.push(tower);

    // 돈 검증

    const responseData = {
      towerId: towerId,
    };

    const towerPurchaseResponse = createResponse(PacketType.TOWER_PURCHASE_RESPONSE, responseData);
    const towerData = { towerId, x, y };
    createAddEnemyTowerNotification(towerData, socket);
    socket.write(towerPurchaseResponse);
  } catch (e) {
    console.error('Tower purchase handler error: ', e);
  }
};
