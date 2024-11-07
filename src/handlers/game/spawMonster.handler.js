import Monster from '../../classes/models/monster.class.js';
import { PacketType } from '../../constants/header.js';
import { getGameSessionById } from '../../sessions/game.session.js';
import { getUserBySocket } from '../../sessions/user.session.js';
import { createResponse } from '../../utils/response/createRespose.js';

export const spawnMonsterHandler = async ({ packetType, data, socket }) => {
  try {
    const user = getUserBySocket(socket); // 게임세션에 참여한 user찾기
    if (!user) {
      throw new Error('해당 유저가 존재하지 않습니다.');
    }

    const gameSession = getGameSessionById(user.getGameSession().id); // 게임 세션 조회
    if (!gameSession) {
      throw new Error('해당 게임 세션이 존재하지 않습니다.');
    }

    // 세션 저장
    const monster = new Monster(); // 몬스터 생성시 레벨생각해보기 TODO
    user.createMonster(monster); // 유저에 몬스터 정보 추가

    const responseData = {
      monsterId: monster.id,
      monsterNumber: monster.monsterNumber,
    };

    const spawnMonsterResponse = createResponse(PacketType.SPAWN_MONSTER_RESPONSE, responseData);

    socket.write(spawnMonsterResponse);

    // 아 아닌가 이거는 계속해서 보내주는게 맞나? 일단 해보고 생각해보기
    gameSession.getAllSpawnEnemyMonster(user.id);
  } catch (e) {
    console.error(e);
    // handlerError(socket, e);
  }
};
