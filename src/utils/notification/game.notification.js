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
      { towerId: 1, x: 10, y: 20 },
      { towerId: 2, x: 20, y: 10 },
    ], // repeated TowerData
    monsters: [
      { monsterId: 1, monsterNumber: 1, level: 1 },
      { monsterId: 2, monsterNumber: 2, level: 2 },
    ], // repeated MonsterData
    monsterLevel: 1,
    score: 0,
    monsterPath: [
      { x: 0, y: 10 },
      { x: 10, y: 10 },
      { x: 20, y: 10 },
      { x: 30, y: 10 },
      { x: 40, y: 10 },
    ], // repeated Position
    basePosition: { x: 40, y: 10 }, // Position
  };

  const opponentGameData = {
    gold: 100,
    base: {
      hp: 500,
      maxHp: 500,
    }, // BaseData
    highScore: 100,
    towers: [
      { towerId: 1, x: 10, y: 20 },
      { towerId: 2, x: 20, y: 10 },
    ], // repeated TowerData
    monsters: [
      { monsterId: 1, monsterNumber: 1, level: 1 },
      { monsterId: 2, monsterNumber: 2, level: 2 },
    ], // repeated MonsterData
    monsterLevel: 1,
    score: 0,
    monsterPath: [
      { x: 0, y: 10 },
      { x: 10, y: 10 },
      { x: 20, y: 10 },
      { x: 30, y: 10 },
      { x: 40, y: 10 },
    ], // repeated Position
    basePosition: { x: 40, y: 10 }, // Position
  };

  const notifiData = {
    initialGameState: initialGameStateData,
    playerData: playerGameData,
    opponentData: opponentGameData,
  };

  const protoType = PacketType.MATCH_START_NOTIFICATION;

  return makeNotification(protoType, notifiData);
};

// message InitialGameState {
//     int32 baseHp = 1;
//     int32 towerCost = 2;
//     int32 initialGold = 3;
//     int32 monsterSpawnInterval = 4;
//   }

//   message GameState {
//     int32 gold = 1;
//     BaseData base = 2;
//     int32 highScore = 3;
//     repeated TowerData towers = 4;
//     repeated MonsterData monsters = 5;
//     int32 monsterLevel = 6;
//     int32 score = 7;
//     repeated Position monsterPath = 8;
//     Position basePosition = 9;
//   }

// InitialGameState initialGameState = 1;
// GameState playerData = 2;
// GameState opponentData = 3;


