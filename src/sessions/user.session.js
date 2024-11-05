import User from '../classes/models/user.class.js';
import { userSessions } from './sessions.js';

export const addUser = (socket, id, playerId, latency) => {
  const user = new User(socket, id, playerId, latency);
  userSessions.push(user);
  return user;
};

export const removeUser = (socket) => {
  const index = userSessions.findIndex((user) => user.socket === socket);
  if (index !== -1) {
    return userSessions.splice(index, 1)[0];
  }
};

export const getAllUser = () => {
  return userSessions;
};

export const getNextSequence = (userId) => {
  const user = getUserById(userId);
  if (user) {
    return user.getNextSequence();
  }
  return null;
};

export const getUserById = (userId) => {
  return userSessions.find((user) => user.id === userId);
};

export const getUserBySocket = (socket) => {
  return userSessions.find((user) => user.socket === socket);
};
