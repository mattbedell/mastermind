const sockio = require('socket.io');
const { getValidLobbyName, bindLobbyNameToGameId } = require('../utils/lobbyId');
const { getUserId } = require('../utils/playerId');
const { promiseClient } = require('./redisConnect');

module.exports = function connect(server, lobbyCodeLength = 3) {
  const io = sockio(server, {
    path: process.env.SOCK_PATH,
  });

  // socket namespaces
  const joinIo = io.of('/join');
  const gameIo = io.of('/game');

  joinIo.on('connection', async (socket) => {
    console.log(socket.id, 'connected!');
    // player connecting to game
    socket.on('get_game_id', async ({ lobbyName }, cb) => {
      // TODO: santize this dammit!
      const gameId = await promiseClient.get(`${lobbyName}`);
      const err = gameId ? null : `Lobby: ${lobbyName} not found!`;
      cb({ lobbyName, gameId }, err);
    });


    socket.on('get_lobby_code_length', (cb) => {
      cb(lobbyCodeLength);
    });

    // initialize lobby
    socket.on('init_game_lobby', async (cb) => {
      const lobbyName = await getValidLobbyName(lobbyCodeLength);
      const gameId = await bindLobbyNameToGameId(lobbyName);
      socket.join(`${gameId}-lobby`);
      cb({ lobbyName, gameId });
    });

    socket.on('disconnect', () => {
      console.log(socket.id, 'disconnected!');
    });
  });

  gameIo.on('connection', (socket) => {
    console.log(socket.id, 'connected!');


    // TODO: sanitize!!!
    socket.on('join_game_player', ({ gameId, userName }, cb) => {
      const userId = getUserId(userName, gameId);
      socket.join(gameId);
      cb({ gameId, userId, userName });
    });

    socket.on('disconnect', () => {
      console.log(socket.id, 'disconnected!');
    });
  });
};


// socket.on('get_lobby_code', async (cb) => {
//       const lobbyCode = await getValidLobbyName(process.env.lobbycodelen);
//       cb(lobbyCode);
//     });
