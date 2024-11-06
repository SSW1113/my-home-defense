import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER, JWT_SECRET } from '../constants/env.js';

export const config = {
  database: {
    database: DB_NAME,
    host: DB_HOST,
    password: DB_PASSWORD,
    port: DB_PORT,
    user: DB_USER,
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
