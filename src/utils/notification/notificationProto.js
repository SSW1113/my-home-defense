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
  [PacketType.STATE_SYNC_NOTIFICATION]: {
    protoType: 'gameNotification.S2CStateSyncNotification',
    fieldName: 'stateSyncNotification',
  },
  [PacketType.ADD_ENEMY_TOWER_NOTIFICATION]: {
    protoType: 'gameNotification.S2CAddEnemyTowerNotification',
    fieldName: 'addEnemyTowerNotification',
  },
  [PacketType.UPDATE_BASE_HP_NOTIFICATION]: {
    protoType: 'gameNotification.S2CUpdateBaseHPNotification',
    fieldName: 'updateBaseHpNotification',
  },
  [PacketType.GAME_OVER_NOTIFICATION]: {
    protoType: 'gameNotification.S2CGameOverNotification',
    fieldName: 'gameOverNotification',
  },
  [PacketType.ENEMY_TOWER_ATTACK_NOTIFICATION]: {
    protoType: 'gameNotification.S2CEnemyTowerAttackNotification',
    fieldName: 'enemyTowerAttackNotification',
  },
};
