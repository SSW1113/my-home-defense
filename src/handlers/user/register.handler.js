import { createS2CRegisterResponse } from '../../utils/response/createResponse.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import joi from 'joi';
import { createUser, findUserById } from '../../db/users/user.db.js';
import { config } from '../../config/config.js';

const schema = joi.object({
  id: joi.string().required().messages({
    'any.required': 'id를 입력해주세요.',
  }),
  password: joi.string().required().messages({
    'any.required': 'pw를 입력해주세요.',
  }),
  email: joi.string().email().required().messages({
    'string.email': '잘못된 이메일 형식입니다.',
    'any.required': '이메일 주소를 입력해주세요.',
  }),
});

export const registerHandler = async ({ packetType, data, socket }) => {
  try {
    const { id, password, email } = await schema.validateAsync(data);
    console.log('data: ', data);

    // 유효성 검사

    // 비밀 번호 암호화
    const hashedPassword = await bcrypt.hash(password, 10);

    let registerResponse;
    // db에 이미 유저가 있는지 확인
    const user = await findUserById(id);
    console.log('user: ', user);
    if (user) {
      // 회원가입 response에는 id가 안들어가요
      registerResponse = createS2CRegisterResponse(
        id,
        false,
        '이미 가입된 유저입니다.',
        config.globalFailCode.INVALID_REQUEST,
      ); // 이런식으로 응답 만들기?
    } else {
      // db 저장
      await createUser(id, hashedPassword, email);
      // 아무 이상없이 회원가입이 성공일때
      registerResponse = createS2CRegisterResponse(
        id,
        true,
        '회원가입이 완료 되었습니다.',
        config.globalFailCode.NONE,
      );
    }
    socket.write(registerResponse);
  } catch (e) {
    // 추가로 핸들러 에러처리해야됨 기억해
    // handlerError(socket, e);
  }
};

// bool success = 1;
// string message = 2;
// GlobalFailCode failCode = 3;
