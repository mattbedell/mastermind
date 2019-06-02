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

// This feels like a timebomb waiting to explode, make something smarter to create and recycle
// lobby codes
function getValidLobbyName(idLength) {
  return new Promise((resolve) => {
    const lobbyName = getLobbyName(idLength);
    redisClient.sismember('join_lobby_names', lobbyName).then((isMember) => {
      if (isMember) {
        resolve(getValidLobbyName(idLength));
      } else {
        redisClient.sadd('join_lobby_names', lobbyName).then((numAdded) => {
          // if > 0 elements were added to the set of active lobby codes, the current code is safe to use
          if (numAdded) {
            resolve(numAdded);
          // lobby code was added between the time of checking the set and adding it to the set, so generate a new one
          } else {
            resolve(getValidLobbyName(idLength));
          }
        });
      }
    });
  });
}

// bind short lobby code to game uuid so players can join a game with a short lobby name
function bindLobbyNameToGameId(lobbyName) {
  const gameId = getGameId();
  return redisClient.set(lobbyName, gameId).then((ok) => {
    if (ok) {
      return gameId;
    }

    throw new Error('Lobby name not bound to id');
  });
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
