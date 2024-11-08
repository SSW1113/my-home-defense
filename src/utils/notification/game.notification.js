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
    monsterSpawnInterval: 5000,
  };

  // 현재 플레이어 몬스터 경로 및 현재 플레이어 베이스 위치
  const monsterPath = generateRandomMonsterPath();
  const basePath = {
    x: monsterPath[monsterPath.length - 1].x,
    y: monsterPath[monsterPath.length - 1].y,
  };

  const playerGameData = {
    gold: 100,
    base: { hp: 500, maxHp: 500 }, // BaseData
    highScore: 100,
    towers: [
      { towerId: 1, x: 500, y: 320 },
      { towerId: 2, x: 600, y: 300 },
    ], // repeated TowerData
    monsters: [], // repeated MonsterData
    monsterLevel: 1,
    score: 0,
    monsterPath: monsterPath, // repeated Position
    basePosition: basePath, // Position
  };

  // 상대 몬스터 경로 및 상대 베이스 위치
  const opponentMonsterPath = generateRandomMonsterPath();
  const opponentBasePath = {
    x: opponentMonsterPath[opponentMonsterPath.length - 1].x,
    y: opponentMonsterPath[opponentMonsterPath.length - 1].y,
  };

  const opponentGameData = {
    gold: 100,
    base: { hp: 500, maxHp: 500 }, // BaseData
    highScore: 100,
    towers: [
      { towerId: 1, x: 500, y: 320 },
      { towerId: 2, x: 600, y: 300 },
    ], // repeated TowerData
    monsters: [], // repeated MonsterData
    monsterLevel: 1,
    score: 0,
    monsterPath: opponentMonsterPath, // repeated Position
    basePosition: opponentBasePath, // Position
  };

  const notifiData = {
    initialGameState: initialGameStateData,
    playerData: playerGameData,
    opponentData: opponentGameData,
  };

  const protoType = PacketType.MATCH_START_NOTIFICATION;

  return makeNotification(protoType, notifiData);
};

// 몬스터 경로생성 함수
function generateRandomMonsterPath() {
  // 게임 화면 특정 크기
  const minX = 0;
  const maxX = 1400;
  const minY = 250;
  const maxY = 400;

  const pathSize = 60; // 60 x 60 사이즈로 되어있음

  const path = [];
  let currentX = minX;
  let currentY = Math.floor(Math.random() * 21) + 300; // 300 ~ 320 범위의 y 시작 (캔버스 y축 중간쯤에서 시작할 수 있도록 유도)

  path.push({ x: currentX, y: currentY }); // 처음 경로 지정

  while (currentX < maxX) {
    currentX += Math.floor(Math.random()) + pathSize; // 0 ~ 60 범위의 x 증가
    // x 좌표에 대한 clamp 처리
    if (currentX > maxX) {
      currentX = maxX;
    }

    currentY += Math.floor(Math.random() * (pathSize * 2)) - pathSize; // -60 ~ 60 범위의 y 변경
    // y 좌표에 대한 clamp 처리
    if (currentY < minY) {
      currentY = minY;
    }
    if (currentY > maxY) {
      currentY = maxY;
    }

    path.push({ x: currentX, y: currentY });
  }

  return path;
}
