import { HANDLER_IDS, RESPONSE_SUCCESS_CODE } from '../../constants/handlerId.js';
import { findUserById, updateUserLogin } from '../../db/users/user.db.js';
import { addUser } from '../../sessions/user.session.js';

export const loginHandler = async ({ packetType, data, socket }) => {
  try {
    const { id, password } = data;
    console.log('login');

    const user = await findUserById(id);
    if (!user) {
    } else {
    }

    // const loginResponse = createS2CRegisterResponse();
  } catch (e) {}
};
