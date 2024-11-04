import {
  PACKET_TYPE_LENGTH,
  VERSION_LENGTH,
  SEQUENCE_LENGTH,
  PAYLOAD_LENGTH,
  PacketType,
} from '../constants/header.js';
import { getHandlerById } from '../handlers/index.js';
import { packetParser } from '../utils/parser/packetParser.js';

export const onData = (socket) => async (data) => {
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

    // 시퀀스
    const sequence = socket.buffer.readUInt32BE(
      PACKET_TYPE_LENGTH + VERSION_LENGTH + versionLength,
    );

    // 페이로드 길이
    const payloadLength = socket.buffer.readUInt32BE(
      PACKET_TYPE_LENGTH + VERSION_LENGTH + versionLength + SEQUENCE_LENGTH,
    );

    const totalPacketLength = totalHeaderLength + payloadLength;

    // 패킷 전체 길이보다 짧으면 처음으로
    if (socket.buffer.length < totalPacketLength) {
      break;
    }

    // payload
    const payload = socket.buffer.subarray(totalHeaderLength, totalPacketLength);

    // 이후의 데이터 다시 저장
    socket.buffer.subarray(totalPacketLength);

    const data = packetParser(packetType, payload);

    const handler = getHandlerById(packetType);
    await handler({ packetType, data });

    //while (socket.buffer.length > totalHeaderLength) {
    // const length = socket.buffer.length; // 문제 찾아보고있겠습니다 아 이게 페이로드의 총 길이를 구하면 되는건가?
    // const length = socket.buffer.readUInt32BE(
    //   PACKET_TYPE_LENGTH + VERSION_LENGTH + SEQUENCE_LENGTH,
    // );

    // if (socket.buffer.length >= length) {
    //   const packet = socket.buffer.subarray(totalHeaderLength, length);
    //   socket.buffer = socket.buffer.subarray(length);
    //   try {
    //     switch (packetType) {
    //       case PacketType.REGISTER_REQUEST:
    //         {
    //           const { handlerId, userId, payload } = packetParser(packet);
    //           const handler = getHandlerById(handlerId);

    //           handler({ socket, userId, payload });
    //         }
    //         break;

    //       case PacketType.REGISTER_RESPONSE:
    //         {
    //         }
    //         break;

    //       case PacketType.LOGIN_REQUEST:
    //         {
    //         }
    //         break;

    //       case PacketType.LOGIN_RESPONSE:
    //         {
    //         }
    //         break;

    //       case PacketType.MATCH_REQUEST:
    //         {
    //         }
    //         break;

    //       case PacketType.MATCH_START_NOTIFICATION:
    //         {
    //         }
    //         break;

    //       case PacketType.STATE_SYNC_NOTIFICATION:
    //         {
    //         }
    //         break;

    //       case PacketType.TOWER_PURCHASE_REQUEST:
    //         {
    //         }
    //         break;

    //       case PacketType.TOWER_PURCHASE_RESPONSE:
    //         {
    //         }
    //         break;

    //       case PacketType.ADD_ENEMY_TOWER_NOTIFICATION:
    //         {
    //         }
    //         break;

    //       case PacketType.SPAWN_MONSTER_REQUEST:
    //         {
    //         }
    //         break;

    //       case PacketType.SPAWN_MONSTER_RESPONSE:
    //         {
    //         }
    //         break;

    //       case PacketType.SPAWN_ENEMY_MONSTER_NOTIFICATION:
    //         {
    //         }
    //         break;

    //       case PacketType.TOWER_ATTACK_REQUEST:
    //         {
    //         }
    //         break;

    //       case PacketType.ENEMY_TOWER_ATTACK_NOTIFICATION:
    //         {
    //         }
    //         break;

    //       case PacketType.MONSTER_ATTACK_BASE_REQUEST:
    //         {
    //         }
    //         break;

    //       case PacketType.UPDATE_BASE_HP_NOTIFICATION:
    //         {
    //         }
    //         break;

    //       case PacketType.GAME_OVER_NOTIFICATION:
    //         {
    //         }
    //         break;

    //       case PacketType.GAME_END_REQUEST:
    //         {
    //         }
    //         break;

    //       case PacketType.MONSTER_DEATH_NOTIFICATION:
    //         {
    //         }
    //         break;

    //       case PacketType.ENEMY_MONSTER_DEATH_NOTIFICATION:
    //         {
    //         }
    //         break;
    //     }
  }
};
