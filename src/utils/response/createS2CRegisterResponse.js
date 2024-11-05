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
export const createS2CRegisterResponse = (userId, success, message, failCode) => {
  try {
    const protoMessages = getProtoMessages();
    const GamePacket = protoMessages['protoPacket']['GamePacket'];
    const Response = protoMessages.response.S2CRegisterResponse;
    console.log('GamePacket', GamePacket);
    const registerResponse = Response.create({
      success,
      message,
      failCode,
    });

    console.log('success: ', success);
    console.log('message: ', message);
    console.log('failCode: ', failCode);

    const gamePacket = GamePacket.create({
      registerResponse,
    });

    const sequence = getNextSequence(userId);
    const buffer = GamePacket.encode(gamePacket).finish();

    const headerPacket = createHeader(PacketType.REGISTER_RESPONSE, sequence, buffer.length);

    return Buffer.concat([headerPacket, buffer]);
  } catch (e) {
    console.error(e);
  }
};
