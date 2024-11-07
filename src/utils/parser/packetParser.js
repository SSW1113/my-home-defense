import { CLIENT_VERSION } from '../../constants/env.js';
import { getProtoTypeNameByPacketType } from '../../handlers/index.js';
import { getProtoMessages } from '../../init/loadProto.js';

export const packetParser = (packetType, data) => {
  try {
    const protoMessages = getProtoMessages();

    const GamePacket = protoMessages['protoPacket']['GamePacket'];
    const gamePacket = GamePacket.decode(data);

    const payloadType = gamePacket.payload;
    if (!payloadType) {
      throw new Error('No payload found in gamePacket');
    }

    // 스택 오버플로우 형님들은 신이야
    const payloadField = GamePacket.oneofs['payload'].oneof.find(
      (field) => gamePacket[field] != null,
    );
    console.log('payloadField: ', payloadField);
    if (!payloadField) {
      throw new Error('No valid payload field found in GamePacket');
    }

    const protoTypeName = getProtoTypeNameByPacketType(packetType);
    const payload = gamePacket[payloadField];
    console.log('payload: ', payload);

    // const payloadType = GamePacket[]
    // const [namespace, packetName, typeName] = protoTypeName.split('.');
    // console.log('packetName, typeName: ', packetName, typeName);

    // payload = payload[packetName];

    const [namespace, typeName] = protoTypeName.split('.');
    const expectedProto = protoMessages[namespace][typeName];
    const expectedFields = Object.keys(expectedProto.fields);
    const actualFields = Object.keys(payload);
    const missingField = expectedFields.filter((field) => !actualFields.includes(field));
    console.log('expectedFields: ', expectedFields);
    console.log('actualFields: ', actualFields);
    console.log('missingField: ', missingField);
    if (missingField > 0) {
      throw Error();
    }

    // return { packetType, userId, payload };
    return payload;
  } catch (err) {
    console.error('error in packet Parsing', err.message);
  }
};
