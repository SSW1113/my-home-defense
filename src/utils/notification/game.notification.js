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

/*
message S2CMatchStartNotification {
    InitialGameState initialGameState = 1;
    GameState playerData = 2;
    GameState opponentData = 3;
}
*/
export const createMatchStartNotification = () => {
    const protoMessages = getProtoMessages();
    const initialGameState = protoMessages['gameData']['InitialGameState'];

    const initialGameStateData = initialGameState.create({
        baseHp: 500,
        towerCost: 500,
        initialGold: 1000,
        monsterSpawnInterval: 100,
    });

    const baseData = protoMessages['gameData']['BaseData'];
    const baseDataPayload = baseData.create({
        hp: 500,
        maxHp: 500,
    });


    // repeated는 어떻게하지 얘네 다 repeated인데
    const towerData = protoMessages['gameData']['TowerData'];
    const towerDataPayload = towerData.create(
        [{ towerId: 1, x: 10, y: 20 },
        { towerId: 2, x: 20, y: 10 }]
    );

    const monsterData = protoMessages['gameData']['MonsterData'];
    const monsterDataPayload = monsterData.create(
        [{ monsterId: 1, monsterNumber: 1, level: 1 },
        { monsterId: 2, monsterNumber: 2, level: 2 },]
    )

    const position = protoMessages['gameData']['Position'];

    const monsterPathDataPayload = position.create(
        [{ x: 0, y: 10 },
        { x: 10, y: 10 },
        { x: 20, y: 10 },
        { x: 30, y: 10 },
        { x: 40, y: 10 },]
    )
    const basePositionDataPayload = position.create({ x: 40, y: 10 });

    const playerData = protoMessages['gameData']['GameState'];
    const playerGameData = playerData.create({
        gold: 100,
        base: baseDataPayload, // BaseData
        highScore: 100,
        towers: towerDataPayload,    // repeated TowerData
        monsters: monsterDataPayload, // repeated MonsterData
        monsterLevel: 1,
        score: 0,
        monsterPath: monsterPathDataPayload, // repeated Position
        basePosition: basePositionDataPayload,  // Position
    })

    const opponentData = protoMessages['gameData']['GameState'];
    const opponentGameData = opponentData.create({
        gold: 100,
        base: {
            hp: 500,
            maxHp: 500,
        }, // BaseData
        highScore: 100,
        towers: [
            { towerId: 1, x: 10, y: 20 },
            { towerId: 2, x: 20, y: 10 }
        ],    // repeated TowerData
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
        basePosition: { x: 40, y: 10 },  // Position
    })

    const protoType = PacketType.MATCH_START_NOTIFICATION;

    const data = { initialGameStateData, playerGameData, opponentGameData };

    return makeNotification(protoType, data);
}