import { PacketType } from '../../constants/header.js';

export const notificationProto = {
  [PacketType.MATCH_START_NOTIFICATION]: {
    protoType: 'gameNotification.S2CMatchStartNotification',
    fieldName: 'matchStartNotification',
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
