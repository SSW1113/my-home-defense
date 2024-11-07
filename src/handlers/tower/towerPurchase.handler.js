import { getUserBySocket } from '../../sessions/user.session.js';
import Tower from '../../classes/models/tower.class.js';
import { createResponse } from '../../utils/response/createRespose.js';
import { PacketType } from '../../constants/header.js';
import { config } from '../../config/config.js';
import { v4 as uuidv4 } from 'uuid';

export const towerPurchaseHandler = async ({ data, socket }) => {
  try {
    const { x, y } = data;
    const user = getUserBySocket(socket);
    const towerId = uuidv4();

    if (!user) {
      throw Error(); // 유저가 존재하지 않음
    }

    const tower = new Tower(towerId, x, y);

    user.towers.push(tower);

    // 돈 검증

    const responseData = {
      towerId: 1,
    };

    const towerPurchaseResponse = createResponse(PacketType.TOWER_PURCHASE_RESPONSE, responseData);
    socket.write(towerPurchaseResponse);
  } catch (e) {
    console.error('Tower purchase handler error: ', e);
  }
};
