import { v4 as uuidv4 } from 'uuid';
import dbPool from '../database.js';
import { SQL_QUERIES } from './user.queries.js';
import { toCamelCase } from '../../utils/transformCase.js';

// deviceId 받아서 db에서 유저 정보 조회
export const findUserById = async (userId) => {
  const [rows] = await dbPool.USERS_DB.query(SQL_QUERIES.FIND_USER_BY_ID, [userId]);
  return toCamelCase(rows[0]);
};

// db에 새로운 유저 추가
export const createUser = async (id, password, email) => {
  console.log(typeof id);
  console.log(typeof password);
  console.log(typeof email);
  await dbPool.USERS_DB.query(SQL_QUERIES.CREATE_USER, [id, password, email]);
  return { id, password, email };
};

// 유저의 마지막 로그인 기록 업데이트
export const updateUserLogin = async (id) => {
  await dbPool.USERS_DB.query(SQL_QUERIES.UPDATE_USER_LOGIN, [id]);
};

export const findUserPasswordById = async (id) => {};
