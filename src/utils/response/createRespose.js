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
        const GamePacket = protoMessages['protoPacket']['GamePacket'];

        const Response = protoMessages.response[responseType];

        const registerResponse = Response.create(responseData);

        const gamePacket = GamePacket.create({ registerResponse });

        const sequence = getNextSequence(userId);
        const buffer = GamePacket.encode(gamePacket).finish();

        const headerPacket = createHeader(packetType, sequence, buffer.length);

        return Buffer.concat([headerPacket, buffer]);
    } catch (e) {
        console.error(e);
    }
};