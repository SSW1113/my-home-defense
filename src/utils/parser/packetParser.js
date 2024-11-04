import { CLIENT_VERSION } from '../../constants/env.js';
import { getProtoTypeNameByHandlerId } from '../../handlers/index.js';
import { getProtoMessages } from '../../init/loadProto.js';

export const packetParser = (data) => {
  const protoMessages = getProtoMessages();

  const commonPacket = protoMessages.common.Packet;
  let packet;
  try {
    packet = commonPacket.decode(data);
  } catch (err) {
    console.error(err);
  }

  const handlerId = packet.handlerId;
  const userId = packet.userId;
  const clientVersion = packet.version;

  if (clientVersion !== CLIENT_VERSION) {
    throw Error('클라이언트 버전 불일치');
  }

  const protoTypeName = getProtoTypeNameByHandlerId(handlerId);
  if (!protoTypeName) {
    throw Error();
  }

  const [namespace, typeName] = protoTypeName.split('.');
  const payloadType = protoMessages[namespace][typeName];
  let payload;

  try {
    payload = payloadType.decode(packet.payload);
  } catch (err) {
    console.error(err);
  }

  const expectedFields = Object.keys(payloadType.fields);
  const actualFields = Object.keys(payload);
  const missingField = expectedFields.filter((field) => !actualFields.includes(field));

  if (missingField > 0) {
    throw Error();
  }

  return { handlerId, userId, payload };
};
