import { PacketType } from '../../constants/header.js';

export const notificationProto = {
    [PacketType.MATCH_START_NOTIFICATION]: {
        protoType: 'gameNotification.S2CMatchStartNotification',
        fieldName: 'matchStartNotification',
    },
};
