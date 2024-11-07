import Game from '../classes/models/game.class.js';
import { gameSessions } from './sessions.js';

export const addGameSession = (gameId) => {
  const session = new Game(gameId);
  gameSessions.push(session);
  return session;
};

export const getGameSessionById = (gameId) => {
  return gameSessions.find((game) => game.id === gameId);
};

export const removeGamesession = (gameId) => {
  const index = gameSessions.findIndex((game) => game.id === gameId);
  if (index !== -1) {
    return gameSessions.splice(index, 1)[0];
  }
};

export const findMatchingGameSession = () => {
  return gameSessions.find((gameSession) => gameSession.users.length <= 1);
};

// 임시로 만듬
export const getGameSession = () => {
  return gameSessions[0];
};
