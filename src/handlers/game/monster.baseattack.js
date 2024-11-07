import { getUserBySocket } from '../../sessions/user.session.js';

export const monsterBaseAttackHandler = async ({ packetType, data, socket }) => {
  console.log('base attack');
  const { damage } = data;
  console.log('damage: ', damage);
  const user = getUserBySocket(socket);
};
