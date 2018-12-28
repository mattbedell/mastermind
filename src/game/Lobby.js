const createPlayerId = require('../utils/playerId');

const Base = require('./base');
const Player = require('./Player');

module.exports = class Lobby extends Base {
  constructor(io, socket, id) {
    super(socket, id);
    this.io = io;

    this.game = new Map([
      ['players', new Map()],
      ['lobbyId', id],
    ]);
  }

  connectPlayer(socket, msg, callback) {
    const { playerId } = msg;

    const players = this.getPlayers();
    if (playerId) {
      const player = players.get(playerId);
      if (player) {
        callback(player.updateSocket(socket).serialize());
        return;
      }
    }

    const lobbyId = this.game.get('lobbyId');

    const newPlayerId = createPlayerId(lobbyId);

    const player = new Player(this, socket, newPlayerId, msg.name);
    players.set(newPlayerId, player);
    this.socket.emit('player_joined', this.serialize(this.getPlayers()));

    if (players.size < 2) {
      player.setIsHost(true);
    }
    callback(player.serialize());
  }

  getPlayers() {
    return this.game.get('players');
  }

  getLobbyId() {
    return this.game.get('lobbyId');
  }

  serialize(mapObj = this.game) {
    return super.serialize(mapObj);
  }
};
