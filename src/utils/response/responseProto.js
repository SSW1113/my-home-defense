import { PacketType } from '../../constants/header.js';

export const responseProto = {
  [PacketType.REGISTER_RESPONSE]: {
    protoType: 'response.S2CRegisterResponse',
    fieldName: 'registerResponse',
  },
};
