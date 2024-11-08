import { PacketType } from '../../constants/header.js';

export const notificationProto = {
  [PacketType.MATCH_START_NOTIFICATION]: {
    protoType: 'gameNotification.S2CMatchStartNotification',
    fieldName: 'matchStartNotification',
  },
  [PacketType.ADD_ENEMY_TOWER_NOTIFICATION]: {
    protoType: 'gameNotification.S2CAddEnemyTowerNotification',
    fieldName: 'addEnemyTowerNotification',
  },
  [PacketType.ENEMY_TOWER_ATTACK_NOTIFICATION]: {
    protoType: 'gameNotification.S2CEnemyTowerAttackNotification',
    fieldName: 'enemyTowerAttackNotification',
  },
};
