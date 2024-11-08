import { PacketType } from '../constants/header.js';
import { registerHandler } from './user/register.handler.js';
import { loginHandler } from './user/login.handler.js';
import { towerPurchaseHandler } from './tower/towerPurchase.handler.js';
import { matchStartHandler } from './game/match.handler.js';
import { gameOverHandler, monsterBaseAttackHandler } from './game/monster.baseattack.js';
import { spawnMonsterHandler } from './game/spawMonster.handler.js';
import { monsterDeathNotifyHandler } from './game/monsterDeath.handler.js';
import { towerAttackHandler } from './tower/towerAttack.handler.js';

const handlers = {
  [PacketType.REGISTER_REQUEST]: {
    handler: registerHandler,
    protoType: 'request.C2SRegisterRequest',
  },
  [PacketType.LOGIN_REQUEST]: {
    handler: loginHandler,
    protoType: 'request.C2SLoginRequest',
  },
  [PacketType.TOWER_PURCHASE_REQUEST]: {
    handler: towerPurchaseHandler,
    protoType: 'request.C2STowerPurchaseRequest',
  },
  [PacketType.MATCH_REQUEST]: {
    handler: matchStartHandler,
    protoType: 'request.C2SMatchRequest',
  },
  [PacketType.MONSTER_ATTACK_BASE_REQUEST]: {
    handler: monsterBaseAttackHandler,
    protoType: 'request.C2SMonsterAttackBaseRequest',
  },
  [PacketType.SPAWN_MONSTER_REQUEST]: {
    handler: spawnMonsterHandler,
    protoType: 'request.C2SSpawnMonsterRequest',
  },
  [PacketType.MONSTER_DEATH_NOTIFICATION]: {
    handler: monsterDeathNotifyHandler,
    protoType: 'gameNotification.C2SMonsterDeathNotification',
  },
  [PacketType.GAME_END_REQUEST]: {
    handler: gameOverHandler,
    protoType: 'request.C2SGameEndRequest',
  },
  [PacketType.TOWER_ATTACK_REQUEST]: {
    handler: towerAttackHandler,
    protoType: 'request.C2STowerAttackRequest',
  },
};

export const getHandlerById = (packetType) => {
  if (!handlers[packetType]) {
    throw Error();
  }

  return handlers[packetType].handler;
};

export const getProtoTypeNameByPacketType = (packetType) => {
  if (!handlers[packetType]) {
    throw Error();
  }

  return handlers[packetType].protoType;
};
