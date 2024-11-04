import {
  PACKET_TYPE_LENGTH,
  VERSION_LENGTH,
  SEQUENCE_LENGTH,
  PAYLOAD_LENGTH,
  PacketType,
} from '../constants/header.js';

export const onData = (socket) => (data) => {
  socket.buffer = Buffer.concat([socket.buffer, data]);
  const totalHeaderLength = PACKET_TYPE_LENGTH + VERSION_LENGTH + SEQUENCE_LENGTH + PAYLOAD_LENGTH;

  while (socket.buffer.length > totalHeaderLength) {
    // const length = socket.buffer.length; // 문제 찾아보고있겠습니다 아 이게 페이로드의 총 길이를 구하면 되는건가?
    const length = socket.buffer.readUInt32BE(
      PACKET_TYPE_LENGTH + VERSION_LENGTH + SEQUENCE_LENGTH,
    ); // 이러면 heder의 payload길이 값을 가져옵니다. 오 맞는것 같아요! 오 저 헤오더값들 다 합치고 32비트를 읽는거죠?
    // 네네 그 앞에 PACKET_TYPE_LENGTH + VERSION_LENGTH + SEQUENCE_LENGTH = 7 이라  7번 버퍼 배열 부터 32비트(4) 바이트트 까지 읽어오는 걸로 알고 있습니다.
    //
    const packetType = socket.buffer.readUInt16BE(0);

    if (socket.buffer.length >= length) {
      const packet = socket.buffer.subarray(totalHeaderLength, length);
      socket.buffer = socket.buffer.subarray(length);
      try {
        switch (packetType) {
          case PacketType.REGISTER_REQUEST:
            {
            }
            break;

          case PacketType.REGISTER_RESPONSE:
            {
            }
            break;

          case PacketType.LOGIN_REQUEST:
            {
            }
            break;

          case PacketType.LOGIN_RESPONSE:
            {
            }
            break;

          case PacketType.MATCH_REQUEST:
            {
            }
            break;

          case PacketType.MATCH_START_NOTIFICATION:
            {
            }
            break;

          case PacketType.STATE_SYNC_NOTIFICATION:
            {
            }
            break;

          case PacketType.TOWER_PURCHASE_REQUEST:
            {
            }
            break;

          case PacketType.TOWER_PURCHASE_RESPONSE:
            {
            }
            break;

          case PacketType.ADD_ENEMY_TOWER_NOTIFICATION:
            {
            }
            break;

          case PacketType.SPAWN_MONSTER_REQUEST:
            {
            }
            break;

          case PacketType.SPAWN_MONSTER_RESPONSE:
            {
            }
            break;

          case PacketType.SPAWN_ENEMY_MONSTER_NOTIFICATION:
            {
            }
            break;

          case PacketType.TOWER_ATTACK_REQUEST:
            {
            }
            break;

          case PacketType.ENEMY_TOWER_ATTACK_NOTIFICATION:
            {
            }
            break;

          case PacketType.MONSTER_ATTACK_BASE_REQUEST:
            {
            }
            break;

          case PacketType.UPDATE_BASE_HP_NOTIFICATION:
            {
            }
            break;

          case PacketType.GAME_OVER_NOTIFICATION:
            {
            }
            break;

          case PacketType.GAME_END_REQUEST:
            {
            }
            break;

          case PacketType.MONSTER_DEATH_NOTIFICATION:
            {
            }
            break;

          case PacketType.ENEMY_MONSTER_DEATH_NOTIFICATION:
            {
            }
            break;
        }
      } catch (e) {
        console.error(e);
      }
    }
  }
};
