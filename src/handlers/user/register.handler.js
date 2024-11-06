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

    // 비밀 번호 암호화
    const hashedPassword = await bcrypt.hash(password, 10);

    // db에 이미 유저가 있는지 확인
    const user = await findUserById(id);
    console.log('user: ', user);

    let responseData;
    if (user) {
      // id가 같은 유저가 이미 존재할 때
      responseData = {
        success: false,
        messages: '이미 가입된 유저입니다.',
        failCode: config.globalFailCode.INVALID_REQUEST,
      };
    } else {
      // db 저장
      await createUser(id, hashedPassword, email);

      // 아무 이상없이 회원가입이 성공일때
      responseData = {
        success: true,
        messages: '회원가입이 완료되었습니다.',
        failCode: config.globalFailCode.NONE,
      };
    }

    const registerResponse = createResponse(id, PacketType.REGISTER_RESPONSE, responseData);

    socket.write(registerResponse);
    console.log('register complete');
  } catch (e) {
    // 추가로 핸들러 에러처리해야됨 기억해
    console.error(e);
    const errorResponse = {
      success: false,
      message: '회원가입 처리 중 예상치 못한 오류가 발생했습니다.',
      failCode: config.globalFailCode.UNKNOWN_ERROR,
    };
    socket.write(createResponse(id, PacketType.REGISTER_RESPONSE, errorResponse));
  }
};
