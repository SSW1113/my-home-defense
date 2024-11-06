import { getProtoMessages } from '../../init/loadProto.js';
import { getNextSequence } from '../../sessions/user.session.js';
import { createHeader } from './createHeader.js';
import { responseProto } from './responseProto.js';

/**
 *
 * @param {*} userId  시퀀스를 위한 userId
 * @param {*} packetType 헤더에 들어갈 packetType
 * @param {*} responseType 응답 프로토콜 버퍼 이름
 * @param {*} responseData 응답 데이터
 * @returns
 */
export const createResponse = (userId, packetType, responseData) => {
  try {
    const protoMessages = getProtoMessages();
    const gamePacket = protoMessages['protoPacket']['GamePacket'];

    // 따로 저장한 responseProto에서 protoType을 가져옴
    const [namespace, typeName] = responseProto[packetType].protoType.split('.');
    const response = protoMessages[namespace][typeName];

    const responseInstance = response.create(responseData);

    // GamePacket의 필드 이름을 찾아 오는 부분인데... 성능이 떨어짐
    // const responsePayload = Object.keys(gamePacket.fields).find(
    //   (type) => gamePacket.fields[type].type === typeName,
    // );

    const gamePacketFieldName = responseProto[packetType].fieldName;
    const gamePacketInstance = gamePacket.create({ [gamePacketFieldName]: responseInstance });

    const sequence = 0;
    const buffer = gamePacket.encode(gamePacketInstance).finish();

    const headerPacket = createHeader(packetType, sequence, buffer.length);

    return Buffer.concat([headerPacket, buffer]);
  } catch (e) {
    console.error(e);
  }
};
