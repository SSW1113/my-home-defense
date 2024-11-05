import { getProtoMessages } from '../../init/loadProto.js';
import { getNextSequence } from '../../sessions/user.session.js';
import { createHeader } from './createHeader.js';

/**
 * 
 * @param {*} userId  시퀀스를 위한 userId
 * @param {*} packetType 헤더에 들어갈 packetType
 * @param {*} responseType 응답 프로토콜 버퍼 이름
 * @param {*} responseData 응답 데이터
 * @returns 
 */
export const createResponse = (userId, packetType, responseType, responseData) => {
    try {
        const protoMessages = getProtoMessages();
        const gamePacket = protoMessages['protoPacket']['GamePacket'];

        const response = protoMessages.response[responseType];

        const responseInstance = response.create(responseData);

        const gamePacketInstance = gamePacket.create({ responseInstance });

        const sequence = getNextSequence(userId);
        const buffer = GamePacket.encode(gamePacketInstance).finish();

        const headerPacket = createHeader(packetType, sequence, buffer.length);

        return Buffer.concat([headerPacket, buffer]);
    } catch (e) {
        console.error(e);
    }
};