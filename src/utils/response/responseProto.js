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
};
