export const GAME_SQL_QUERIES = {
  SAVE_GAME_LOG: ` 
  INSERT INTO games (user1id, user2id, user1score, user2score)
  VALUES (?, ?, ?, ?)
  `,
};
