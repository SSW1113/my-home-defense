import { v4 as uuidv4 } from 'uuid';
import dbPool from '../database.js';
import { SQL_QUERIES } from './user.queries.js';
import { toCamelCase } from '../../utils/transformCase.js';

// deviceId 받아서 db에서 유저 정보 조회
export const findUserByDeviceId = async (deviceId) => {
  const [rows] = await dbPool.USERS_DB.query(SQL_QUERIES.FIND_USER_BY_DEVICE_ID, [deviceId]);
  return toCamelCase(rows[0]);
};

// db에 새로운 유저 추가
export const createUser = async (deviceId) => {
  const id = uuidv4();
  await dbPool.USERS_DB.query(SQL_QUERIES.CREATE_USER, [id, deviceId]);
  return { id, deviceId };
};

// 유저의 마지막 로그인 기록 업데이트
export const updateUserLogin = async (id) => {
  await dbPool.USERS_DB.query(SQL_QUERIES.UPDATE_USER_LOGIN, [id]);
};
