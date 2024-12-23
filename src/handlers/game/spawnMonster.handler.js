import Monster from '../../classes/models/monster.class.js';
import { PacketType } from '../../constants/header.js';
import { getUserBySocket } from '../../sessions/user.session.js';
import { createResponse } from '../../utils/response/createRespose.js';

export const spawnMonsterHandler = async ({ packetType, data, socket }) => {
  try {
    const user = getUserBySocket(socket); // 게임세션에 참여한 user찾기
    if (!user) {
      throw new Error('해당 유저가 존재하지 않습니다.');
    }

    const gameSession = user.getGameSession(); // 게임 세션 조회
    if (!gameSession) {
      throw new Error('해당 게임 세션이 존재하지 않습니다.');
    }

    // 세션 저장
    const monster = user.createMonster();

    const responseData = {
      monsterId: monster.id,
      monsterNumber: monster.monsterNumber,
    };

    const spawnMonsterResponse = createResponse(
      PacketType.SPAWN_MONSTER_RESPONSE,
      responseData,
      socket,
    );

    socket.write(spawnMonsterResponse);

    // 내가 생성한 몬스터 정보 다른 상대(클라)에게 알려주기
    gameSession.getAllSpawnEnemyMonster(user.id, monster);
  } catch (e) {
    console.error(e);
    // handlerError(socket, e);
  }
};
