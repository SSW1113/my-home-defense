import { HANDLER_IDS, RESPONSE_SUCCESS_CODE } from '../../constants/handlerId.js';
import { findUserById, updateUserLogin } from '../../db/users/user.db.js';
import { addUser } from '../../sessions/user.session.js';
import joi from 'joi';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../../config/config.js';
import { createS2CLoginResponse } from '../../utils/response/createS2CLoginResponse.js';

const schema = joi.object({
  id: joi.string().required().messages({
    'any.required': 'id를 입력해주세요.',
  }),
  password: joi.string().required().messages({
    'any.required': 'password를 입력해주세요.',
  }),
});

export const loginHandler = async ({ packetType, data, socket }) => {
  try {
    const { id, password } = data;
    console.log('login id: ', id);

    let loginResponse;
    // db에 유저 검색
    const user = await findUserById(id);

    if (!user) {
      // 유저가 없으면 오류
      loginResponse = createS2CLoginResponse(
        id,
        false,
        '존재하지 않는 사용자입니다.',
        '',
        config.globalFailCode.AUTHENTICATION_FAILED,
      );
    } else {
      // 유저가 존재하면 password 비교
      const isPasswordValid = await bcrypt.compare(password, user.password);

      // 비밀번호가 틀렸다면
      if (!isPasswordValid) {
        loginResponse = createS2CLoginResponse(
          id,
          false,
          '비밀번호가 일치하지 않습니다.',
          '',
          config.globalFailCode.AUTHENTICATION_FAILED,
        );
      } else {
        // 로그인 성공 시
        const token = jwt.sign({ id: user.id }, config.jwt.secret, {
          expiresIn: config.jwt.expiresIn,
        });

        // 유저 마지막 로그인 업데이트
        await updateUserLogin(id);

        // 세션에 유저 추가
        addUser(id, socket);

        loginResponse = createS2CLoginResponse(
          id,
          true,
          '로그인 성공',
          token,
          config.globalFailCode.NONE,
        );
      }
    }

    socket.write(loginResponse);
  } catch (e) {
    console.error('Login handler error: ', e);
  }
};
