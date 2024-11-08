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

export const createEnemyTowerAttackNotification = (data, otherUser) => {
  console.log('enemyTowerAttackNotification');
  const { towerId, monsterId } = data;

  const notifiData = {
    towerId: towerId,
    monsterId: monsterId,
  };

  const protoType = PacketType.ENEMY_TOWER_ATTACK_NOTIFICATION;

  const packet = makeNotification(protoType, notifiData);

  // 같은 세션에 있는 다른 유저에게 현재 클라이언트가 공격한 타워정보, 몬스터 정보를 주었습니다. 그래야 다른 클라이언트에서 해당 타워를 공격하게 해줄텐데
  otherUser.forEach((user) => {
    user.socket.write(packet);
  });
  // 아 지금 각자 알려준 정보를 알려주면서 여러번 그려주는 중 이구만 이런면 안되는데
};

/**
 * message S2CEnemyTowerAttackNotification {
    int32 towerId = 1;
    int32 monsterId = 2;
}
} */
