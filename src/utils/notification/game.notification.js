import { PacketType } from '../../constants/header.js';
import { getProtoMessages } from '../../init/loadProto.js';
import { createHeader } from '../response/createHeader.js';
import { notificationProto } from './notificationPoroto.js';

/**
 * @param {*} packetType 패킷 타입
 * @param {*} data 페이로드
 * @returns
 */
export const makeNotification = (packetType, data) => {
  try {
    const protoMessages = getProtoMessages();
    const gamePacket = protoMessages['protoPacket']['GamePacket'];

    // 따로 저장한 notificationProto에서 protoType을 가져옴
    const [namespace, typeName] = notificationProto[packetType].protoType.split('.');
    const notification = protoMessages[namespace][typeName];

    const notificationInstance = notification.create(data);

    const gamePacketFieldName = notificationProto[packetType].fieldName;
    const gamePacketInstance = gamePacket.create({ [gamePacketFieldName]: notificationInstance });

    const sequence = 0;
    const buffer = gamePacket.encode(gamePacketInstance).finish();

    const headerPacket = createHeader(packetType, sequence, buffer.length);

    return Buffer.concat([headerPacket, buffer]);
  } catch (e) {
    console.error(e);
  }
};

export const createMatchStartNotification = (user, opponent) => {
  const initialGameStateData = {
    baseHp: 500,
    towerCost: 500,
    initialGold: 10000,
    monsterSpawnInterval: 5000,
  };
  const playerGameData = {
    gold: user.gold,
    base: user.base, // BaseData
    highScore: user.highScore,
    towers: user.towers, // repeated TowerData
    monsters: user.monsters, // repeated MonsterData
    monsterLevel: user.monsterLevel,
    score: user.score,
    monsterPath: user.monsterPath, // repeated Position
    basePosition: user.basePosition, // Position
  };

  const opponentGameData = {
    gold: opponent.gold,
    base: opponent.base, // BaseData
    highScore: opponent.highScore,
    towers: opponent.towers, // repeated TowerData
    monsters: opponent.monsters, // repeated MonsterData
    monsterLevel: opponent.monsterLevel,
    score: opponent.score,
    monsterPath: opponent.monsterPath, // repeated Position
    basePosition: opponent.basePosition, // Position
  };

  const notifiData = {
    initialGameState: initialGameStateData,
    playerData: playerGameData,
    opponentData: opponentGameData,
  };

  const protoType = PacketType.MATCH_START_NOTIFICATION;

  return makeNotification(protoType, notifiData);
};