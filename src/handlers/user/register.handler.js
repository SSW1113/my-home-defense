import bcrypt from 'bcrypt';
import joi from 'joi';
import { createUser, findUserById } from '../../db/users/user.db.js';
import { config } from '../../config/config.js';
import { createResponse } from '../../utils/response/createRespose.js';
import { PacketType } from '../../constants/header.js';

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
      const responseData = {
        success: false,
        messages: '이미 가입된 유저입니다.',
        failCode: config.globalFailCode.INVALID_REQUEST,
      };
      registerResponse = createResponse(id, PacketType.REGISTER_RESPONSE, responseData);
    } else {
      // db 저장
      await createUser(id, hashedPassword, email);
      // 아무 이상없이 회원가입이 성공일때
      const responseData = {
        success: true,
        messages: '회원가입이 완료되었습니다.',
        failCode: config.globalFailCode.NONE,
      };
      registerResponse = createResponse(id, PacketType.REGISTER_RESPONSE, responseData);
    }

    console.log('register complete');
    socket.write(registerResponse);
  } catch (e) {
    // 추가로 핸들러 에러처리해야됨 기억해
    console.error(e);
  }
};

// bool success = 1;
// string message = 2;
// GlobalFailCode failCode = 3;
