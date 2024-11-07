import { PacketType } from '../../constants/header.js';
import { makeNotification } from './game.notification.js';

export const createAddEnemyTowerNotification = (data, socket) => {
  const { towerId, x, y } = data;

  const notifiData = {
    towerId: towerId,
    x: x,
    y: y,
  };

  const protoType = PacketType.ADD_ENEMY_TOWER_NOTIFICATION;

  const packet = makeNotification(protoType, notifiData);
  socket.write(packet);
};

/**
 * message S2CAddEnemyTowerNotification {
    int32 towerId = 1;
    float x = 2;
    float y = 3;
} */
