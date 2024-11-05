import { PacketType } from '../../constants/header.js';
import { getProtoMessages } from '../../init/loadProto.js';
import { getNextSequence } from '../../sessions/user.session.js';
import { createHeader } from './createHeader.js';

/**
 *
 * @param {bool} success
 * @param {string} message
 * @param {GlobalFailCode} failCode
 * @returns
 */
export const createS2CLoginResponse = (userId, success, message, token, failCode) => {
  try {
    const protoMessages = getProtoMessages();
    const GamePacket = protoMessages['protoPacket']['GamePacket'];
    const Response = protoMessages.response.S2CLoginResponse;
    const loginResponse = Response.create({
      success,
      message,
      token,
      failCode,
    });

    console.log('loginResponse: ', loginResponse);

    const gamePacket = GamePacket.create({
      loginResponse,
    });

    const sequence = getNextSequence(userId);
    const buffer = GamePacket.encode(gamePacket).finish();

    const headerPacket = createHeader(PacketType.LOGIN_RESPONSE, sequence, buffer.length);

    return Buffer.concat([headerPacket, buffer]);
  } catch (e) {
    console.error(e);
  }
};
