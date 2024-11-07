import { findUserById, updateUserLogin } from '../../db/users/user.db.js';
import { addUser } from '../../sessions/user.session.js';
import joi from 'joi';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../../config/config.js';
import { createResponse } from '../../utils/response/createRespose.js';
import { PacketType } from '../../constants/header.js';

const schema = joi.object({
  id: joi.string().required().messages({
    'any.required': 'id를 입력해주세요.',
  }),
  password: joi.string().required().messages({
    'any.required': 'password를 입력해주세요.',
  }),
});

const createAuthFailResponse = () => ({
  success: false,
  message: '아이디 또는 비밀번호가 일치하지 않습니다.',
  token: '',
  failCode: config.globalFailCode.AUTHENTICATION_FAILED,
});

const createSuccessResponse = (token) => ({
  success: true,
  message: '로그인 성공',
  token: token,
  failCode: config.globalFailCode.NONE,
});

export const loginHandler = async ({ packetType, data, socket }) => {
  try {
    const { id, password } = await schema.validateAsync(data);
    console.log('login id: ', id);

    // db에 유저 검색
    const user = await findUserById(id);

    let responseData;

    if (!user) {
      // 유저가 없으면 오류
      responseData = createAuthFailResponse();
      console.log('no user');
    } else {
      // 유저가 존재하면 password 비교
      const isPasswordValid = await bcrypt.compare(password, user.password);

      // 비밀번호가 틀렸다면
      if (!isPasswordValid) {
        responseData = createAuthFailResponse();
        console.log('wrong password');
      } else {
        // 로그인 성공 시
        // jwt token 생성
        const token = jwt.sign({ id: user.id }, config.jwt.secret, {
          expiresIn: config.jwt.expiresIn,
        });

        // 유저 마지막 로그인 업데이트
        await updateUserLogin(id);

        // 세션에 유저 추가
        addUser(socket, id);

        responseData = createSuccessResponse(token);
        console.log('login success');
      }
    }

    const loginResponse = createResponse(PacketType.LOGIN_RESPONSE, responseData);
    socket.write(loginResponse);
  } catch (e) {
    console.error('Login handler error: ', e);
  }
};
