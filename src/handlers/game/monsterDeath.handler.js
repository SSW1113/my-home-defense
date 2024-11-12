import { getUserBySocket } from '../../sessions/user.session.js';

export const monsterDeathNotifyHandler = async ({ packetType, data, socket }) => {
  try {
    const { monsterId } = data;

    const user = getUserBySocket(socket); // 게임세션에 참여한 user찾기
    if (!user) {
      console.error('해당 유저가 존재하지 않습니다.');
    }

    const gameSession = user.getGameSession(); // 게임 세션 조회
    if (!gameSession) {
      console.error('해당 게임 세션이 존재하지 않습니다.');
    }

    const monster = user.getMonster(monsterId); // 저장된 몬스터 조회

    if (!monster) {
      console.error('몬스터 정보가 존재하지 않습니다.');
    }
    // 해당 몬스터 세션에 저장된 정보 삭제
    user.removeMonster(monsterId);

    user.score += 100;
    user.gold += 500;

    // 이제 다른 유저에게 나의 몬스터상황 알려주기
    gameSession.notifyEnemyMonsterDeath(user.id, monsterId);

    //user.getAllState(id); 골드, 점수 등 상태동기화
    gameSession.getAllState(user.id);
  } catch (e) {
    console.error(e);
  }
};
