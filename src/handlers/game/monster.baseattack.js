import { PacketType } from '../../constants/header.js';
import { saveGameLog } from '../../db/games/game.db.js';
import { getUserHighscoreById, updateUserHighscore } from '../../db/users/user.db.js';
import { removeGamesession } from '../../sessions/game.session.js';
import { getUserBySocket } from '../../sessions/user.session.js';
import { makeNotification } from '../../utils/notification/game.notification.js';

export const monsterBaseAttackHandler = async ({ packetType, data, socket }) => {
  try {
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
  if (!gameSession) return;

  // 적이 1명을 넘어 2명 이상이여도 작동하도록 작성
  const opponentUsers = gameSession.getOpponentUser(user.id);
  opponentUsers.forEach((user) => {
    user.socket.write(opponentNotificationData);
  });

  // 게임 종료
  if (baseHp <= 0) {
    // 게임 종료 notification 전송 (패배)
    const gameOverNotification = createGameOverNotification(false);
    socket.write(gameOverNotification);

    // 적들에게 게임 종료 notification 생성 및 전송 (승리)
    const opponentgameOverNotification = createGameOverNotification(true);
    const opponentUsers = gameSession.getOpponentUser(user.id);
    opponentUsers.forEach((user) => {
      user.socket.write(opponentNotificationData);
    });
    gameEnd(gameSession);
  }
};

export const gameEnd = async (gameSession) => {
  const users = gameSession.getUsers();
  const user1 = users[0];
  const user2 = users[1];

  // DB 처리
  // db에 게임 로그 저장
  saveGameLog(user1, user2);

  for (const user of users) {
    const userHighScore = await getUserHighscoreById(user.id); // await 추가
    console.log('user score: ', user.score);
    console.log('userHighScore: ', userHighScore);
    
    if (user.score > userHighScore) {
      await updateUserHighscore(user.id, user.score); // 업데이트 함수도 await
    }
  }

  // 게임이 종료됐으니 게임 세션 삭제
  removeGamesession(gameSession.id);
};

// GameEndRequest에 관한 핸들러
// 클라이언트에서 현재 C2SGameEndRequest를 보내지 않기 때문에 쓰일 일은 아직 없음
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

// BaseHp Notification 생성
export const createUpdateBaseHPNotification = (baseHp, isOpponent) => {
  const baseHpNotificationData = {
    isOpponent,
    baseHp,
  };
  const protoType = PacketType.UPDATE_BASE_HP_NOTIFICATION;

  return makeNotification(protoType, baseHpNotificationData);
};

// gameover notification 생성
export const createGameOverNotification = (isWin) => {
  const gameOverNotificationData = {
    isWin,
  };
  const protoType = PacketType.GAME_OVER_NOTIFICATION;

  return makeNotification(protoType, gameOverNotificationData);
};
