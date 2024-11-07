import { PacketType } from '../../constants/header.js';
import { getUserBySocket } from '../../sessions/user.session.js';
import { makeNotification } from '../../utils/notification/game.notification.js';

export const monsterBaseAttackHandler = async ({ packetType, data, socket }) => {
  console.log('base attack');
  const { damage } = data;
  console.log('damage: ', damage);

  // 유저의 base의 체력 깎기
  const user = getUserBySocket(socket);
  const baseHp = user.getBaseDamage(damage);

  // 응답 데이터 생성
  const userNotificationData = createUpdateBaseHPNotification(baseHp, false);
  const opponentNotificationData = createUpdateBaseHPNotification(baseHp, true);

  // 공격 받은 유저의 데이터 baseHp를 유저에게 전달
  socket.write(userNotificationData);

  // 공격 받은 유저 기준 적에게 유저의 baseHp 전달
  const gameSession = user.getGameSession();
  // 적이 1명을 넘어 2명 이상이여도 작동하도록 작성
  const opponentUsers = gameSession.getOpponentUser(user.id);
  opponentUsers.forEach((user) => {
    user.socket.write(opponentNotificationData);
  });

  if (baseHp <= 0) {
    gameEnd();
  }
};

const gameEnd = (socket) => {
  const gameSession = user.getGameSession();
  const gameOverNotification = createGameOverNotification(false);
  socket.write(gameOverNotification);
  const opponentgameOverNotification = createGameOverNotification(true);
  const opponentUsers = gameSession.getOpponentUser(user.id);
  opponentUsers.forEach((user) => {
    user.socket.write(opponentgameOverNotification);
  });
};

export const gameOverHandler = async ({ packetType, data, socket }) => {
  const gameSession = user.getGameSession();
  const gameOverNotification = createGameOverNotification(false);
  socket.write(gameOverNotification);
  const opponentgameOverNotification = createGameOverNotification(true);
  const opponentUsers = gameSession.getOpponentUser(user.id);
  opponentUsers.forEach((user) => {
    user.socket.write(opponentgameOverNotification);
  });
};

export const createUpdateBaseHPNotification = (baseHp, isOpponent) => {
  const baseHpNotificationData = {
    isOpponent,
    baseHp,
  };
  const protoType = PacketType.UPDATE_BASE_HP_NOTIFICATION;

  return makeNotification(protoType, baseHpNotificationData);
};

export const createGameOverNotification = (isWin) => {
  const gameOverNotificationData = {
    isWin,
  };
  const protoType = PacketType.GAME_OVER_NOTIFICATION;

  return makeNotification(protoType, gameOverNotificationData);
};
