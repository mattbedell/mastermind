const sockio = require('socket.io');
const createLobbyId = require('../utils/lobbyId');
const Lobby = require('./Lobby');

module.exports = class Game {
  constructor(server) {
    this.io = sockio(server);
    this.lobbies = new Map();
    this.connect(this.io);
  }

  connect(io) {
    io.on('connection', (socket) => {
      socket.on('request_lobby_id', (callback) => {
        const id = createLobbyId(4, []);
        const lobby = new Lobby(this.io, socket, id);
        this.lobbies.set(id, lobby);
        callback(lobby.serialize());
      });

      socket.on('player_connect', (msg, callback) => {
        const lobby = this.lobbies.get(msg.lobbyId.toUpperCase());

        if (lobby) {
          lobby.connectPlayer(socket, msg, callback);
        } else {
          callback(null);
        }
      });
    });
  }
};
