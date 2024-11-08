export const USER_SQL_QUERIES = {
  FIND_USER_BY_ID: 'SELECT * FROM users WHERE id = ?',
  CREATE_USER: 'INSERT INTO users (id, password, email) VALUES (?, ?, ?)',
  UPDATE_USER_LOGIN: 'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?',
  FIND_PASSWORD_BY_ID: 'SELECT  FROM users WHERE id = ?',
};
