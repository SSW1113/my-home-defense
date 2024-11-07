import { PacketType } from '../../constants/header.js';

export const notificationProto = {
    [PacketType.MATCH_START_NOTIFICATION]: {
        protoType: 'gameNotification.S2CMatchStartNotification',
        fieldName: 'matchStartNotification',
    },
    [PacketType.STATE_SYNC_NOTIFICATION]: {
        protoType: 'gameNotification.S2CStateSyncNotification',
        fieldName: 'stateSyncNotification',
    },
};
