import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dbPool from '../database.js';
import { USERS_DB, GAMES_DB } from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createSchemas = async (db) => {
  const sqlDir = path.join(__dirname, '../sql');

  try {
    const sql = fs.readFileSync(sqlDir + db, 'utf8');

    const queries = sql
      .split(';')
      .map((query) => query.trim())
      .filter((query) => query.length > 0);

    for (const query of queries) {
      await dbPool.query(query);
    }
  } catch (e) {
    console.error('데이터 베이스 마이그레이션 에러', e);
  }
};

createSchemas(USERS_DB)
  .then(() => {
    console.log(`${USERS_DB}마이그레이션이 완료되었습니다.`);
  })
  .catch((e) => {
    console.log(e);
  });

createSchemas(GAMES_DB)
  .then(() => {
    console.log(`${GAMES_DB}마이그레이션이 완료되었습니다.`);
  })
  .catch((e) => {
    console.log(e);
  });
