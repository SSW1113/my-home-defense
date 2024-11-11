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

// initialGameStateData
// int32 baseHp = 1;
// int32 towerCost = 2;
// int32 initialGold = 3;
// int32 monsterSpawnInterval = 4;
export const initialGameStateData = {
  baseHp: 120,
  towerCost: 3000,
  initialGold: 15000,
  monsterSpawnInterval: 1,
}
