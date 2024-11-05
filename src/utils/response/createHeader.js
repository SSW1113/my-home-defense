import { CLIENT_VERSION } from '../../constants/env.js';
import {
  PACKET_TYPE_LENGTH,
  VERSION_LENGTH,
  SEQUENCE_LENGTH,
  PAYLOAD_LENGTH,
  PacketType,
} from '../../constants/header.js';

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
