import { v4 as uuidv4 } from 'uuid';
import dbPool from '../database.js';
import { USER_SQL_QUERIES } from './user.queries.js';
import { toCamelCase } from '../../utils/transformCase.js';

// deviceId 받아서 db에서 유저 정보 조회
export const findUserById = async (userId) => {
  const [rows] = await dbPool.USERS_DB.query(USER_SQL_QUERIES.FIND_USER_BY_ID, [userId]);
  return toCamelCase(rows[0]);
};

// db에 새로운 유저 추가
export const createUser = async (id, password, email) => {
  await dbPool.USERS_DB.query(USER_SQL_QUERIES.CREATE_USER, [id, password, email]);
  return { id, password, email };
};

// 유저의 마지막 로그인 기록 업데이트
export const updateUserLogin = async (id) => {
  await dbPool.USERS_DB.query(USER_SQL_QUERIES.UPDATE_USER_LOGIN, [id]);
};

// 유저의 하이스코어 검색
export const getUserHighscoreById = async (userId) => {
  const [rows] = await dbPool.USERS_DB.query(USER_SQL_QUERIES.FIND_HIGHSCORE_BY_ID, [userId]);
  const result = toCamelCase(rows[0]);
  return result.highscore;
};

// 하이스코어 업데이트
export const updateUserHighscore = async (userId, score) => {
  await dbPool.USERS_DB.query(USER_SQL_QUERIES.UPDATE_USER_HIGHSCORE, [score, userId]);
};

export const findUserPasswordById = async (id) => {};
