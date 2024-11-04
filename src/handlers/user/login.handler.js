import { HANDLER_IDS, RESPONSE_SUCCESS_CODE } from '../../constants/handlerId.js';
import { findUserByDeviceId, updateUserLogin } from '../../db/users/user.db.js';
import { addUser } from '../../sessions/user.session.js';
import { createHeader, createS2CRegisterResponse } from '../../utils/response/createResponse.js';

export const loginHandler = async ({ socket, userId, payload }) => {
  try {
    const { deviceId } = payload;

    let user = await findUserByDeviceId(deviceId);

    await updateUserLogin(user.id);

    // 유저 세션에 새로운 유저 추가
    addUser(socket, deviceId);

    const loginResponse = createS2CRegisterResponse();
  } catch (e) {}
};
