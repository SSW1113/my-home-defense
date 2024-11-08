import { CLIENT_VERSION } from '../constants/env.js';
import {
  PACKET_TYPE_LENGTH,
  VERSION_LENGTH,
  SEQUENCE_LENGTH,
  PAYLOAD_LENGTH,
} from '../constants/header.js';
import { getHandlerById } from '../handlers/index.js';
import { packetParser } from '../utils/parser/packetParser.js';

export const onData = (socket) => async (data) => {
  try {
    socket.buffer = Buffer.concat([socket.buffer, data]);

    while (socket.buffer.length >= PACKET_TYPE_LENGTH + VERSION_LENGTH) {
      // 패킷 타입 읽어오기
      const packetType = socket.buffer.readUInt16BE(0);
      const versionLength = socket.buffer.readUInt8(PACKET_TYPE_LENGTH);
      const totalHeaderLength =
        PACKET_TYPE_LENGTH + VERSION_LENGTH + versionLength + SEQUENCE_LENGTH + PAYLOAD_LENGTH;

      if (socket.buffer.length < totalHeaderLength) {
        break;
      }

      // 버전 불러오기
      const version = socket.buffer.toString(
        'utf8',
        PACKET_TYPE_LENGTH + VERSION_LENGTH,
        PACKET_TYPE_LENGTH + VERSION_LENGTH + versionLength,
      );
      // 버전 체크
      if (version !== CLIENT_VERSION) {
        throw new Error('클라이언트 버전이 일치하지 않습니다.');
      }

      // 시퀀스
      const sequence = socket.buffer.readUInt32BE(
        PACKET_TYPE_LENGTH + VERSION_LENGTH + versionLength,
      );
      // 시퀀스 체크 TODO

      // 페이로드 길이
      const payloadLength = socket.buffer.readUInt32BE(
        PACKET_TYPE_LENGTH + VERSION_LENGTH + versionLength + SEQUENCE_LENGTH,
      );
      const totalPacketLength = totalHeaderLength + payloadLength;

      // 패킷 전체 길이보다 짧으면 처음으로
      if (socket.buffer.length < totalPacketLength) {
        break;
      }

      // console.log('packetType', packetType);
      // console.log('version: ', version);
      // console.log('sequence', sequence);
      // console.log('payload Length: ', payloadLength);

      // payload
      const payload = socket.buffer.subarray(totalHeaderLength, totalPacketLength);
      // console.log('payload: ', payload);
      // 이후의 데이터 다시 저장
      socket.buffer = socket.buffer.subarray(totalPacketLength);

      const data = packetParser(packetType, payload);

      const handler = getHandlerById(packetType);
      // console.log(handler);
      await handler({ packetType, data, socket });
    }
  } catch (e) {
    console.error('onData error: ', e);
  }
};
