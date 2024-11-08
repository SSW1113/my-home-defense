import { saveGameLog } from '../db/games/game.db.js';
import { createGameOverNotification } from '../handlers/game/monster.baseattack.js';
import { removeGamesession } from '../sessions/game.session.js';
import { getUserBySocket, removeUser } from '../sessions/user.session.js';

export const onError = (socket) => (err) => {
  try {
    console.error('socket error: ', err);
    const user = getUserBySocket(socket);

    // 유저가 게임에 참여중이었다면
    if (user.gameSession) {
      // 적들에게 게임 종료 notification 생성 및 전송 (승리)
      const opponentgameOverNotification = createGameOverNotification(true);
      const opponentUsers = user.gameSession.getOpponentUser(user.id);
      opponentUsers.forEach((user) => {
        user.socket.write(opponentgameOverNotification);
      });

      // db에 게임 로그 저장
      saveGameLog(user, opponentUsers[0]);

      // 게임이 종료됐으니 게임 세션 삭제
      removeGamesession(user.gameSession.id);
    }

    removeUser(socket);
  } catch (err) {
    console.error('onError error: ', err);
  }
};
