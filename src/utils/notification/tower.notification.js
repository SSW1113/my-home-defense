import { PacketType } from '../../constants/header.js';
import { makeNotification } from './game.notification.js';

export const createAddEnemyTowerNotification = (data, otherUser) => {
  const { towerId, x, y } = data;

  const notifiData = {
    towerId: towerId,
    x: x,
    y: y,
  };

  const protoType = PacketType.ADD_ENEMY_TOWER_NOTIFICATION;

  otherUser.forEach((user) => {
    const packet = makeNotification(protoType, notifiData, user.socket);
    user.socket.write(packet);
  });
};

export const createEnemyTowerAttackNotification = (data, otherUser) => {
  const { towerId, monsterId } = data;

  const notifiData = {
    towerId: towerId,
    monsterId: monsterId,
  };

  const protoType = PacketType.ENEMY_TOWER_ATTACK_NOTIFICATION;

  // 같은 세션에 있는 다른 유저에게 현재 클라이언트가 공격한 타워정보, 몬스터 정보를 주었습니다. 그래야 다른 클라이언트에서 해당 타워를 공격하게 해줄텐데
  otherUser.forEach((user) => {
    const packet = makeNotification(protoType, notifiData, user.socket);
    user.socket.write(packet);
  });
};
