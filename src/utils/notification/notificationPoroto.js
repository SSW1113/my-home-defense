import { PacketType } from '../../constants/header.js';

export const notificationProto = {
  [PacketType.MATCH_START_NOTIFICATION]: {
    protoType: 'gameNotification.S2CMatchStartNotification',
    fieldName: 'matchStartNotification',
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
};
