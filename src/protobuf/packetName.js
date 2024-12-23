export const packetNames = {
  protoPacket: {
    GamePacket: 'protoPacket.GamePacket',
  },
  gameNotification: {
    S2CMatchStartNotification: 'protoPacket.S2CMatchStartNotification',
    S2CStateSyncNotification: 'protoPacket.S2CStateSyncNotification',
    S2CAddEnemyTowerNotification: 'protoPacket.S2CAddEnemyTowerNotification',
    S2CSpawnEnemyMonsterNotification: 'protoPacket.S2CSpawnEnemyMonsterNotification',
    S2CEnemyTowerAttackNotification: 'protoPacket.S2CEnemyTowerAttackNotification',
    S2CUpdateBaseHPNotification: 'protoPacket.S2CUpdateBaseHPNotification',
    S2CGameOverNotification: 'protoPacket.S2CGameOverNotification',
    C2SMonsterDeathNotification: 'protoPacket.C2SMonsterDeathNotification',
    S2CEnemyMonsterDeathNotification: 'protoPacket.S2CEnemyMonsterDeathNotification',
  },
  gameData: {
    Position: 'protoPacket.Position',
    BaseData: 'protoPacket.BaseData',
    TowerData: 'protoPacket.TowerData',
    MonsterData: 'protoPacket.MonsterData',
    InitialGameState: 'protoPacket.InitialGameState',
    GameState: 'protoPacket.GameState',
  },
  request: {
    C2SRegisterRequest: 'protoPacket.C2SRegisterRequest',
    C2SLoginRequest: 'protoPacket.C2SLoginRequest',
    C2SMatchRequest: 'protoPacket.C2SMatchRequest',
    C2STowerPurchaseRequest: 'protoPacket.C2STowerPurchaseRequest',
    C2SSpawnMonsterRequest: 'protoPacket.C2SSpawnMonsterRequest',
    C2STowerAttackRequest: 'protoPacket.C2STowerAttackRequest',
    C2SMonsterAttackBaseRequest: 'protoPacket.C2SMonsterAttackBaseRequest',
    C2SGameEndRequest: 'protoPacket.C2SGameEndRequest',
  },
  response: {
    S2CRegisterResponse: 'protoPacket.S2CRegisterResponse',
    S2CLoginResponse: 'protoPacket.S2CLoginResponse',
    S2CTowerPurchaseResponse: 'protoPacket.S2CTowerPurchaseResponse',
    S2CSpawnMonsterResponse: 'protoPacket.S2CSpawnMonsterResponse',
  },
};