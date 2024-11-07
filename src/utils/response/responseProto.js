import { PacketType } from '../../constants/header.js';

export const responseProto = {
  [PacketType.REGISTER_RESPONSE]: {
    protoType: 'response.S2CRegisterResponse',
    fieldName: 'registerResponse',
  },
  [PacketType.LOGIN_RESPONSE]: {
    protoType: 'response.S2CLoginResponse',
    fieldName: 'loginResponse',
  },
  [PacketType.TOWER_PURCHASE_RESPONSE]: {
    protoType: 'response.S2CTowerPurchaseResponse',
    fieldName: 'towerPurchaseResponse',
  },
  [PacketType.SPAWN_MONSTER_RESPONSE]: {
    protoType: 'response.S2CSpawnMonsterResponse',
    fieldName: 'spawnMonsterResponse',
  },
  [PacketType.SPAWN_ENEMY_MONSTER_NOTIFICATION]: {
    protoType: 'gameNotification.S2CSpawnEnemyMonsterNotification',
    fieldName: 'spawnEnemyMonsterNotification',
  },
  [PacketType.ENEMY_MONSTER_DEATH_NOTIFICATION]: {
    protoType: 'gameNotification.S2CEnemyMonsterDeathNotification',
    fieldName: 'enemyMonsterDeathNotification',
  },
};
