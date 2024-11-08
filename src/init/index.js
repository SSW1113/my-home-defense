import { addGameSession } from '../sessions/game.session.js';
import { loadProtos } from './loadProto.js';
import { v4 as uuidv4 } from 'uuid';

export const initServer = async () => {
  try {
    await loadProtos();
    // const gameId = uuidv4();
    // const gameSession = addGameSession(gameId);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export const initialGameStateData = {
  baseHp: 150,
  towerCost: 3000,
  initialGold: 9000,
  monsterSpawnInterval: 1,
}
