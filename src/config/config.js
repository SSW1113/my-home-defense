import {
  USER_DB_HOST,
  USER_DB_NAME,
  USER_DB_PASSWORD,
  USER_DB_PORT,
  USER_DB_USER,
  GAME_DB_HOST,
  GAME_DB_NAME,
  GAME_DB_PASSWORD,
  GAME_DB_PORT,
  GAME_DB_USER,
  JWT_SECRET,
} from '../constants/env.js';

export const config = {
  userDatabase: {
    database: USER_DB_NAME,
    host: USER_DB_HOST,
    password: USER_DB_PASSWORD,
    port: USER_DB_PORT,
    user: USER_DB_USER,
  },
  gameDatabase: {
    database: GAME_DB_NAME,
    host: GAME_DB_HOST,
    password: GAME_DB_PASSWORD,
    port: GAME_DB_PORT,
    user: GAME_DB_USER,
  },
  globalFailCode: {
    NONE: 0,
    UNKNOWN_ERROR: 1,
    INVALID_REQUEST: 2,
    AUTHENTICATION_FAILED: 3,
  },
  jwt: {
    secret: JWT_SECRET,
    expiresIn: '24h',
  },
};
