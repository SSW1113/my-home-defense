import { createS2CRegisterResponse } from '../../utils/response/createResponse.js';

export const registerHandler = async ({ socket, userId, payload }) => {
  try {
    const { id, password, email } = payload;

    // db 저장

    // 문제가 있을시
    // const registerResponse = createS2CRegisterResponse(-1,message,failCode); // 이런식으로 응답 만들기?

    // jwt 토큰 생성

    // 아무 이상없이 회원가입이 성공일때
    const registerResponse = createS2CRegisterResponse(success, message, failCode); // 이런식으로 응답 만들기?

    socket.write(registerResponse);
  } catch (e) {
    // 추가로 핸들러 에러처리해야됨 기억해
    handlerError(socket, e);
  }
};

//  message C2SRegisterRequest {
//     string id = 1;
//     string password = 2;
//     string email = 3;
// }

// bool success = 1;
// string message = 2;
// GlobalFailCode failCode = 3;
