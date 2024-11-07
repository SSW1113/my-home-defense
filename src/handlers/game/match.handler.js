import { addGameSession, findMatchingGameSession } from "../../sessions/game.session.js";
import CustomError from "../../utils/error/customError.js";
import { v4 as uuidv4 } from 'uuid';
import { getUserBySocket } from "../../sessions/user.session.js";
import { gameSessions } from "../../sessions/sessions.js";


export const matchStartHandler = async ({ packetType, data, socket }) => {
    try {
        console.log('matchStartHandler');

        /*
        1. 유저가 1명인 게임 세션을 찾는다
        2. 없으면 게임 세션을 만들어서 (지금 매치 돌린) 유저를 넣는다
        3. 있으면 게임 세션에 (지금 매치 돌린) 유저를 넣는다
        4. 게임 세션에 유저가 2명이 되면 게임 시작 
        */

        const user = await getUserBySocket(socket);

        // 1. 유저가 1명인 게임 세션을 찾는다
        let gameSession = findMatchingGameSession();

        // 2. 없으면 게임 세션을 만들어서 (지금 매치 돌린) 유저를 넣는다
        if (!gameSession) {
            const gameid = uuidv4();
            const gameId = `Game${gameid}`;
            // 게임 세션 생성
            gameSession = addGameSession(gameId);
            console.log('게임 세션 새로 생성', gameSession);
            // 게임 세션에 유저 추가
            gameSession.addUser(user);
        } else {
            console.log('게임 세션 발견', gameSession)
            // 3. 있으면 게임 세션에 (지금 매치 돌린) 유저를 넣는다
            gameSession.addUser(user);
        }

        console.log(gameSessions);
        console.log('Match Start');
    } catch (e) {
        console.error(e);
    }
};