import Monster from '../../classes/models/monster.class.js';
import { PacketType } from '../../constants/header.js';
import { getGameSession } from '../../sessions/game.session.js';
import { createResponse } from '../../utils/response/createRespose.js';

export const spawnMonsterRequestHandler = async ({ packetType, data, socket }) => {
  try {
    // 세션 저장
    const gameSession = getGameSession(); // 게임 세션 조회
    const user = gameSession.getUserBySocket(socket); // 게임세션에 참여한 user찾기
    const monster = new Monster(); // 몬스터 생성
    user.createMonster(monster); // 유저에 몬스터 정보 추가

    const responseData = {
      monsterId: monster.id,
      monsterNumber: monster.monsterNumber,
    };

    const spawnMonsterResponse = createResponse(PacketType.SPAWN_MONSTER_RESPONSE, responseData);

    socket.write(spawnMonsterResponse);

    // 변수명 너무 긴데
    const spawnEnemyMonsterNotificationResponse = gameSession.getSpawnEnemyMonster(user.id);
    socket.write(spawnEnemyMonsterNotificationResponse);
    // notification
  } catch (e) {
    console.error(e);
    // handlerError(socket, e);
  }
};

// message S2CSpawnMonsterResponse {
//   int32 monsterId = 1;
//   int32 monsterNumber = 2;
// }
