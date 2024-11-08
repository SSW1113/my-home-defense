import dotenv from 'dotenv';

dotenv.config();

export const HOST = process.env.HOST || '0.0.0.0';
export const PORT = process.env.PORT || '3010';
export const CLIENT_VERSION = process.env.CLIENT_VERSION || '1.0.0';

export const DB_NAME = process.env.DB_NAME || 'USERS_DB';
export const DB_USER = process.env.DB_USER || 'root';
export const DB_PASSWORD = process.env.DB_PASSWORD || 'aaaa4321';
export const DB_HOST = process.env.DB_HOST || '127.0.0.1';
export const DB_PORT = process.env.DB_PORT || '3306';

export const GAME_DB_NAME = process.env.DB_NAME || 'GAMES_DB';
export const GAME_DB_USER = process.env.DB_USER || 'root';
export const GAME_DB_PASSWORD = process.env.DB_PASSWORD || 'aaaa4321';
export const GAME_DB_HOST = process.env.DB_HOST || '127.0.0.1';
export const GAME_DB_PORT = process.env.DB_PORT || '3306';

export const JWT_SECRET = process.env.JWT_SECRET || 'very_secret';
