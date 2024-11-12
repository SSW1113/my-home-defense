import { addGameSession, findMatchingGameSession } from '../../sessions/game.session.js';
import { v4 as uuidv4 } from 'uuid';
import { getUserBySocket } from '../../sessions/user.session.js';

export const matchStartHandler = async ({ packetType, data, socket }) => {
  try {
    const user = await getUserBySocket(socket);

    // 1. 유저가 1명인 게임 세션을 찾는다
    let gameSession = findMatchingGameSession();

    // 2. 없으면 게임 세션을 만들어서 (지금 매치 돌린) 유저를 넣는다
    if (!gameSession) {
      const gameid = uuidv4();
      const gameId = `Game${gameid}`;
      // 게임 세션 생성
      gameSession = addGameSession(gameId);
      console.log('게임 세션 새로 생성');
    } else {
      console.log('게임 세션 발견');
    }

    // 유저의 세션 세팅
    user.setGameSession(gameSession);

    // 게임 세션에 유저 추가
    gameSession.addUser(user);
  } catch (e) {
    console.error(e);
  }
};
