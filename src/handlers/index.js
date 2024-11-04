import { HANDLER_IDS } from '../constants/handlerIds.js';

const handlers = {};

export const getHandlerById = (handlerId) => {
  if (!handlers[handlerId]) {
    throw Error();
  }

  return handlers[handlerId].handler;
};

export const getProtoTypeNameByHandlerId = (handlerId) => {
  if (!handlers[handlerId]) {
    throw Error();
  }

  return handlers[handlerId].protoType;
};
