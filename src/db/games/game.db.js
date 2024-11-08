import dbPool from '../database.js';
import { GAME_SQL_QUERIES } from './game.queries.js';

export const saveGameLog = async (user1, user2) => {
  await dbPool.GAMES_DB.query(GAME_SQL_QUERIES.SAVE_GAME_LOG, [
    user1.id,
    user2.id,
    user1.score,
    user2.score,
  ]);
};
