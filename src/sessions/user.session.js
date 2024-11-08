import User from '../classes/models/user.class.js';
import { userSessions } from './sessions.js';

export const addUser = (socket, id) => {
  const user = new User(socket, id);
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

export const getUserById = (userId) => {
  return userSessions.find((user) => user.id === userId);
};

export const getUserBySocket = (socket) => {
  return userSessions.find((user) => user.socket === socket);
};
