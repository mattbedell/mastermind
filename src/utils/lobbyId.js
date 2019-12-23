const uuidv4 = require('uuid/v4');
const { promiseClient: redisClient } = require('../connection/redisConnect');

// https://stackoverflow.com/a/1349426
function getLobbyName(idLength) {
  const allLeters = 'abcdefghijklmnopqrstuvwkyz';
  let result = '';

  for (let i = 0; i < idLength; i += 1) {
    result += allLeters.charAt(Math.floor(Math.random() * allLeters.length));
  }

  return result.toUpperCase();
}

function getGameId() {
  return uuidv4();
}

async function getValidLobbyName(idLength) {
  const lobbyName = getLobbyName(idLength);
  const isValidName = redisClient.sadd('join_lobby_name', lobbyName);

  // if > 0 elements added, lobbyName is not in use so safe to use
  if (isValidName) {
    return lobbyName;
  }

  // lobby name is already in use so generate another with an expanded range of characters
  return getValidLobbyName(idLength + 1);
}

// bind short lobby code to game uuid so players can join a game with a short lobby name
async function bindLobbyNameToGameId(lobbyName) {
  const gameId = getGameId();
  const isOk = await redisClient.set(lobbyName, gameId);

  if (isOk) {
    return gameId;
  }

  throw new Error('Lobby name not bound to id');
}

function unbindAndReleaseLobbyName(lobbyName) {
  // once game has started, release lobby name into pool of valid new lobby names
  return redisClient.del(lobbyName).then(redisClient.srem(lobbyName));
}

module.exports = {
  getLobbyName,
  getGameId,
  getValidLobbyName,
  bindLobbyNameToGameId,
  unbindAndReleaseLobbyName,
};
