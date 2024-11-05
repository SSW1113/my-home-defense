import { PacketType } from '../constants/header.js';
import { registerHandler } from './user/register.handler.js';
import { loginHandler } from './user/login.handler.js';

const handlers = {
  [PacketType.REGISTER_REQUEST]: {
    handler: registerHandler,
    // protoType: 'request.registerRequest.C2SRegisterRequest',
    protoType: 'request.C2SRegisterRequest',
  },
  [PacketType.LOGIN_REQUEST]: {
    handler: loginHandler,
    protoType: 'request.C2SLoginRequest',
  },
};

export const getHandlerById = (packetType) => {
  if (!handlers[packetType]) {
    throw Error();
  }

  return handlers[packetType].handler;
};

export const getProtoTypeNameByPacketType = (packetType) => {
  if (!handlers[packetType]) {
    throw Error();
  }

  return handlers[packetType].protoType;
};
