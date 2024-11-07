import { getGameSession } from '../../sessions/game.session.js';

export const monsterDeathNotifyHandler = async ({ packetType, data, socket }) => {
  try {
    const { monsterId } = data;

    const gameSession = getGameSession(); // 게임 세션 조회
    const user = gameSession.getUserBySocket(socket); // 게임세션에 참여한 user찾기
    const monster = user.getMonster(monsterId); // 저장된 몬스터 조회

    if (!monster) {
      console.error('몬스터 정보가 존재하지 않습니다.');
    }
    // 해당 몬스터 세션에 저장된 정보 삭제
    user.removeMonster(monsterId);

    // 이제 다른 유저에게 몬스터상황 알려주기 // 이게 맞기를
    gameSession.notifyEnemyMonsterDeath(user.id, monsterId);

    const packet = gameSession.getAllState(user.id);
    socket.write(packet);
  } catch (e) {
    console.error(e);
    // handlerError(socket, e);
  }
};
