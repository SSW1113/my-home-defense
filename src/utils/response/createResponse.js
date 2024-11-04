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
  const packetType = Buffer.alloc(PACKET_TYPE_LENGTH);
  packetType.writeUInt16BE(packetType);

  // version
  const versionBuffer = Buffer.from(CLIENT_VERSION, 'utf8');

  // version length
  const versionLength = Buffer.alloc(VERSION_LENGTH);
  versionLength.writeUint8(versionBuffer.length);

  // sequence
  const sequenceBuffer = Buffer.alloc(SEQUENCE_LENGTH);
  sequenceBuffer.writeUint32BE(sequence); // 어짜피 숫자라 직렬화 필요 없음 (라고함)

  // payload length
  const payloadLength = Buffer.alloc(PAYLOAD_LENGTH);
  payloadLength.writeUInt32BE(payloadLength);

  return Buffer.concat([packetType, versionLength, versionBuffer, sequenceBuffer, payloadLength]);
};

/**
 *
 * @param {bool} success
 * @param {string} message
 * @param {GlobalFailCode} failCode
 * @returns
 */
export const createS2CRegisterResponse = (userId, payloadLength, success, message, failCode) => {
  const protoMessages = getProtoMessages();
  const Response = protoMessages.response.S2CRegisterResponse;

  // response 프로토파일로 정의한 구조에 맞게 작성합니다.
  const response = {
    success,
    message,
    failCode,
  };

  const sequence = getNextSequence(userId);
  const buffer = Response.encode(response).finish();

  const headerPacket = createHeader(PacketType.REGISTER_RESPONSE, sequence, payloadLength);

  return Buffer.concat([headerPacket, buffer]);
};
