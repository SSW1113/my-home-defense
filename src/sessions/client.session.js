import Client from '../classes/client.class.js';
import { clientSessions } from './sessions.js';

export const addClient = (socket) => {
  const client = new Client(socket);
  clientSessions.push(client);
  return client;
};

export const removeClient = (socket) => {
  const index = clientSessions.findIndex((client) => client.socket === socket);
  if (index !== -1) {
    return clientSessions.splice(index, 1)[0];
  }
};

export const getAllClient = () => {
  return clientSessions;
};

export const getClientBySocket = (socket) => {
  return clientSessions.find((client) => client.socket === socket);
};
