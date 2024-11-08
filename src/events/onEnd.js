import { createGameOverNotification, gameEnd } from '../handlers/game/monster.baseattack.js';
import { getUserBySocket, removeUser } from '../sessions/user.session.js';

export const onEnd = (socket) => () => {
  try {
    console.log('user disconnect');
    const user = getUserBySocket(socket);

    // 유저가 게임에 참여중이었다면
    if (user.gameSession) {
      // 적들에게 게임 종료 notification 생성 및 전송 (승리)
      const opponentgameOverNotification = createGameOverNotification(true);
      const opponentUsers = user.gameSession.getOpponentUser(user.id);
      opponentUsers.forEach((user) => {
        user.socket.write(opponentgameOverNotification);
      });
      gameEnd(user.gameSession);
    }

    removeUser(socket);
  } catch (err) {
    console.error('onEnd error: ', err);
  }
};
