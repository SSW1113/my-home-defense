import { CLIENT_VERSION } from '../../constants/env.js';
import {
  PACKET_TYPE_LENGTH,
  VERSION_LENGTH,
  SEQUENCE_LENGTH,
  PAYLOAD_LENGTH,
  PacketType,
} from '../../constants/header.js';
import { getProtoMessages } from '../../init/loadProto.js';
import { getNextSequence } from '../../sessions/user.session.js';

export const createHeader = (packetType, sequence, payloadLength) => {
  // 헤더 생성
  // packet type
  const packetTypeBuffer = Buffer.alloc(PACKET_TYPE_LENGTH); // 이름 겹침
  packetTypeBuffer.writeUInt16BE(packetType);

  // version
  const versionBuffer = Buffer.from(CLIENT_VERSION, 'utf8');

  // version length
  const versionLength = Buffer.alloc(VERSION_LENGTH);
  versionLength.writeUint8(versionBuffer.length);

  // sequence
  const sequenceBuffer = Buffer.alloc(SEQUENCE_LENGTH);
  sequenceBuffer.writeUint32BE(sequence); // 어짜피 숫자라 직렬화 필요 없음 (라고함)

  // payload length
  const payloadLengthBuffer = Buffer.alloc(PAYLOAD_LENGTH); // 이름 겹침
  payloadLengthBuffer.writeUInt32BE(payloadLength);

  return Buffer.concat([
    packetTypeBuffer,
    versionLength,
    versionBuffer,
    sequenceBuffer,
    payloadLengthBuffer,
  ]);
};

/**
 *
 * @param {bool} success
 * @param {string} message
 * @param {GlobalFailCode} failCode
 * @returns
 */
export const createS2CRegisterResponse = (userId, success, message, failCode) => {
  try {
    const protoMessages = getProtoMessages();
    const GamePacket = protoMessages['protoPacket']['GamePacket'];
    const Response = protoMessages.response.S2CRegisterResponse;
    console.log('GamePacket', GamePacket);
    const registerResponse = Response.create({
      success,
      message,
      failCode,
    });

    console.log('success: ', success);
    console.log('message: ', message);
    console.log('failCode: ', failCode);

    const gamePacket = GamePacket.create({
      registerResponse,
    });

    const sequence = getNextSequence(userId);
    const buffer = GamePacket.encode(gamePacket).finish();

    const headerPacket = createHeader(PacketType.REGISTER_RESPONSE, sequence, buffer.length);

    return Buffer.concat([headerPacket, buffer]);
  } catch (e) {
    console.error(e);
  }
};
