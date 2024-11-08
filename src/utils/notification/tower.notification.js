import { PacketType } from '../../constants/header.js';
import { makeNotification } from './game.notification.js';

export const createAddEnemyTowerNotification = (data, socket) => {
  console.log('addEnemyTowerNotification');
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

export const createEnemyTowerAttackNotification = (data, socket) => {
  console.log('enemyTowerAttackNotification');
  const { towerId, monsterId } = data;

  const notifiData = {
    towerId: towerId,
    monsterId: monsterId,
  };

  const protoType = PacketType.ENEMY_TOWER_ATTACK_NOTIFICATION;

  const packet = makeNotification(protoType, notifiData);
  socket.write(packet);
};

/**
 * message S2CEnemyTowerAttackNotification {
    int32 towerId = 1;
    int32 monsterId = 2;
}
} */
