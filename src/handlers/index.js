import { PacketType } from '../constants/header.js';

const handlers = {
  [PacketType.REGISTER_REQUEST]: {
    handler: registerHandler,
    protoType: 'protoPacket.C2SRegisterRequest',
  },
};

export const getHandlerById = (packetType) => {
  if (!handlers[packetType]) {
    throw Error();
  }

  return handlers[packetType].handler;
};

export const getProtoTypeNameByHandlerId = (packetType) => {
  if (!handlers[packetType]) {
    throw Error();
  }

  return handlers[packetType].protoType;
};
