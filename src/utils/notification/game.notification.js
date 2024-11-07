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

export const createMatchStartNotification = () => {
  const initialGameStateData = {
    baseHp: 500,
    towerCost: 500,
    initialGold: 1000,
    monsterSpawnInterval: 100,
  };

  const playerGameData = {
    gold: 100,
    base: { hp: 500, maxHp: 500 }, // BaseData
    highScore: 100,
    towers: [
      { towerId: 1, x: 500, y: 350 },
      { towerId: 2, x: 550, y: 330 },
    ], // repeated TowerData
    monsters: [], // repeated MonsterData
    monsterLevel: 1,
    score: 0,
    monsterPath: [
      { x: 0, y: 300 },
      { x: 1500, y: 300 },
    ], // repeated Position
    basePosition: { x: 1350, y: 300 }, // Position
  };

  const opponentGameData = {
    gold: 100,
    base: { hp: 500, maxHp: 500 }, // BaseData
    highScore: 100,
    towers: [
      { towerId: 1, x: 500, y: 350 },
      { towerId: 2, x: 550, y: 330 },
    ], // repeated TowerData
    monsters: [], // repeated MonsterData
    monsterLevel: 1,
    score: 0,
    monsterPath: [
      { x: 0, y: 300 },
      { x: 1500, y: 300 },
    ], // repeated Position
    basePosition: { x: 1350, y: 300 }, // Position
  };

  const notifiData = {
    initialGameState: initialGameStateData,
    playerData: playerGameData,
    opponentData: opponentGameData,
  };

  const protoType = PacketType.MATCH_START_NOTIFICATION;

  return makeNotification(protoType, notifiData);
};
